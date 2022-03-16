import React from 'react'
import LogoSVG from '../../assets/imgs/logo-white.svg'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const MainLogo: React.FC<Props> = (props: Props) => {
  return (
    <img src={LogoSVG} width="128"/>
  )
}

export default MainLogo
