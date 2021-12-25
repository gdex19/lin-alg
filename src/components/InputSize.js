const InputSize = ({ setMatrixSize }) => {

  const clickSet = (event) => {
    event.preventDefault();
    const size = parseInt(event.target.form[0].value);
    if (2 <= size && size <= 8) {
      setMatrixSize(size);
    }
  }

	return (
		<div>
			<form>
        <h2>Enter Matrix Size</h2>
				<input type="number" min="2" max="8" step="1" />
        <input type="button" value="Set Matrix Size" onClick={clickSet}/>
			</form>
		</div>
	);
};

export default InputSize;
