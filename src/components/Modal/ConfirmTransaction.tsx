import React from 'react';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './Delegation.scss';

interface DataProps {
    visible?: false | true; // 弹窗状态
    modalType?: number; // 1:借贷 2:供应撤回
    closeModal: () => any; // 关闭弹窗
}

const ConfirmTransaction = ({
    visible = false,
    closeModal = () => {},
}: DataProps) => {
    const { t } = useTranslation();

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
                    <div className="title-content">
                        {t('Confirm Transaction')}
                    </div>
                    <CloseOutlined
                        className="close"
                        twoToneColor="#FFFFFF"
                        onClick={closeModal}
                    />
                </div>
                <div className="transaction">
                    <p className="votes">{t('xVotes', { x: 1 })}</p>
                    <p className="from">{t('ManualVoting', { x: '' })}</p>
                    <div>
                        <span></span>
                    </div>
                    <p className="votes">{t('Confirmtransaction')}</p>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmTransaction;
