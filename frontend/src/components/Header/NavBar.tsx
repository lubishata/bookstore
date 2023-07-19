import { Link } from 'react-router-dom';
import { translate } from '../../l10n';
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
        </nav>
    );
};


export default NavBar;