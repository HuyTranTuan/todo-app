import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({dataSource, editItem, deleteItem, completeItem}) => {
    return (
        <ul>
            {dataSource.map((e) =>
                <TodoItem
                    data={e}
                    editItem={editItem}
                    deleteItem={deleteItem}
                    completeItem={completeItem}
                    key={e.key}
                />)
            }
        </ul>
    );
}

export default TodoList;
