import { createContext, useState, useMemo } from 'react';
import { IUser } from 'utils/types';

interface IUserContext {
    user: IUser | null,
    setUser: (user:IUser) => void
}

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => [],
});

const UserContextProvider = ({ children }:any) => {
    const [user, setUser] = useState<IUser>({ username: null, password: null });

    // bez useMemo ESLint krzyczy, że przekazujemy w providerze obiekt, który zmienia się przy każdym renderze
    const contextValue = useMemo(() => ({
        user, setUser,
    }), [user]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
