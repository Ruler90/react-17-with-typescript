import { Link } from 'react-router-dom';
import { UserType } from 'utils/types';

interface UserProps {
    user: UserType
}

const User = ({ user }:UserProps) => (
    <Link to={`/user/${user.id}`}>
        <div className="user-container">
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    </Link>
);

export default User;
