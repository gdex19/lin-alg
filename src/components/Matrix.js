import InputSize from "./InputSize";
import MatrixInput from "./MatrixInput";
import { useState } from "react";
import LatexAugment from "./LatexAugment";
import { giveSteps, createAugment } from "../alghelpers";

const Matrix = () => {
	const [matrixSize, setMatrixSize] = useState(2);
	const [matrix, setMatrix] = useState([
		[0, 0],
		[0, 0],
	]);
	const [sized, setSized] = useState(false);
	const [inputted, setInputted] = useState(false);

	return (
		<div>
			{!inputted ? (
				!sized ? (
					<InputSize
						setMatrixSize={(input) => {
							setMatrixSize(input);
							setSized(true);
						}}
					/>
				) : (
					<MatrixInput
						matrixSize={matrixSize}
						setMatrix={(input) => {
							setMatrix(input);
							setInputted(true);
						}}
					/>
				)
			) : (
				<LatexAugment
					steps={giveSteps(matrix)}
					matrix={createAugment(matrix)}
				/>
			)}
		</div>
	);
};

export default Matrix;
