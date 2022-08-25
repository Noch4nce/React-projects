import React, { useCallback, useEffect, useRef, useState } from 'react'
import Block from './Block'
import './styles.scss'
import { CURRENCY_EXCHANGE_API } from '../api/api'

const CurrencyConvertor = () => {
	const ratesRef = useRef({})

	const [fromCurrency, setFromCurrency] = useState('USD')
	const [toCurrency, setToCurrency] = useState('RUB')

	const [fromPrice, setFromPrice] = useState(1)
	const [toPrice, setToPrice] = useState(0)

	const onChangeFromPrice = useCallback(
		(targetValue) => {
			const price = targetValue / ratesRef.current[fromCurrency]
			const result = price * ratesRef.current[toCurrency]

			setToPrice(Number(result.toFixed(2)))
			setFromPrice(targetValue)
		},
		[fromCurrency, toCurrency]
	)

	useEffect(() => {
		fetch(CURRENCY_EXCHANGE_API)
			.then((data) => data.json())
			.then((result) => {
				ratesRef.current = result.rates
				// onChangeFromPrice(1)
				onChangeFromPrice(fromPrice)
			})
			.catch((err) => {
				console.warn(err)
				alert('Response error')
			})
		// eslint-disable-next-line
	}, [onChangeFromPrice])

	// const onChangeToPrice = useCallback(
	// 	(targetValue) => {
	// 		const price =
	// 			ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]
	// 		const result = price * targetValue
	//
	// 		setFromPrice(result.toFixed(2))
	// 		setToPrice(targetValue)
	// 	},
	// 	[fromCurrency, toCurrency]
	// )

	// const onChangeFromPrice = (targetValue) => {
	// 	const price = targetValue / ratesRef.current[fromCurrency]
	// 	const result = price * ratesRef.current[toCurrency]
	//
	// 	setToPrice(Number(result.toFixed(3)))
	// 	setFromPrice(targetValue)
	// }

	const onChangeToPrice = (targetValue) => {
		const price =
			ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]
		const result = price * targetValue

		setFromPrice(Number(result.toFixed(2)))
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

	// useEffect(() => {
	// 	onChangeFromPrice(fromPrice)
	// }, [onChangeFromPrice, fromCurrency, fromPrice])
	// //
	// useEffect(() => {
	// 	onChangeToPrice(toPrice)
	// }, [onChangeToPrice, toCurrency, toPrice])

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
