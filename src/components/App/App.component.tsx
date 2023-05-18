import { StrictMode, Suspense, lazy } from 'react';
import {
    BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Home from 'components/Home/Home.component';
import Nav from 'components/Nav/Nav.component';
import UserContextProvider from 'contexts/UsersContext';

const UsersList = lazy(() => import('components/UsersList/UsersList.component'));
const UserDetails = lazy(() => import('components/UserDetails/UserDetails.component'));

const App = () => (
    <StrictMode>
        <BrowserRouter>
            <Nav />
            <UserContextProvider>
                <Suspense fallback={<p>loading...</p>}>
                    <Routes>
                        <Route path="/users-list/" element={<UsersList />} />
                        <Route path="/user/:id" element={<UserDetails />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Suspense>
            </UserContextProvider>
        </BrowserRouter>
    </StrictMode>
);

export default App;
