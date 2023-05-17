import { UsersContext } from 'contexts/UsersContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserType } from 'utils/types';

const UserDetails: React.FC = () => {
    const { users } = useContext(UsersContext);
    const [user, setUser] = useState<UserType | null>(null);
    const [error, setError] = useState(false);
    // nazwa parametru jest pobierana z Route z App.tsx:
    // <Route path="/user/:id" element={<UserDetails />} />
    const { id } = useParams();

    // krótsza wersja tej samej funkcji, którą mamy w komponencie UserList
    // można ją wyciągnąć do custom hooka i użyć w dwóch miejscach
    // albo wrzucić userów do contextu i stamtąd brać dane
    const requestUserById = async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (res.status === 200) {
            const data = await res.json();
            setUser(data);
        } else {
            setError(true);
        }
    };

    // najpierw sprawdzamy, czy mamy userów w kontekście
    // jeśli tak, to tam szukamy, a jeśli nie, to strzelamy po dane konkretnego usera
    const getUser = () => {
        if (users.length > 0) {
            for (const item of users) {
                if (item.id.toString() === id) {
                    setUser(item);
                }
            }
        } else {
            requestUserById();
        }
    };


    useEffect(() => {
        getUser();
    }, []);


    return (
        <div className="user-details-container">
            {user && (
                <>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.name}</p>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>City: {user.address.city}</p>
                    <p>Company: {user.company.name}</p>
                </>
            )}
            {error && (
                <p>{'Can\'t get the user data. Probably user doesn\'t exist.'}</p>
            )}
        </div>
    );
};

export default UserDetails;
