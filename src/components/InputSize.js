const InputSize = ({ setMatrixSize }) => {
	return (
		<div>
			<form>
        <h2>Enter Matrix Size</h2>
				<input type="number" min="2" max="8" step="1" />
        <input type="button" value="Set Matrix Size" onClick={(e) => {
					const size = parseInt(e.target.form[0].value);
					// if we only want matrix of size between 2 and 8
					if (2 <= size && size <= 8) {
						setMatrixSize(size);
					}
				}}/>
			</form>
		</div>
	);
};

export default InputSize;
