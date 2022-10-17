import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
// import * as Tools from '../../utils/Tools';
import { useTranslation } from 'react-i18next';
import './Delegation.scss';

interface DataProps {
    visible?: false | true; // 弹窗状态
    modalType?: number; // 1:借贷 2:供应撤回
    closeModal: () => any; // 关闭弹窗
}

const DelegateVoting = ({
    visible = false,
    modalType = 1,
    closeModal = () => {},
}: DataProps) => {
    const { t } = useTranslation();
    const [val, setVal] = useState('');
    const onChangeSetVal = (e: any) => {
        setVal(e.target.value);
    };

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
            zIndex={999}
        >
            <div className="delegation-content">
                <div className="title">
                    <div className="title-content">{t('DelegateVoting')}</div>
                    <CloseOutlined
                        className="close"
                        twoToneColor="#FFFFFF"
                        onClick={closeModal}
                    />
                </div>
                <div className="voting">
                    <p className="voting-title">{t('SelectAddress')}</p>
                    <p className="desc">{t('AddressDelegatesupport')}</p>
                    <div className="delegate">
                        <span>{t('DelegateAddress')}</span>
                        <span>{t('DelegateLeaderboard')}</span>
                    </div>
                    <div className="address">
                        <Input
                            allowClear
                            maxLength={56}
                            bordered={false}
                            placeholder={t('EnterAddress')}
                            onChange={(e: any) => onChangeSetVal(e)}
                            value={val}
                        />
                    </div>
                    <Button type="primary" className="action-buttons">
                        {t('DelegateVotes')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DelegateVoting;
