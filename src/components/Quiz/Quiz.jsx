import React, { useState } from 'react'
import './styles.scss'

const questions = [
	{
		title: 'React - это ... ?',
		variants: ['библиотека', 'фреймворк', 'приложение'],
		correct: 0
	},
	{
		title: 'Компонент - это ... ',
		variants: [
			'приложение',
			'часть приложения или страницы',
			'то, что я не знаю что такое'
		],
		correct: 1
	},
	{
		title: 'Что такое JSX?',
		variants: [
			'Это простой HTML',
			'Это функция',
			'Это тот же HTML, но с возможностью выполнять JS-код'
		],
		correct: 2
	}
]

function Result({ correctResults }) {
	return (
		<div className="result">
			<img
				src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
				alt="result"
			/>
			<h2>
				Вы отгадали {correctResults} ответа из {questions.length}
			</h2>
			<a href="/">
				<button>Попробовать снова</button>
			</a>
		</div>
	)
}

const Game = () => {
	const [step, setStep] = useState(0)
	const [correctResults, setCorrectResults] = useState(0)
	const widthProgress = Math.round((step / questions.length) * 100)

	const onNextVariant = (index) => {
		if (questions[step].correct === index) {
			setCorrectResults(correctResults + 1)
		}

		setStep(step + 1)
	}

	return (
		<>
			{step !== questions.length ? (
				<div>
					<div className="progress">
						<div
							style={{ width: `${widthProgress}%` }}
							className="progress__inner"
						/>
					</div>
					<h1>{questions[step].title}</h1>
					<ul>
						{questions[step].variants.map((variant, index) => {
							return (
								<li
									key={variant}
									onClick={() => onNextVariant(index)}
								>
									{variant}
								</li>
							)
						})}
					</ul>
				</div>
			) : (
				<Result correctResults={correctResults} />
			)}
		</>
	)
}

const Quiz = () => {
	return (
		<div className="App">
			<Game />
		</div>
	)
}

export default Quiz
