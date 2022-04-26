/* eslint-disable react/jsx-no-duplicate-props */
import React, { SetStateAction, useState, useEffect } from 'react'

import { Modal } from 'react-bootstrap'

import { user } from '../TableComponent'
import { get } from '../SectionHome'
import { getUfs } from '../../services/ibge/getUfs'
import { postUser } from '../../services/users/postUser'
import { updateUser } from '../../services/users/updateUser'
import { getCityList } from '../../services/ibge/getCity'

import InputMask from 'react-input-mask'
import swal from 'sweetalert'

import { FormModal, GroupInputForm, TwoInputForm, GroupInputFormCpf, GroupInputFormFromTwoModal } from './styles'

export interface modalAddUser {
  users: Array<user>

  modalNewUser: boolean;

  setModalNewUser: SetStateAction<any>;

  titleModal: string;
  action: string;

  page: number;
  idUser: number;
  usersUpdate: number;

  setUsers: Function;
  setTotalPage: Function;
  setPage: Function;
  setLoading: Function;
}

interface ufInterface {
  id: number;
  sigla: string;
  nome: string;
}

interface cityInterface {
  id: number;
  nome: string;
}

interface civilStateInterface {
  id:number;
  value: string;
  option: string;
}

const optionCivilState = [
  { id: 1, value: 'casado', option: 'Casado' },
  { id: 2, value: 'solteiro', option: 'Solteiro' },
  { id: 3, value: 'viuvo', option: 'Viúvo' }
]

function ModalNewUser ({ modalNewUser, setModalNewUser, setUsers, page, titleModal, action, idUser, usersUpdate, users, setTotalPage, setPage, setLoading }: modalAddUser) {
  // Geo Location
  const [ufList, setUfList] = useState([])
  const [cityList, setCityList] = useState([])

  // Loading Aplication
  const [loadingUf, setLoadingUf] = useState(true)
  const [cityLoading, setCityLoading] = useState(true)

  // Form
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState(0)
  const [estadoCivil, setEstadoCivil] = useState('0')
  const [cpf, setCpf] = useState('')
  const [ufId, setUfId] = useState('0')
  const [cidade, setCidade] = useState('0')

  useEffect(() => {
    getUfList(setUfList, setLoadingUf)
  }, [])

  useEffect(() => {
    if (action === 'UpdateUser') {
      setNome(users[usersUpdate].nome)
      setIdade(users[usersUpdate].idade)
      setCpf(users[usersUpdate].cpf)
      setEstadoCivil(users[usersUpdate].estadoCivil)
      setUfId(users[usersUpdate].estado)
      setCidade(users[usersUpdate].cidade)
      getCityListUpload(setCityList, users, usersUpdate)
      setCityLoading(false)
    }
  }, [usersUpdate])

  return (
    <Modal show={ modalNewUser }>
        <Modal.Header onClick={() => { setModalNewUser(false); clearDataModal(setNome, setIdade, setEstadoCivil, setCpf, setCidade, setUfId, setCityLoading) }} closeButton>
          <Modal.Title>{ titleModal }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormModal>
            <GroupInputForm>
              <label htmlFor="nome">Nome</label>
              <input value={nome} onChange={(e:any) => { setNome(e.target.value) }} type="nome" id="nome" placeholder="Usuário"/>
            </GroupInputForm>
            <TwoInputForm>
              <GroupInputFormFromTwoModal>
                <label htmlFor="idade">Idade</label>
                <input value={idade} onChange={(e:any) => { setIdade(Number(e.target.value)) }} type="number" id="idade" placeholder="Idade"/>
              </GroupInputFormFromTwoModal>

              <GroupInputFormFromTwoModal>
                <label htmlFor="estadoCivil">Estado Civil</label>
                <select onChange={(e:any) => { setEstadoCivil(e.target.value) }} name="estadoCivil" id="estadoCivil">
                  <option value="0" disabled selected>Selecione Seu Estado Civil</option>
                  {optionCivilState.map((civilState: civilStateInterface) => {
                    return (
                      <option key={civilState.id} value={civilState.value} selected={action === 'UpdateUser' ? civilState.value === users[usersUpdate].estadoCivil : false}>{civilState.option}</option>
                    )
                  })}
                </select>
              </GroupInputFormFromTwoModal>
            </TwoInputForm>

            <TwoInputForm>
              <GroupInputFormFromTwoModal>
                <label htmlFor="idade">Estado</label>
                {/* eslint-disable-next-line react/jsx-no-duplicate-props */ }
                {/* eslint-disable-next-line no-unused-expressions */}
                <select onChange={(e:any) => { console.log(e.target.value, '---'); getCidades(setCityLoading, setCityList, e.target.value, setUfId); console.log(ufId) }} name="estado" id="estado">
                  <option value="0" disabled selected={action !== 'UpdateUser'}>Selecione um Estado</option>
                  {!loadingUf && (ufList.map((uf:ufInterface) => {
                    return (
                      <option key={uf.id} value={uf.id + '-' + uf.sigla} selected={action === 'UpdateUser' ? uf.sigla === users[usersUpdate].estado : false}>{uf.sigla}</option>
                    )
                  }))}
                </select>
              </GroupInputFormFromTwoModal>

              <GroupInputFormFromTwoModal>
                <label>Cidade</label>
                <select onChange={(e:any) => { setCidade(e.target.value) }} disabled={cityLoading} name="estadoCivil" id="estadoCivil">
                <option value="0" disabled hidden selected={action !== 'UpdateUser'}>Selecione uma Cidade</option>
                  { cityList && (cityList.map((city:cityInterface) => {
                    return (
                      <option key={city.id} value={city.nome} selected={action === 'UpdateUser' ? city.nome === users[usersUpdate].cidade : false}>{city.nome}</option>
                    )
                  }))}
                </select>
              </GroupInputFormFromTwoModal>
            </TwoInputForm>
            <GroupInputFormCpf>
              <label>CPF</label>
              <InputMask value={cpf} onChange={(e:any) => { setCpf(e.target.value) }} type='text' mask='999.999.999-99' id='cpf' maskPlaceholder="CPF"/>
            </GroupInputFormCpf>
          </FormModal>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => { setModalNewUser(false); clearDataModal(setNome, setIdade, setEstadoCivil, setCpf, setCidade, setUfId, setCityLoading); console.log(usersUpdate) }} type='button' className='btn btn-danger'>Não</button>
          <button onClick={() => { addNewUser(nome, idade, estadoCivil, cpf, cidade, ufId, setUsers, page, setModalNewUser, setNome, setIdade, setEstadoCivil, setCpf, setCidade, setUfId, action, idUser, setCityLoading, setTotalPage, setPage, setLoading) }} type='button' className='btn btn-success'>Sim</button>
        </Modal.Footer>
      </Modal>
  )
}

async function getUfList (setUfList: Function, setLoadingUf: Function) {
  setUfList(await getUfs())

  setLoadingUf(false)
}

async function getCityListUpload (setCityList: Function, users: Array<user>, usersUpdate: number) {
  setCityList(await getCityList(users[usersUpdate].estado))
}

async function getCidades (setCityLoading: Function, setCityList: Function, ufId: string, setUfId: Function) {
  const uf = ufId.split('-')

  setCityList(await getCityList(uf[0]))
  setUfId(uf[1])
  console.log(uf[1])

  setCityLoading(false)
}

async function addNewUser (nome: string, idade: number, estadoCivil: string, cpf:string, cidade: string, estado: string, setUsers: Function, page: number, setModalNewUser: Function, setNome: Function, setIdade: Function, setEstadoCivil: Function, setCpf: Function, setCidade: Function, setUfId: Function, action: string, idUser: number, setCityLoading: Function, setTotalPage: Function, setPage:Function, setLoading: Function) {
  const validationCpf = cpf.split('_')

  if (validationCpf.length !== 1) {
    swal('Erro', 'Cpf inválido', 'error')
  } else if (nome !== '' && idade !== 0 && estadoCivil !== '0' && cpf !== '' && cidade !== '' && estado !== '') {
    const obj = { nome, idade, estadoCivil, cpf, cidade, estado }

    const responseAction = action === 'AddUser' ? await postUser(obj) : await updateUser(obj, idUser)

    if (responseAction.data.success) {
      swal('Bom Trabalho', responseAction.data.message, 'success')
      get(page, setTotalPage, setUsers, setPage, setLoading)
      setModalNewUser(false)
      clearDataModal(setNome, setIdade, setEstadoCivil, setCpf, setCidade, setUfId, setCityLoading)
    } else {
      swal('Erro', responseAction.data.message, 'error')
    }
  } else {
    swal('Erro', 'Por favor preencha todos os dados!', 'error')
  }
}

function clearDataModal (setNome: Function, setIdade: Function, setEstadoCivil: Function, setCpf: Function, setCidade: Function, setUfId: Function, setCityLoading: Function) {
  setNome('')
  setIdade(0)
  setEstadoCivil('0')
  setCpf('')
  setCidade('0')
  setUfId('0')
  setCityLoading(true)
}

export default ModalNewUser
