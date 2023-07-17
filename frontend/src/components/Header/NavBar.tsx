import { Link } from 'react-router-dom';

function NavBar() {

    const navBars = [
        {
            name: 'login',
            pathTo: '/login',
            ariaLabel: 'Login',
        },
        {
            name: 'registration',
            pathTo: '/registration',
            ariaLabel: 'Registration',
        },
    ]

    interface NavBarProps {
        name: string;
        pathTo: string,
        ariaLabel: string,
    }

    return (
        <nav className="nav-bar">
            {navBars.map((item: NavBarProps) => (
                <Link key={item.name} className="nav-links" to={item.pathTo} aria-label={item.ariaLabel} style={{ textDecoration: 'none' }}>{item.ariaLabel}</Link>
            )
            )}
            {/* <Link className="nav-links" to="/login" aria-label="Login" style={{ textDecoration: "none" }}>
                Login
            </Link>
            <Link className="nav-links" to="/registration" aria-label="Login" style={{ textDecoration: "none" }}>
                Registration
            </Link> */}
        </nav>
    );
};


export default NavBar;