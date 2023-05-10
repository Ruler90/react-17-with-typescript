import { Link } from 'react-router-dom';

const Nav = () => (
    <>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/users-list" className="nav-link">Users List</Link>
    </>
);

export default Nav;
