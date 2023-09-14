import { FC } from 'react'

interface FooterProps {
  children: React.ReactNode
}

const Footer: FC<FooterProps> = ({ children }) => {
  return <footer>{children}</footer>
}

export default Footer
