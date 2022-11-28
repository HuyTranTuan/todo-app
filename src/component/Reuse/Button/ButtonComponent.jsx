import React from 'react';
import { Button } from 'antd';

const ButtonComponent = ({type, text, onclick, id, value, danger}) => {
    const onclickGetId = () => {
        onclick(id);
    }
    const onclickGetIdVlue = () => {
        onclick(id, value);
    }

    return (
        <>
            { id 
            ? <Button type={type} onClick={ !value ?onclickGetId : onclickGetIdVlue} >{text}</Button> 
            : <Button type={type} onClick={onclick} danger>{text}</Button>}
        </>
    );
}

export default ButtonComponent;
