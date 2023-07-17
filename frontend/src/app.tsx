import Header from './components/Header/Header';
import AppRouter from './AppRouter';
import Login from './components/Login/Login';
import RegistrationPage from './components/Registration/RegistrationForm';
import Footer from './components/Footer/Footer';
import Layout from './components/Layout/Layout';
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { store } from './store';
import { productsApi } from './components/GoogleSearvice/reducer/bookSlice';

function App() {
    return (
        <Provider store={store}>
            <ApiProvider api={productsApi}>
                <div>
                    {/* <Header message={"aaaa"} />
        <Login onSubmitHandler={()=>(console.log("salam"))}/>
        <RegistrationPage onSubmitHandler={()=>(console.log("banica"))}/>
        <Footer url={"localhost:8080"}/> */}
                    {/* <Layout children={<div className="layout"></div>}/> */}
                    <AppRouter />
                </div>
            </ApiProvider>
        </Provider>
    );
}

export default App;
