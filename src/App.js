import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Matrix from "./components/Matrix";

const App = () => {
	const state = {
		details: [],
	};

	const componentDidMount = () => {
		let data;

		axios
			.get("http://localhost:8000/personal/projects")
			.then((res) => {
				data = res.data;
				this.setState({
					details: data,
				});
			})
			.catch((err) => {});
	};

	return (
		<div>
			<Matrix />
		</div>
	);
};

export default App;
