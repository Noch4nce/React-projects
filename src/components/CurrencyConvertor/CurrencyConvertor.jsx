import React, { useEffect, useState } from 'react'
import Block from './Block'
import './styles.scss'
import { CURRENCY_EXCHANGE_API } from '../api/api'

const CurrencyConvertor = () => {
	const [ratesData, setRatesData] = useState({})

	const [fromCurrency, setFromCurrency] = useState('RUB')
	const [toCurrency, setToCurrency] = useState('USD')

	const [fromPrice, setFromPrice] = useState(0)
	const [toPrice, setToPrice] = useState(0)

	useEffect(() => {
		fetch(CURRENCY_EXCHANGE_API)
			.then((data) => data.json())
			.then((result) => setRatesData(result.rates))
			.catch((err) => {
				console.warn(err)
				alert('Response error')
			})
	}, [])

	const onChangeFromPrice = (targetValue) => {
		const price = ratesData[fromCurrency] / ratesData[toCurrency]
		const result = (price * targetValue).toFixed(4)

		setToPrice(result)
		setFromPrice(targetValue)
	}

	const onChangeToPrice = (targetValue) => {
		const price = targetValue / ratesData[toCurrency]
		const result = (price * ratesData[fromCurrency]).toFixed(4)

		setFromPrice(result)
		setToPrice(targetValue)
	}

	return (
		<div className="App">
			<Block
				value={fromPrice}
				currency={fromCurrency}
				onChangeCurrency={setFromCurrency}
				onChangeValue={onChangeFromPrice}
			/>

			<Block
				value={toPrice}
				currency={toCurrency}
				onChangeCurrency={setToCurrency}
				onChangeValue={onChangeToPrice}
			/>
		</div>
	)
}

export default CurrencyConvertor
