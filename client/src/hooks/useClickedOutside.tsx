import React, { useEffect, useRef } from 'react';

export default function useClickedOutside(
	getter: boolean,
	setter: React.Dispatch<React.SetStateAction<boolean>>,
	callback?: () => void
) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const checkIfClickedOutside = (
			e: MouseEvent
		) => {
			// If getter is true and the clicked target is not within the div,
			// then flip the boolean
			if (getter && ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
				setter(false);
				if (callback) {
					callback();
				}
			}
		};

		document.addEventListener('mousedown', checkIfClickedOutside);

		return () => {
			// Cleanup the event listener
			document.removeEventListener('mousedown', checkIfClickedOutside);
		};
	}, [getter, setter, callback]);

	return ref;
}
