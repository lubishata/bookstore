import React from 'react';
import FooterLink from './FooterLink';
import './style/footerstyle.css';
import { translate } from '../../l10n';
import InnerHTML from '../../l10n/innerHTML';
const t = (str: string, context = "bg-localization") => translate(context, str);


const Footer  = () => {
    
    const url = window.location.href;
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
