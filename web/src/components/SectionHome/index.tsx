import React, { useState, useEffect } from 'react'

import { SectionContainer, PageComponent, ControllerPageComponent } from './styles'

import ModalNewUser from '../../components/ModalNewUser'
import ModalDeleteUser from '../../components/ModalDeleteUser'
import TableComponent from '../../components/TableComponent'
import { getUsers } from '../../services/users/getUsers'

function SectionHome () {
  const [modalNewUser, setModalNewUser] = useState(false)
  const [modalDeleteUser, setModalDeleteUser] = useState(false)

  const [titleModal, setTitleModal] = useState('')
  const [action, setAction] = useState('')

  const [users, setUsers] = useState([])
  const [usersUpdate, setUsersUpdate] = useState(0)

  const [page, setPage] = useState(1)
  const [idUser, setIdUser] = useState(0)

  useEffect(() => {
    get('')
  }, [page])

  async function get (action: string) {
    const result = await getUsers(page, action, setPage)
    setUsers(result.data)
  }

  return (
    <>
      <SectionContainer>
        <button onClick={() => { setModalNewUser(true); setTitleModal('Adicionar novo usuário'); setAction('AddUser') }} type='button' className='btn btn-primary'>Adicionar novo usuário</button>
        <TableComponent setTitleModal={setTitleModal} setModalNewUser={setModalNewUser} users={users} setModalDeleteUser={setModalDeleteUser} setIdUser={setIdUser} setAction={setAction} setUsersUpdate={setUsersUpdate}/>
        <ControllerPageComponent>
          <button onClick={() => { get('prev') }} type='button' className='btn btn-primary mb-0'>Prev</button>
          <PageComponent>
            <h5>
              { page }
            </h5>
          </PageComponent>
          <button onClick={() => { setPage(page + 1) }} type='button' className='btn btn-primary ml-4 mb-0'>Next</button>
        </ControllerPageComponent>
      </SectionContainer>

      <ModalNewUser modalNewUser={modalNewUser} setModalNewUser={setModalNewUser} setUsers={setUsers} users={users} page={page} titleModal={titleModal} action={action} idUser={idUser} usersUpdate={usersUpdate}/>
      <ModalDeleteUser modalDeleteUser={modalDeleteUser} setModalDeleteUser={setModalDeleteUser} idUser={idUser} page={page} setUsers={setUsers} titleModal='Deletar usuário'/>
    </>
  )
}

export default SectionHome
