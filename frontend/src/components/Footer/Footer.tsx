import React from 'react';
import { useSelector } from 'react-redux';
//import { RootState } from '../path/to/your/rootReducer'; // Import your RootState type

import FooterLink from './FooterLink';
import './style/footerstyle.css';

interface FooterProps {
    url: string;
}

const Footer: React.FC<FooterProps> = ({ url }) => {
    // If you need to access data from Redux store, use useSelector hook
    // For example, if you want to access a property named 'someData' from your Redux store:
    // const someData = useSelector((state: RootState) => state.yourReducer.someData);

    return (
        <footer className="footer">
            <div className="footer__container">
                <i className="footer__logo icon-oblak" />
                <div className="footer__content">
                    <div className="footer__text">
                        <p>
                            <span>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                software like Aldus PageMaker including versions of Lorem Ipsum.
                            </span>
                        </p>
                    </div>
                    <ul>
                        <FooterLink to="/footerlistcontent1" label={"footerlistcontent1"} className="footer__link--first" url={url} />
                        <FooterLink to="/footerlistcontent2" label={"footerlistcontent2"} url={url} />
                        <FooterLink to="/footerlistcontent3" label={"footerlistcontent3"} url={url} />
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
