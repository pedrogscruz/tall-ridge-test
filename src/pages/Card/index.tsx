import React, { forwardRef, MouseEvent, useImperativeHandle, useState, useRef, useEffect, useCallback } from 'react';
import { css } from 'aphrodite';

import CloseButton from 'components/CloseButton';
import styles from './styles';

type CardParams = {
	title: string,
	percent: number,
	onClick: (event: MouseEvent<HTMLDivElement>) => void
}

type LayoutStates = 'normal' | 'open' | 'closed';

export type CardHandlers = {
	setLayoutState: React.Dispatch<React.SetStateAction<LayoutStates>>
	setComponentLayout: () => void
	element: React.RefObject<HTMLDivElement>
}

const Card = forwardRef<CardHandlers, CardParams>(({ title, percent, onClick }, ref) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const titleParentRef = useRef<HTMLDivElement>(null);
	const percentParentRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const percentRef = useRef<HTMLDivElement>(null);
	const layoutAction = useRef<NodeJS.Timeout | null>(null);

	const [layoutState, setLayoutState] = useState<LayoutStates>('normal');

	useImperativeHandle(ref, () => ({
		setLayoutState,
		setComponentLayout,
		element: containerRef
	}));

	const setElementLayout = useCallback<(
		pr: React.RefObject<HTMLElement>,
		child: React.RefObject<HTMLElement>
	) => void>((parentRef, childRef) => {
		if (!parentRef.current || !childRef.current) return;
		const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = parentRef.current;
		childRef.current.style.width = offsetWidth + 'px';
		childRef.current.style.height = offsetHeight + 'px';
		childRef.current.style.left = offsetLeft + 'px';
		childRef.current.style.top = offsetTop + 'px';
	}, []);

	const setComponentLayout = useCallback(() => {
		layoutAction.current && clearInterval(layoutAction.current);
		let count = 0;
		layoutAction.current = setInterval(() => {
			setElementLayout(titleParentRef, titleRef);
			setElementLayout(percentParentRef, percentRef);
			count++;
			count === 9 && layoutAction.current && clearInterval(layoutAction.current)
		}, 100);
	}, []);

	useEffect(setComponentLayout, [layoutState]);
	
	return (
		<div className={css(styles.card)} ref={containerRef} {...layoutState!=='open' && { onClick }}>
			<div ref={titleRef} className={css(styles.title)}>{title}</div>
			<div ref={percentRef} className={css([styles.percent, styles[layoutState+'Percent']])}>{percent.toFixed(1) + '%'}</div>
			<div className={css([styles.content, styles[layoutState]])}>
				<div ref={titleParentRef} />
				<div ref={percentParentRef} />
			</div>
			{layoutState === 'open' && <CloseButton className={css(styles.closeButton)} onClick={onClick} />}
		</div>
	);
})

export default Card;