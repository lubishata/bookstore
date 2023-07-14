import React from 'react';
import { Route, Routes } from "react-router";
// import Home from './components/Home';
// import About from './components/About';
// import NotFound from './components/NotFound';
import Header from './Header/Header';

const AppRouter = () => {
    return (
        <Routes>
            {/* <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NotFound} /> */}
            {/* <Route path='/' exact Component={Header} /> */}
        </Routes>
    );
};

export default AppRouter;
