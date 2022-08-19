import React from 'react'
import './styles.scss'

function Result() {
	return (
		<div className="result">
			<img
				src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
				alt="result"
			/>
			<h2>Вы отгадали 3 ответа из 10</h2>
			<button>Попробовать снова</button>
		</div>
	)
}

const Game = () => {
	return (
		<>
			<div className="progress">
				<div style={{ width: '50%' }} className='progress__inner'/>
			</div>
			<h1>Что такое useState?</h1>
			<ul>
				<li>Это функция для хранения данных компонента</li>
				<li>Это глобальный стейт</li>
				<li>Это когда на ты никому не нужен</li>
			</ul>
		</>
	)
}

const Quiz = () => {
	return (
		<div className="App">
			<Game />
			{/*<Result />*/}
		</div>
	)
}

export default Quiz
