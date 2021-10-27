import React, { useContext } from "react";
import { MyButton } from "../components/UI/button/MyButton";
import { MyInput } from "../components/UI/input/MyInput";
import { Authcontext } from "../context";

export const Login = () => {
	const { isAuth, setIsAuth } = useContext(Authcontext);
	const login = (event) => {
		event.preventDefault();
		setIsAuth(true)
		localStorage.setItem('auth', 'true');
	}
	return (
		<div>
			<h1>Page for Login</h1>
			<form onSubmit={login} action="">
				<MyInput type="text" placeholder="Text login" />
				<MyInput type="password" placeholder="Text password" />
				<MyButton>Enter</MyButton>
			</form>
		</div>

	);
}