import React, { SetStateAction } from 'react'

import swal from 'sweetalert'

import { Modal } from 'react-bootstrap'

import { get } from '../SectionHome'
import { deleteUser } from '../../services/users/deleteUser'

export interface modalDeleteUser {
  idUser:number;
  page:number;

  modalDeleteUser: boolean;

  setModalDeleteUser: SetStateAction<any>;
  setUsers: SetStateAction<any>;

  setTotalPage: Function;
  setPage: Function;
  setLoading: Function;

  titleModal: string;
}

function ModalDeleteUser ({ modalDeleteUser, setModalDeleteUser, idUser, page, setUsers, titleModal, setTotalPage, setPage, setLoading }: modalDeleteUser) {
  return (
    <Modal show={ modalDeleteUser }>
        <Modal.Header onClick={() => { setModalDeleteUser(false) }} closeButton>
          <Modal.Title>{ titleModal }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Você deseja mesmo deletar este usuário?</h5>

        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => { setModalDeleteUser(false) }} type='button' className='btn btn-danger'>Não</button>
          <button onClick={() => { callFunctionDeleteUser(idUser, page, setUsers, setModalDeleteUser, setTotalPage, setPage, setLoading) }} type='button' className='btn btn-success'>Sim</button>
        </Modal.Footer>
      </Modal>
  )
}

async function callFunctionDeleteUser (idUser: number, page: number, setUsers:Function, setModalDeleteUser: Function, setTotalPage: Function, setPage: Function, setLoading: Function) {
  const response = await deleteUser(idUser)

  console.log(response)

  if (response.success) {
    swal('Bom Trabalho!', response.message, 'success')
    get(page, setTotalPage, setUsers, setPage, setLoading)
    setModalDeleteUser(false)
  } else {
    swal('Erro', response.message, 'error')
    setModalDeleteUser(false)
  }
}

export default ModalDeleteUser
