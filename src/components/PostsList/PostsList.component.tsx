import Post from 'components/Post/Post.component';
import { PostsContext } from 'contexts/PostsContext';
import {
    useCallback, useContext, useEffect, useState,
} from 'react';

const PostsList: React.FC = () => {
    const { posts, setPosts } = useContext(PostsContext);
    const [status, setStatus] = useState('not loaded');

    // useCallback, AbortController, try...catch pisane z pomocą Binga
    const requestPosts = useCallback(async (signal: AbortSignal) => {
        setStatus('loading');
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', { signal });
            if (res.status === 200) {
                const data = await res.json();
                setPosts(data);
                setStatus('loaded');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    }, []);

    useEffect(() => {
        // dodana if'ka, żeby korzystało z kontekstu:
        // jeśli mamy już posty w kontekście, to niech używa kontekstu i nie strzela znowu po listę postów
        if (posts.length === 0) {
            const controller = new AbortController();
            requestPosts(controller.signal);
            // cleanup fn - jeśli komponent zostanie odmontowany przed otrzymaniem response'a
            // to ma anulować fetcha
            return () => {
                controller.abort();
            };
        }
        return () => null;
    }, [requestPosts]);

    return (
        <div>
            <p>Posts List - status: {status}</p>
            <div className="posts-container">
                {posts.length > 0
                    // eslint-disable-next-line react/no-array-index-key
                    ? posts.map((post, index) => <Post key={index} post={post} />)
                    : <p>Could not load the posts data</p>}
            </div>
        </div>
    );
};

export default PostsList;
