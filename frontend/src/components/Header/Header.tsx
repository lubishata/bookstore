import React, { useEffect } from 'react';
import "./style/headerstyle.css";
import HeaderLogo from './HeaderLogo';
import NavBar from './NavBar';

interface Props {
    message: string;
}

const Header: React.FC<Props> = ({ message }) => {
    // Example of using the 'useState' hook to manage local state
    const [count, setCount] = React.useState(0);

    // Example of using the 'useEffect' hook to perform side effects
    useEffect(() => {
        // Code to run on component mount (similar to componentDidMount)
        console.log('Component mounted');

        // Code to run on component unmount (similar to componentWillUnmount)
        return () => {
            console.log('Component will unmount');
        };
    }, []);

    return (
        <header className="header">
            <HeaderLogo />
            <NavBar />
        </header>
    );
};

export default Header;
