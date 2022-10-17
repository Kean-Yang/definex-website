import React, { useEffect, useState } from 'react';
import './App.scss';
import { AppRoute } from './Layout/app.route';
import Polkadot from './contract/polkadot';
import Loading from './components/Load/Loading';
import {
    Enabled,
    isWeb3Injected,
    web3Accounts,
} from '@polkadot/extension-dapp';
import CountContext from '../src/redux/createContext'
// import { store } from './redux/store';
// import { switchChainId } from './utils/localStorage';
// import { testnetHecochain,hecochain} from './redux/reducers/switchNetwork';
// import { useDispatch, useSelector, shallowEqual ,connect,useStore} from 'react-redux';



const App = () => {
    // const reduxChainId = useSelector(state => state.networkManag.chainId,shallowEqual);
    // const dispatch = useDispatch();
    const [initWallet, setInitWallet] = useState(false);
    const [account, setAccount] = useState('');

    useEffect(() => {
        const login = async () => {
            const INITAPI = await Polkadot.INITAPI();

            const allAccounts = await web3Accounts();
            console.log('allAccounts', allAccounts)
            if (isWeb3Injected && allAccounts[0])
                setAccount(allAccounts[0].address);

            window.RPCLoanpool = INITAPI.rpc.loanpool;
            window.INITAPI = INITAPI;
            // window.INITAPI && await Polkadot.login();
            if ((!Enabled || !isWeb3Injected || (window.INITAPI && window.RPCLoanpool)) || allAccounts) setInitWallet(true);
        }
        login();
    }, []);

    return (
        <div className="App">
            {initWallet ? <CountContext.Provider
                value={{
                    account: account,
                }}
            >
                <AppRoute />
            </CountContext.Provider > : <Loading />}
        </div>
    );
};

export default App;
