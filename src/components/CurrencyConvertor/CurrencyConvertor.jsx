import React from 'react'
import Block from './Block'
import './styles.scss'

const CurrencyConvertor = () => {
	return (
		<div className="App">
			<Block value={0} currency="RUB" />
			<Block value={0} currency="USD" />
		</div>
	)
}

export default CurrencyConvertor
