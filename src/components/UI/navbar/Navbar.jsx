import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import { Authcontext } from "../../../context";
import { MyButton } from "../button/MyButton";
export const Navbar = () => {
	const { isAuth, setIsAuth } = useContext(Authcontext);
	const logOut = () => {
		setIsAuth(false);
		localStorage.removeItem('auth');

	}
	return (
		<div className="navbar">
			<MyButton onClick={logOut}>
				exit
			</MyButton>
			<div className="navbar__link">
				<Link to='/about'>About us</Link>
				<Link to='/posts'>Posts</Link>
			</div>

		</div>
	);
}