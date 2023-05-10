import {
    BrowserRouter, Routes, Route,
} from 'react-router-dom';
import UsersList from 'components/UsersList/UsersList.component';
import UserDetails from 'components/UserDetails/UserDetails.component';
import Home from 'components/Home/Home.component';
import Nav from 'components/Nav/Nav.component';
import UserContextProvider from 'contexts/UsersContext';

const App = () => (
    <BrowserRouter>
        <Nav />
        <UserContextProvider>
            <Routes>
                <Route path="/users-list/" element={<UsersList />} />
                <Route path="/user/:id" element={<UserDetails />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </UserContextProvider>
    </BrowserRouter>
);

export default App;
