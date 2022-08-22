import React, { useEffect, useState } from 'react'
import Skeleton from './Sceleton'
import User from './User'
import { USERS_API } from '../api/api'
import './styles.scss'
import { Success } from './Success/Success'

export const Users = () => {
	const [userData, setUserData] = useState([])
	const [inviteData, setInviteData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [searchValue, setSearchValue] = useState('')

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

	const onClickInvites = (id) => {
		if (inviteData.includes(id)) {
			// const inviteDataFiltered = inviteData.filter((inviteId) => {
			// 	return inviteId !== id
			// })
			//
			// setInviteData(inviteData.filter((inviteId) => inviteId !== id))
			setInviteData((prev) => prev.filter((inviteId) => inviteId !== id))
		} else {
			setInviteData((prev) => [...prev, id])
		}
	}

	return (
		<div className="App">
			{iSsentInvitations ? (
				<Success />
			) : (
				<>
					<div className="search">
						<svg
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
						</svg>
						<input
							onChange={(event) =>
								setSearchValue(event.target.value)
							}
							type="text"
							placeholder="Найти пользователя..."
						/>
					</div>
					{isLoading ? (
						<div className="skeleton-list">
							<Skeleton />
							<Skeleton />
							<Skeleton />
						</div>
					) : (
						<ul className="users-list">
							{userData.map((userInfo) => {
								// const fullName =
								// 	(userInfo.first_name + userInfo.last_name).toLowerCase()
								//
								// if (fullName.includes(searchValue)) {
								// 	return <User key={userInfo.id} {...userInfo} />
								// }

								if (
									userInfo.first_name
										.slice(0, searchValue.length)
										.toLowerCase() ===
										searchValue.toLowerCase() ||
									userInfo.last_name
										.slice(0, searchValue.length)
										.toLowerCase() ===
										searchValue.toLowerCase()
								) {
									return (
										<User
											key={userInfo.id}
											{...userInfo}
											inviteData={inviteData}
											onClickInvites={onClickInvites}
										/>
									)
								}
							})}
						</ul>
					)}
					<button className="send-invite-btn">
						Отправить приглашение
					</button>
				</>
			)}
		</div>
	)
}

export default Users
