import { Filter } from './filter';
import { iLookup, todoPriorities, todoStatuses, todoTypes } from './todoList';

interface Props {
    lookup: iLookup;
    handleLookup: (name: string, value: string) => void;
}

export const FilterList = ({ lookup, handleLookup }: Props) => {
    return (
        <div className='w-full rounded-lg bg-white lg:py-0 lg:w-auto'>
            <div className='flex flex-wrap space-x-6 justify-center w-full py-2'>
                {todoStatuses.map((item, index) => (
                    <Filter
                        key={index}
                        name={item}
                        lookup={lookup}
                        filter='status'
                        handleLookup={handleLookup}
                    />
                ))}
                <Filter
                        name='Recent'
                        lookup={lookup}
                        filter='timeframe'
                        handleLookup={handleLookup}
                    />
            </div>
            <div className='flex flex-wrap space-x-6 justify-center w-full py-2'>
                {todoPriorities.map((item, index) => (
                    <Filter
                        key={index}
                        name={item}
                        lookup={lookup}
                        filter='priority'
                        handleLookup={handleLookup}
                    />
                ))}
            </div>
            <div className='flex flex-wrap space-x-6 justify-center w-full py-2'>
                {todoTypes.map((item, index) => (
                    <Filter
                        key={index}
                        name={item}
                        lookup={lookup}
                        filter='type'
                        handleLookup={handleLookup}
                    />
                ))}
            </div>
        </div>
    );
};
