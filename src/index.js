import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import './i18n/I18n';
import './index.scss';
import './styles/styles.scss';
import { store } from './redux/store';
// import { SubstrateContextProvider, useSubstrate } from './substrate-lib';
// import { getChainId } from './utils/localStorage';
// console.log(getChainId() || store.getState().networkManag.chainId)
// console.log(useSubstrate)

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={enUS}>
            {/* <SubstrateContextProvider> */}
            <App />
            {/* </SubstrateContextProvider> */}
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);
reportWebVitals();
