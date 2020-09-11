import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
	container: {
		position: 'relative',
		margin: '20px'
	},
	normalLayout: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridAutoRows: '150px',
		gap: '35px'
	},
	selectedLayout: {
		position: 'absolute',
		zIndex: -1,
		top: 0,
		left: 0,
		right: 0,
		display: 'grid',
		gridTemplateColumns: '2fr 1fr',
		gridColumnGap: '35px',
		// height: '366px',
		':nth-child(1n) > :last-child': {
			display: 'grid',
			gridAutoRows: '61px',
			gridRowGap: '35px',
			// overflow: 'auto'
		}
	}
})