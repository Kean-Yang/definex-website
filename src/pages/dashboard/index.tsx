import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Progress } from 'antd';
import Tablist from './components/Tablist';
import SwitchBox from './components/SwitchBox';
import Polkadot from '../../contract/polkadot';
import * as Tools from '../../utils/Tools';
import CountContext from '../../redux/createContext';
import './index.scss';
// import { useSubstrate } from '../../substrate-lib';
// import { constants } from 'buffer';

const Dashboard = () => {
    const { t } = useTranslation();
    // const TestContext = React.createContext({});
    const { account } = useContext(CountContext);
    // const allAccounts = await web3Accounts();
    // const { wallets } = props;
    // const [userBalance, setuserBalance] = useState(0); //  余额
    const [balance, setBalance] = useState({}); //  余额
    // const [userAddress, setUserAddress] = useState(''); //  余额
    // const [tabType, setTabType] = useState(0); //  余额
    const [isAPYwith, setIsAPYwith] = useState(true); //
    const [savingsLoading, setSavingsLoading] = useState(true); //  储蓄列表加载
    const [savingsLsit, setSavingsLsit] = useState([]); //  储蓄列表
    const [loansList, setLoansList] = useState([]); //  储蓄列表
    const [supplyLoading, setSupplyLoading] = useState(true); //  储蓄列表加载
    const [supplyLsit, setSupplyLsit] = useState([]); //  储蓄列表
    const RPCLoanpool = window && (window as any).RPCLoanpool;

    console.log(account);
    // 个人用户储蓄/借贷列表
    const getUserSuppliedPoolsList = async (account: string) => {
        setSavingsLoading(true);
        // 用户储蓄;
        const userSuppliedPoolsList = await Polkadot.getUserSuppliedPools(
            account
        );
        setSavingsLsit(
            (userSuppliedPoolsList && userSuppliedPoolsList.savingsList) || []
        );
        setLoansList(
            (userSuppliedPoolsList && userSuppliedPoolsList.loansList) || []
        );
        setSavingsLoading(false);
    };

    useEffect(() => {
        // other code
        if (account && RPCLoanpool) queryloan(account);
        if (account && RPCLoanpool) getUserSuppliedPoolsList(account);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account, RPCLoanpool]);

    useEffect(() => {
        if (account) getSavingsPoolList(account);
    }, [account, RPCLoanpool]);

    // 所有用户储蓄列表
    const getSavingsPoolList = async (account: any) => {
        // 用户储蓄;
        setSupplyLoading(true);
        const savingsPoolList = await Polkadot.getSavingsPoolList(account);
        setSupplyLsit(savingsPoolList);
        setSupplyLoading(false);
    };

    const queryloan = async (account: any) => {
        const getBalance =
            (RPCLoanpool &&
                (await RPCLoanpool.userTotalSupplyBorrowValues(account))) ||
            0;

        getBalance &&
            setBalance(
                {
                    supplyValue: Tools.fmtDec(
                        Number(getBalance.supply_value.toString()),
                        8
                    ),
                    borrowedValue: Tools.fmtDec(
                        Number(getBalance.borrowed_value.toString()),
                        8
                    ),
                    // canBorrowValue: getBalance.can_borrow_value.toString(),
                    progress: Tools.GE(
                        Tools.mul(
                            Number(
                                Tools.div(
                                    getBalance.borrowed_value.toString(),
                                    Tools.plus(
                                        getBalance.can_borrow_value.toString(),
                                        getBalance.borrowed_value.toString()
                                    )
                                )
                            ),
                            100
                        ),
                        100
                    )
                        ? 100
                        : Tools.mul(
                              Number(
                                  Tools.div(
                                      getBalance.borrowed_value.toString(),
                                      Tools.plus(
                                          getBalance.can_borrow_value.toString(),
                                          getBalance.borrowed_value.toString()
                                      )
                                  )
                              ),
                              100
                          ),
                    can_borrow_value: Tools.fmtDec(
                        getBalance.can_borrow_value.toString(),
                        8
                    ),
                } || {}
            );
    };

    return (
        <div className="dashboard">
            {/* {wallet && !account ? (
                <UnlockWalletpage />
            ) : ( */}
            <>
                <div className="apy">
                    <div className="balance">
                        <p className="title">{t('Supply_Value')}</p>
                        <p className="data">
                            {balance.supplyValue
                                ? `$${balance.supplyValue}`
                                : '--'}
                        </p>
                    </div>
                    <div className="net-apy">
                        <div className="proportion">
                            <p>0</p>
                            <p>{t('netAPY')}</p>
                        </div>
                        <div
                            className="switch-box"
                            onClick={() => {
                                setIsAPYwith(!isAPYwith);
                            }}
                        >
                            <SwitchBox state={isAPYwith} />
                        </div>

                        {isAPYwith ? (
                            <p className="dfn">{t('APYwithDFN')}</p>
                        ) : (
                            <p className="without">{t('APYwithoutDFN')}</p>
                        )}
                    </div>
                    <div className="balance">
                        <p className="title">{t('Borrow_Value')}</p>
                        <p className="data">
                            {balance.borrowedValue
                                ? `$${balance.borrowedValue}`
                                : '--'}
                        </p>
                    </div>
                </div>

                <div className="progress">
                    <span>
                        {t('BorrowLimitUsed_x', {
                            x: `${Tools.fmtDec(balance.progress, 2) || 0}%`,
                        })}
                    </span>
                    <Progress
                        strokeColor={{
                            from: '#E6007A',
                            to: '#E6007A',
                        }}
                        trailColor="rgba(16, 3, 31, 0.05)"
                        percent={balance.progress || 0}
                        showInfo={false}
                    />
                    <span>
                        {balance.can_borrow_value
                            ? `$${balance.can_borrow_value}`
                            : '--'}
                    </span>
                </div>
                <Tablist
                    // props={props}
                    savingsLoading={savingsLoading}
                    savingsLsit={savingsLsit}
                    updateSavingsLsit={() => {
                        if (account) {
                            queryloan(account);
                            getUserSuppliedPoolsList(account);
                            getSavingsPoolList(account);
                        }
                    }}
                    loansLsit={loansList}
                    supplyLsit={supplyLsit}
                    supplyLoading={supplyLoading}
                    updateSupplyLsit={() => {
                        if (account) {
                            queryloan(account);
                            getUserSuppliedPoolsList(account);
                            getSavingsPoolList(account);
                        }
                    }}
                />
            </>
            {/* )} */}
        </div>
    );
};

export default Dashboard;
