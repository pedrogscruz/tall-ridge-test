import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
	container: {
		display: 'inline-block',
		height: '24px',
		width: '24px',
		borderRadius: '12px',
		cursor: 'pointer'
	},
	arrowDown: {
		position: 'absolute',
		top: '0',
		right: '0',
		transform: 'rotate(135deg)'
	},
	arrowUp: {
		position: 'absolute',
		bottom: '0',
		left: '0',
		transform: 'rotate(-45deg)'
	}
})