import User from 'components/User/User.component';
import { UsersContext } from 'contexts/UsersContext';
import {
    useCallback, useContext, useEffect, useState,
} from 'react';

const UsersList: React.FC = () => {
    const { users, setUsers } = useContext(UsersContext);
    const [status, setStatus] = useState('not loaded');

    // useCallback, AbortController, try...catch pisane z pomocą Binga
    const requestUsers = useCallback(async (signal: AbortSignal) => {
        setStatus('loading');
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal });
            if (res.status === 200) {
                const data = await res.json();
                setUsers(data);
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
        // jeśli mamy już userów w kontekście, to niech używa kontekstu i nie strzela znowu po listę userów
        if (users.length === 0) {
            const controller = new AbortController();
            requestUsers(controller.signal);
            // cleanup fn - jeśli komponent zostanie odmontowany przed otrzymaniem response'a
            // to ma anulować fetcha
            return () => {
                controller.abort();
            };
        }
        return () => null;
    }, [requestUsers]);

    return (
        <div>
            <p>UsersList - status: {status}</p>
            {users.length > 0
                ? users.map((user) => <User key={user.id} user={user} />)
                : <p>Could not load the users data</p>}
        </div>
    );
};

export default UsersList;
