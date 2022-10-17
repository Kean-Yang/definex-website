import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
// import * as Tools from '../../utils/Tools';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/icon/logosub.png';
import './Delegation.scss';

interface DataProps {
    visible?: false | true; // 弹窗状态
    transaction: () => any; // 切换
    voting: () => any; // 切换
    closeModal: () => any; // 关闭弹窗
}

const Delegation = ({
    visible = false,
    transaction = () => {},
    voting = () => {},
    closeModal = () => {},
}: DataProps) => {
    const { t } = useTranslation();
    const [tabIndex, setTabIndex] = useState(-1); // tab

    const onChangeTabIndex = (index: any) => {
        console.log(index);
        setTabIndex(index);
    };

    useEffect(() => {
        return () => {
            setTabIndex(-1);
        };
    }, []);

    return (
        <Modal
            footer={null}
            title={null}
            visible={visible}
            centered
            closable={false}
            className="delegation"
            keyboard
            mask
            maskClosable
            zIndex={99}
            onCancel={() => {
                closeModal();
                setTabIndex(-1);
            }}
            afterClose={() => {
                setTabIndex(-1);
            }}
        >
            <div className="delegation-content">
                <div className="title">
                    <div className="title-content">
                        {t('ChooseDelegationType')}
                    </div>
                    <CloseOutlined
                        className="close"
                        twoToneColor="#FFFFFF"
                        onClick={() => {
                            closeModal();
                            setTabIndex(-1);
                        }}
                    />
                </div>
                <div className="tab">
                    <div
                        className={
                            tabIndex === 1
                                ? 'tab-index special active'
                                : 'tab-index special'
                        }
                        onClick={() => {
                            onChangeTabIndex(1);
                            transaction();
                        }}
                    >
                        <div className="left">
                            <img src={logo as any} alt="Definex" />
                        </div>
                        <div className="right">
                            <p>{t('ManualVoting')}</p>
                            <div>{t('allowsConnectedWallet')}</div>
                        </div>
                    </div>
                    <div
                        className={
                            tabIndex === 2 ? 'tab-index active' : 'tab-index'
                        }
                        onClick={() => {
                            onChangeTabIndex(2);
                            voting();
                        }}
                    >
                        <div className="left">
                            <img src={logo as any} alt="Definex" />
                        </div>
                        <div className="right">
                            <p>{t('DelegateVoting')}</p>
                            <div>{t('anotherEthereumAddress')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Delegation;
