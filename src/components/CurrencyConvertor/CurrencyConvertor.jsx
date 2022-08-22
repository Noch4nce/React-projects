import React, { useEffect, useState } from 'react'
import Block from './Block'
import './styles.scss'
import { CURRENCY_EXCHANGE_API } from '../api/api'

const CurrencyConvertor = () => {
	const [ratesData, setRatesData] = useState({})

	useEffect(() => {
		fetch(CURRENCY_EXCHANGE_API)
			.then((data) => data.json())
			.then((result) => setRatesData(result.rates))
			.catch((err) => {
				console.warn(err)
				alert('Response error')
			})
	}, [])

	console.log(ratesData, 'ratesData')

	return (
		<div className="App">
			<Block value={0} currency="RUB" />
			<Block value={0} currency="USD" />
		</div>
	)
}

export default CurrencyConvertor
