import { Link } from 'react-router-dom';

function HeaderLogo() {
    return (
        <div>
            <Link to="/" aria-label="Bookster" style={{ textDecoration: "none" }}>
                <div id="header__id">
                    BookApp
                </div>
            </Link>
        </div>
    );
};


export default HeaderLogo;