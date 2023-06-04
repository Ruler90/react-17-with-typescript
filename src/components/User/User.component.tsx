import { UserContext } from 'contexts/UserContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const User = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        setUser({ username: null, password: null });
        navigate('/');
    };

    return (
        <div className="user-container">
            <p><b>User:</b> {user?.username ? user.username : 'Anonymous'}</p>
            {user?.username
                ? <button type="button" className="logout-button" onClick={() => logoutHandler()}>Log out</button>
                : <Link to="/login-page" className="login-button">Login</Link>}
        </div>
    );
};

export default User;
