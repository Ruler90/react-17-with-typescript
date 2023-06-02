import { StrictMode, Suspense, lazy } from 'react';
import {
    BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Home from 'components/Home/Home.component';
import Nav from 'components/Nav/Nav.component';
import PostsContextProvider from 'contexts/PostsContext';

const PostsList = lazy(() => import('components/PostsList/PostsList.component'));
const PostDetails = lazy(() => import('components/PostDetails/PostDetails.component'));

const App = () => (
    <StrictMode>
        <BrowserRouter>
            <Nav />
            <PostsContextProvider>
                <Suspense fallback={<p>loading...</p>}>
                    <Routes>
                        <Route path="/posts-list/" element={<PostsList />} />
                        <Route path="/post/:id" element={<PostDetails />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Suspense>
            </PostsContextProvider>
        </BrowserRouter>
    </StrictMode>
);

export default App;
