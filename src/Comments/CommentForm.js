import React, { useState } from 'react'

const CommentForm = ({ handleSubmit, submitLabel,hasCancelButton = false, initialText='', handleCancel }) => {
	const [text, setText] = useState(initialText)

	// disabled button when there not text
	const isTextareaDisabled = text.length === 0 || text.length >= 30;

	const onSubmit = (e) => {
		e.preventDefault()
		handleSubmit(text)
		setText('')
	}
	return (
		<form onSubmit={onSubmit}>
      	<textarea 
      		className='comment-form-textarea'
      		value={text}
      		onChange={(e) => setText(e.target.value)}
      	/>
      	<div>
      		<button className='comment-form-button' disabled={isTextareaDisabled}>
      			{submitLabel}
      		</button>
      	</div>
      	{hasCancelButton && (
      		<button 
      			type='button'
      			className='comment-form-button comment-form-cancel-button'
      			onClick={handleCancel}
      		>
      			Cancel
      		</button>
      	)}
		</form>
	)
}

export default CommentForm