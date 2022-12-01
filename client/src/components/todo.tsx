import { useState } from 'react';
import useClickedOutside from '../hooks/useClickedOutside';
import { Calendar } from './calendar';
import { iTodo, todoPriorities, todoTypes } from './todoList';

interface Props {
    todo: iTodo;
    handleDelete: (id: number) => void;
    handleUpdate: (
        id: number,
        attribute: string,
        value: boolean | string | number | Date
    ) => void;
}

export const Todo = ({ todo, handleDelete, handleUpdate }: Props) => {
    const dayjs = require('dayjs');
    const relativeTime = require('dayjs/plugin/relativeTime');
    dayjs.extend(relativeTime);

    const [renaming, setRenaming] = useState(false);
    const [newName, setNewName] = useState(todo.name);

    /**
     * Update local state for todo name.
     */
    const handleChange = (name: string) => {
        setNewName(name);
    };

    /**
     * Update todo name and set renaming to false if clicked outside of renamed todo div.
     */
    const ref = useClickedOutside(renaming, setRenaming, () =>
        handleUpdate(todo.id, 'name', newName)
    );

    return (
        <div className='relative flex flex-col px-6 border-b border:light-gray-blue-200'>
            <div className='flex justify-between group'>
                <div className='flex items-center w-full py-4'>
                    <div
                        className='mr-4'
                        onClick={() =>
                            handleUpdate(todo.id, 'complete', !todo.complete)
                        }
                    >
                        <button
                            aria-label={`${
                                todo.complete
                                    ? 'Mark todo not completed'
                                    : 'Mark todo completed'
                            }`}
                            className={`relative flex items-center justify-center rounded-full h-6 w-6 ${
                                todo.complete
                                    ? 'bg-gradient-to-b from-check-background-start to-check-background-end'
                                    : 'border border-light-gray-blue-200 hover:bg-gradient-to-b hover:from-check-background-start hover:to-check-background-end'
                            }`}
                        >
                            {todo.complete ? (
                                <i
                                    className='fa-solid fa-check text-white'
                                    aria-label={`${
                                        todo.complete
                                            ? 'Mark not complete'
                                            : 'Mark complete'
                                    }`}
                                ></i>
                            ) : (
                                <span className='h-[90%] w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full'></span>
                            )}
                        </button>
                    </div>
                    <div ref={ref}>
                        {renaming ? (
                            <input
                                type='text'
                                value={newName}
                                onChange={e => handleChange(e.target.value)}
                                className='w-full text-light-gray-blue-300 outline-none'
                            ></input>
                        ) : (
                            <span
                                onClick={() => {
                                    setRenaming(true);
                                }}
                                className={`${
                                    todo.complete &&
                                    'line-through text-light-gray-blue-200'
                                }`}
                            >
                                {todo.name}
                            </span>
                        )}
                    </div>
                </div>
                <button onClick={() => handleDelete(todo.id)}>
                    <i
                        className='fa-solid fa-x h-3.5 w-3.5 lg:hidden group-hover:block'
                        aria-label='Delete todo'
                    />
                </button>
            </div>
            <div className='flex flex-wrap justify-between items-center pb-4'>
                <Calendar
                    deadline={todo.deadline}
                    id={todo.id}
                    handleUpdate={handleUpdate}
                />
                <button
                    onClick={() =>
                        handleUpdate(
                            todo.id,
                            'priority',
                            todo.priority === 2 ? 0 : todo.priority + 1
                        )
                    }
                    className={`py-1 px-2 rounded bg-light-gray-blue-100 ${
                        // Plan to replace nested ternary operator
                        todo.priority === 0
                            ? 'bg-blue-300'
                            : todo.priority === 1
                            ? 'bg-yellow-300'
                            : 'bg-red-300'
                    }`}
                >
                    {todoPriorities[todo.priority]}
                </button>
                <button
                    onClick={() =>
                        handleUpdate(
                            todo.id,
                            'type',
                            todo.type === todoTypes.length - 1
                                ? 0
                                : todo.type + 1
                        )
                    }
                    className='py-1 px-2 rounded bg-light-gray-blue-100'
                >
                    {todoTypes[todo.type]}
                </button>
                <span className='text-xs'>
                    Modified {dayjs(todo.lastModified).fromNow()}
                </span>
            </div>
        </div>
    );
};
