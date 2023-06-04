import { StrictMode, Suspense, lazy } from 'react';
import {
    BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Home from 'components/Home/Home.component';
import Nav from 'components/Nav/Nav.component';
import PostsContextProvider from 'contexts/PostsContext';
import UserContextProvider from 'contexts/UserContext';
import LoginPage from 'components/LoginPage/LoginPage.component';

const PostsList = lazy(() => import('components/PostsList/PostsList.component'));
const PostDetails = lazy(() => import('components/PostDetails/PostDetails.component'));

const App = () => (
    <StrictMode>
        <BrowserRouter>
            <UserContextProvider>
                <Nav />
                <PostsContextProvider>
                    <Suspense fallback={<p>loading...</p>}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login-page" element={<LoginPage />} />
                            <Route path="/posts-list/" element={<PostsList />} />
                            <Route path="/post/:id" element={<PostDetails />} />
                        </Routes>
                    </Suspense>
                </PostsContextProvider>
            </UserContextProvider>
        </BrowserRouter>
    </StrictMode>
);

export default App;
