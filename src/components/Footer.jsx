import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer">
      &copy; {currentYear} CodeCraft Labs Intranet
    </footer>
  )
}

export default Footer;