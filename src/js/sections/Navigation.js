import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import Login from './Login/Login'
// import Register from './Register/Register'

/**
 * Navigation
 */

class Navigation extends React.Component {
	constructor(props) {
		super(props)
		this.showLogin = this.showLogin.bind(this)
		this.showRegister = this.showRegister.bind(this)
	}

	showLogin() {
		this.props.setDropdown('login')
	}

	showRegister() {
		this.props.setDropdown('register')
	}

	renderUserMenu() {
		if (this.props.user === false) {
			return (
				<div className="nav__group">
					<h3 className="nav__item"><button onClick={this.showLogin}>Login</button></h3>
					<h3 className="nav__item"><button onClick={this.showRegister}>Sign Up</button></h3>
				</div>
			)
		}
		if (this.props.user) {
			return (
				<div className="nav__group">
					<h3 className="nav__item nav__item--username">
						<Link to="/dashboard">Hi, {this.props.user.FirstName}!</Link>
					</h3>
					<h3 className="nav__item nav__item--secondary"><button onClick={this.props.logoutUser}>Log Out</button></h3>
				</div>
			)
		}
		return null
	}

	render() {
		return (
			<nav>
				<div className="nav__group">
					<div className="nav__item nav__item--logo"><Link to="/"><img src="/images/hipline-logo.png" alt="Hipline" /></Link></div>
					<h4 className="nav__item"><Link to="/classes">Classes</Link></h4>
					<h4 className="nav__item"><Link to="/community">Community</Link></h4>
					<h4 className="nav__item"><Link to="/about">About</Link></h4>
					<h4 className="nav__item"><a target="_blank" rel="noopener noreferrer" href="https://clients.mindbodyonline.com/classic/mainclass?studioid=4561">Schedule</a></h4>
				</div>
				{/* {this.renderUserMenu()}
				<Login
					setDropdown={this.props.setDropdown}
					open={this.props.dropdown === 'login'}
					loginUser={this.props.loginUser}
					fieldConfig={this.props.registrationFields}
				/>
				<Register
					setDropdown={this.props.setDropdown}
					open={this.props.dropdown === 'register'}
					loginUser={this.props.loginUser}
					fieldConfig={this.props.registrationFields}
					liabilityText={this.props.liabilityText}
				/> */}
			</nav>
		)
	}
}

Navigation.propTypes = {
	setDropdown: PropTypes.func.isRequired,
}

Navigation.defaultProps = {
	// title: 'My Title'
}

export default Navigation
