import React  from 'react';
import { Modal } from 'antd';
import { useMedia } from 'react-use';
import { useTranslation } from 'react-i18next';
import './index.scss';

interface DataProps {
    visible?: false | true, // 弹窗状态
    title?: string,   // 标题文字
    cancelBut: () => any, // 确认按钮
    confirmBut: () => any, // 确认按钮
    cancelButText?:string|'Cancel', //取消按钮文本
    confirmButText?:string|'Confirm', //确认按钮文本
}

const AskModal = ({
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
                    <div className="title">{title || ''}</div>
                    <div className={`operation ${(!cancelBut || !confirmBut) && 'one-child'}`}>
                        {/** 如果没有操作，就隐藏 Button */}
                        {cancelBut && <div className="cancel" onClick={cancelBut}>{cancelButText||t('cancel')}</div>}
                        {confirmBut && <div className="confirm" onClick={confirmBut}>{confirmButText||t('confirm')}</div>}
                    </div>
        
                </div>
            </div>
        </Modal>
    );
};

export default AskModal;
