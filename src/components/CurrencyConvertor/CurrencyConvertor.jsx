import React, { useEffect, useState } from 'react'
import Block from './Block'
import './styles.scss'
import { CURRENCY_EXCHANGE_API } from '../api/api'

const CurrencyConvertor = () => {
	const [ratesData, setRatesData] = useState({})
	const [fromCurrency, setFromCurrency] = useState('RUB')
	const [toCurrency, setToCurrency] = useState('USD')

	useEffect(() => {
		fetch(CURRENCY_EXCHANGE_API)
			.then((data) => data.json())
			.then((result) => setRatesData(result.rates))
			.catch((err) => {
				console.warn(err)
				alert('Response error')
			})
	}, [])

	return (
		<div className="App">
			<Block
				value={0}
				currency={fromCurrency}
				onChangeCurrency={setFromCurrency}
			/>
			<Block
				value={0}
				currency={toCurrency}
				onChangeCurrency={setToCurrency}
			/>
		</div>
	)
}

export default CurrencyConvertor
