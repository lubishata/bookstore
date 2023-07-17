import React from 'react';
import { useSelector } from 'react-redux';
//import { RootState } from '../path/to/your/rootReducer'; // Import your RootState type
import FooterLink from './FooterLink';
import './style/footerstyle.css';
import { translate } from '../../l10n';
import InnerHTML from '../../l10n/innerHTML';
const t = (str: string, context = "bg-localization") => translate(context, str);

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
                <i className="footer__logo" />
                <div className="footer__content">
                    <div className="footer__text">
                        <InnerHTML str={t('loremIpsumDummyText')} />
                    </div>
                    <ul>
                        <FooterLink to="/footerlistcontent1" label={t('footer.footerLinkLabel1')} className="footer__link--first" url={url} />
                        <FooterLink to="/footerlistcontent2" label={t('footer.footerLinkLabel2')} url={url} />
                        <FooterLink to="/footerlistcontent3" label={t('footer.footerLinkLabel3')} url={url} />
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
