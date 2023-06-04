import { PostsContext } from 'contexts/PostsContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserLoginState } from 'hooks/useUserLoginState';
import { IPost } from 'utils/types';

const PostDetails: React.FC = () => {
    const { posts } = useContext(PostsContext);
    const isUserLoggedIn = useUserLoginState();
    const [post, setPost] = useState<IPost | null>(null);
    const [error, setError] = useState(false);
    // nazwa parametru jest pobierana z Route z App.tsx:
    // <Route path="/post/:id" element={<PostDetails />} />
    const { id } = useParams();

    // krótsza wersja tej samej funkcji, którą mamy w komponencie PostsList
    // można ją wyciągnąć do custom hooka i użyć w dwóch miejscach
    // albo wrzucić posty do contextu i stamtąd brać dane
    const requestPostById = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (res.status === 200) {
            const data = await res.json();
            setPost(data);
        } else {
            setError(true);
        }
    };

    // najpierw sprawdzamy, czy mamy posty w kontekście
    // jeśli tak, to tam szukamy, a jeśli nie, to strzelamy po dane konkretnego postu
    const getPost = () => {
        if (posts.length > 0 && isUserLoggedIn) {
            for (const item of posts) {
                if (item.id.toString() === id) {
                    setPost(item);
                }
            }
        } else if (isUserLoggedIn) {
            requestPostById();
        }
    };


    useEffect(() => {
        getPost();
    }, []);


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
            {error && (
                <p>{'Can\'t get the post data. Probably the post doesn\'t exist.'}</p>
            )}
        </div>
    );
};

export default PostDetails;
