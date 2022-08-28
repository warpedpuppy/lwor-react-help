import './menu.scss'
import { Link } from 'react-router-dom';

export function Menu (props) {

	return (
		<nav className="menu-container">
			<Link to='/'>Home</Link>
			<Link to='/profile'>Profile</Link>
		</nav>
	)

}