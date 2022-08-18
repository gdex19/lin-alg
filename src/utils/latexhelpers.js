import { fracToString, convertToRoman } from "./texthelpers";

export const renderLatexMatrix = (matrix) => {
	return (
		"$\\begin{Bmatrix}" +
		matrix
			.map((row, index) => {
				if (index === matrix.length - 1) return row.join(" & ") + "";
				else return row.join(" & ") + "\\\\";
			})
			.join("") +
		"\\end{Bmatrix}$"
	);
};

const convertStep = (step, size) => {
	let conversion = new Array(size).fill("\\phantom{III\\Rightarrow}");
	if (step === null) {
		return conversion;
	}
	if (step.type === "multiply") {
		conversion[step.row1] = "\\times" + fracToString(step.multiplier);
	} else if (step.type === "switch") {
		conversion[step.row1] = convertToRoman(step.row2 + 1) + "\\Rightarrow ";
		conversion[step.row2] = convertToRoman(step.row1 + 1) + "\\Rightarrow ";
	} else {
    let multi = fracToString(step.multiplier);
    let add = false;
    if (multi[0] === "-") {
      multi = multi.substring(1);
      add = true;
    }
		conversion[step.row2] = (add ? "+ " : "- ") + (multi === "1" ? convertToRoman(step.row1 + 1) : multi + " \\times " + convertToRoman(step.row1 + 1));
	}
	return conversion;
};

export const renderSteps = (step, size) => {
	return (
		"$\\begin{matrix}" +
		convertStep(step, size).join("\\\\[6pt]") +
		"\\end{matrix}$"
	);
};

export const renderMatrixAugment = (matrix) => {
	return (
		"$\\begin{Bmatrix}" +
		matrix
			.map((row, i) => {
				return (
					row.reduce((p, c, ind) => {
						return (
							fracToString(p) +
							(ind === matrix[0].length / 2 ? " &\\bigm|" : "") +
							" & " +
							fracToString(c)
						);
					}) + (i === matrix.length - 1 ? "" : "\\\\[6pt]")
				);
			})
			.join("") +
		"\\end{Bmatrix}$"
	);
};
