import { useContext } from 'react';
import { PostsContext } from 'contexts/PostsContext';
import { useRequestPosts } from 'hooks/useRequestPosts';
import { useUserLoginState } from 'hooks/useUserLoginState';
import Post from 'components/Post/Post.component';
import { postRequestStatuses } from 'utils/types';

const PostsList: React.FC = () => {
    const status = useRequestPosts();
    const { posts } = useContext(PostsContext);
    const isUserLoggedIn = useUserLoginState();

    return (
        <div>
            {isUserLoggedIn
                ? (
                    <>
                        <p>Posts List - status: {posts.length > 0 ? postRequestStatuses.LOADED : status}</p>
                        <div className="posts-container">
                            {posts.length > 0
                            // eslint-disable-next-line react/no-array-index-key
                                ? posts.map((post, index) => <Post key={index} post={post} />)
                                : <p>Could not load the posts data</p>}
                        </div>
                    </>
                )
                : <p>You need to log in to display the posts.</p>}
        </div>
    );
};

export default PostsList;
