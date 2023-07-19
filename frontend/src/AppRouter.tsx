import { Route, Routes } from "react-router";
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import RegistrationForm from './components/Registration/RegistrationForm';
import Books from './components/Books/Books';
import Profile from './components/Profile/Profile';
import Dummytext from './components/Footer/DummyText';
import NotFound from './components/NotFound';
import { RootState } from "./store";
import { useSelector } from "react-redux";

const AppRouter = () => {
    const storeState = useSelector((state: RootState) => state.login);
    const isUserSignIn = storeState.userType === "anonymousUser";
    const routesDependsOnUserStatus = isUserSignIn ? [{ path: "/login", component: <Login /> }, { path: "/registration", component: <RegistrationForm /> }] : [{ path: "/profile", component: <Profile /> }];

    const routes = [
        {
            path: "/",
            component: <Books />
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
        },
        {
            path: "*",
            component: <NotFound />
        }
    ]

    const joinedRoutes = routes.concat(routesDependsOnUserStatus);

    interface RouteProps {
        path: string;
        component: React.ReactNode;
    }
    return (
        <Routes>
            {joinedRoutes.map((item: RouteProps, index: number) => (
                <Route key={index} path={item.path} element={<Layout>{item.component}</Layout>} />
            )
            )}
        </Routes>
    );
};

export default AppRouter;
