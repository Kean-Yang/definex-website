import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';
// import UnlockWalletpage from '../../components/UnlockWallet/UnlockWalletpage';
import Delegation from '../../components/Modal/Delegation';
import ConfirmTransaction from '../../components/Modal/ConfirmTransaction';
import DelegateVoting from '../../components/Modal/DelegateVoting';
import logo from '../../assets/icon/logosub.png';
// import * as Tools from '../../utils/Tools';
import './index.scss';

const Vote = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const [transactionVisible, setTransactionVisible] = useState(false);
    const [votingVisible, setVotingVisible] = useState(false);
    // const [balance, setBalance] = useState(0); //  余额
    // const [visible, setVisible] = useState(false);
    // const [apy, setApy] = useState(0); // APY
    // const [available, setAvailable] = useState(0); // 售卖中
    // const [user, setUser] = useState({}); // 用户余额
    // const [disabled, setDisabled] = useState(true); // 按钮状态
    // const showVisible = useCallback(() => {
    //     setVisible(true);
    // }, []);
    const hideVisible = useCallback(() => {
        setVisible(false);
    }, []);

    // const switchType = (val: number) => {
    //     console.log(val);
    //     if (val === 1) {
    //         setTransactionVisible(true);
    //     } else {
    //         setVotingVisible(true);
    //     }
    // };

    const jumpDetails = () => {
        history.push('/vote/details');
    };
    
    useEffect(() => {
        // other code
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="vote">
            {/* {wallet && !account ? (
                <UnlockWalletpage />
            ) : ( */}
            <>
                <div className="content">
                    <div className="votes">
                        <p className="title">{t('votes')}</p>
                        <p className="data">0.00000</p>
                    </div>
                    <Row>
                        <Col lg={8} md={8} xs={24}>
                            <div className="left">
                                <div className="title">
                                    {t('borrowMarkets')}
                                </div>
                                <div className="balance">
                                    <p>{t('DFNBalance')}</p>
                                    <div>
                                        <span>0.00000</span>
                                        <img src={logo as any} alt="Definex" />
                                    </div>
                                </div>
                                <div className="start">
                                    <p>{t('setupVoting')}</p>
                                    <p className="desc">
                                        {t('definexGovernance')}
                                    </p>
                                    <Button
                                        type="primary"
                                        className="action-buttons"
                                        onClick={() => setVisible(true)}
                                    >
                                        {t('getStart')}
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={16} md={16} xs={24}>
                            <div className="right">
                                <div className="title">
                                    {t('recentProposals')}
                                </div>
                                <ul>
                                    <li
                                        className="item"
                                        onClick={() => jumpDetails()}
                                    >
                                        <div className="item-left">
                                            <p>Test Proposals</p>
                                            <div className="desc">
                                                <span className="pass">
                                                    {t('pass')}
                                                </span>
                                                Executed February 10th, 2021
                                            </div>
                                        </div>
                                        <div className="item-right">
                                            Executed
                                        </div>
                                    </li>
                                    <li className="item">
                                        <div className="item-left">
                                            <p>Test Proposals</p>
                                            <div className="desc">
                                                <span className="no-pass">
                                                    {t('noPass')}
                                                </span>
                                                Executed February 10th, 2021
                                            </div>
                                        </div>
                                        <div className="item-right">
                                            Executed
                                        </div>
                                    </li>
                                </ul>
                                <Button type="text" className="all">
                                    {t('ViewAllProposals')}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
            {/* )} */}
            <Delegation
                visible={visible}
                closeModal={hideVisible}
                transaction={() => {
                    setTransactionVisible(true);
                }}
                voting={() => {
                    setVotingVisible(true);
                }}
            />
            <ConfirmTransaction
                visible={transactionVisible}
                closeModal={() => {
                    hideVisible();
                    setTransactionVisible(false);
                }}
            />
            <DelegateVoting
                visible={votingVisible}
                closeModal={() => {
                    hideVisible();
                    setVotingVisible(false);
                }}
            />
        </div>
    );
};

export default Vote;
