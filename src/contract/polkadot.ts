import providerType from '../config/type.json';
import rpc from '../config/rpc.json';
import { message } from 'antd';
import config from '../config';
import * as Tools from '../utils/Tools';

import {
    isWeb3Injected,
    web3Accounts,
    web3Enable,
    web3FromAddress,
} from '@polkadot/extension-dapp';

web3Enable('polkadot-js/apps');
const { ApiPromise, WsProvider } = require('@polkadot/api');

class Polkadot {
    /** 初始化API
     *
     * @param {*}
     * @param {*}
     */
    async INITAPI() {
        try {
            // 创建 api 对象
            // wss://node2.definex.io/
            // ws://10.200.21.135:9944/
            // wss://rpc.polkadot.io
            // const wsProvider = new WsProvider('wss://rpc.polkadot.io');
            // const api = await ApiPromise.create({ provider: wsProvider });
            // 简单测试-读取常量
            const wsProvider = new WsProvider(config.PROVIDER_SOCKET);
            const api = await ApiPromise.create({
                provider: wsProvider,
                types: providerType,
                rpc: rpc,
            });
            return api;
        } catch (e) {
            return {};
        }
    }
    /** 处理返回状态
     *
     * @param {*}
     * @param {*}
     */
    async TransferResultStatus(
        result: any,
        pendCallback: any,
        succCallback: any,
        errorCallback: any,
        cancelledCallback: any
    ) {
        try {
            if (result.status.isInBlock) {
                console.log('isInBlock');
                pendCallback();
            } else if (result.status.isFinalized) {
                console.log('isFinalized');
                succCallback();
            } else if (
                result.status.isError ||
                result.status.isWarning ||
                result.status.isInvalid ||
                result.status.isFinalityTimeout
            ) {
                errorCallback();
            }
        } catch (e) {
            return false;
        }
    }
    /** 处理返回错误
     *
     * @param {*}
     * @param {*}
     */
    async ISErrorMsg(err: any, errorCallback: any) {
        try {
            let errCode = err.toString().trim().split(' ')[
                err.toString().trim().split(' ').length - 1
            ];
            switch (errCode) {
                case 'Cancelled':
                    console.log(errCode);
                    message.warning('Cancel the deal！！！');
                    errorCallback();
                    break;
                default:
                    errorCallback();
                    return errCode;
            }
        } catch (e) {
            return {};
        }
    }
    /** 初始化API
     *
     * @param {*}
     * @param {*}
     */
    async login() {
        try {
            if (!isWeb3Injected) {
                throw new Error('Please install/unlock the MathWallet first');
            }
            // meta.source contains the name of the extension that provides this account
            const allAccounts = await web3Accounts();
            return allAccounts;
        } catch (e) {
            return 'failure';
        }
    }
    /** 初始化API
     *
     * @param {*}
     * @param {*}
     */
    async getUserBalance(address: String) {
        try {
            const API: any = window && (window as any).INITAPI;
            const user = await API.query.system.account(address);
            return Tools.fmtDec(
                Tools.numDivDecimals(
                    user.data.free.toString(),
                    Number(user.registry.chainDecimals.toString())
                ),
                4
            );
        } catch (e) {
            return 0;
        }
    }
    /**
     * 储蓄列表
     * @param {*}
     * @param {*}
     */
    async getSavingsPoolList(address: string) {
        try {
            const RPCLoanpool: any = window && (window as any).RPCLoanpool;
            const PoolList =
                RPCLoanpool && (await RPCLoanpool.getPoolList(address, 0, 5));
            const list: any[] = [];

            console.log(PoolList);

            PoolList &&
                PoolList.forEach((item: any, index: number) => {
                    list.push({
                        index: index,
                        id: item.id.toString(),
                        assetId: item.asset_id.toString(),
                        assetBalance: item.asset_balance.toString(),
                        assetSymbol: item.asset_symbol.toString(),
                        assetDecimals: item.asset_decimals.toString(),
                        utilization_rate: item.utilization_rate.toString(),
                        supply_balance: Tools.numToStr(
                            Tools.fmtDec(
                                Tools.mul(item.supply_balance.toString(), 100),
                                9
                            )
                        ),
                        collateral_balance: Tools.fmtDec(
                            Tools.numToStr(item.collateral_balance.toString()),
                            item.asset_decimals.toString()
                        ),
                        loan_balance: item.loan_balance.toString(),
                        total_supply: item.total_supply.toString(),
                        total_borrowed: item.total_borrowed.toString(),
                        liquidity: Tools.fmtDec(
                            item.liquidity_value.toString(),
                            2
                        ),
                        supply_apy: Tools.fmtDec(
                            Tools.mul(item.supply_apy.toString(), 100),
                            4
                        ),
                        borrow_apy: Tools.fmtDec(
                            Tools.mul(item.borrow_apy.toString(), 100),
                            4
                        ),
                        isSavings: Tools.GE(
                            Number(item.supply_balance.toString()),
                            0
                        ),
                    });
                });
            return list;
        } catch (e) {
            console.log(e);
            return [];
        }
    }
    /**
     * 用户储蓄列表
     * @param {*}
     * @param {*}
     */
    async getUserSuppliedPools(address: string) {
        try {
            const RPCLoanpool: any = window && (window as any).RPCLoanpool;
            const savingsList: any[] = [];
            const loansList: any[] = [];
            const PoolList =
                RPCLoanpool && (await RPCLoanpool.getUserSupplyPools(address));

            // console.log(Tools.numToStr(7e-9));
            // console.log(PoolList[1].supply_balance.toString());

            // if supply_balance >0  1暗
            // if collateral_balance > 0 1 亮
            PoolList.forEach((item: any, index: number) => {
                if (item.supply_balance.toString() > 0) {
                    console.log(item.supply_balance.toString());
                    savingsList.push({
                        index: index,
                        id: item.id.toString(),
                        assetId: item.asset_id.toString(),
                        assetBalance: item.asset_balance.toString(),
                        assetSymbol: item.asset_symbol.toString(),
                        assetDecimals: item.asset_decimals.toString(),
                        utilization_rate: item.utilization_rate.toString(),
                        // supply_balance: Tools.numToStr(
                        //     Tools.fmtDec(
                        //         Tools.mul(item.supply_balance.toString(), 100),
                        //         9
                        //     )
                        // ),
                        supply_balance: Tools.fmtDec(
                            Tools.numToStr(item.supply_balance.toString()),
                            9
                        ),
                        collateral_balance: Tools.fmtDec(
                            Tools.numToStr(item.collateral_balance.toString()),
                            item.asset_decimals.toString()
                        ),
                        loan_balance: item.loan_balance.toString(),
                        total_supply: item.total_supply.toString(),
                        total_borrowed: item.total_borrowed.toString(),
                        liquidity: item.liquidity_value.toString(),
                        supply_apy: Tools.fmtDec(
                            Tools.mul(item.supply_apy.toString(), 100),
                            4
                        ),
                        borrow_apy: Tools.fmtDec(
                            Tools.mul(item.borrow_apy.toString(), 100),
                            4
                        ),
                        isSavings: false,
                    });
                }

                if (item.collateral_balance.toString() > 0) {
                    console.log(
                        Tools.fmtDec(
                            Tools.numToStr(item.collateral_balance.toString()),
                            item.asset_decimals.toString()
                        )
                    );

                    savingsList.push({
                        index: index,
                        id: item.id.toString(),
                        assetId: item.asset_id.toString(),
                        assetBalance: item.asset_balance.toString(),
                        assetSymbol: item.asset_symbol.toString(),
                        assetDecimals: item.asset_decimals.toString(),
                        utilization_rate: item.utilization_rate.toString(),
                        supply_balance: Tools.numToStr(
                            Tools.fmtDec(
                                item.supply_balance.toString(),
                                item.asset_decimals.toString()
                            )
                        ),
                        collateral_balance: Tools.fmtDec(
                            Tools.numToStr(item.collateral_balance.toString()),
                            item.asset_decimals.toString()
                        ),
                        loan_balance: item.loan_balance.toString(),
                        total_supply: item.total_supply.toString(),
                        total_borrowed: item.total_borrowed.toString(),
                        liquidity: item.liquidity_value.toString(),
                        supply_apy: Tools.fmtDec(
                            Tools.mul(item.supply_apy.toString(), 100),
                            4
                        ),
                        borrow_apy: Tools.fmtDec(
                            Tools.mul(item.borrow_apy.toString(), 100),
                            4
                        ),
                        isSavings: true,
                    });

                    console.log(savingsList);
                }

                if (Tools.GT(Number(item.loan_balance.toString()), 0)) {
                    loansList.push({
                        index: index,
                        id: item.id.toString(),
                        assetId: item.asset_id.toString(),
                        assetBalance: item.asset_balance.toString(),
                        assetSymbol: item.asset_symbol.toString(),
                        assetDecimals: item.asset_decimals.toString(),
                        utilization_rate: item.utilization_rate.toString(),
                        supply_balance: Tools.numToStr(
                            Tools.fmtDec(
                                Tools.mul(item.supply_balance.toString(), 100),
                                9
                            )
                        ),
                        collateral_balance: Tools.fmtDec(
                            Tools.numToStr(item.collateral_balance.toString()),
                            item.asset_decimals.toString()
                        ),
                        loan_balance: Tools.plus(
                            item.loan_balance.toString(),
                            Tools.fmtDec(
                                Tools.div(item.loan_balance.toString(), 1000),
                                9
                            )
                        ),
                        total_supply: item.total_supply.toString(),
                        total_borrowed: item.total_borrowed.toString(),
                        liquidity: item.liquidity_value.toString(),
                        supply_apy: Tools.fmtDec(
                            Tools.mul(item.supply_apy.toString(), 100),
                            4
                        ),
                        borrow_apy: Tools.fmtDec(
                            Tools.mul(item.borrow_apy.toString(), 100),
                            4
                        ),
                    });
                }
            });
            return { savingsList, loansList };
        } catch (e) {
            console.log(e);
            return {};
        }
    }
    /**
     * 用户AllowCollateral
     * @param {*}
     * @param {*}
     */
    async TransferAllowCollateral(
        account: any,
        poolId: string,
        collateral: boolean,
        pendCallback: any,
        succCallback: any,
        errorCallback: any,
        cancelledCallback: any
    ) {
        try {
            const API: any = window && (window as any).INITAPI;
            const injector = await web3FromAddress(account);
            API.setSigner(injector.signer);
            return await API.tx.loanPool
                .allowCollateral(poolId, collateral)
                .signAndSend(account, (result: any) => {
                    try {
                        if (result.status.isInBlock) {
                            pendCallback();
                        } else if (result.status.isFinalized) {
                            succCallback();
                        } else if (
                            result.status.isError ||
                            result.status.isWarning ||
                            result.status.isInvalid ||
                            result.status.isFinalityTimeout
                        ) {
                            errorCallback();
                        }
                    } catch (err) {
                        cancelledCallback();
                    }
                });
        } catch (err) {
            console.log(err);
            this.ISErrorMsg(err, cancelledCallback());
            return {};
        }
    }
    /**
     * 用户 liquidate
     * @param {*}
     * @param {*}
     */
    async TransferLiquidate(
        account: any,
        poolId: string,
        collateral: boolean,
        pendCallback: any,
        succCallback: any,
        errorCallback: any,
        cancelledCallback: any
    ) {
        try {
            const API: any = window && (window as any).INITAPI;
            const injector = await web3FromAddress(account);
            API.setSigner(injector.signer);
            return await API.tx.loanPool
                .liquidate('1', true)
                .signAndSend(account, (result: any) => {
                    try {
                        if (result.status.isInBlock) {
                            pendCallback();
                        } else if (result.status.isFinalized) {
                            succCallback();
                        } else if (
                            result.status.isError ||
                            result.status.isWarning
                        ) {
                            errorCallback();
                        } else if (
                            result.status.isError ||
                            result.status.isWarning ||
                            result.status.isInvalid ||
                            result.status.isFinalityTimeout
                        ) {
                            cancelledCallback();
                        }
                    } catch (err) {
                        cancelledCallback();
                    }
                });
        } catch (err) {
            console.log(err);
            this.ISErrorMsg(err, cancelledCallback());
            return {};
        }
    }
    /**
     * 用户borrow
     * @param {*}
     * @param {*}
     */
    async TransferBorrow(
        account: any,
        poolId: string,
        amount: string,
        pendCallback: any,
        succCallback: any,
        errorCallback: any,
        cancelledCallback: any
    ) {
        try {
            const API: any = window && (window as any).INITAPI;
            const injector = await web3FromAddress(account);
            API.setSigner(injector.signer);
            console.log('TransferBorrow', poolId, amount);
            return await API.tx.loanPool
                .borrow(poolId, amount)
                .signAndSend(account, (result: any) => {
                    try {
                        if (result.status.isInBlock) {
                            pendCallback();
                        } else if (result.status.isFinalized) {
                            succCallback();
                        } else if (
                            result.status.isError ||
                            result.status.isWarning ||
                            result.status.isInvalid ||
                            result.status.isFinalityTimeout
                        ) {
                            errorCallback();
                        }
                    } catch (err) {
                        cancelledCallback();
                    }
                });
        } catch (err) {
            console.log(err);
            this.ISErrorMsg(err, cancelledCallback());
            return {};
        }
    }
    /**
     * 用户repay
     * @param {*}
     * @param {*}
     */
    async TransferRepay(
        account: any,
        poolId: string,
        amount: string,
        pendCallback: any,
        succCallback: any,
        errorCallback: any,
        cancelledCallback: any
    ) {
        try {
            const API: any = window && (window as any).INITAPI;
            const injector = await web3FromAddress(account);
            API.setSigner(injector.signer);
            return await API.tx.loanPool
                .repay(poolId, amount)
                .signAndSend(account, (result: any) => {
                    console.log(result);

                    try {
                        if (result.status.isInBlock) {
                            pendCallback();
                        } else if (result.status.isFinalized) {
                            succCallback();
                        } else if (
                            result.status.isError ||
                            result.status.isWarning ||
                            result.status.isInvalid ||
                            result.status.isFinalityTimeout
                        ) {
                            errorCallback();
                        }
                    } catch (err) {
                        cancelledCallback();
                    }
                });
        } catch (err) {
            console.log(err);
            this.ISErrorMsg(err, cancelledCallback());
            return {};
        }
    }
    /**
     * 用户 supply
     * @param {*}
     * @param {*}
     */
    async TransferSupply(
        account: any,
        poolId: string,
        amount: string,
        collateral: boolean,
        pendCallback: any,
        succCallback: any,
        errorCallback: any,
        cancelledCallback: any
    ) {
        try {
            const API: any = window && (window as any).INITAPI;
            const injector = await web3FromAddress(account);
            API.setSigner(injector.signer);
            return await API.tx.loanPool
                .supply(poolId, amount, collateral)
                .signAndSend(account, (result: any) => {
                    console.log(result.status);
                    try {
                        if (result.status.isInBlock) {
                            pendCallback();
                        } else if (result.status.isFinalized) {
                            succCallback();
                        } else if (
                            result.status.isError ||
                            result.status.isWarning ||
                            result.status.isInvalid ||
                            result.status.isFinalityTimeout
                        ) {
                            errorCallback();
                        }
                    } catch (err) {
                        console.log(err);
                        cancelledCallback();
                    }
                });
        } catch (err) {
            console.log(err);
            this.ISErrorMsg(err, cancelledCallback());
            return {};
        }
    }
    /**
     * 用户 withdraw
     * @param {*}
     * @param {*}
     */
    async TransferWithdraw(
        account: any,
        poolId: string,
        amount: string,
        pendCallback: any,
        succCallback: any,
        errorCallback: any,
        cancelledCallback: any
    ) {
        try {
            const API: any = window && (window as any).INITAPI;
            const injector = await web3FromAddress(account);
            API.setSigner(injector.signer);
            return await API.tx.loanPool
                .withdraw(poolId, amount)
                .signAndSend(account, (result: any) => {
                    try {
                        if (result.status.isInBlock) {
                            pendCallback();
                        } else if (result.status.isFinalized) {
                            succCallback();
                        } else if (
                            result.status.isError ||
                            result.status.isWarning ||
                            result.status.isInvalid ||
                            result.status.isFinalityTimeout
                        ) {
                            errorCallback();
                        }
                    } catch (err) {
                        cancelledCallback();
                    }
                });
        } catch (err) {
            console.log(err);
            this.ISErrorMsg(err, cancelledCallback());
            return {};
        }
    }

    /**
     * 用户 createPool
     * @param {*}
     * @param {*}
     */
    async TransferCreatePool(
        account: any,
        pendCallback: any,
        succCallback: any,
        errorCallback: any,
        cancelledCallback: any
    ) {
        try {
            const API: any = window && (window as any).INITAPI;
            const injector = await web3FromAddress(account);
            API.setSigner(injector.signer);
            return await API.tx.loanPool
                .createPool('1', true)
                .signAndSend(account, (result: any) => {
                    try {
                        if (result.status.isInBlock) {
                            pendCallback();
                        } else if (result.status.isFinalized) {
                            succCallback();
                        } else if (
                            result.status.isError ||
                            result.status.isWarning
                        ) {
                            errorCallback();
                        } else if (
                            result.status.isError ||
                            result.status.isWarning ||
                            result.status.isInvalid ||
                            result.status.isFinalityTimeout
                        ) {
                            cancelledCallback();
                        }
                    } catch (err) {
                        cancelledCallback();
                    }
                });
        } catch (err) {
            console.log(err);
            this.ISErrorMsg(err, errorCallback());
            return {};
        }
    }

    /**
     * 用户 createPool
     * @param {*}
     * @param {*}
     */
    async GetUserPoolDebt(account: any, poolId: string) {
        try {
            const API: any = window && (window as any).INITAPI;
            const userPoolDebt = await API.rpc.loanpool.getAccountStateInPool(
                poolId,
                account
            );

            return {
                supply_balance: Tools.numToStr(
                    Tools.fmtDec(
                        Tools.mul(userPoolDebt.supply_balance.toString(), 100),
                        9
                    )
                ),
                supply_apy: Tools.fmtDec(
                    Tools.mul(userPoolDebt.supply_apy.toString(), 100),
                    9
                ),
                borrow_apy: Tools.fmtDec(
                    Tools.mul(userPoolDebt.borrow_apy.toString(), 100),
                    9
                ),
                borrow_balance: Tools.fmtDec(
                    userPoolDebt.borrow_balance.toString(),
                    9
                ),
                DistributionAPY: Tools.fmtDec(
                    userPoolDebt.distribution_apy.toString(),
                    9
                ),
                borrow_limit_balance: Tools.fmtDec(
                    userPoolDebt.borrow_limit_balance.toString(),
                    9
                ),
                total_borrow_value_limit: Tools.fmtDec(
                    userPoolDebt.total_borrow_value_limit.toString(),
                    9
                ),
                withdraw_limit_balance: Tools.fmtDec(
                    userPoolDebt.withdraw_limit_balance.toString(),
                    9
                ),
                asset_decimals: userPoolDebt.asset_decimals.toString(),
                asset_balance: Tools.fmtDec(
                    userPoolDebt.asset_balance.toString(),
                    9
                ),
                BorrowLimitUsed: Tools.fmtDec(
                    Tools.mul(
                        Tools.div(
                            userPoolDebt.total_borrow_value.toString(),
                            userPoolDebt.total_borrow_value_limit.toString()
                        ),
                        100
                    ),
                    9
                ),

                borrow_protocol_balance: Tools.fmtDec(
                    userPoolDebt.borrow_protocol_balance.toString(),
                    9
                ),
            };
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

export default new Polkadot();
