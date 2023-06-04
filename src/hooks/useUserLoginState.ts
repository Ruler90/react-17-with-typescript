import { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';

export const useUserLoginState = () => {
    const { user } = useContext(UserContext);
    const isUserLoggedIn = user?.username && user.password;
    return isUserLoggedIn;
};
