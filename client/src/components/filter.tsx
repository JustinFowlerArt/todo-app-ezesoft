import { iLookup } from './todoList';

interface Props {
    name: string;
    filter: string;
    lookup: iLookup;
    handleLookup: (name: string, value: string) => void;
}

export const Filter = ({ name, filter, lookup, handleLookup }: Props) => {
    return (
        <button
            className={`font-bold ${
                lookup[filter as keyof iLookup] === name.toLowerCase()
                    ? 'text-bright-blue'
                    : 'text-light-gray-blue-300 hover:text-dark-gray-blue-300'
            }`}
            value={name.toLowerCase()}
            onClick={e => {
                handleLookup(
                    filter,
                    e.currentTarget.value === lookup[filter as keyof iLookup] &&
                        filter !== 'status'
                        ? ''
                        : e.currentTarget.value
                );
            }}
        >
            {name}
        </button>
    );
};
