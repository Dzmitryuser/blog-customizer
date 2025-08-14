import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [currentStyles, setCurrentStyles] = useState(defaultArticleState);
	const [tempStyles, setTempStyles] = useState(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);

	const handleApply = (styles: ArticleStateType) => {
		setCurrentStyles(styles);
		setIsOpen(false);
	};

	const handleReset = () => {
		setTempStyles(defaultArticleState);
		setCurrentStyles(defaultArticleState);
	};

	const handleToggle = () => {
		setIsOpen(!isOpen);
		if (!isOpen) {
			setTempStyles(currentStyles);
		}
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentStyles.fontFamilyOption.value,
					'--font-size': currentStyles.fontSizeOption.value,
					'--font-color': currentStyles.fontColor.value,
					'--container-width': currentStyles.contentWidth.value,
					'--bg-color': currentStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				styles={tempStyles}
				onStyleChange={setTempStyles}
				onReset={handleReset}
				onApply={handleApply}
				isOpen={isOpen}
				onToggle={handleToggle}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
