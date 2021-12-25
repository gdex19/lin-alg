import { StepHeap } from "./StepHeap";

var Fraction = require("fractional").Fraction;

export const cancelPivot = (row1, row2, ind, multi) => {
	let len = row1.length;
	for (let i = ind; i < len; i++) {
		row2[i] = row2[i] - row1[i] * multi;
	}
	return 0;
};

export const multiRow = (row, ind, multi) => {
	let len = row.length;
	for (let i = ind; i < len; i++) {
		row[i] *= multi;
	}
	return 0;
};

export const createAugment = (matrix) => {
	let augmented = new Array(matrix.length);
	matrix.map((row, ind) => {
		augmented[ind] = new Array(matrix.length);
		for (let i = 0; i < row.length; i++) {
			augmented[ind][i] = new Fraction(row[i]);
		}
	});
	let size = augmented[0].length;
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			augmented[i].push(i === j ? new Fraction(1) : new Fraction(0));
		}
	}
	return augmented;
};

export const giveSteps = (matrix) => {
	let copy = matrix.map((row) => [...row]);
	let currCol = 0;
	let pivot = 0;
	let steps = new StepHeap();

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
					steps.add({
						type: "switch",
						row1: i,
						row2: pivot,
						multiplier: null,
						ind: null,
					});
				}
			}
		}
		if (found === true) {
			for (let i = pivot + 1; i < matrix.length; i++) {
				let multi = copy[i][currCol] / copy[pivot][currCol];
				let multiFrac = new Fraction(
					copy[i][currCol],
					copy[pivot][currCol]
				);
				if (multi !== 0) {
					cancelPivot(copy[pivot], copy[i], currCol, multi);
					steps.add({
						type: "cancel",
						row1: pivot,
						row2: i,
						multiplier: multiFrac,
						ind: currCol,
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
			let multiFrac = new Fraction(copy[j][i], copy[pivot][i]);
			if (multi !== 0) {
				cancelPivot(copy[pivot], copy[j], i, multi);
				steps.add({
					type: "cancel",
					row1: pivot,
					row2: j,
					multiplier: multiFrac,
					ind: i,
				});
			}
		}
		if (copy[pivot][i] !== 1) {
			let multi = 1 / copy[pivot][i];
			let multiFrac = new Fraction(1, copy[pivot][i]);
			multiRow(copy[pivot], i, multi);
			steps.add({
				type: "multiply",
				row1: pivot,
				row2: null,
				multiplier: multiFrac,
				ind: i,
			});
		}
	}

	if (copy[0][0] !== 0 && copy[0][0] !== 1) {
		let multi = 1 / copy[0][0];
		let multiFrac = new Fraction(1, copy[0][0]);
		multiRow(copy[0], 0, multi);
		steps.add({
			type: "multiply",
			row1: 0,
			row2: null,
			multiplier: multiFrac,
			ind: 0,
		});
	}
	return steps.finalize();
};
