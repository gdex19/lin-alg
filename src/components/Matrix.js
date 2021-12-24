import InputSize from "./InputSize";
import MatrixInput from "./MatrixInput";
import { useState, useEffect } from "react";
import {renderLatexMatrix, giveSteps } from "../helpers";
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

const Matrix = () => {
	const [matrixSize, setMatrixSize] = useState(2);
	const [matrix, setMatrix] = useState([
		[0, 0],
		[0, 0],
	]);
	const [latexMatrix, setLatexMatrix] = useState(
		"$\\begin{Bmatrix} 0 & 0\\\\0 & 0\\end{Bmatrix}$"
	);
  const [inputted, setInputted] = useState(false);

	useEffect(() => {
		setLatexMatrix(renderLatexMatrix(matrix));
		// + do any action you want on the matrix
	}, [matrix]);

	return (
		<div>
      {!inputted ?
        <InputSize
          setMatrixSize={(input) => {
            setMatrixSize(input);
            setInputted(true);
          }}
        /> :
			<MatrixInput
				matrixSize={matrixSize}
				setMatrix={(input) => {
					setMatrix(input);
				}}
			/>
      }
			<Latex>{ latexMatrix }</Latex>
      </div>
	);
};

export default Matrix;
