import { Link } from 'react-router-dom';
import "./style/style.css";
import vecteezyImage from '../assets/vecteezy_book-logo.jpg';

interface Props {
    message: string;
}

const Header = ({ message }: Props): JSX.Element =>
    <header className="header">
        <div className="header_logo">
            <Link to="/" aria-label="Bookster">
                <img className="header_logo-icon" src={vecteezyImage} alt="My Image" />
                {/* <img src={vecteezyImage} alt="My Image" /> */}
            </Link>
        </div>
    </header>;

export default Header;