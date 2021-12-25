var Fraction = require("fractional").Fraction;

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

export const renderMatrixAugment = (matrix) => {
	return (
		"$\\begin{Bmatrix}" +
		matrix
			.map((row, i) => {
				return (
					row.reduce((p, c, ind) => {
						if (typeof p !== "string") {
							if (p.denominator === 1 || p.numerator === 0) {
								p = p.numerator;
							} else {
								p =
									"\\frac{" +
									p.numerator +
									"}{" +
									p.denominator +
									"}";
							}
						}
						if (c.denominator === 1 || c.numerator === 0) {
              c = c.numerator;
						}
            else {
							c =
								"\\frac{" +
								c.numerator +
								"}{" +
								c.denominator +
								"}";
						}
						return (
							p +
							(ind === matrix[0].length / 2 ? " &\\bigm|" : "") +
							" & " +
							c
						);
					}) + (i === matrix.length - 1 ? "" : "\\\\[6pt]")
				);
			})
			.join("") +
		"\\end{Bmatrix}$"
	);
};
