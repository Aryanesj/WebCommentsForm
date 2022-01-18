import React, { useState, useEffect } from 'react'
import { getComments as getCommentsApi,
		 createComment as createCommentApi,
		 deleteComment as deleteCommentApi,
		 updateComment as updateCommentApi } from '../api'
import Comment from './Comment.js'
import CommentForm from './CommentForm.js'

const Comments = ({ currentUserId }) => {
	const [backendComments, setBackendComments] = useState([])
	const [activeComment, setActiveComment] = useState(null)

	const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null)

//comments add the top
	const getReplies = (commentId) => { 
		return backendComments
		.filter((backendComment) => backendComment.parentId === commentId)
		.sort((a, b) => new Date(a.createAt).getTime() - new Date(b.createAt).getTime())
	}

	const deleteComment = (commentId) => {
		if (window.confirm('Are you sure that you want to remove comment?')) {
			deleteCommentApi(commentId).then(() => {
				const updatedBackendComments = backendComments
				.filter(backendComment => backendComment.id !== commentId);
				setBackendComments(updatedBackendComments)
			})
		}
	}

	const addComment = (text, parentId) => {
		createCommentApi(text, parentId).then(comment => {
			setBackendComments([comment, ...backendComments])
			setActiveComment(null)
		})
	}

	const updateComment = (text, commentId) => {
		updateCommentApi(text, commentId).then(() => {
			const updatedBackendComments = backendComments.map(backendComment => {
				if (backendComment.id === commentId) {
					return {...backendComment, body: text}
				}
			return backendComment
			})
			setBackendComments(updatedBackendComments)
			setActiveComment(null)
		})
	}

	useEffect(() => {
		getCommentsApi().then((data) => {
			setBackendComments(data);
		})
	}, [])

	return (
		<div className='comments'>
			<h3 className='comments-title'>Comments</h3>
			<div className='comment-form-title'>Write comment</div>
			<CommentForm submitLabel='Write' handleSubmit={addComment} />
			<div className='comments-container'>
				{rootComments.map((rootComment) => (
					<Comment
					 key={rootComment.id}
					 comment={rootComment}
					 replies={getReplies(rootComment.id)}
					 currentUserId={currentUserId}
					 deleteComment={deleteComment}
					 updateComment={updateComment}
					 activeComment={activeComment}
					 setActiveComment={setActiveComment}
					 addComment={addComment}
					 />
				))}
			</div>
		</div>
	)
}

export default Comments