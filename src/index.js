import React from "react";
import ReactDOM from 'react-dom';
import {AppContainer} from "react-hot-loader";
import App from "pages/App";
import store from './redux/store';
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'

const rootEl = document.getElementById("root");

const renderComponent = (Component) => {
    ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <Component/>
          </Provider>
        </AppContainer>,
        rootEl
    );
};

renderComponent(App);
