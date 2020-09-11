import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
	card: {
		position: 'absolute',
		transition: 'left 0.9s ease-out, top 0.9s ease-out, width 0.9s ease-out, height 0.9s ease-out, box-shadow 0.3s ease-out',
		backgroundColor: '#fff',
		borderRadius: '10px',
		fontFamily: '"Nunito", serif',
		':hover': {
			boxShadow: '0px 10px 20px -2px rgba(106, 133, 160, 0.1)'
		}
	},
	open: {
		gridTemplateRows: '20px 1fr',
		gridRowGap: '40px'
	},
	normal: {
		gridTemplateRows: '20px 1fr',
		gridRowGap: '20px'
	},
	closed: {
		gridTemplateColumns: '1fr 80px',
		gridColumnGap: '15px'
	},
	content: {
		padding: '20px 26px',
		display: 'grid'
	},
	title: {
		position: 'absolute',
		fontSize: '16px',
		lineHeight: 1.2,
		whiteSpace: 'nowrap'
	},
	percent: {
		position: 'absolute',
		fontWeight: 700,
		lineHeight: 1.2,
		transition: 'font-size 0.9s ease-out, left 0.4s ease-out, top 0.4s ease-out, width 0.4s ease-out, height 0.4s ease-out',
	},
	normalPercent: {
		fontSize: '32px',
	},
	closedPercent: {
		fontSize: '20px',
	},
	openPercent: {
		fontSize: '72px',
	},
	closeButton: {
		position: 'absolute',
		top: '20px',
		right: '26px'
	}
})