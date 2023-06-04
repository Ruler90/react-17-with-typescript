import Post from 'components/Post/Post.component';
import { PostsContext } from 'contexts/PostsContext';
import { UserContext } from 'contexts/UserContext';
import {
    useCallback, useContext, useEffect, useState,
} from 'react';

enum postRequestStatuses {
    NOT_LOADED = 'not loaded',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error',
}

const PostsList: React.FC = () => {
    const { posts, setPosts } = useContext(PostsContext);
    const { user } = useContext(UserContext);
    const isUserLoggedIn = user?.username && user.password;
    const [status, setStatus] = useState(postRequestStatuses.NOT_LOADED);

    // useCallback, AbortController, try...catch pisane z pomocą Binga
    const requestPosts = useCallback(async (signal: AbortSignal) => {
        setStatus(postRequestStatuses.LOADING);
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts', { signal });
            if (res.status === 200) {
                const data = await res.json();
                setPosts(data);
                setStatus(postRequestStatuses.LOADED);
            } else {
                setStatus(postRequestStatuses.ERROR);
            }
        } catch (error) {
            setStatus(postRequestStatuses.ERROR);
        }
    }, []);

    useEffect(() => {
        // dodana if'ka, żeby korzystało z kontekstu:
        // jeśli mamy już posty w kontekście, to niech używa kontekstu i nie strzela znowu po listę postów
        if (posts.length === 0 && isUserLoggedIn) {
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
