import React, { useState, useEffect } from 'react'
import { getComments as getCommentsApi } from '../api'
import Comment from './Comment.js'

const Comments = ({ currentUserId }) => {
	const [backendComments, setBackendComments] = useState([])
	const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null)

//comments add the top
	const getReplies = (commentId) => { 
		return backendComments
		.filter((backendComment) => backendComment.parentId === commentId)
		.sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime())
	}

	useEffect(() => {
		getCommentsApi().then((data) => {
			setBackendComments(data);
		})
	}, [])

	return (
		<div className='comments'>
			<h3 className='comments-title'>Comments</h3>
			<div className='comments-container'>
				{rootComments.map((rootComment) => (
					<Comment
					 key={rootComment.id}
					 comment={rootComment}
					 replies={getReplies(rootComment.id)} />
				))}
			</div>
		</div>
	)
}

export default Comments