import React from 'react'
import LogoSVG from '../../assets/imgs/logo.svg'

type Props = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const Logo: React.FC<Props> = (props: Props) => {
  return (
    <img src={LogoSVG} width="200"/>
  )
}

export default Logo
