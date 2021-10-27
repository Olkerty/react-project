import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useFetching } from "../hooks/useFetching";
import PostService from '../API/PostService'
import { Loader } from "../components/UI/Loader/Loader";

export const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [fetchPostByID, isLoading, error] = useFetching(async (id) => {
		//	console.log(id);
		const response = await PostService.getById(params.id);
		//	console.log(response.data);
		setPost(response.data);
	}, [])
	const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
		const response = await PostService.getCommentsById(params.id);
		//	console.log(response.data);
		setComments(response.data);
		console.log(comments);
	}, [])
	useEffect(() => {
		fetchPostByID();
		fetchComments();
	}, [])
	return (
		<div>
			<h1>
				YES, id of this post equal to {params.id}
			</h1>
			{
				isLoading
					? <Loader />
					: <div>{post.id}	{post.title}</div>
			}
			{
				isComLoading
					? <Loader />
					: <div>
						{comments.map((comment) =>
							<div key={comment.id} style={{ marginTop: 20 }}>
								<h5>
									{comment.email}
								</h5>
								<div>
									{comment.body}
								</div>
							</div>
						)}
					</div>
			}
		</div>
	);
}