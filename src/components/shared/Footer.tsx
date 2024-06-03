const Footer = () => {
  return (
    <footer className="text-gray-700 py-8 bg-gray-100 w-full">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between max-w-6xl">
        <div className="footer-column mb-4 sm:mb-0">
          <p className="text-lg font-semibold mb-2">Sobre nós</p>
          <p className="text-sm">Descubra um futuro mais verde com a VemVai, especialista em reciclagem inovadora e sustentável.</p>
        </div>
       
        <div className="footer-column">
          <p className="text-lg font-semibold mb-2">Contato</p>
          <p className="text-sm">Email: vemvai@oul.com.br</p>
          <p className="text-sm">Telefone: +11 9807-8970</p>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm  font-semibold text-gray-600">© 2024 Todos os direitos reservados</p>
      </div>
    </footer>
  )
}

export default Footer