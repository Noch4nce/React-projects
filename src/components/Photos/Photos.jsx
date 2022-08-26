import React, { useEffect, useState } from 'react'
import './styles.scss'
import { PHOTOS_COLLECTIONS_API } from '../api/api'
import Collection from './Collection'

const categories = [
	{ name: 'Все' },
	{ name: 'Море' },
	{ name: 'Горы' },
	{ name: 'Архитектура' },
	{ name: 'Города' }
]

const Photos = () => {
	const [dataPhotos, setDataPhotos] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [categoryId, setCategoryId] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [page, setPage] = useState(1)

	useEffect(() => {
		setIsLoading(true)
		const pageParam = `page=${page}&limit=3`
		const category =
			categoryId !== 0 ? `category=${categoryId}` : ''

		fetch(`${PHOTOS_COLLECTIONS_API}?${pageParam}&${category}`)
			.then((data) => data.json())
			.then((result) => setDataPhotos(result))
			.catch((error) => {
				console.warn(error)
				alert('Response error')
			})
			.finally(() => setIsLoading(false))
	}, [categoryId, page])

	return (
		<div>
			<div className="App">
				<h1>Моя коллекция фотографий</h1>
				<div className="top">
					<ul className="tags">
						{categories.map((category, index) => (
							<li
								key={category.name}
								onClick={() => setCategoryId(index)}
								className={categoryId === index ? 'active' : ''}
							>
								{category.name}
							</li>
						))}
					</ul>
					<input
						value={searchValue}
						onChange={(event) => setSearchValue(event.target.value)}
						className="search-input"
						placeholder="Поиск по названию"
					/>
				</div>
				<div className="content">
					{isLoading ? (
						<h2>Идет загрузка...</h2>
					) : (
						dataPhotos
							.filter((card) => {
								const cardName = card.name.toLowerCase()
								const searchName = searchValue.toLowerCase()

								return cardName.includes(searchName)
							})
							.map((card, index) => (
								<Collection
									key={index}
									name={card.name}
									images={card.photos}
								/>
							))
					)}
				</div>
				<ul className="pagination">
					{[...Array(3)].map((_, index) => (
						<li
							onClick={() => setPage(index + 1)}
							className={index + 1 === page ? 'active' : ''}
						>
							{index + 1}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Photos
