import React, { useState } from 'react'
import './styles.scss'

const Counter = () => {
	const [countNumber, setCountNumber] = useState(0)

	const plusNumber = () => {
		setCountNumber(countNumber + 1)
	}

	const minusNumber = () => {
		if (countNumber === 0) {
			return
		}
		setCountNumber(countNumber - 1)
	}

	return (
		<div className="main">
			<h2>Counter:</h2>
			<h1>{countNumber}</h1>
			<div>
				<button onClick={minusNumber} className="minus">
					- Minus
				</button>
				<button onClick={plusNumber} className="plus">
					Plus +
				</button>
			</div>
		</div>
	)
}

export default Counter
