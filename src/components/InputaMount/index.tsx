import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InputNumber } from 'antd';
import './index.scss';

interface DataProps {
    onConfirm?: () => any;
    placeholder?: string;
    balance: any;
    width?: number;
    sumbol?: string;
    maxBalance: any;
    balanceSumbol: string;
}

const InputaMount = ({
    onConfirm,
    placeholder,
    balance,
    width,
    sumbol,
    maxBalance,
    balanceSumbol,
}: DataProps) => {
    const { t } = useTranslation();
    const [val, setVal] = useState('');
    const onChangeSetVal = (value: any) => {
        // console.log('changed', value);
        setVal(value);
        // onConfirm(value);
    };

    const onChangeMaxBalance = () => {
        setVal(maxBalance);
        // onConfirm(maxBalance);
    };

    return (
        <div className="InputaMount">
            <div
                className="inputaMount-content"
                style={{ maxWidth: `${width || 310}px` }}
            >
                <div className="input">
                    <InputNumber
                        autoFocus
                        min={0}
                        max={maxBalance}
                        type="number"
                        defaultValue={''}
                        placeholder={placeholder}
                        onChange={(value: any) => onChangeSetVal(value)}
                        value={val}
                    />
                    <div className="conf">
                        <div
                            className="max"
                            onClick={() => onChangeMaxBalance()}
                        >
                            MAX
                        </div>
                        {sumbol ? <span>{sumbol || 'HUSD'}</span> : ''}
                    </div>
                </div>

                {balance ? (
                    <p className="balance">
                        {t('v1_Balance_eth', {
                            x: balance || 0,
                            x1: balanceSumbol,
                        })}
                    </p>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default InputaMount;
