import { PostsContext } from 'contexts/PostsContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserLoginState } from 'hooks/useUserLoginState';
import { IPost, postRequestStatuses } from 'utils/types';
import { useRequestPosts } from 'hooks/useRequestPosts';

const PostDetails: React.FC = () => {
    // nazwa parametru jest pobierana z Route z App.tsx:
    // <Route path="/post/:id" element={<PostDetails />} />
    const { id } = useParams();
    const status = useRequestPosts(id);
    const { posts } = useContext(PostsContext);
    const isUserLoggedIn = useUserLoginState();
    const [post, setPost] = useState<IPost | null>(null);

    // najpierw sprawdzamy, czy mamy tablicę postów w kontekście
    // jeśli tak, to tam szukamy po id, a jeśli nie, to może nam przyjść nie tablica, ale ten jeden konkretny post
    // dla uproszczenia wykluczam tu sprawdzanie błędów itp. (poza tym niżej, gdzie dostaniemy status Error)
    const getPost = () => {
        if (Array.isArray(posts) && posts.length > 0) {
            for (const item of posts) {
                if (item.id.toString() === id) {
                    setPost(item);
                }
            }
        } else if (posts && !Array.isArray(posts)) {
            setPost(posts);
        }
    };


    useEffect(() => {
        getPost();
    }, [posts]);


    return (
        <div className="post-details-container">
            {post && isUserLoggedIn ? (
                <>
                    <p><b>ID:</b> {post.id}</p>
                    <p><b>User ID:</b> {post.userId}</p>
                    <p><b>Title:</b> {post.title}</p>
                    <p><b>Text:</b> {post.body}</p>
                </>
            )
                : <p>You need to log in to display this post.</p>}
            {status === postRequestStatuses.ERROR && (
                <p>{'Can\'t get the post data. Probably the post doesn\'t exist.'}</p>
            )}
        </div>
    );
};

export default PostDetails;
