import React from 'react';
import { Statistic } from 'antd';
import { useMedia } from 'react-use';
import './index.scss';
const { Countdown } = Statistic;

interface DataProps {
    text: any,   // 标题文字
    visible?: true | false, // 弹窗状态
    deadline?: string, // 时间
}

const Overheated = ({ text, visible = true, deadline }: DataProps) => {
    const below960 = useMedia('(max-width: 960px)');
    return (
        <>
            {visible ? <div
                style={{
                    width: !below960 ? 'auto' : '80%'
                }}
                className="overheated-modal"
            >
                <div className="network-modal">
                    <div className="network-modal-content">
                        <div className="text">{text}</div>
                        {deadline ? <Countdown value={deadline} format="HH:mm:ss:SSS" /> : ""}

                    </div>
                </div>
            </div> : ""}
        </>
    );
};

export default Overheated;
