import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className='navbar navbar-expand-lg bg-light'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='#'>Comics</a>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/comics'>Comics</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;