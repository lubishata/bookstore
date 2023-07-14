import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
const domNode = document.getElementById('root')!;
const render = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        domNode
    );
};

declare const module: any; // Add this line to declare the `module` variable

if (module.hot) {
    module.hot.accept('./app', render);
}

render();