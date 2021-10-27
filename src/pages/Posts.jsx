import React, { useState, useEffect, useRef } from 'react';
import '../styles/App.css';
import { PostList } from '../components/PostList';
import { MySelect } from '../components/UI/select/MySelect';
import { PostForm } from '../components/PostForm';
import { PostFilter } from '../components/PostFilter';
import { MyModal } from '../components/UI/MyModal/MyModal';
import { MyButton } from '../components/UI/button/MyButton';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import { Loader } from '../components/UI/Loader/Loader';
import PostService from '../API/PostService';
import { getPageCount, } from '../utils/pages';
import { Pagination } from '../components/UI/pagination/pagination';
import { useObserver } from '../hooks/useObserver';

function Posts() {
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);



	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [totalPages, setTotalPages] = useState(0);

	const lastElement = useRef();

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts(response.data);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	})

	useEffect(() => {
		fetchPosts();
	}, [page])

	function createPost(newPost) {
		setPosts([...posts, newPost]);
		setModal(false);
	}

	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1);
	})

	const changePage = (page) => {
		setPage(page);
	}

	const removePost = (post) => {
		setPosts(posts.filter(pt => pt.id !== post.id))
	}
	return (
		<div className="App">
			<MyButton onClick={() => setModal(true)}>Create past </MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />

			<PostFilter filter={filter} setFilter={setFilter} />

			{/* asda 
	<MySelect
				value={limit}
				onChange={(value) => setLimit(value)}
				defaultValue='Elements on one page'
				options={[
					{ value: 5, name: '5' },
					{ value: 15, name: '15' },
					{ value: 25, name: '25' },
					{ value: -1, name: 'All' }
				]}
			/>
			*/}

			{
				postError &&
				<h1> {postError} occured </h1>
			}
			<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список паст 1" />
			<div ref={lastElement} style={{ height: 20, backgroundColor: 'red' }}></div>
			{isPostsLoading &&
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /> </div>
			}

			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>
		</div>
	);
}

export default Posts;
