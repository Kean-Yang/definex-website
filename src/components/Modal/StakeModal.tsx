import React, { useState } from 'react';
import { Modal, InputNumber } from 'antd';
import { useMedia } from 'react-use';
import { useTranslation } from 'react-i18next';
import './index.scss';

interface DataProps {
    visible?: false | true; // 弹窗状态
    amount?: string; // 金额
    title?: string; // 标题文字
    butText?: string; //按钮文字
    cancelBut: () => any; // 确认按钮
    confirmBut: () => any; // 确认按钮
    buyButloading?: true | false; // loading
    disabled?: false | true; // 按钮状态,
    cancelButText?: string | 'Cancel'; //取消按钮文本
    confirmButText?: string | 'Confirm'; //确认按钮文本
    balance?: any;
    getInputaMountNumber: () => any;
}

const StakeModal = ({
    visible,
    amount,
    title,
    butText,
    cancelBut,
    confirmBut,
    buyButloading,
    disabled,
    cancelButText,
    confirmButText,
    balance,
    getInputaMountNumber,
}: DataProps) => {
    const { t } = useTranslation();
    const below960 = useMedia('(max-width: 960px)');
    const [val, setVal] = useState('');
    const onChangeSetVal = (value: any) => {
        setVal(value);
    };

    const onChangeMaxBalance = () => {};

    return (
        <Modal
            footer={null}
            title={null}
            visible={visible}
            width={!below960 ? '600px' : '80%'}
            centered
            closable={false}
            style={{
                borderRadius: '15px',
            }}
            bodyStyle={{
                borderRadius: '15px',
            }}
        >
            <div className="stake-modal">
                <div className="stake-modal-content">
                    <div className="title">
                        {title || 'Deposit DHT-USDT LP'}
                    </div>

                    <div className="stake-number">
                        <div className="available">
                            {t('v2_LP_Available', {
                                x: amount || '0',
                                x1: '',
                                x2: '',
                            })}
                        </div>

                        <div className="stake-input">
                            <InputNumber
                                autoFocus
                                min={0}
                                // max={maxBalance}
                                type="number"
                                defaultValue={''}
                                onChange={(value: any) => onChangeSetVal(value)}
                                value={val}
                            />

                            <div
                                className="max"
                                onClick={() => onChangeMaxBalance()}
                            >
                                MAX
                            </div>
                        </div>
                    </div>

                    <div className="operation">
                        <div className="cancel" onClick={cancelBut}>
                            {cancelButText || t('111')}
                        </div>
                        <div className="confirm" onClick={confirmBut}>
                            {cancelButText || t('111')}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default StakeModal;
