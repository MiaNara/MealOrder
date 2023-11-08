import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Decoration from './Decoration';
const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Decoration />
            {children}
            <Footer />
        </>
    );
};

export default Layout;