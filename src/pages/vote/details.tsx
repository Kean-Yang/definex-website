import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from 'antd';
import { useHistory } from 'react-router-dom';
// import UnlockWalletpage from '../../components/UnlockWallet/UnlockWalletpage';
import Overview from '../../assets/overview.png';
import Success from '../../assets/success.svg';
// import * as Tools from '../../utils/Tools';
import './details.scss';

const VoteDetails = () => {
    const { t } = useTranslation();
    const history = useHistory();
    // const [balance, setBalance] = useState(0); //  余额
    // const [visible, setVisible] = useState(false);
    // const [apy, setApy] = useState(0); // APY
    // const [available, setAvailable] = useState(0); // 售卖中
    // const [user, setUser] = useState({}); // 用户余额
    // const [disabled, setDisabled] = useState(true); // 按钮状态
    // const showVisible = useCallback(() => {
    //     setVisible(true);
    // }, []);
    // const hideVisible = useCallback(() => {
    //     setVisible(false);
    // }, []);

    // useEffect(() => {
    //     // other code
    //     if (account && status === 'connected') {
    //         const getAlldata = async () => {};
    //         getAlldata();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [status, account]);

    return (
        <div className="vote-details">
            {/* {wallet && !account ? (
                <UnlockWalletpage />
            ) : ( */}
            <>
                <div className="content">
                    <div className="back" onClick={() => history.push(`/vote`)}>
                        <img src={Overview as any} alt="Definex" />
                        {t('Overview')}
                    </div>

                    <div className="content-title">
                        <div className="content-title-left">
                            <p>Test Proposals</p>
                            <div className="desc">
                                <span>Active</span>
                                Executed February 10th, 2021
                            </div>
                        </div>
                        <div className="content-title-right">
                            <p>{t('Someone')}</p>
                            <p>Test Proposals</p>
                        </div>
                    </div>

                    <Row className="data-list">
                        <Col lg={12} md={12} xs={24}>
                            <div className="item-data">
                                <div className="data-title">
                                    <span>{t('For')}</span>
                                    <span>0</span>
                                </div>
                                <div className="progress">
                                    <span style={{ width: '20%' }}></span>
                                </div>

                                <div className="tab-title">
                                    <span>{t('Address')}</span>
                                    <span>{t('Votes')}</span>
                                </div>
                                <ul>
                                    <li className="item">
                                        <span>Test Proposals</span>
                                        <span>Executed</span>
                                    </li>
                                    <li className="item">
                                        <span>Test Proposals</span>
                                        <span>Executed</span>
                                    </li>
                                </ul>
                                <Button type="text" className="all">
                                    {t('ViewAll')}
                                </Button>
                            </div>
                        </Col>
                        <Col lg={12} md={12} xs={24}>
                            <div className="item-data item-data-active">
                                <div className="data-title">
                                    <span>{t('Against')}</span>
                                    <span>0</span>
                                </div>
                                <div className="progress">
                                    <span style={{ width: '20%' }}></span>
                                </div>

                                <div className="tab-title">
                                    <span>{t('Address')}</span>
                                    <span>{t('Votes')}</span>
                                </div>
                                <ul>
                                    <li className="item">
                                        <div className="item-left">
                                            Test Proposals
                                        </div>
                                        <div className="item-right">
                                            Executed
                                        </div>
                                    </li>
                                    <li className="item">
                                        <div className="item-left">
                                            Test Proposals
                                        </div>
                                        <div className="item-right">
                                            Executed
                                        </div>
                                    </li>
                                </ul>
                                <Button
                                    type="text"
                                    className="disabled"
                                    disabled
                                >
                                    {t('ViewAll')}
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={17} md={17} xs={24}>
                            <div className="datail">
                                <div className="title">{t('Detail')}</div>
                                <ul>
                                    <li>Test Proposals</li>
                                    <li>Test Proposals</li>
                                </ul>
                                <div className="summary">
                                    <p>Summary</p>
                                    <span>something test.</span>
                                </div>
                            </div>
                        </Col>
                        <Col lg={7} md={7} xs={24}>
                            <div className="history">
                                <div className="title">
                                    {t('ProposalHistory')}
                                </div>
                                <ul>
                                    <li className="item">
                                        <div className="item-left">
                                            <img
                                                src={Success as any}
                                                alt="Definex"
                                            />
                                        </div>
                                        <div className="item-right">
                                            <p>{t('Created')}</p>
                                            <div>Executed</div>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <div className="item-left">
                                            <img
                                                src={Success as any}
                                                alt="Definex"
                                            />
                                        </div>
                                        <div className="item-right">
                                            <p>{t('Active')}</p>
                                            <div>Executed</div>
                                        </div>
                                    </li>
                                    <li className="item">
                                        <div className="item-left">
                                            <img
                                                src={Success as any}
                                                alt="Definex"
                                            />
                                        </div>
                                        <div className="item-right">
                                            <p>{t('Successed')}</p>
                                            <div>Executed</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
            {/* )} */}
        </div>
    );
};

export default VoteDetails;
