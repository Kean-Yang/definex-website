import React, { useState } from 'react';
import { Modal, InputNumber, Button, Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/icon/logosub.png';
import * as Tools from '../../utils/Tools';
import Subtract from '../../assets/subtract.svg';
import { Token_icon } from '../../constants';
import './Borrowing.scss';

interface DataProps {
    visible?: false | true; // 弹窗状态
    loading?: false | true; // 弹窗状态
    modalType?: number; // 1:借贷 2:供应撤回
    closeModal: () => any; // 关闭弹窗
    onSupply: (
        poolId: string,
        amount: string,
        collateral: boolean,
        decimals: any
    ) => any; // Supply、
    onWithdraw: (poolId: string, amount: string, decimals: any) => any;
    onBorrow: (poolId: string, amount: string, decimals: any) => any;
    onRepay: (poolId: string, amount: string, decimals: any) => any;
    tabType?: number; // 1:借贷 2:供应撤回
    data: any;
}

const BorrowingModal = ({
    visible = false,
    loading = false,
    modalType = 1,
    closeModal = () => {},
    onSupply = (
        poolId: string,
        amount: string,
        collateral: boolean,
        decimals: any
    ) => {},
    onWithdraw = (poolId: string, amount: string, decimals: any) => {},
    onBorrow = (poolId: string, amount: string, decimals: any) => {},
    onRepay = (poolId: string, amount: string, decimals: any) => {},
    tabType = 1,
    data = {},
}: DataProps) => {
    const { t } = useTranslation();
    const {
        supply_apy,
        id,
        assetDecimals,
        borrow_apy,
        borrow_limit_balance,
        BorrowLimitUsed,
        assetSymbol,
        asset_balance,
        withdraw_limit_balance,
        loan_balance,
        borrow_protocol_balance,
        DistributionAPY,
        // borrow_balance,
    } = data;
    // console.log(data);
    const [supply, setSupply] = useState(''); //
    const [withdraw, setWithdraw] = useState(''); //
    const [borrow, setBorrow] = useState(''); //
    const [repay, setRepay] = useState(''); //
    const [checkedCollateral, setCheckedCollateral] = useState(true); //
    const [tabIndex, setTabIndex] = useState(tabType || 1); // tab
    const onChangeTabIndex = (index: any) => {
        setTabIndex(index);
    };
    //
    const onChangeCollateral = (e: any) => {
        setCheckedCollateral(e.target.checked);
    };
    //
    const onMax = () => {
        if (tabIndex === 1 && modalType === 2) {
            setSupply(asset_balance);
        } else if (tabIndex === 2 && modalType === 2) {
            setWithdraw(withdraw_limit_balance);
        } else if (tabIndex === 1 && modalType === 1) {
            //  borrow_limit_balance，borrow_balance
            // setBorrow(Tools.sub(borrow_limit_balance, borrow_balance));

            console.log(Tools.sub(100, BorrowLimitUsed));
            console.log(Tools.mul(Tools.sub(100, BorrowLimitUsed), 100));
            console.log(assetDecimals);

            setBorrow(
                Tools.GE(BorrowLimitUsed, 100)
                    ? 0
                    : Tools.GE(
                          borrow_protocol_balance,
                          Tools.mul(
                              borrow_limit_balance,
                              Tools.div(Tools.sub(100, BorrowLimitUsed), 100)
                          )
                      )
                    ? Tools.fmtDec(
                          Tools.mul(
                              borrow_limit_balance,
                              Tools.div(Tools.sub(100, BorrowLimitUsed), 100)
                          ),
                          assetDecimals
                      )
                    : borrow_protocol_balance
            );
        } else {
            setRepay(
                Tools.GE(asset_balance, loan_balance)
                    ? loan_balance
                    : asset_balance
            );
        }
    };

    return (
        <Modal
            footer={null}
            title={null}
            visible={visible}
            centered
            closable={false}
            className="borrowing"
            keyboard
            mask
            maskClosable
            zIndex={999}
        >
            <div className="borrowing-content">
                <div className="title">
                    <div className="title-content">
                        <img
                            src={`${Token_icon}${assetSymbol}.png`}
                            onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = Subtract;
                            }}
                            alt="Definex"
                        />
                        <span>{assetSymbol || '--'}</span>
                    </div>
                    <CloseOutlined
                        className="close"
                        twoToneColor="#FFFFFF"
                        onClick={closeModal}
                    />
                </div>
                <div className="amount">
                    {tabIndex === 1 && modalType === 1 ? (
                        <InputNumber
                            autoFocus
                            stringMode
                            min={0}
                            max={
                                Tools.GE(BorrowLimitUsed, 100)
                                    ? 0
                                    : Tools.GE(
                                          borrow_protocol_balance,
                                          Tools.mul(
                                              borrow_limit_balance,
                                              Tools.div(
                                                  Tools.sub(
                                                      100,
                                                      BorrowLimitUsed
                                                  ),
                                                  100
                                              )
                                          )
                                      )
                                    ? Tools.mul(
                                          borrow_limit_balance,
                                          Tools.div(
                                              Tools.sub(100, BorrowLimitUsed),
                                              100
                                          )
                                      )
                                    : borrow_protocol_balance
                            }
                            type="number"
                            defaultValue={0}
                            placeholder={0}
                            bordered={false}
                            onChange={(value: any) => {
                                setBorrow(value);
                            }}
                            value={borrow}
                        />
                    ) : tabIndex === 2 && modalType === 1 ? (
                        <InputNumber
                            autoFocus
                            stringMode
                            min={0}
                            type="number"
                            defaultValue={0}
                            placeholder={0}
                            bordered={false}
                            onChange={(value: any) => {
                                setRepay(value);
                            }}
                            value={repay}
                        />
                    ) : tabIndex === 1 && modalType === 2 ? (
                        <InputNumber
                            autoFocus
                            stringMode
                            min={0}
                            max={Number(asset_balance)}
                            type="number"
                            defaultValue={0}
                            placeholder={0}
                            bordered={false}
                            onChange={(value: any) => {
                                setSupply(value);
                            }}
                            value={supply}
                        />
                    ) : (
                        <InputNumber
                            autoFocus
                            stringMode
                            min={0}
                            // max={
                            //     Tools.LT(withdraw_limit_balance, asset_balance)
                            //         ? Number(withdraw_limit_balance)
                            //         : Number(asset_balance)
                            // }
                            type="number"
                            defaultValue={0}
                            placeholder={0}
                            bordered={false}
                            onChange={(value: any) => {
                                setWithdraw(value);
                            }}
                            value={withdraw}
                        />
                    )}

                    <div className="max" onClick={onMax}>
                        {modalType === 2
                            ? tabIndex === 1
                                ? t('Max')
                                : t('SafeMax')
                            : tabIndex === 1
                            ? t('SafeMax')
                            : t('Max')}
                    </div>
                </div>
                <div className="tab">
                    <div className="tab-but">
                        {modalType === 1 ? (
                            <>
                                <Button
                                    className={tabIndex === 1 ? 'active' : ''}
                                    type="text"
                                    onClick={() => onChangeTabIndex(1)}
                                >
                                    {t('Borrow')}
                                </Button>
                                <Button
                                    className={tabIndex === 2 ? 'active' : ''}
                                    type="text"
                                    onClick={() => onChangeTabIndex(2)}
                                >
                                    {t('Repay')}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className={tabIndex === 1 ? 'active' : ''}
                                    type="text"
                                    onClick={() => onChangeTabIndex(1)}
                                >
                                    {t('Supply')}
                                </Button>
                                <Button
                                    className={tabIndex === 2 ? 'active' : ''}
                                    type="text"
                                    onClick={() => onChangeTabIndex(2)}
                                >
                                    {t('Withdraw')}
                                </Button>
                            </>
                        )}
                    </div>
                    <div className="tab-page">
                        {modalType === 1 && tabIndex === 1 ? (
                            <>
                                {/* Borrow */}
                                <div className="data-item">
                                    <div>
                                        <img
                                            src={`${Token_icon}${assetSymbol}.png`}
                                            onError={(e: any) => {
                                                e.target.onerror = null;
                                                e.target.src = Subtract;
                                            }}
                                            alt="Definex"
                                        />
                                        {t('BorrowAPY')}
                                    </div>
                                    <span>
                                        {borrow_apy
                                            ? `${
                                                  Tools.fmtDec(borrow_apy, 4) ||
                                                  0
                                              }%`
                                            : '--'}
                                    </span>
                                </div>
                                <div className="data-item">
                                    <div>
                                        <img src={logo as any} alt="Definex" />
                                        {t('DistributionAPY')}
                                    </div>
                                    <span>
                                        {DistributionAPY
                                            ? `${
                                                  Tools.fmtDec(
                                                      DistributionAPY,
                                                      4
                                                  ) || 0
                                              }%`
                                            : '--'}
                                    </span>
                                </div>
                                <div className="divider">
                                    <div className="data-item">
                                        <div>{t('BorrowLimit')}</div>
                                        <span>
                                            {Tools.fmtDec(
                                                borrow_limit_balance,
                                                4
                                            ) || 0}{' '}
                                            {assetSymbol}
                                        </span>
                                    </div>
                                    <div className="data-item">
                                        <div>{t('BorrowLimitUsed')}</div>
                                        <span>
                                            {BorrowLimitUsed
                                                ? `${
                                                      Tools.fmtDec(
                                                          BorrowLimitUsed,
                                                          4
                                                      ) || 0
                                                  }%`
                                                : '--'}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    className="but"
                                    type="text"
                                    loading={loading}
                                    onClick={() => {
                                        if (Tools.GT(Number(borrow), 0))
                                            onBorrow(id, borrow, assetDecimals);
                                    }}
                                >
                                    {t('Borrow')}
                                </Button>
                                <div className="data-item">
                                    <div>{t('ProtocolBalance')}</div>
                                    <span>
                                        {Tools.fmtDec(
                                            borrow_protocol_balance,
                                            4
                                        )}
                                        {assetSymbol}
                                    </span>
                                </div>
                            </>
                        ) : modalType === 1 && tabIndex === 2 ? (
                            <>
                                {/* Repay */}
                                <div className="data-item">
                                    <div>
                                        <img
                                            src={`${Token_icon}${assetSymbol}.png`}
                                            onError={(e: any) => {
                                                e.target.onerror = null;
                                                e.target.src = Subtract;
                                            }}
                                            alt="Definex"
                                        />
                                        {t('BorrowAPY')}
                                    </div>
                                    <span>
                                        {borrow_apy
                                            ? `${
                                                  Tools.fmtDec(borrow_apy, 4) ||
                                                  0
                                              }%`
                                            : '--'}
                                    </span>
                                </div>
                                <div className="data-item">
                                    <div>
                                        <img src={logo as any} alt="Definex" />
                                        {t('DistributionAPY')}
                                    </div>
                                    <span>
                                        {DistributionAPY
                                            ? `${
                                                  Tools.fmtDec(
                                                      DistributionAPY,
                                                      4
                                                  ) || 0
                                              }%`
                                            : '--'}
                                    </span>
                                </div>
                                <div className="divider">
                                    <div className="data-item">
                                        <div>{t('BorrowLimit')}</div>
                                        <span>
                                            {Tools.fmtDec(
                                                borrow_limit_balance,
                                                4
                                            ) || 0}{' '}
                                            {assetSymbol}
                                        </span>
                                    </div>
                                    <div className="data-item">
                                        <div>{t('BorrowLimitUsed')}</div>
                                        <span>
                                            {BorrowLimitUsed
                                                ? `${
                                                      Tools.fmtDec(
                                                          BorrowLimitUsed,
                                                          4
                                                      ) || 0
                                                  }%`
                                                : '--'}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    className="but"
                                    type="text"
                                    loading={loading}
                                    onClick={() => {
                                        if (Tools.GT(Number(repay), 0))
                                            onRepay(id, repay, assetDecimals);
                                    }}
                                >
                                    {t('Repay')}
                                </Button>
                                <div className="data-item">
                                    <div>{t('WalletBalance')}</div>
                                    <span>
                                        {Tools.fmtDec(asset_balance, 4)}
                                        {''}
                                        {assetSymbol}
                                    </span>
                                </div>
                            </>
                        ) : modalType === 2 && tabIndex === 1 ? (
                            <>
                                {/* Supply */}
                                <div className="data-item">
                                    <div>
                                        <img
                                            src={`${Token_icon}${assetSymbol}.png`}
                                            onError={(e: any) => {
                                                e.target.onerror = null;
                                                e.target.src = Subtract;
                                            }}
                                            alt="Definex"
                                        />
                                        {t('SupplyAPY')}
                                    </div>
                                    <span>
                                        {supply_apy
                                            ? `${
                                                  Tools.fmtDec(supply_apy, 4) ||
                                                  0
                                              }%`
                                            : '--'}
                                    </span>
                                </div>
                                <div className="data-item">
                                    <div>
                                        <img src={logo as any} alt="Definex" />
                                        {t('DistributionAPY')}
                                    </div>
                                    <span>
                                        {DistributionAPY
                                            ? `${
                                                  Tools.fmtDec(
                                                      DistributionAPY,
                                                      4
                                                  ) || 0
                                              }%`
                                            : '--'}
                                    </span>
                                </div>
                                <div className="divider">
                                    <div className="data-item">
                                        <div>{t('BorrowLimit')}</div>
                                        <span>
                                            {Tools.fmtDec(
                                                borrow_limit_balance,
                                                4
                                            ) || 0}{' '}
                                            {assetSymbol}
                                        </span>
                                    </div>
                                    <div className="data-item">
                                        <div>{t('BorrowLimitUsed')}</div>
                                        <span>
                                            {BorrowLimitUsed
                                                ? `${
                                                      Tools.fmtDec(
                                                          BorrowLimitUsed,
                                                          4
                                                      ) || 0
                                                  }%`
                                                : '--'}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    className="but"
                                    type="text"
                                    loading={loading}
                                    onClick={() => {
                                        if (Tools.GT(Number(supply), 0))
                                            onSupply(
                                                id,
                                                supply,
                                                checkedCollateral,
                                                assetDecimals
                                            );
                                    }}
                                >
                                    {t('Supply')}
                                </Button>
                                <div className="checkbox">
                                    <Checkbox
                                        defaultChecked={true}
                                        onChange={onChangeCollateral}
                                    >
                                        <p>Collateral</p>
                                    </Checkbox>
                                </div>
                                <div className="data-item">
                                    <div>{t('WalletBalance')}</div>
                                    <span>
                                        {Tools.fmtDec(asset_balance, 4)}
                                        {''}
                                        {assetSymbol}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Withdraw */}
                                <div className="data-item">
                                    <div>
                                        <img
                                            src={`${Token_icon}${assetSymbol}.png`}
                                            onError={(e: any) => {
                                                e.target.onerror = null;
                                                e.target.src = Subtract;
                                            }}
                                            alt="Definex"
                                        />
                                        {t('SupplyAPY')}
                                    </div>
                                    <span>
                                        {supply_apy
                                            ? `${
                                                  Tools.fmtDec(supply_apy, 4) ||
                                                  0
                                              }%`
                                            : '--'}
                                    </span>
                                </div>
                                <div className="data-item">
                                    <div>
                                        <img src={logo as any} alt="Definex" />
                                        {t('DistributionAPY')}
                                    </div>
                                    <span>
                                        {DistributionAPY
                                            ? `${
                                                  Tools.fmtDec(
                                                      DistributionAPY,
                                                      4
                                                  ) || 0
                                              }%`
                                            : '--'}
                                    </span>
                                </div>
                                <div className="divider">
                                    <div className="data-item">
                                        <div>{t('BorrowLimit')}</div>
                                        <span>
                                            {Tools.fmtDec(
                                                borrow_limit_balance,
                                                4
                                            ) || 0}{' '}
                                            {assetSymbol}
                                        </span>
                                    </div>
                                    <div className="data-item">
                                        <div>{t('BorrowLimitUsed')}</div>
                                        <span>
                                            {BorrowLimitUsed
                                                ? `${
                                                      Tools.fmtDec(
                                                          BorrowLimitUsed,
                                                          4
                                                      ) || 0
                                                  }%`
                                                : '--'}
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    className="but"
                                    type="text"
                                    loading={loading}
                                    onClick={() => {
                                        if (Tools.GT(Number(withdraw), 0))
                                            onWithdraw(
                                                id,
                                                withdraw,
                                                assetDecimals
                                            );
                                    }}
                                >
                                    {t('Withdraw')}
                                </Button>
                                <div className="data-item">
                                    <div>{t('ProtocolBalance')}</div>
                                    <span>
                                        {Tools.fmtDec(
                                            borrow_protocol_balance,
                                            4
                                        )}
                                        {assetSymbol}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default BorrowingModal;
