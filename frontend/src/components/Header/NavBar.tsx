import { Link } from 'react-router-dom';
import { translate } from '../../l10n';
import InnerHTML from '../../l10n/innerHTML';
const t = (str: string, context = "bg-localization") => translate(context, str);

function NavBar() {

    const navBars = [
        {
            name: 'login',
            pathTo: '/login',
            ariaLabel: 'Login',
            barLabel: t('login')
        },
        {
            name: 'registration',
            pathTo: '/registration',
            ariaLabel: 'Registration',
            barLabel: t('registration')
        },
    ]

    interface NavBarProps {
        name: string;
        pathTo: string,
        ariaLabel: string,
        barLabel: string,
    }

    return (
        <nav className="nav-bar">
            {navBars.map((item: NavBarProps) => (
                <Link key={item.name} className="nav-links" to={item.pathTo} aria-label={item.ariaLabel} style={{ textDecoration: 'none' }}>{item.barLabel}</Link>
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