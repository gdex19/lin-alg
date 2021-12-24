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

const cancelPivot = (row1, row2, ind, len) => {
	let multi = row2[ind] / row1[ind];
	if (multi !== 0) {
		for (let i = ind; i < len; i++) {
			row2[i] = row2[i] - row1[i] * multi;
		}
	}
  return 0;
};

export const giveSteps = (matrix) => {
	let copy = matrix.map((row) => [...row]);
	let currCol = 0;
  let pivot = 0;

	while (currCol < matrix.length) {
		let found = false;
		for (let i = pivot; i < matrix.length; i++) {
			if (copy[i][currCol] !== 0) {
				found = true;
				if (i === pivot) {
					break;
				} else {
					let temp = copy[pivot];
					copy[pivot] = copy[i];
					copy[i] = temp;
				}
			}
		}
		if (found === true) {
			for (let i = pivot + 1; i < matrix.length; i++) {
				cancelPivot(copy[pivot], copy[i], currCol, copy.length);
			}
      pivot++;
		}
    currCol++;
	}
  console.log(copy);
	return 0;
};
