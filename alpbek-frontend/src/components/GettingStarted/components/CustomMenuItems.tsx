import { useEffect } from 'react';
import styled from 'styled-components';
import { Section } from './Section';
import Prism from 'prismjs';
import AccountMenu from './../../../../src/account-menu.jpg';

const AccountMenuExample = styled.img(({ theme }) =>
	theme.withMedia({
		width: ['70%', '75%', '50%'],
	})
);

export const CustomMenuItems = () => {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<>
			<Section>
				<span>Hey, there welcome!!</span>
				<span>You can find more CSPR network:</span>
			</Section>
			<Section>
				<pre>
					<code className={'language-javascript'}>
						{`export const accountMenuItems = [
	<ViewAccountOnExplorerMenuItem key={0} />,
	<CopyHashMenuItem key={1} />,
	<AccountMenuItem
		key={2}
		onClick={() => {
			window.location.href = 'https://docs.cspr.click';
		}}
		icon={CSPRClickIcon}
		label={'CSPR.click docs'}
		badge={{ title: 'new', variation: 'green' }}
	/>,
];
`}
					</code>
				</pre>
			</Section>
			<Section>
				<span>
					<code>&lt;--&gt;</code>
				</span>
			</Section>
			<Section>
				<pre>
					<code className={'language-markup'}>
						{`<ClickUI topBarSettings={{accountMenuItems}}/>
`}
					</code>
				</pre>
			</Section>
			<Section>
				<div style={{ marginBottom: '10px' }}>--</div>
				<div>
					<AccountMenuExample src={AccountMenu} alt='Account menu example' />
				</div>
			</Section>
		</>
	);
};
