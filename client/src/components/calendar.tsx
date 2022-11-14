import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
    id: number,
    deadline: Date;
    handleUpdate: (id: number, attribute: string, value: boolean | string | Date) => void
}

export const Calendar = ({ id, deadline, handleUpdate }: Props) => {
    const [startDate, setStartDate] = useState(new Date(deadline));

    return (
        <DatePicker
            className='text-light-gray-blue-300 w-24'
            selected={startDate}
            onChange={(date: Date) => {
                setStartDate(new Date(date))
                handleUpdate(id, 'deadline', date)
            }}
        />
    );
};
