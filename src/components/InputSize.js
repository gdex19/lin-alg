const InputSize = ({ setMatrixSize }) => {
	return (
		<div>
			<input
				type="number"
				defaultValue={2}
				onChange={(e) => {
					console.log(setMatrixSize);
					const size = parseInt(e.target.value);
					// if we only want matrix of size between 2 and 8
					if (2 <= size && size <= 8) {
						setMatrixSize(size);
					}
				}}
			/>
		</div>
	);
};

export default InputSize;
