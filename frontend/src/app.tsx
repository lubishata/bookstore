import AppRouter from './AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
    return (
        <Provider store={store}>
            <div>
                <AppRouter />
            </div>
        </Provider>
    );
}

export default App;
