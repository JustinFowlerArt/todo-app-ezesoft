import { useEffect, useState } from 'react';
import { FilterList } from './filterList';
import { Input } from './input';
import { Search } from './search';
import { Todo } from './todo';

// Basic type definitions
export type iTodo = {
    id: number;
    name: string;
    complete: boolean;
    priority: number;
    type: number;
    deadline: Date;
    lastModified: Date;
    [key: string]: boolean | number | string | Date;
};

export type iLookup = {
    search: string;
    status: string;
    priority: string;
    type: string;
    timeframe: string;
    [key: string]: string;
};

// Todo attribute types used for filtering todo list
export const todoTypes = ['Personal', 'Family', 'Health', 'Work'];
export const todoPriorities = ['Low', 'Medium', 'High'];
export const todoStatuses = ['All', 'Active', 'Completed'];

export const TodoList = () => {
    const [firstRender, setFirstRender] = useState(true);

    const [todos, setTodos] = useState<iTodo[]>([]);
    const [newTodo, setNewTodo] = useState('');

    /**
     * Attributes used to filter todo list
     */
    const [lookup, setLookup] = useState<iLookup>({
        search: '',
        status: 'all',
        priority: '',
        type: '',
        timeframe: '',
    });

    /**
     * Number of incomplete todos
     */
    const itemsLeft = todos.filter(todo => !todo.complete).length;

    /**
     * Check for todos in local storage on first render and update state if found.
     * Sync local storage any time todos change.
     * This is currently fragile without proper error handling.
     */
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

    /**
     * Update local state for new todo name.
     */
    const handleChange = (name: string) => {
        setNewTodo(name);
    };

    /**
     * Creates new todo named from NewTodo input field with all other attributes at default.
     * Resets NewTodo input field.
     */
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

    /**
     * Handles updating individual todo attributes.
     * @param id id of todo to be updated
     * @param attribute name of attribute to be updated
     * @param value property to assign to attribute to be updated
     */
    const handleUpdate = (
        id: number,
        attribute: string,
        value: boolean | number | string | Date
    ) => {
        const updatedTodos = [...todos];
        const todo = updatedTodos.find(todo => todo.id === id);
        if (todo) {
            todo[attribute] = value;
            todo.lastModified = new Date();
        }
        setTodos(updatedTodos);
    };

    /**
     * Delete individual todo based on id.
     */
    const handleDelete = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    /**
     * Removes all todos that have been marked as complete.
     */
    const handleDeleteCompleted = () => {
        const updatedTodos = todos.filter(todo => !todo.complete);
        setTodos(updatedTodos);
    };

    /**
     * Updates lookup state to use in todo filtering.
     */
    const handleLookup = (name: string, value: string) => {
        setLookup({ ...lookup, [name]: value });
    };

    /**
     * Filters results consecutively based on all lookup state attributes that are not empty.
     * This can be cleaned up but works for prototyping. Has performance implications for large datasets.
     * Likely candidate for Underscore or Lodash.
     * @returns filtered array of todos
     */
    const filterResults = () => {
        let results = todos;
        if (lookup.search) {
            results = results.filter(todo =>
                todo.name.toLowerCase().includes(lookup.search.toLowerCase())
            );
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
