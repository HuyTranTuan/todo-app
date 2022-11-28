import React from 'react';
import { Input } from 'antd';

import "./InputComponent.sass"

const InputComponent = ({placeHolder, value, onchange}) => {
    return (
        <Input placeholder={placeHolder} onChange={onchange} value={value}/>
    );
}

export default InputComponent;
