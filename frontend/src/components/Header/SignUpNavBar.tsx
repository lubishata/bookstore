import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from '../../l10n';
const t = (str: string, context = "bg-localization") => translate(context, str);

function SignUpNavBar() {

    const navBars = [
        {
            name: 'profile',
            pathTo: '/profile',
            ariaLabel: 'profile',
            barLabel: t('profile')
        },
        {
            name: 'logout',
            pathTo: '/logout',
            ariaLabel: 'Logout',
            barLabel: t('logout')
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


export default SignUpNavBar;