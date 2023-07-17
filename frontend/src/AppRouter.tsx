// import React from 'react';
import { Route, Routes } from "react-router";
// import Home from './components/Home';
// import About from './components/About';
// import NotFound from './components/NotFound';
// import Header from './components/Header/Header';
// import RouteWithLayout from './components/Layout/RouteWithLayout';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import RegistrationForm from './components/Registration/RegistrationForm';
import { Data } from './components/GoogleSearvice/BookSearch';
import Dummytext from './components/Footer/DummyText';

const AppRouter = () => {

    const routes = [
        {
            path: "/",
            component: <Data />
        },
        {
            path: "/login",
            component: <Login onSubmitHandler={() => (console.log("login"))} />
        },
        {
            path: "/registration",
            component: <RegistrationForm onSubmitHandler={() => (console.log("registration"))} />
        },
        {
            path: "/footerlistcontent1",
            component: <Dummytext />
        },
        {
            path: "/footerlistcontent2",
            component: <Dummytext />
        },
        {
            path: "/footerlistcontent3",
            component: <Dummytext />
        }
    ]
    interface RouteProps {
        path: string;
        component: React.ReactNode;
    }

    // {allProductsData.products.map((item: any) => (
    //     <div key={item.id}>
    //       <h2>{item.title}</h2>
    //       <p>{item.title}</p>
    //       <p>{item.description}</p>
    //       {item.thumbnail && <img src={item.thumbnail} alt={item.title} />}
    //     </div>
    //   ))

    return (
        <Routes>
            {routes.map((item: RouteProps, index: number) => (
                <Route key={index} path={item.path} element={<Layout>{item.component}</Layout>} />
            )
            )}
        </Routes>

        // <Route path="/" element={<Layout><Data /></Layout>} />
        // <Route path="/login" element={<Layout><Login onSubmitHandler={() => (console.log("salam"))} /></Layout>} />
        // <Route path="/registration" element={<Layout><RegistrationForm onSubmitHandler={() => (console.log("salam"))} /></Layout>} />
        // <Route path='/api' element={<Layout><Data /></Layout>} />
        // <Route path='/footerlistcontent1' element={<Layout><Dummytext /></Layout>} />
        // <Route path='/footerlistcontent2' element={<Layout><Dummytext /></Layout>} />
        // <Route path='/footerlistcontent3' element={<Layout><Dummytext /></Layout>} />
        // <Route path="/" element={<Layout><Login onSubmitHandler={()=>(console.log("salam"))} /></Layout>} />

        // </Routes>
    );
};

export default AppRouter;


{/* <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path='/login' element={<Login onSubmitHandler={()=>(console.log("salam"))}/>}/>
            </Route> 
        </Routes> */}