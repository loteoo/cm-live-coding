import { BrowserRouter } from "react-router-dom";
import Header from '/src/components/core/Header'
import Router from '/src/components/core/Router'
import Footer from '/src/components/core/Footer'

const App = () => (
  <BrowserRouter>
    <Header />
    <main className="container">
      <Router />
    </main>
    <Footer />
  </BrowserRouter>
)

export default App