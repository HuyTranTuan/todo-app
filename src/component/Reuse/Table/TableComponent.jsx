import React from 'react';
import { Table, Empty  } from 'antd';
const TableComponent = ({dataSource, columns}) => {
    return (
        <>
            { dataSource.length !== 0 ? <Table dataSource={dataSource} columns={columns}/> : <Empty imageStyle={{width: '100%'}}/>}
        </>
    );
}

export default TableComponent;
