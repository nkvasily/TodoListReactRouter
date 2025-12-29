// src/components/SearchBar/SearchBar.jsx
import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ searchTerm, onSearchChange, resultsCount, totalCount }) => {
	return (
		<div className={styles.searchContainer}>
			<div className={styles.searchBox}>
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					placeholder="Поиск задач..."
					className={styles.input}
				/>
				{searchTerm && (
					<button
						onClick={() => onSearchChange('')}
						className={styles.clearBtn}
						title="Очистить поиск"
					>
						Очистить
					</button>
				)}
			</div>

			{/* Информация о результатах поиска */}
			<div className={styles.searchInfo}>
				{searchTerm ? (
					<>
						Найдено: <span className={styles.count}>{resultsCount}</span> из {totalCount}
						{resultsCount === 0 && (
							<span className={styles.noResults}> - ничего не найдено</span>
						)}
					</>
				) : (
					<span className={styles.hint}>Введите текст для поиска</span>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
