import React from 'react';
import { css } from 'aphrodite';

import styles from './styles';

const SVGArrow: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--token-afc9d830-e961-4bb6-98bd-c47ddc83187a, rgb(177, 184, 191)) /* {&quot;name&quot;:&quot;med gre&quot;} */" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

const CloseButton: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>> = ({ className, ...props }) => {
	return (
		<span className={[css(styles.container), className].join(' ')} {...props}>
			<SVGArrow className={css(styles.arrowUp)} />
			<SVGArrow className={css(styles.arrowDown)} />
		</span>
	);
}

export default CloseButton;