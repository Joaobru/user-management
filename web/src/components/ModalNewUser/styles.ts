import styled from 'styled-components'

export const FormModal = styled.div`
  display: flex;
  flex-direction: column;
`

export const GroupInputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

export const GroupInputFormCpf = styled.div`
  display: flex;
  flex-direction: column;
  width:100%;

  @media(min-width: 600px) {
    width: 45%
  }  
`

export const TwoInputForm = styled.div`
  display: flex;
  flex-direction: column;

  @media(min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
    width:100%;
  }  
`
export const GroupInputFormFromTwoModal = styled(GroupInputForm)`
  width:100%;

  @media(min-width: 600px) {
    width:45%;
  }  
`
