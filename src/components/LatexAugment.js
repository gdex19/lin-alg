import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { useEffect, useState } from "react";
import { cancelPivot, multiRow } from "../alghelpers";
import { renderMatrixAugment, renderLatexMatrix } from "../latexhelpers";

const performSwitch = (matrix, action) => {
	let temp = matrix[action.row1]
	matrix[action.row1] = matrix[action.row2];
  matrix[action.row2] = temp;
};

const fracMultiply = (row, ind, multi) => {
	let len = row.length;
	for (let i = ind; i < len; i++) {
		row[i] = row[i].multiply(multi);
	}
};

const cancelRows = (row1, row2, ind, multi) => {
	let len = row1.length;
	for (let i = ind; i < len; i++) {
		row2[i] = row2[i].subtract(row1[i].multiply(multi));
	}
};

const LatexAugment = ({ matrix, steps }) => {
	const [step, setStep] = useState(-1);
	const [latexMatrix, setLatexMatrix] = useState(
		renderMatrixAugment(matrix)
	);

	useEffect(() => {
		if (0 <= step && step < steps.length) {
			let action = steps[step];
			if (action.type === "switch") {
				performSwitch(matrix, action);
			} else if (action.type === "multiply") {
				fracMultiply(matrix[action.row1], action.ind, action.multiplier);
        console.log(matrix);
			} else {
				cancelRows(
					matrix[action.row1],
					matrix[action.row2],
					action.ind,
					action.multiplier
				);
			}
			setLatexMatrix(renderMatrixAugment(matrix));
		}
	}, [step]);
	return (
		<div>
			<Latex>{latexMatrix}</Latex>
			<button
				onClick={() => {
					setStep(step + 1);
				}}
			>
				Next Step
			</button>
		</div>
	);
};

export default LatexAugment;