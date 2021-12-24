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

const cancelPivot = (row1, row2, ind, len, multi) => {
	if (multi !== 0) {
		for (let i = ind; i < len; i++) {
			row2[i] = row2[i] - row1[i] * multi;
		}
	}
	return 0;
};

const multiRow = (row, ind, len) => {
	for (let i = ind; i < len; i++) {
		row[i] /= row[ind];
	}
	return 0;
};

export const giveSteps = (matrix) => {
	let copy = matrix.map((row) => [...row]);
	let currCol = 0;
	let pivot = 0;
	let steps = [];

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
					steps.push({
						type: "switch",
						row1: i,
						row2: pivot,
						multiplier: null,
					});
				}
			}
		}
		if (found === true) {
			for (let i = pivot + 1; i < matrix.length; i++) {
				let multi = copy[i][currCol] / copy[pivot][currCol];
				if (multi !== 0) {
					cancelPivot(
						copy[pivot],
						copy[i],
						currCol,
						copy.length,
						multi
					);
					steps.push({
						type: "cancel",
						row1: pivot,
						row2: i,
						multiplier: multi,
					});
				}
			}
			pivot++;
		}
		currCol++;
	}
	pivot--;

	for (; pivot > 0; pivot--) {
		let i = pivot;
		while (copy[pivot][i] === 0) {
			i++;
		}
		for (let j = pivot - 1; j >= 0; j--) {
			let multi = copy[j][i] / copy[pivot][i];
			cancelPivot(copy[pivot], copy[j], i, copy.length, multi);
			steps.push({
				type: "cancel",
				row1: pivot,
				row2: j,
				multiplier: multi,
			});
		}
		if (copy[pivot][i] !== 1) {
			multiRow(copy[pivot], i, copy.length);
			steps.push({
				type: "multiply",
				row1: pivot,
				row2: null,
				multiplier: 1 / copy[pivot][i],
			});
		}
	}

	if (copy[0][0] !== 0 && copy[0][0] !== 1) {
		multiRow(copy[0], 0, copy.length);
		steps.push({
			type: "multiply",
			row1: 0,
			row2: null,
			multiplier: 1 / copy[0][0],
		});
	}

	console.log(copy);
	console.log(steps);
	return 0;
};
