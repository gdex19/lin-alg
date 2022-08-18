// Making this to do a fun little use case of a very borderline heap, would be more efficient (and possible) to remake my Gauss-Jordan alg bu

export class StepHeap {
	constructor() {
		this.stack = [];
    this.queue = [];
	}

	static compareSteps(step1, step2) {
		if (step1.type === step2.type) {
			return step1.chrono < step2.chrono ? -1 : 1;
		} else if (step1.type === "multiply") {
			return 1;
		} else if (step2.type === "multiply") {
			return -1;
		} else {
			return step1.chrono < step2.chrono ? -1 : 1;
		}
	}

	percolateUp(ind) {
		let running = true;
		while (running) {
			let pInd = Math.ceil((ind - 1) / 2);
			if (pInd > 0) {
				if (
					this.constructor.compareSteps(
						this.steps[ind],
						this.steps[pInd]
					) === -1
				) {
					let temp = this.steps[pInd];
					this.steps[pInd] = this.steps[ind];
					this.steps[ind] = temp;
					ind = pInd;
				}
        else {
          running = false;
        }
			} else {
				running = false;
			}
		}
	}

	percolateDown(ind, size) {
		let running = true;
		while (running) {
			let lInd = ind * 2;
			let rInd = ind * 2 + 1;
			var less;

			if (lInd >= size) {
				running = false;
        break;
			} else if (rInd < size) {
				less =
					this.constructor.compareSteps(this.steps[lInd], this.steps[rInd]) === -1
						? lInd
						: rInd;
			} else {
				less = lInd;
			}
			if (this.constructor.compareSteps(this.steps[ind], this.steps[less]) === 1) {
				let temp = this.steps[less];
				this.steps[less] = this.steps[ind];
				this.steps[ind] = temp;
				ind = less;
			} else {
				running = false;
			}
		}
	}

	add(step) {
    step.chrono = this.steps.length;
		this.steps.push(step);
		this.percolateUp(this.steps.length - 1);
	}

	kindaPop(size) {
		let temp = this.steps[1];
		this.steps[1] = this.steps[size - 1];
		this.steps[size - 1] = temp;
		this.percolateDown(1, size - 1);
		return temp;
	}

	finalize() {
    let size = this.steps.length;
    while (size > 2) {
      this.kindaPop(size--);
    }
		this.steps.shift();
		return this.steps.reverse();
	}
}
