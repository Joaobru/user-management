import React, { SetStateAction } from 'react'

import { Modal } from 'react-bootstrap'

import { deleteUser } from '../../services/users/deleteUser'

export interface modalDeleteUser {
  idUser:number;
  page:number;

  modalDeleteUser: boolean;

  setModalDeleteUser: SetStateAction<any>;
  setUsers: SetStateAction<any>;

  titleModal: string;
}

function ModalDeleteUser ({ modalDeleteUser, setModalDeleteUser, idUser, page, setUsers, titleModal }: modalDeleteUser) {
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
          <button onClick={() => { callFunctionDeleteUser(idUser, page, setUsers, setModalDeleteUser) }} type='button' className='btn btn-success'>Sim</button>
        </Modal.Footer>
      </Modal>
  )
}

async function callFunctionDeleteUser (idUser: number, page: number, setUsers:Function, setModalDeleteUser: Function) {
  const result = await deleteUser(idUser, page)

  setUsers(result.data)
  setModalDeleteUser(false)
}

export default ModalDeleteUser
