import React, { useState, useEffect } from 'react'

import { SectionContainer, PageComponent, ControllerPageComponent, LoadingCustomize } from './styles'

import ModalNewUser from '../../components/ModalNewUser'
import ModalDeleteUser from '../../components/ModalDeleteUser'
import TableComponent from '../../components/TableComponent'
import { getUsers } from '../../services/users/getUsers'
import { CircularProgress } from '@material-ui/core'

function SectionHome () {
  const [loading, setLoading] = useState(true)

  const [modalNewUser, setModalNewUser] = useState(false)
  const [modalDeleteUser, setModalDeleteUser] = useState(false)

  const [titleModal, setTitleModal] = useState('')
  const [action, setAction] = useState('')

  const [users, setUsers] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [usersUpdate, setUsersUpdate] = useState(0)

  const [page, setPage] = useState(1)
  const [idUser, setIdUser] = useState(0)

  useEffect(() => {
    get(page, setTotalPage, setUsers, setPage, setLoading)
  }, [page])

  return (
    <>

      { loading
        ? <LoadingCustomize><CircularProgress size={200}/></LoadingCustomize>
        : <>
        <SectionContainer>
          <button onClick={() => { setModalNewUser(true); setTitleModal('Adicionar novo usuário'); setAction('AddUser') }} type='button' className='btn btn-primary' >Adicionar novo usuário</button>
          <TableComponent setTitleModal={setTitleModal} setModalNewUser={setModalNewUser} users={users} setModalDeleteUser={setModalDeleteUser} setIdUser={setIdUser} setAction={setAction} setUsersUpdate={setUsersUpdate}/>
          <ControllerPageComponent>
            <button disabled={page === 1} onClick={() => { setPage(page - 1) }} type='button' className='btn btn-primary mb-0'>Prev</button>
            <PageComponent>
              <h5>
                { page }
              </h5>
            </PageComponent>
            <button disabled={totalPage <= page} onClick={() => { setPage(page + 1) }} type='button' className='btn btn-primary ml-4 mb-0'>Next</button>
          </ControllerPageComponent>
        </SectionContainer>

        <ModalNewUser modalNewUser={modalNewUser} setModalNewUser={setModalNewUser} setUsers={setUsers} users={users} page={page} titleModal={titleModal} action={action} idUser={idUser} usersUpdate={usersUpdate} setPage={setPage} setTotalPage={setTotalPage} setLoading={setLoading}/>
        <ModalDeleteUser modalDeleteUser={modalDeleteUser} setModalDeleteUser={setModalDeleteUser} idUser={idUser} page={page} setUsers={setUsers} setTotalPage={setTotalPage} setPage={setPage} titleModal='Deletar usuário' setLoading={setLoading}/>
      </>

      }
    </>
  )
}
export const get = async (page:number, setTotalPage: Function, setUsers: Function, setPage:Function, setLoading: Function) => {
  const result = await getUsers(page)
  page > Math.ceil(result.totalPages) && page !== 1 ? setPage(page - 1) : setPage(page)
  setTotalPage(result.totalPages)
  setUsers(result.data)

  setLoading(false)
}

export default SectionHome
