import React, { FC, useCallback, useEffect, createRef, useMemo, useRef } from 'react';
import { css } from 'aphrodite';

import Card, { CardHandlers } from 'pages/Card';
import styles from './styles';

const cards = [
	{ title: 'Percent Accuracy', percent: 87 },
	{ title: 'Percent Accuracy', percent: 34 },
	{ title: 'Percent Accuracy', percent: 63 },
	{ title: 'Percent Accuracy', percent: 82 },
	{ title: 'Percent Accuracy', percent: 32 },
	{ title: 'Percent Accuracy', percent: 42 }
];

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];

const Home: FC = () => {
	const lastSelectedCardRef = useRef<ItemType | null>(null);
	const percentCards = useMemo(() => (
		cards.map((item, index) => ({ ...item, key: index, selected: false, ref: createRef<CardHandlers>() }))
	), []);

	type CardsType = typeof percentCards;
	type ItemType = ArrayElement<typeof percentCards>;

	const handleSelectCard = useCallback<(card: ItemType) => void>((card) => {
		if (card.selected) {
			card.selected = false;
			percentCards.forEach(({ ref: { current } }) => {
				current?.setLayoutState('normal');
			});
			setLayout(percentCards.sort((a, b) => a.key<b.key ? -1 : b.key<a.key ? 1 : 0), normalLayout);
		}
		else {
			if (percentCards.findIndex(({ selected }) => selected) !== -1) {
				if (lastSelectedCardRef.current?.ref.current) {
					lastSelectedCardRef.current.ref.current.setLayoutState('closed');
					lastSelectedCardRef.current.selected = false;
				}
			}
			else
				percentCards.forEach(({ ref: { current }, key }) => {
					if (key !== card.key)
						current?.setLayoutState('closed');
				});
			card.selected = true;
			card.ref.current?.setLayoutState('open');
			setLayout(percentCards.sort((a, b) => a.selected ? -1 : b.selected ? 1: 0), selectedLayout);
		}
		lastSelectedCardRef.current = card;
	}, []);

	const [normalLayout, selectedLayout] = useMemo(() => [
		new Array(percentCards.length).fill(null).map(() => createRef<HTMLDivElement>()),
		new Array(percentCards.length).fill(null).map(() => createRef<HTMLDivElement>())
	], []);

	const setLayout = useCallback((cards: CardsType, layout) => {
		cards.forEach(({ ref: { current } }, index) => {
			if (!current?.element.current || !layout[index].current) return;
			const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = layout[index].current;
			current.element.current.style.width = offsetWidth + 'px';
			current.element.current.style.height = offsetHeight + 'px';
			current.element.current.style.left = offsetLeft + 'px';
			current.element.current.style.top = offsetTop + 'px';
		});
	}, []);

	useEffect(() => {
		setLayout(percentCards, normalLayout);
		window.onresize = (...props) => {
			percentCards.findIndex(({ selected }) => selected) === -1 ?
				setLayout(percentCards.sort((a, b) => a.key < b.key ? -1 : b.key < a.key ? 1 : 0), normalLayout)
			:
				setLayout(percentCards.sort((a, b) => a.selected ? -1 : b.selected ? 1 : 0), selectedLayout);
			percentCards.forEach(({ ref: { current } }) => {
				current?.setComponentLayout();
			});
		};
	}, []);

	// TO-DO resize

	return (
		<div className={css(styles.container)}>
			{
				percentCards.map((item) => (
					<Card {...item} onClick={() => handleSelectCard(item)} />
				))
			}
			<div className={css(styles.normalLayout)}>
				{normalLayout.map((ref, index) => (
					<div key={index} ref={ref} />
				))}
			</div>
			<div className={css(styles.selectedLayout)}>
				<div ref={selectedLayout[0]} />
				<div>
					{selectedLayout.slice(1).map((ref, index) => (
						<div key={index} ref={ref} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Home;