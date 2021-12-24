import React from "react";
import MatrixRow from "./MatrixRow"
import { giveSteps } from '../helpers.js'

const MatrixInput = ({ matrixSize, setMatrix }) => {
	let matrix = Array(matrixSize);
	for (let i = 0; i < matrixSize; i++) {
		matrix[i] = new Array(matrixSize).fill(0);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		let count = 0;
		for (let i = 0; i < matrixSize; i++) {
			for (let j = 0; j < matrixSize; j++) {
				// If the floating point number cannot be parsed, we set 0 for this value
				matrix[i][j] = !isNaN(parseFloat(event.target[count].value))
					? parseFloat(event.target[count].value)
					: 0;
				count += 1;
			}
		}
		setMatrix(matrix);
    console.log(matrix);
    giveSteps(matrix);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{matrix.map((row, indexRow) => {
					return (
						<MatrixRow key={indexRow}>
              {row.map((item, indexColumn = 1) => {
								return (
									<input
										key={indexRow + " " + indexColumn}
										type="text"
										defaultValue={0}
										name={indexRow + "," + indexColumn}
                    size="5"
									/>
								);
							})}
						</MatrixRow>
					);
				})}
				<button>{"Save A"}</button>
			</form>
		</div>
	);
};

export default MatrixInput;
