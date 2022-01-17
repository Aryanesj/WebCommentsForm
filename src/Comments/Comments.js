import React, { useState, useEffect } from 'react'
import { getComments as getCommentsApi } from '../api'
import Comment from './Comment.js'

const Comments = ({ currentUserId }) => {
	const [backendComments, setBackendComments] = useState([])
	const rootComment = backendComments.filter((backendComments) => backendComments.parentId === null)
	console.log('backendComments', backendComments)

useEffect(() => {
	getCommentsApi().then((data) => {
		setBackendComments(data);
	})
}, [])

	return (
		<div className='comments'>
			<h3 className='comments-title'>Comments</h3>
			<div className='comments-container'>
				{rootComment.map((rootComment) => (
					<Comment key={rootComment.id} comment={rootComment} />
				))}
			</div>
		</div>
	)
}

export default Comments