import React from 'react'

import { FiTrash2, FiSettings } from 'react-icons/fi'
import { IconsModal } from './styles'
import { Table } from 'react-bootstrap'

interface TableOptionShowModal {
  setModalNewUser: Function;
  setTitleModal: Function;
  setModalDeleteUser:Function;
  setIdUser:Function;
  setAction: Function;
  setUsersUpdate: Function;

  users: Array<user>;
}

export interface user {
  id: number;
  idade: number;

  nome: string;
  estadoCivil: string;
  cpf: string;
  cidade: string;
  estado: string;
}

function TableComponent ({ setTitleModal, setModalNewUser, users, setModalDeleteUser, setIdUser, setAction, setUsersUpdate }: TableOptionShowModal) {
  return (
      <>
        { users.length !== 0
          ? <Table responsive>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Estado Civil</th>
              <th>CPF</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user:user, index) => {
              return (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.nome}</td>
                <td>{user.idade}</td>
                <td>{user.estadoCivil}</td>
                <td>{user.cpf}</td>
                <td>{user.estado}</td>
                <td>{user.cidade}</td>
                <IconsModal>
                  <FiTrash2 onClick={() => { setModalDeleteUser(true); setIdUser(user.id) }} size={22} color='rgba(0, 0, 0, 0.6)'/>
                  <FiSettings onClick={() => { setUsersUpdate([index]); setModalNewUser(true); setIdUser(user.id); setTitleModal('Atualizar Usuário'); setAction('UpdateUser') } } size={22} color='rgba(0, 0, 0, 0.6)'/>
                </IconsModal>
              </tr>
              )
            })}
          </tbody>
        </Table>
          : <h1 className='text-center'>Nenhum usuário cadastrado</h1>
        }
      </>
  )
}

export default TableComponent
