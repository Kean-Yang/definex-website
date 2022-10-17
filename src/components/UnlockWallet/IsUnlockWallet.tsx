import React, { useContext } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import Polkadot from '../../contract/polkadot';
import CountContext from '../../redux/createContext';
import { isWeb3Injected, web3Accounts } from '@polkadot/extension-dapp';

const IsUnlockWallet = (props: any) => {
    const { t } = useTranslation();
    const { account } = useContext(CountContext);
    // const [account, setAccount] = useState('');

    // useEffect(() => {
    //     const getUserAccounts = async () => {
    //         const allAccounts = await web3Accounts();
    //         if (isWeb3Injected && allAccounts[0])
    //             setAccount(
    //                 allAccounts && allAccounts[0].address
    //                     ? allAccounts[0].address
    //                     : ''
    //             );
    //     };
    //     getUserAccounts();
    // }, []);

    return (
        <>
            {!isWeb3Injected ? (
                <a
                    href="https://polkadot.js.org/extension/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button
                        type="primary"
                        className={props.ButClassNmae}
                        block={props.block || false}
                    >
                        {t('v1_Install_MetaMask')}
                    </Button>
                </a>
            ) : !web3Accounts || !account ? (
                <Button
                    type="primary"
                    block={props.block}
                    className={props.ButClassNmae}
                    onClick={async () => {
                        Polkadot.login();
                    }}
                >
                    {t('v1_Connect_Wallet')}
                </Button>
            ) : (
                props.children
            )}
        </>
    );
};

export default IsUnlockWallet;
