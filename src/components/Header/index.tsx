import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { AppMenuMobile } from '../../Layout/app.menu';
import { useHistory } from 'react-router-dom';
import deflogo from '../../assets/icon/logosub.png';
import logo from '../../assets/logosub.svg';
import Polkadot from '../../contract/polkadot';
import IsUnlockWallet from '../../components/UnlockWallet/IsUnlockWallet';
import './index.scss';
import * as Tools from '../../utils/Tools';
import { useMedia } from 'react-use';
import DesktopMenu from './DesktopMenu';
import { connect } from 'react-redux';
import CountContext from '../../redux/createContext';

const PageHeader = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const { account } = useContext(CountContext);
    // const location = useLocation();
    const below960 = useMedia('(max-width: 960px)');
    const [visible, setVisible] = useState(false);
    const [balance, setBalance] = useState(0);

    const showDrawer = useCallback(() => {
        setVisible(true);
    }, []);
    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const jumpPage = (url: any) => {
        if (url.indexOf('https://') > -1) {
            window.location.href = url;
        } else {
            history.push(url);
            setVisible(false);
        }
    };

    useEffect(() => {
        const userBalance = async () => {
            const balances = await Polkadot.getUserBalance(account);
            setBalance(balances);
        };
        if (account) userBalance();
    }, [account]);

    return (
        <header className="page-header">
            <div className="header">
                {!below960 ? (
                    <div className="nav-logo">
                        <a href="/" onClick={() => onClose()}>
                            <img src={logo as any} alt="Definex" />
                        </a>
                    </div>
                ) : (
                    <div className="nav-logo" onClick={() => showDrawer()}>
                        <img src={logo as any} alt="Definex" />{' '}
                    </div>
                )}

                <div className="menu-mobile">
                    <MenuOutlined
                        width={22}
                        height={22}
                        onClick={() => showDrawer()}
                        style={{ fontSize: '18px', color: 'white' }}
                    />
                </div>

                {!below960 ? (
                    <div className="nav">
                        <div className="nav-link">
                            <DesktopMenu />
                        </div>
                        {/* {(!(window as any).web3 as any) ? (
                        <div className="nav-Wallet">
                            <a
                                href="https://metamask.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t('v1_Install_MetaMask')}
                            </a>
                        </div>
                    ) : !wallet || status !== 'connected' ? (
                        <div
                            className="nav-Wallet"
                            onClick={() => {
                                if (status !== 'connected') {
                                    console.log('wallet');
                                    connect('injected');
                                }
                            }}
                        >
                            <>
                                <img src={walletImg as any} alt="Definex" />
                                {t('v1_Connect_Wallet')}
                            </>
                        </div>
                    ) : (
                        <div className="nav-Wallet-account">
                            <span className="balance">
                                {balance}
                                <img src={logo as any} alt="Definex" />
                            </span>
                            <span className="account">
                                {Tools.substringTx(account) || ''}
                            </span>
                        </div>
                    )} */}
                    </div>
                ) : (
                    <Drawer
                        title={
                            <>
                                <img
                                    onClick={() => showDrawer()}
                                    src={deflogo as any}
                                    alt="Definex"
                                />
                                <span>Definex</span>
                            </>
                        }
                        placement="top"
                        mask
                        className="menuMobile"
                        maskClosable
                        closable
                        height="auto"
                        onClose={onClose}
                        visible={visible}
                    >
                        {AppMenuMobile &&
                            AppMenuMobile.map((item: any, index: number) => {
                                return (
                                    <p
                                        key={`${item.key} ${index}`}
                                        onClick={() => jumpPage(item.url)}
                                    >
                                        {t(`${item.name}`) || ''}{' '}
                                        {item.childrenName || ''}
                                    </p>
                                );
                            })}
                    </Drawer>
                )}

                <div className="nav-Wallet-account">
                    <div className="balance">
                        <p>{balance || 0}</p>
                        <img src={deflogo as any} alt="Definex" />
                    </div>

                    <IsUnlockWallet ButClassNmae="account">
                        <span className="account">
                            {Tools.substringTx(account || '...') || '...'}
                        </span>
                        {/* <Typography.Paragraph
                            copyable
                            icon={null}
                            text={Tools.substringTx(account || '...') || '...'}
                        >
                            {' '}
                            <span className="account">
                                {Tools.substringTx(account || '...') || '...'}
                            </span>
                        </Typography.Paragraph> */}
                    </IsUnlockWallet>
                </div>
            </div>
        </header>
    );
};

export default connect()(PageHeader);
