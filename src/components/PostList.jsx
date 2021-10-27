
import React, { useState } from "react";
import { PostItem } from './PostItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const PostList = ({ remove, posts, title }) => {

	if (!posts.length) {
		return <h1 style={{ textAlign: 'center' }}> Пасты кончились </h1>
	}
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>
				{title}
			</h1>
			<TransitionGroup>
				{posts.map((post, index) =>
					<CSSTransition
						timeout={500}
						key={post.id}
						classNames="post"
					>
						<PostItem remove={remove} number={index + 1} post={post} />
					</CSSTransition>
				)}
			</TransitionGroup>
		</div>

	);
};