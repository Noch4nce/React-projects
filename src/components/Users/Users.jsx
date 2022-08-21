import React, { useEffect, useState } from 'react'
import Skeleton from './Sceleton'
import User from './User'
import { USERS_API } from '../api/api'
import './styles.scss'

export const Users = () => {
	const [userData, setUserData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch(USERS_API)
			.then((data) => data.json())
			.then((json) => setUserData(json.data))
			.catch((err) => {
				console.warn(err)
				alert('Response error')
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<div className="App">
			<div className="search">
				<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
				</svg>
				<input type="text" placeholder="Найти пользователя..." />
			</div>
			{isLoading ? (
				<div className="skeleton-list">
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			) : (
				<ul className="users-list">
					{userData.map(() => {
						return <User />
					})}
				</ul>
			)}
			<button className="send-invite-btn">Отправить приглашение</button>
		</div>
	)
}

export default Users
