import { useEffect, useState } from 'react';
import { FilterList } from './filterList';
import { Input } from './input';
import { Search } from './search';
import { Todo } from './todo';

export type iTodo = {
    id: number;
    name: string;
    complete: boolean;
    priority: number;
    type: number;
    deadline: Date;
    lastModified: Date;
    [key: string]: boolean | number | string | Date
};

export type iLookup = {
    search: string;
    status: string;
    priority: string;
    type: string;
    timeframe: string;
};

export const todoTypes = ['Personal', 'Family', 'Health', 'Work'];
export const todoPriorities = ['Low', 'Medium', 'High'];
export const todoStatuses = ['All', 'Active', 'Completed'];

export const TodoList = () => {
    const [firstRender, setFirstRender] = useState(true);

    const [todos, setTodos] = useState<iTodo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    const [lookup, setLookup] = useState<iLookup>({
        search: '',
        status: 'all',
        priority: '',
        type: '',
        timeframe: '',
    });

    const itemsLeft = todos.filter(todo => !todo.complete).length;

    useEffect(() => {
        if (firstRender) {
            const localTodos = localStorage.getItem('todos');
            if (localTodos) {
                setTodos(JSON.parse(localTodos));
            }
            setFirstRender(false);
        } else {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [firstRender, todos]);

    const handleChange = (name: string) => {
        setNewTodo(name);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTodos([
            ...todos,
            {
                id: todos.length + 1,
                name: newTodo,
                complete: false,
                priority: 1,
                type: 0,
                deadline: new Date(),
                lastModified: new Date(),
            },
        ]);
        setNewTodo('');
    };

    const handleUpdate = (
        id: number,
        attribute: string,
        value: boolean | number | string | Date
    ) => {
        const updatedTodos = [...todos];
        const todo = updatedTodos.find(todo => todo.id === id);
        if (todo) {
            todo[attribute as keyof iTodo] = value;
            todo.lastModified = new Date();
        }
        setTodos(updatedTodos);
    };

    const handleDelete = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleDeleteCompleted = () => {
        const updatedTodos = todos.filter(todo => !todo.complete);
        setTodos(updatedTodos);
    };

    const handleLookup = (name: string, value: string) => {
        setLookup({ ...lookup, [name]: value });
    };

    const filterResults = () => {
        let results = todos;
        if (lookup.search) {
            results = results.filter(todo => (
                todo.name
                    .toLowerCase()
                    .includes(lookup.search.toLowerCase())
            ));
        }
        if (lookup.status) {
            if (lookup.status === 'active') {
                results = results.filter(todo => !todo.complete);
            }
            if (lookup.status === 'completed') {
                results = results.filter(todo => todo.complete);
            }
        }
        if (lookup.priority) {
            results = results.filter(
                todo =>
                    todo.priority ===
                    todoPriorities
                        .map(item => item.toLowerCase())
                        .indexOf(lookup.priority)
            );
        }
        if (lookup.type) {
            results = results.filter(
                todo =>
                    todo.type ===
                    todoTypes
                        .map(item => item.toLowerCase())
                        .indexOf(lookup.type)
            );
        }
        if (lookup.timeframe === 'recent') {
            results = results.filter(
                todo =>
                    new Date(todo.lastModified).getTime() >
                    new Date().getTime() - 1 * 24 * 60 * 60 * 1000
            );
        }
        return results;
    };

    return (
        <main className='flex flex-col items-center relative space-y-4 p-6 w-full max-w-xl lg:space-y-6'>
            <Input
                newTodo={newTodo}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            {todos.length > 0 && (
                <>
                    <div className='flex flex-col w-full rounded-lg bg-white shadow-lg shadow-light-gray-blue-100 lg:shadow-2xl'>
                        <Search
                            searchValue={lookup.search}
                            handleLookup={handleLookup}
                        />
                        <FilterList
                            lookup={lookup}
                            handleLookup={handleLookup}
                        />
                        {filterResults().map(todo => (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                            />
                        ))}
                        <div className='flex justify-between px-6 py-4 text-sm text-light-gray-blue-300'>
                            <span>
                                {itemsLeft === 1
                                    ? `${itemsLeft} item left`
                                    : `${itemsLeft} items left`}
                            </span>
                            <button
                                className='hover:text-dark-gray-blue-300'
                                onClick={handleDeleteCompleted}
                            >
                                Clear Completed
                            </button>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};
