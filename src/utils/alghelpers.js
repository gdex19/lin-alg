const createStep = (type, from, to, multi=null, col=null) => {
  return {
    type: type,
    from: from,
    to: to,
    multi: multi,
    col: col,
  }
}

const findPivot = (matrix, j) => {
  for (let i = j; i < matrix.length; i++) {
    if (matrix[i][j] != 0) {
      return i;
    }
  }
  return -1;
}

export const swapRows = (matrix, step) => {
  let temp = matrix[step.to];
  matrix[step.to] = matrix[step.from];
  matrix[step.from] = temp;
}

export const cancelPivot = (matrix, step) => {
	for (let i = step.col; i < matrix.length; i++) {
		matrix[step.to][i] = matrix[step.to][i] - matrix[step.from][i] * step.multi;
	}
};

export const multiRow = (matrix, step) => {
	for (let i = step.col; i < matrix.length; i++) { 
    matrix[step.to][i] *= step.multi;
	}
};

export const createAugment = (matrix) => {
  let len = matrix[0].length;
	let augmented = matrix.map((row, i) => {
		for (let j = 0; j < len; j++) {
      row.push((j === i) ? 1 : 0);
    }
    return row;
	});
	return augmented;
};

export const giveSteps = (matrix) => {
	let copy = matrix.map((row) => [...row]);
  let rank = 0;
  let steps = []
  for (let i = 0; i < matrix.length; i++) {
    let pivot = findPivot(copy, i);
    if (pivot == -1) {
      continue;
    }
    else {
      if (pivot != rank) {
        let step = createStep("switch", pivot, rank);
        swapRows(copy, step);
        steps.push(step);
      }
      for (let j = rank + 1; j < matrix.length; j++) {
        let multi = copy[j][i] / copy[rank][i];
        if (multi != 0) {
          let step = createStep("cancel", rank, j, multi, i);
          cancelPivot(copy, step);
          steps.push(step);
        }
      }
      let step = createStep("multiply", rank, rank, 1 / copy[rank][i], i);
      multiRow(copy, step);
      rank++;
    }
    
  }
  for (let i = rank - 1; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      let multi = copy[j][i];
      if (multi != 0) {
        let step = createStep("cancel", i, j, multi);
        cancelPivot(copy, step);
      }
    }
  }
  
  return copy;
};
