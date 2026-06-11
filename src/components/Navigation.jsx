import { NavLink } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  return (
    <nav className="main-navigation">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        Home
      </NavLink>
      <NavLink to="/saved-news" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
        Saved News
      </NavLink>
    </nav>
  )
}
