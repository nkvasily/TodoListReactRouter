// src/components/SortButton/SortButton.jsx
import React from 'react';
import styles from './SortButton.module.css';

const SortButton = ({ isSorted, onToggle }) => {
	return (
		<div className={styles.sortContainer}>
			<button
				onClick={onToggle}
				className={`${styles.sortButton} ${isSorted ? styles.active : ''}`}
			>
				{isSorted ? 'Сортировка по алфавиту: ВКЛ' : 'Сортировка по алфавиту: ВЫКЛ'}
			</button>
			<div className={styles.sortInfo}>
				{isSorted
					? 'Задачи отсортированы от А до Я'
					: 'Задачи в исходном порядке'
				}
			</div>
		</div>
	);
};

export default SortButton;
