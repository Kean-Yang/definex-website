import React  from 'react';
import { Modal } from 'antd';
import { useMedia } from 'react-use';
import { useTranslation } from 'react-i18next';
import * as Tools from '../../utils/Tools';
import './index.scss';

interface DataProps {
    visible?: false | true, // 弹窗状态
    title?: string,   // 标题文字
    cancelBut: () => any, // 确认按钮
    confirmBut: () => any, // 确认按钮
    cancelButText?:string|'Cancel', //取消按钮文本
    confirmButText?:string|'Confirm', //确认按钮文本
}

const SuccessTradModal = ({
    visible,
    title,
    cancelBut,
    confirmBut,
    cancelButText,
    confirmButText,
}: DataProps) => {
    const { t } = useTranslation();
    const below960 = useMedia('(max-width: 960px)');

    return (
        <Modal
            footer={null}
            title={null}
            visible={visible}
            width={!below960 ? '400px' : '80%'}
            centered
            closable={false}
            style={{
                borderRadius: '15px',
            }}
            bodyStyle={{
                borderRadius: '15px',
            }}
        >
            <div className="success-modal">
                <div className="success-modal-content">
                    <div className="amount">{Tools.numFmt(title, 4) || 0}</div>
                    <div className="title">Success</div>
                    <div className={`operation-success ${(!cancelBut || !confirmBut) && 'one-child'}`}>
                        {/** 如果没有操作，就隐藏 Button */}
                        {cancelBut && <div className="cancel" onClick={cancelBut}>{cancelButText||t('Back')}</div>}
                        {confirmBut && <div className="confirm" onClick={confirmBut}>{confirmButText||t('confirm','Earn DHT')}</div>}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SuccessTradModal;
