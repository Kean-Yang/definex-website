import * as React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './loading.scss';

const DataLoading = () => {
    return (
        <div className="get-data-loaing">
            <div className="loading">
                <Spin
                    indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                />
            </div>
        </div>
    );
};

export default DataLoading;
