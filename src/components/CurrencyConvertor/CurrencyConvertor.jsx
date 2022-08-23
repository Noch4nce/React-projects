import React, { useEffect, useRef, useState } from 'react'
import Block from './Block'
import './styles.scss'
import { CURRENCY_EXCHANGE_API } from '../api/api'

const CurrencyConvertor = () => {
	// const [ratesData, setRatesData] = useState({})
	const ratesRef = useRef({})

	const [fromCurrency, setFromCurrency] = useState('USD')
	const [toCurrency, setToCurrency] = useState('RUB')

	const [fromPrice, setFromPrice] = useState(1)
	const [toPrice, setToPrice] = useState(0)

	useEffect(() => {
		fetch(CURRENCY_EXCHANGE_API)
			.then((data) => data.json())
			.then((result) => {
				// setRatesData(result.rates)
				ratesRef.current = result.rates
				onChangeFromPrice(1)
			})
			.catch((err) => {
				console.warn(err)
				alert('Response error')
			})
	}, [])

	const onChangeFromPrice = (targetValue) => {
		const price = targetValue / ratesRef.current[fromCurrency]
		const result = price * ratesRef.current[toCurrency]

		setToPrice(Number(result.toFixed(3)))
		setFromPrice(targetValue)
	}

	const onChangeToPrice = (targetValue) => {
		const price =
			ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]
		const result = price * targetValue

		setFromPrice(Number(result.toFixed(3)))
		setToPrice(targetValue)
	}

	// const onChangeFromCurrency = (cur) => {
	// 	const price = ratesData[toCurrency] / ratesData[cur]
	// 	const result = (price * fromPrice).toFixed(4)
	//
	// 	setToPrice(result)
	// 	setFromCurrency(cur)
	// }
	//
	// const onChangeToCurrency = (cur) => {
	// 	const price = ratesData[cur] / ratesData[fromCurrency]
	// 	const result = (price * fromPrice).toFixed(4)
	//
	// 	setToPrice(result)
	// 	setToCurrency(cur)
	// }

	useEffect(() => {
		onChangeFromPrice(fromPrice)
	}, [fromCurrency])

	useEffect(() => {
		onChangeToPrice(toPrice)
	}, [toCurrency])

	console.log(fromPrice, 'fromPrice')
	console.log(toPrice, 'toPrice')

	return (
		<div className="App">
			<Block
				value={fromPrice}
				currency={fromCurrency}
				// onChangeCurrency={onChangeFromCurrency}
				onChangeCurrency={setFromCurrency}
				onChangeValue={onChangeFromPrice}
			/>

			<Block
				value={toPrice}
				currency={toCurrency}
				// onChangeCurrency={onChangeToCurrency}
				onChangeCurrency={setToCurrency}
				onChangeValue={onChangeToPrice}
			/>
		</div>
	)
}

export default CurrencyConvertor
