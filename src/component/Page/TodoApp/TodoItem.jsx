import React, {useState} from 'react';

const TodoItem = ({data, editItem, deleteItem, completeItem}) => {

    const [newString, setNewString] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const clickEditItem = () => {
        setIsEdit(true)
    }
    const clickSaveItem = () => {
        editItem(data.key, newString);
        setNewString('');
        setIsEdit(false);
    }
    const clickCompleteItem = () => {
        completeItem(data.key)
    }
    const clickDeleteItem = () => {
        deleteItem(data.key)
    }

    const changeTodo = (e) => {
        setNewString(e.target.value);
    }

    return (
        <li key={data.key}>
            {isEdit===false ? `${data.name} - ${data.status}`: <input value={newString} placeholder='edit todo' onChange={changeTodo}/>}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {isEdit===false ? <button onClick={clickEditItem}>edit</button> : <button onClick={clickSaveItem}>Save</button>}
            <button onClick={clickCompleteItem}>done</button>
            <button onClick={clickDeleteItem}>delete</button>
        </li>
    );
}

export default TodoItem;
