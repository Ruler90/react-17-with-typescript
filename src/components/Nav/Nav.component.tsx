import { Link } from 'react-router-dom';

const Nav: React.FC = () => (
    <>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/posts-list" className="nav-link">Posts List</Link>
    </>
);

export default Nav;
