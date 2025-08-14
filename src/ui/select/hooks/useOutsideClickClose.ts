import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLElement>;
	onClose: () => void;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onClose();
			}
		};

		if (isOpen) {
			window.addEventListener('mousedown', handleClick);
		}

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose]);
};
