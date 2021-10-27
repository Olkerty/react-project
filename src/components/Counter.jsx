import React, { useState } from "react";

export const Counter = () => {
	const [counter, setCount] = useState(0);
	function increment() {
		setCount(counter + 1);
	}
	function decrement() {
		setCount(counter - 1);
	}
	return (
		<div>
			<h1>{counter}</h1>
			<button onClick={decrement}> Decrement</button>
			<button onClick={increment}> Increment</button>

		</div>
	);

};