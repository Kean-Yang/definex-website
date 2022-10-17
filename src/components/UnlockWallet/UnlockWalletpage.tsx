import React from 'react';
import { useTranslation } from 'react-i18next';
// import { Alert } from 'antd'
import './UnlockWallet.scss';

const UnlockWalletpage = () => {
    const { t } = useTranslation();
    return (
        <div className="UnlockWalletpage">
            {/* <div>
                <Alert
                    message="Informational Notes"
                    description="Additional description and information about copywriting."
                    type="info"
                    showIcon
                />
            </div> */}
            {(!(window as any).web3 as any) ? (
                <div className="UnlockWalletpage-content">
                    <a
                        href="https://metamask.io/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {t('v1_Install_MetaMask')}
                    </a>
                </div>
            ) : (
                <div
                    className="UnlockWalletpage-content"
                    onClick={() => {
                        // connect('injected');
                    }}
                >
                    {t('v1_Unlock_Wallet')}
                </div>
            )}
        </div>
    );
};

export default UnlockWalletpage;
