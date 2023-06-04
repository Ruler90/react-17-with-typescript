import { UserContext } from 'contexts/UserContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const usernameInputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    const passwordInputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };


    const loginHandler = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (username && password) {
            setUser({ username, password });
            navigate('/');
        }
    };

    return (
        <form className="login-form">
            <label>User Name:
                <input id="user-name" className="login-form__input" type="text" name="user-name" onChange={(e) => usernameInputHandler(e)} />
            </label>
            <label>Password:
                <input id="password" className="login-form__input" type="password" name="user-password" onChange={(e) => passwordInputHandler(e)} />
            </label>
            <button className="login-form__btn" type="submit" onClick={(e) => loginHandler(e)}>Login</button>
        </form>
    );
};

export default LoginPage;
