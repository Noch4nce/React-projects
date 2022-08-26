import React, { useEffect, useState } from 'react'
import './styles.scss'
import { PHOTOS_COLLECTIONS_API } from '../api/api'
import Collection from './Collection'

const Photos = () => {
	const [dataPhotos, setDataPhotos] = useState([])
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		fetch(PHOTOS_COLLECTIONS_API)
			.then((data) => data.json())
			.then((result) => setDataPhotos(result))
			.catch((error) => {
				console.warn(error)
				alert('Response error')
			})
	}, [])

	return (
		<div>
			<div className="App">
				<h1>Моя коллекция фотографий</h1>
				<div className="top">
					<ul className="tags">
						<li className="active">Все</li>
						<li>Горы</li>
						<li>Море</li>
						<li>Архитектура</li>
						<li>Города</li>
					</ul>
					<input
						value={searchValue}
						onChange={(event) => setSearchValue(event.target.value)}
						className="search-input"
						placeholder="Поиск по названию"
					/>
				</div>
				<div className="content">
					{dataPhotos
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
						))}
				</div>
				<ul className="pagination">
					<li>1</li>
					<li className="active">2</li>
					<li>3</li>
				</ul>
			</div>
		</div>
	)
}

export default Photos
