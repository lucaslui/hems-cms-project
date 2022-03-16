import React from 'react'
import Styles from './footer-styles.scss'

const Footer: React.FC = () => {
  return (
    <footer className={Styles.footer}>
      <span>© {new Date().getFullYear()} Copel. Todos os direitos reservados.</span>
    </footer>
  )
}

export default Footer
