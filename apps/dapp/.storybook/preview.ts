import '../src/global.scss';
import type { Preview } from '@storybook/svelte';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		viewport: {
			viewports: {
				'14" laptop': {
					name: '14" laptop',
					styles: {
						width: '1600px',
						height: '900px'
					}
				},
				mobile: {
					name: 'mobile',
					styles: {
						width: '393px',
						height: '900px'
					}
				}
			}
		}
	}
};

export default preview;
