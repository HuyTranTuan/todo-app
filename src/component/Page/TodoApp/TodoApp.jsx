import React, {useState, useEffect} from 'react';
import { 
    Tag,
    Space,
    Avatar,
    Badge,
} from 'antd';
import TableComponent from '../../Reuse/Table/TableComponent';
import ButtonComponent from '../../Reuse/Button/ButtonComponent';
import SearchComponent from '../../Reuse/Search/SearchComponent';
import {
    SaveFilled,
    EditFilled,
    CheckCircleFilled,
    DeleteFilled,
    UserOutlined,
} from '@ant-design/icons'

import './TodoApp.scss';
import InputComponent from '../../Reuse/Input/InputComponent';
import {v4 as uuidv4} from 'uuid';
import TodoList from './TodoList';

const TodoApp = () => {
    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_,el) => {
                if (isEdit===true && el.key === elementEdit) {
                    return (
                        <InputComponent
                        placeHolder='Edit Todo ...'
                        onchange={onchangeNewString}
                        value={newString}
                        />
                    )
                } else {
                    return (
                        el.name
                    )
                }
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (e) => (
                <>
                    {(() => {
                        if (e === 'Done') {
                        return (
                            <Tag color={"green"} key={e}>
                                {e.toUpperCase()}
                            </Tag>
                        )
                        } else if (e === 'Pending') {
                        return (
                            <Tag color={"yellow"} key={e}>
                                {e.toUpperCase()}
                            </Tag>
                        )
                        } else {
                        return (
                            <Tag color={"red"} key={e}>
                                {e.toUpperCase()}
                            </Tag>
                        )
                        }
                    })()}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, ) => (
                <div>
                    { isEdit&&_.key===elementEdit
                        ? <ButtonComponent type='primary' text={<SaveFilled />} onclick={onclickSave} id={_.key} value={_.name}/>
                        : <ButtonComponent type='primary' text={<EditFilled />} onclick={()=>onclickEdit(_.key)} id={_.key} value={_.name}/>
                    }
                    <ButtonComponent type='ghost' text={<CheckCircleFilled />} onclick={onclickDone} id={_.key}/>
                    <ButtonComponent type='danger' text={<DeleteFilled />} onclick={onclickDelete} id={_.key}/>
                </div>
            ),
        },
    ];

    const getArray = JSON.parse(localStorage.getItem("Todo"));

    const [arrayToDo, setArrayToDo] = useState(getArray.lenght !==0 ? getArray : []);
    const [firstClone, setFirstClone] = useState(arrayToDo);
    const [stringIn, setStringIn] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [elementEdit, setElementEdit] = useState('');
    const [newString, setNewString] = useState("");

    const onchangeStringIn = (e) => {
        setStringIn(e.target.value);
    }

    const onchangeNewString = (e) => {
        setNewString(e.target.value);
    }

    const onclickAddTodo = () => {
        setArrayToDo((pre) => [{
            key: uuidv4(),
            name: stringIn,
            date: (new Date()).toString(),
            status: 'Not Yet',
        }, ...pre]);
        setStringIn("");
        setFirstClone([...arrayToDo])
    }

    const onclickEdit = (id) => {
        setIsEdit(true);
        setElementEdit(id);
    }

    const onclickSave = (index, string) => {
        const cloneArrayToDo = arrayToDo.map(el => (
            el.key===index&&newString!=='' ? {...el, name: newString}: el
        ))
        setArrayToDo([...cloneArrayToDo]);
        setFirstClone([...arrayToDo]);
        setIsEdit(false);
        setNewString('');
        setElementEdit('');
    }

    const onclickDelete = (e) => {
        const cloneArrayToDo = arrayToDo
        for (var i = 0; i < cloneArrayToDo.length; i++) {
            var obj = cloneArrayToDo[i];
            if(obj.key === e){
                cloneArrayToDo.splice(i, 1);
            }
        }
        setArrayToDo([...cloneArrayToDo]);
        setFirstClone([...arrayToDo]);
    }
    const onclickDone = (e) => {
        const cloneArrayToDo = arrayToDo.map(el => (
            el.key===e ? {...el, status: 'Done'}: el
        ))

        setArrayToDo([...cloneArrayToDo]);
    }

    const onSearch = (e) => {
        const cloneArrayToDo = arrayToDo.filter(el => el.name === e);
        if(e!==''){
            setArrayToDo([...cloneArrayToDo]);
        } else {
            setArrayToDo([...firstClone]);
        }
    }

    useEffect(() => {
        localStorage.setItem("Todo", JSON.stringify(arrayToDo));
        return () => {

        };
    }, [arrayToDo]);

    return (
        <div className='todo-page'>
            <div className='above'>
                <SearchComponent placeHolder={'Search Todo ...'} onSearch={onSearch}/>
                <Space>
                    <Badge count={1}>
                        <Avatar shape="square" icon={<UserOutlined />} />
                    </Badge>
                </Space>
            </div>
            <div className='beneath'>
                <h1>This is Todo App</h1>
                <div className='input-add'>
                    <InputComponent value={stringIn} placeHolder="Add todo!" onchange={onchangeStringIn}/>
                    <ButtonComponent type='primary' text='Add' onclick={onclickAddTodo}/>
                </div>
                <div className='table-container'>
                    <TableComponent columns={columns} dataSource={arrayToDo}/>
                    {/* <TodoList dataSource={arrayToDo} editItem={onclickEdit} deleteItem={onclickDelete} completeItem={onclickDone}/> */}
                </div>
            </div>
        </div>
    );
}

export default TodoApp;
