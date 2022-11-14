interface Props {
    searchValue: string;
    handleLookup: (name: string, value: string) => void;
}

export const Search = ({ searchValue, handleLookup }: Props) => {
    return (
        <form className='flex bg-white text-dark-gray w-full justify-center border-b border:light-gray-blue-200'>
            <i
                className='fa-solid fa-magnifying-glass pl-9 pr-2 py-4'
                aria-label='Search'
            ></i>
            <input
                type='text'
                name='search'
                value={searchValue}
                onChange={e => handleLookup(e.target.name, e.target.value)}
                placeholder='Search for a todo...'
                className='w-full px-6 py-4 text-sm'
            ></input>
        </form>
    );
};
