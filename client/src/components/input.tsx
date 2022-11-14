interface Props {
	newTodo: string;
	handleChange: (name: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Input = ({ newTodo, handleChange, handleSubmit }: Props) => {
	return (
		<form
			className='flex items-center px-6 w-full rounded-lg bg-white shadow-lg shadow-light-gray-blue-100'
			onSubmit={e => handleSubmit(e)}
		>
			<button
				type='submit'
				aria-label="Add todo"
				className='relative mr-4 border aspect-square rounded-full h-6 w-6 border-light-gray-blue-200 cursor-pointer hover:bg-gradient-to-b hover:from-check-background-start hover:to-check-background-end'
			>
				<span className='h-[90%] w-[90%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full'></span>
			</button>
			<input
				type='text'
				value={newTodo}
				required
				placeholder='Create a new todo...'
				onChange={e => handleChange(e.target.value)}
				className='py-4 font-semibold text-sm w-full text-light-gray-blue-300 outline-none lg:text-lg'
			/>
		</form>
	);
};
