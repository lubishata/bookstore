import { Route, Routes } from "react-router";
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import RegistrationForm from './components/Registration/RegistrationForm';
import  Books  from './components/Books/Books';
import Dummytext from './components/Footer/DummyText';

const AppRouter = () => {

    const routes = [
        {
            path: "/",
            component: <Books/>
        },
        {
            path: "/login",
            component: <Login />
        },
        {
            path: "/registration",
            component: <RegistrationForm />
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
    return (
        <Routes>
            {routes.map((item: RouteProps, index: number) => (
                <Route key={index} path={item.path} element={<Layout>{item.component}</Layout>} />
            )
            )}
        </Routes>
    );
};

export default AppRouter;
