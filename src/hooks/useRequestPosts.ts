import { PostsContext } from 'contexts/PostsContext';
import {
    useCallback, useContext, useEffect, useState,
} from 'react';
import { postRequestStatuses } from 'utils/types';
import { useUserLoginState } from './useUserLoginState';

type useRequestPost = (id?: string) => string;

export const useRequestPosts: useRequestPost = (id) => {
    const { posts, setPosts } = useContext(PostsContext);
    const isUserLoggedIn = useUserLoginState();
    const [status, setStatus] = useState(postRequestStatuses.NOT_LOADED);

    // useCallback, AbortController, try...catch pisane z pomocą Binga
    const requestPosts = useCallback(async (signal: AbortSignal) => {
        const requestUrl = `https://jsonplaceholder.typicode.com/posts${id ? `/${id}` : ''}`;
        setStatus(postRequestStatuses.LOADING);
        try {
            const res = await fetch(requestUrl, { signal });
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
    return status;
};

