import React, { useState, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button, notification, Spin, Statistic } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// import { useHistory } from 'react-router-dom';
import * as Tools from '../../../utils/Tools';
import SwitchBox from './SwitchBox';
import BorrowingModal from '../../../components/Modal/Borrowing';
import Polkadot from '../../../contract/polkadot';
import { Token_icon } from '../../../constants';
import Subtract from '../../../assets/subtract.svg';
import IsUnlockWallet from '../../../components/UnlockWallet/IsUnlockWallet';
import './Tablist.scss';
import CountContext from '../../../redux/createContext';

interface DataProps {
    props?: any;
    savingsLoading?: boolean;
    savingsLsit?: any[];
    updateSavingsLsit?: any;
    loansLsit?: any[];
    supplyLoading?: any;
    supplyLsit?: any[];
    updateSupplyLsit: any;
    // switchIndex?: (value: any) => any;
}

const Tablist = ({
    // props = null,
    savingsLoading = false,
    savingsLsit = [],
    updateSavingsLsit = () => {},
    loansLsit = [],
    supplyLoading = false,
    supplyLsit = [],
    updateSupplyLsit = () => {},
}: DataProps) => {
    const { t } = useTranslation();
    const { account } = useContext(CountContext);
    // const history = useHistory();
    // const { wallets } = props;
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [operationSavings, setOperationSavings] = useState(false);
    const [operationRepay, setOperationRepay] = useState(null);
    const [operationSupply, setOperationSupply] = useState(null);
    const [operationBorrow, setOperationBorrow] = useState(null);
    const [modalType, setModalType] = useState(2);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [tabType, setTabType] = useState(1);
    const [itemData, setItemData] = useState({});
    const showVisible = useCallback(() => {
        setVisible(true);
    }, []);
    const hideVisible = useCallback(() => {
        setVisible(false);
    }, []);
    const onTransferAllowCollateral = async (
        poolId: string,
        collateral: boolean,
        index: Number
    ) => {
        setOperationSavings(index);
        Polkadot.TransferAllowCollateral(
            account,
            poolId,
            collateral,
            () => {
                notification.info({
                    message: t('v1_Pendding'),
                });
            },
            () => {
                notification.success({
                    message: t('Success'),
                });
                updateSupplyLsit();
                setOperationSavings(null);
                setLoading(false);
                hideVisible();
            },
            () => {
                notification.error({
                    message: t('v1_Fail'),
                });
                setOperationSavings(null);
                setLoading(false);
                hideVisible();
            },
            () => {
                // 取消交易
                setOperationSavings(null);
                setLoading(false);
                hideVisible();
            }
        )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onTransferSupplyshow = async (item: any) => {
        setOperationSupply(item.id);
        let userPoolDebt = await Polkadot.GetUserPoolDebt(account, item.id);
        setItemData(Object.assign(item, userPoolDebt));
        setModalType(2);
        setTabType(1);
        userPoolDebt && showVisible();
        setOperationSupply(null);
    };

    // Supply
    const onTransferSupply = async (
        poolId: string,
        amount: string,
        collateral: boolean
    ) => {
        setLoading(true);
        await Polkadot.TransferSupply(
            account,
            poolId,
            amount,
            collateral,
            () => {
                notification.info({
                    message: t('v1_Pendding'),
                });
            },
            async () => {
                notification.success({
                    message: t('Success'),
                });
                updateSupplyLsit();
                setLoading(false);
                hideVisible();
            },
            () => {
                notification.error({
                    message: t('v1_Fail'),
                });
                setLoading(false);
                hideVisible();
            },
            () => {
                setLoading(false);
                hideVisible();
            }
        )
            .then((res) => {})
            .catch((err) => {
                setLoading(false);
                hideVisible();
            });
    };

    // Withdraw
    const onTransferWithdraw = async (poolId: string, amount: string) => {
        setLoading(true);
        await Polkadot.TransferWithdraw(
            account,
            poolId,
            amount,
            () => {
                notification.info({
                    message: t('v1_Pendding'),
                });
            },
            () => {
                notification.success({
                    message: t('Success'),
                });
                updateSavingsLsit();
                setLoading(false);
                hideVisible();
            },
            () => {
                notification.error({
                    message: t('v1_Fail'),
                });
                setLoading(false);
                hideVisible();
            },
            () => {
                setLoading(false);
                hideVisible();
            }
        )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                hideVisible();
            });
    };

    const onTransferBorrowshow = async (item: any) => {
        setOperationBorrow(item.id);
        let userPoolDebt = await Polkadot.GetUserPoolDebt(account, item.id);
        setItemData(Object.assign(item, userPoolDebt));
        setModalType(1);
        setTabType(1);
        userPoolDebt && showVisible();
        setOperationBorrow(null);
    };

    // Borrow
    const onTransferBorrow = async (poolId: string, amount: string) => {
        setLoading(true);
        await Polkadot.TransferBorrow(
            account,
            poolId,
            amount,
            () => {
                notification.info({
                    message: t('v1_Pendding'),
                });
            },
            () => {
                notification.success({
                    message: t('Success'),
                });
                updateSavingsLsit();
                setLoading(false);
                hideVisible();
            },
            () => {
                notification.error({
                    message: t('v1_Fail'),
                });
                setLoading(false);
                hideVisible();
            },
            () => {
                setLoading(false);
                hideVisible();
            }
        )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                hideVisible();
            });
    };

    const onTransferRepayShow = async (item: any) => {
        setOperationRepay(item.id);
        let userPoolDebt = await Polkadot.GetUserPoolDebt(account, item.id);
        setItemData(Object.assign(item, userPoolDebt));
        setModalType(1);
        setTabType(2);
        userPoolDebt && showVisible();
        setOperationRepay(null);
    };
    // Repay
    const onTransferRepay = async (poolId: string, amount: string) => {
        setLoading(true);
        await Polkadot.TransferRepay(
            account,
            poolId,
            amount,
            () => {
                notification.info({
                    message: t('v1_Pendding'),
                });
            },
            () => {
                notification.success({
                    message: t('Success'),
                });
                updateSavingsLsit();
                setLoading(false);
                hideVisible();
            },
            () => {
                notification.error({
                    message: t('v1_Fail'),
                });
                setLoading(false);
                hideVisible();
            },
            () => {
                setLoading(false);
                hideVisible();
            }
        )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                setLoading(false);
                hideVisible();
            });
    };

    return (
        <div className="tablist">
            <div className="my-date">
                <Row>
                    <Col lg={12} md={12} xs={24}>
                        <div className="data-item-4">
                            <div className="title">{t('Savings')}</div>
                            <table className="table">
                                <thead className="thead">
                                    <tr>
                                        <th>
                                            <span>{t('asset')}</span>
                                        </th>
                                        <th>{t('apy')}</th>
                                        <th>{t('supplyBalance')}</th>
                                        <th>{t('Collateral')}</th>
                                    </tr>
                                </thead>

                                <tbody className="tbody">
                                    {savingsLoading ? (
                                        <tr className="Skeleton">
                                            <td colSpan={4}></td>
                                        </tr>
                                    ) : savingsLsit && savingsLsit.length ? (
                                        <>
                                            {savingsLsit.map(
                                                (item: any, index: number) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <img
                                                                    src={`${Token_icon}${item.assetSymbol}.png`}
                                                                    onError={(
                                                                        e: any
                                                                    ) => {
                                                                        e.target.onerror =
                                                                            null;
                                                                        e.target.src =
                                                                            Subtract;
                                                                    }}
                                                                    alt="Definex"
                                                                />
                                                                <span>
                                                                    {item.assetSymbol ||
                                                                        '--'}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {item.supply_apy
                                                                    ? `${item.supply_apy}%`
                                                                    : '--'}
                                                            </td>
                                                            <td>
                                                                {item.supply_balance && (
                                                                    <Statistic
                                                                        value={
                                                                            item.isSavings
                                                                                ? Tools.numToStr(
                                                                                      item.collateral_balance
                                                                                  )
                                                                                : item.supply_balance
                                                                        }
                                                                    />
                                                                )}
                                                            </td>
                                                            <td className="collateral">
                                                                {index ===
                                                                operationSavings ? (
                                                                    <Spin
                                                                        indicator={
                                                                            antIcon
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <div
                                                                        className="switch-box"
                                                                        onClick={() => {
                                                                            onTransferAllowCollateral(
                                                                                item.id,
                                                                                !item.isSavings,
                                                                                index
                                                                            );
                                                                        }}
                                                                    >
                                                                        <SwitchBox
                                                                            state={
                                                                                item.isSavings
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="no-data">
                                                <div>{t('No_Data')}</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                    <Col lg={12} md={12} xs={24}>
                        <div className="data-item-3">
                            <div className="title">{t('Loans')}</div>
                            <table className="table">
                                <thead className="thead">
                                    <tr>
                                        <th>
                                            <span>{t('asset')}</span>
                                        </th>
                                        <th>{t('apy')}</th>
                                        <th>{t('BorrowBlance')}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="tbody">
                                    {savingsLoading ? (
                                        <tr className="Skeleton">
                                            <td colSpan={4}></td>
                                        </tr>
                                    ) : loansLsit && loansLsit.length ? (
                                        <>
                                            {loansLsit.map(
                                                (item: any, index: number) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <img
                                                                    src={`${Token_icon}${item.assetSymbol}.png`}
                                                                    onError={(
                                                                        e: any
                                                                    ) => {
                                                                        e.target.onerror =
                                                                            null;
                                                                        e.target.src =
                                                                            Subtract;
                                                                    }}
                                                                    alt="Definex"
                                                                />
                                                                <span>
                                                                    {item.assetSymbol ||
                                                                        '--'}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {item.borrow_apy
                                                                    ? `${item.borrow_apy}%`
                                                                    : '--'}
                                                            </td>
                                                            <td>
                                                                {item.loan_balance && (
                                                                    <Statistic
                                                                        value={
                                                                            item.loan_balance ||
                                                                            0
                                                                        }
                                                                    />
                                                                )}
                                                            </td>
                                                            <td>
                                                                <IsUnlockWallet ButClassNmae="action-buttons">
                                                                    <Button
                                                                        type="primary"
                                                                        className="action-buttons"
                                                                        loading={
                                                                            item.id ===
                                                                            operationRepay
                                                                        }
                                                                        onClick={() => {
                                                                            onTransferRepayShow(
                                                                                item
                                                                            );
                                                                        }}
                                                                    >
                                                                        {t(
                                                                            'Repay'
                                                                        )}
                                                                    </Button>
                                                                </IsUnlockWallet>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </>
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="no-data">
                                                <div>{t('No_Data')}</div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col lg={12} md={12} xs={24}>
                    <div className="data-item-4">
                        <div className="title">{t('supplyMarkets')}</div>
                        <table className="table">
                            <thead className="thead">
                                <tr>
                                    <th>
                                        <span>{t('asset')}</span>
                                    </th>
                                    <th>{t('apy')}</th>
                                    <th>{t('wallet')}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                {supplyLoading ? (
                                    <tr className="Skeleton">
                                        <td colSpan={4}></td>
                                    </tr>
                                ) : supplyLsit && supplyLsit.length ? (
                                    <>
                                        {supplyLsit.map(
                                            (item: any, index: number) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img
                                                                src={`${Token_icon}${item.assetSymbol}.png`}
                                                                onError={(
                                                                    e: any
                                                                ) => {
                                                                    e.target.onerror =
                                                                        null;
                                                                    e.target.src =
                                                                        Subtract;
                                                                }}
                                                                alt="Definex"
                                                            />
                                                            <span>
                                                                {item.assetSymbol ||
                                                                    '--'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {item.supply_apy
                                                                ? `${item.supply_apy}%`
                                                                : '--'}
                                                        </td>
                                                        <td>
                                                            {item.assetBalance && (
                                                                <Statistic
                                                                    value={
                                                                        item.assetBalance ||
                                                                        0
                                                                    }
                                                                />
                                                            )}
                                                        </td>
                                                        <td className="collateral">
                                                            <IsUnlockWallet ButClassNmae="action-buttons">
                                                                <Button
                                                                    type="primary"
                                                                    className="action-buttons"
                                                                    loading={
                                                                        item.id ===
                                                                        operationSupply
                                                                    }
                                                                    onClick={() => {
                                                                        onTransferSupplyshow(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    {t(
                                                                        'Supply'
                                                                    )}
                                                                </Button>
                                                            </IsUnlockWallet>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="no-data">
                                            <div>{t('No_Data')}</div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Col>
                <Col lg={12} md={12} xs={24}>
                    <div className="data-item-3">
                        <div className="title">{t('borrowMarkets')}</div>
                        <table className="table">
                            <thead className="thead">
                                <tr>
                                    <th>
                                        <span>{t('asset')}</span>
                                    </th>
                                    <th>{t('apy')}</th>
                                    <th>{t('liquidity')}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                {supplyLoading ? (
                                    <tr className="Skeleton">
                                        <td colSpan={4}></td>
                                    </tr>
                                ) : supplyLsit && supplyLsit.length ? (
                                    <>
                                        {supplyLsit.map(
                                            (item: any, index: number) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img
                                                                src={`${Token_icon}${item.assetSymbol}.png`}
                                                                onError={(
                                                                    e: any
                                                                ) => {
                                                                    e.target.onerror =
                                                                        null;
                                                                    e.target.src =
                                                                        Subtract;
                                                                }}
                                                                alt="Definex"
                                                            />
                                                            <span>
                                                                {item.assetSymbol ||
                                                                    '--'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {item.borrow_apy
                                                                ? `${item.borrow_apy}%`
                                                                : '--'}
                                                        </td>
                                                        <td>
                                                            {item.liquidity ? (
                                                                <Statistic
                                                                    prefix={'$'}
                                                                    value={
                                                                        item.liquidity ||
                                                                        0
                                                                    }
                                                                />
                                                            ) : (
                                                                '--'
                                                            )}
                                                        </td>
                                                        <td>
                                                            <IsUnlockWallet ButClassNmae="action-buttons">
                                                                <Button
                                                                    type="primary"
                                                                    className="action-buttons"
                                                                    loading={
                                                                        item.id ===
                                                                        operationBorrow
                                                                    }
                                                                    onClick={() => {
                                                                        onTransferBorrowshow(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    {t(
                                                                        'Borrow'
                                                                    )}
                                                                </Button>
                                                            </IsUnlockWallet>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="no-data">
                                            <div>{t('No_Data')}</div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
            {visible && (
                <BorrowingModal
                    loading={loading}
                    data={itemData || {}}
                    tabType={tabType}
                    visible={visible}
                    closeModal={() => {
                        setLoading(false);
                        hideVisible();
                    }}
                    modalType={modalType}
                    onRepay={(
                        poolId: string,
                        amount: string,
                        decimals: string
                    ) => {
                        onTransferRepay(
                            poolId,
                            Tools.numDulDecimals(amount, decimals)
                        );
                    }}
                    onBorrow={(
                        poolId: string,
                        amount: string,
                        decimals: string
                    ) => {
                        onTransferBorrow(
                            poolId,
                            Tools.numDulDecimals(amount, decimals)
                        );
                    }}
                    onSupply={(
                        poolId: string,
                        amount: string,
                        collateral: boolean,
                        decimals: string
                    ) => {
                        onTransferSupply(
                            poolId,
                            Tools.numDulDecimals(amount, decimals),
                            collateral
                        );
                    }}
                    onWithdraw={(
                        poolId: string,
                        amount: string,
                        decimals: string
                    ) => {
                        onTransferWithdraw(
                            poolId,
                            Tools.numDulDecimals(amount, decimals)
                        );
                    }}
                />
            )}
        </div>
    );
};

export default Tablist;
