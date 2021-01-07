import React from 'react'

import { HeaderContainer } from './styles'
import rocketImg from '../../assets/icons/rocket.png'

function HeaderHome () {
  return (
    <HeaderContainer>
      <img src={rocketImg} alt="Rocket Icon"/>
      <h2>SoftWrap-Challenge</h2>
    </HeaderContainer>
  )
}

export default HeaderHome
