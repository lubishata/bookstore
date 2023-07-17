import * as React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export interface LayoutPros {
  children: React.ReactNode;
};

function Layout({ children }: LayoutPros) {
  return (<div>
    <Header message={"aaaa"} />
    <div id="app-content">
      <div className="page">
        {children}
      </div>
    </div>
    <Footer url={"localhost:8080"} />
  </div>);
}

export default Layout;