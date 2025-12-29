// src/components/NotFound/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h1 className={styles.title}>404</h1>
				<h2 className={styles.subtitle}>Страница не найдена</h2>
				<p className={styles.message}>
					Извините, запрашиваемая страница не существует или была перемещена.
				</p>
				<div className={styles.actions}>
					<Link to="/" className={styles.homeLink}>
						Вернуться на главную
					</Link>
					<button
						onClick={() => window.history.back()}
						className={styles.backLink}
					>
						Вернуться назад
					</button>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
