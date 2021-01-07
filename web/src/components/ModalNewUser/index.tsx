/* eslint-disable react/jsx-no-duplicate-props */
import React, { SetStateAction, useState, useEffect } from 'react'

import { Modal } from 'react-bootstrap'

import { user } from '../TableComponent'
import { getUfs } from '../../services/ibge/getUfs'
import { postUser } from '../../services/users/postUser'
import { updateUser } from '../../services/users/updateUser'
import { getUsers } from '../../services/users/getUsers'
import { getCityList } from '../../services/ibge/getCity'

import { FormModal, GroupInputForm, TwoInputForm } from './styles'

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

function ModalNewUser ({ modalNewUser, setModalNewUser, setUsers, page, titleModal, action, idUser, usersUpdate, users }: modalAddUser) {
  // Geo Location
  const [ufList, setUfList] = useState([])
  const [cityList, setCityList] = useState([])

  // Loading Aplication
  const [loading, setLoading] = useState(true)
  const [cityLoading, setCityLoading] = useState(true)

  // Form
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState(0)
  const [estadoCivil, setEstadoCivil] = useState('0')
  const [cpf, setCpf] = useState('')
  const [ufId, setUfId] = useState('0')
  const [cidade, setCidade] = useState('0')

  useEffect(() => {
    getUfList(setUfList, setLoading)
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
              <GroupInputForm>
                <label htmlFor="idade">Idade</label>
                <input value={idade} onChange={(e:any) => { setIdade(Number(e.target.value)) }} type="number" id="idade" placeholder="Idade"/>
              </GroupInputForm>

              <GroupInputForm>
                <label htmlFor="estadoCivil">Estado Civil</label>
                <select onChange={(e:any) => { setEstadoCivil(e.target.value) }} name="estadoCivil" id="estadoCivil">
                  <option value="0" disabled selected>Selecione Seu Estado Civil</option>

                  <option value="casado">Casado</option>
                  {optionCivilState.map((civilState: civilStateInterface) => {
                    return (
                      <option key={civilState.id} value={civilState.value} selected={action === 'UpdateUser' ? civilState.value === users[usersUpdate].estadoCivil : false}>{civilState.option}</option>
                    )
                  })}
                </select>
              </GroupInputForm>
            </TwoInputForm>

            <TwoInputForm>
              <GroupInputForm>
                <label htmlFor="idade">Estado</label>
                {/* eslint-disable-next-line react/jsx-no-duplicate-props */ }
                {/* eslint-disable-next-line no-unused-expressions */}
                <select onChange={(e:any) => { console.log(e.target.value, '---'); getCidades(setCityLoading, setCityList, e.target.value, setUfId); console.log(ufId) }} name="estado" id="estado">
                  <option value="0" disabled selected={action !== 'UpdateUser'}>Selecione um Estado</option>
                  {!loading && (ufList.map((uf:ufInterface) => {
                    return (
                      <option key={uf.id} value={uf.id + '-' + uf.sigla} selected={action === 'UpdateUser' ? uf.sigla === users[usersUpdate].estado : false}>{uf.sigla}</option>
                    )
                  }))}
                </select>
              </GroupInputForm>

              <GroupInputForm>
                <label htmlFor="cidade">Cidade</label>
                <select onChange={(e:any) => { setCidade(e.target.value) }} disabled={cityLoading} name="estadoCivil" id="estadoCivil">
                <option value="0" disabled hidden selected={action !== 'UpdateUser'}>Selecione uma Cidade</option>
                  { cityList && (cityList.map((city:cityInterface) => {
                    return (
                      <option key={city.id} value={city.nome} selected={action === 'UpdateUser' ? city.nome === users[usersUpdate].cidade : false}>{city.nome}</option>
                    )
                  }))}
                </select>
              </GroupInputForm>
            </TwoInputForm>
            <div>
              <label htmlFor="cpf">CPF</label>
              <input value={cpf} onChange={(e:any) => { setCpf(e.target.value) }} type="text" id="cpf" placeholder="CPF"/>
            </div>
          </FormModal>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => { setModalNewUser(false); clearDataModal(setNome, setIdade, setEstadoCivil, setCpf, setCidade, setUfId, setCityLoading); console.log(usersUpdate) }} type='button' className='btn btn-danger'>Não</button>
          <button onClick={() => { addNewUser(nome, idade, estadoCivil, cpf, cidade, ufId, setUsers, page, setModalNewUser, setNome, setIdade, setEstadoCivil, setCpf, setCidade, setUfId, action, idUser, setCityLoading) }} type='button' className='btn btn-success'>Sim</button>
        </Modal.Footer>
      </Modal>
  )
}

async function getUfList (setUfList: Function, setLoading: Function) {
  setUfList(await getUfs())

  setLoading(false)
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

async function addNewUser (nome: string, idade: number, estadoCivil: string, cpf:string, cidade: string, estado: string, setUsers: Function, page: number, setModalNewUser: Function, setNome: Function, setIdade: Function, setEstadoCivil: Function, setCpf: Function, setCidade: Function, setUfId: Function, action: string, idUser: number, setCityLoading: Function) {
  if (nome !== '' && idade !== 0 && estadoCivil !== '0' && cpf !== '' && cidade !== '' && estado !== '') {
    const obj = { nome, idade, estadoCivil, cpf, cidade, estado }

    console.log(obj)

    action === 'AddUser' ? await postUser(obj) : await updateUser(obj, idUser)

    const result = await getUsers(page)
    console.log(result)
    setUsers(result.data)
    setModalNewUser(false)
    clearDataModal(setNome, setIdade, setEstadoCivil, setCpf, setCidade, setUfId, setCityLoading)
  } else {
    alert('Por favor preencha todos os dados!')
  }
  console.log(action, 'action')
  console.log('passou por aqui')
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
