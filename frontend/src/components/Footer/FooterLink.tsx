import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export interface FooterLinkProps  {
  to: string;
  label: string;
  className?: string;
  url: string;
}

const FooterLink = ({ to, label, className, url }: FooterLinkProps) => (<li
  className={classNames('footer__link', className, {
    'footer__link--active': url === to,
  })}
>
    <Link to={to}>{label}</Link>
</li>);

export default FooterLink;
