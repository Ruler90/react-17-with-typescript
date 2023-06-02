import { createContext, useState, useMemo } from 'react';
import { PostType } from 'utils/types';

interface IPostsContext {
    posts: PostType[],
    setPosts: (posts:PostType[]) => void
}

export const PostsContext = createContext<IPostsContext>({
    posts: [],
    setPosts: () => [],
});

// kontekst możemy tworzyć w formie obiektu j/w
// wtedy w innych komponentach używamy {}, żeby wyciągnąć potrzebne elementy za pomocą useContext
// możemy też osiągnąć to samo w formie tablicy i wtedy używamy [] w połączeniu z useContext (do potwierdzenia)
// export const PostsContext = createContext([[], () => {}]);
// https://github.com/btholt/citr-v7-project/blob/main/11-context/src/ThemeContext.js

const PostsContextProvider = ({ children }:any) => {
    const [posts, setPosts] = useState<PostType[]>([]);

    // bez useMemo ESLint krzyczy, że przekazujemy w providerze obiekt, który zmienia się przy każdym renderze
    const contextValue = useMemo(() => ({
        posts, setPosts,
    }), [posts]);

    return (
        <PostsContext.Provider value={contextValue}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsContextProvider;
