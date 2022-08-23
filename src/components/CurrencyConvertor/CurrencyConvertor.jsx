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
		const price = targetValue / ratesData[fromCurrency]
		const result = (price * ratesData[toCurrency]).toFixed(4)

		setToPrice(result)
		setFromPrice(targetValue)
	}

	const onChangeToPrice = (targetValue) => {
		const price = ratesData[fromCurrency] / ratesData[toCurrency]
		const result = (price * targetValue).toFixed(4)

		setFromPrice(result)
		setToPrice(targetValue)
	}

	const onChangeFromCurrency = (cur) => {
		const price = ratesData[toCurrency] / ratesData[cur]
		const result = (price * fromPrice).toFixed(4)

		setToPrice(result)
		setFromCurrency(cur)
	}

	const onChangeToCurrency = (cur) => {
		const price = ratesData[cur] / ratesData[fromCurrency]
		const result = (price * fromPrice).toFixed(4)

		setToPrice(result)
		setToCurrency(cur)
	}

	return (
		<div className="App">
			<Block
				value={fromPrice}
				currency={fromCurrency}
				onChangeCurrency={onChangeFromCurrency}
				onChangeValue={onChangeFromPrice}
			/>

			<Block
				value={toPrice}
				currency={toCurrency}
				onChangeCurrency={onChangeToCurrency}
				onChangeValue={onChangeToPrice}
			/>
		</div>
	)
}

export default CurrencyConvertor
