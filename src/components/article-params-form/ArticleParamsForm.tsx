import { useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	styles: ArticleStateType;
	onStyleChange: (styles: ArticleStateType) => void;
	onReset: () => void;
	onApply: (styles: ArticleStateType) => void;
	isOpen: boolean;
	onToggle: () => void;
};

export const ArticleParamsForm = ({
	styles: formStyles,
	onStyleChange,
	onReset,
	onApply,
	isOpen,
	onToggle,
}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onClose: onToggle,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formStyles);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<div
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						title='Шрифт'
						selected={formStyles.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							onStyleChange({ ...formStyles, fontFamilyOption: option })
						}
						onClose={() => {}}
					/>
					<Separator />
					<Select
						title='Размер шрифта'
						selected={formStyles.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							onStyleChange({ ...formStyles, fontSizeOption: option })
						}
						onClose={() => {}}
					/>
					<Separator />
					<Select
						title='Цвет шрифта'
						selected={formStyles.fontColor}
						options={fontColors}
						onChange={(option) =>
							onStyleChange({ ...formStyles, fontColor: option })
						}
						onClose={() => {}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formStyles.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							onStyleChange({ ...formStyles, backgroundColor: option })
						}
						onClose={() => {}}
					/>
					<Separator />
					<Select
						title='Ширина контента'
						selected={formStyles.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							onStyleChange({ ...formStyles, contentWidth: option })
						}
						onClose={() => {}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</div>
		</>
	);
};
