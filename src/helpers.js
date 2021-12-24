const renderLatexMatrix = (matrix) => {
	return (
		"$\\begin{pmatrix}" +
		matrix
			.map((row, index) => {
        console.log(index)
				if (index === matrix.length - 1) return row.join(" & ") + "";
				else return row.join(" & ") + "\\\\";
			})
			.join("") +
		"\\end{pmatrix}$"
	);
};

export default renderLatexMatrix;
