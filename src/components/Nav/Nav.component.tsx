import User from 'components/User/User.component';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => (
    <div className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/posts-list" className="nav-link">Posts List</Link>
        <User />
    </div>
);

export default Nav;
