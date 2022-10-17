import React from 'react';
import './SwitchBox.scss';

interface DataProps {
    state?: boolean;
    // open?: boolean;
    // guan?: boolean;
}

const SwitchBox = ({
    state = false,
}: // open = false,
// guan = false,
DataProps) => {
    return (
        <div className="switch-box">
            <label
                // htmlFor={!state ? 'default' : open ? 'guan' : 'open'}
                id="guan"
                htmlFor="guan"
                className={!state ? 'switch-box-left' : 'switch-box-right'}
            ></label>
            {/* <label
                // htmlFor={!state ? 'default' : guan ? 'guan' : 'guan'}
                id="open"
                htmlFor="open"
                className={!state ? 'switch-box-slider' : 'switch-box-label'}
            ></label> */}
        </div>
    );
};

export default SwitchBox;
