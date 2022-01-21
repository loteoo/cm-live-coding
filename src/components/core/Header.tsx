import { NavLink } from "react-router-dom"

const Header = () => (
  <header className="container">
    <hgroup>
      <h1>App title</h1>
      <h2>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis assumenda ipsam sit.</h2>
    </hgroup>
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/secondary-page">Second page</NavLink></li>
      </ul>
    </nav>
  </header>
)

export default Header