import { createContext, useState, useMemo } from 'react';
import { UserType } from 'utils/types';

interface IUsersContext {
    users: UserType[],
    setUsers: (users:UserType[]) => void
}

export const UsersContext = createContext<IUsersContext>({
    users: [],
    setUsers: () => [],
});

// kontekst możemy tworzyć w formie obiektu j/w
// wtedy w innych komponentach używamy {}, żeby wyciągnąć potrzebne elementy za pomocą useContext
// możemy też osiągnąć to samo w formie tablicy i wtedy używamy [] w połączeniu z useContext (do potwierdzenia)
// export const UsersContext = createContext([[], () => {}]);
// https://github.com/btholt/citr-v7-project/blob/main/11-context/src/ThemeContext.js

const UsersContextProvider = ({ children }:any) => {
    const [users, setUsers] = useState<UserType[]>([]);

    // bez useMemo ESLint krzyczy, że przekazujemy w providerze obiekt, który zmienia się przy każdym renderze
    const contextValue = useMemo(() => ({
        users, setUsers,
    }), [users]);

    return (
        <UsersContext.Provider value={contextValue}>
            {children}
        </UsersContext.Provider>
    );
};

export default UsersContextProvider;
