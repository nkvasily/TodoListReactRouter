// src/components/TodoItem/TodoItem.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TodoItem.module.css';

const TodoItem = ({ todo, onToggleStatus }) => {
	const navigate = useNavigate();

	// Обработчик изменения статуса (чекбокс)
	const handleToggle = async () => {
		try {
			await onToggleStatus(todo.id, !todo.completed);
		} catch (error) {
			console.error('Ошибка при изменении статуса:', error);
		}
	};

	// Обработчик клика по тексту задачи - переход на страницу задачи
	const handleTitleClick = () => {
		navigate(`/task/${todo.id}`);
	};

	// Функция для обрезания текста с многоточием
	const truncateText = (text, maxLength = 50) => {
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength) + '...';
	};

	return (
		<li className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
			{/* Чекбокс для изменения статуса */}
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={handleToggle}
				className={styles.checkbox}
				title={todo.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
			/>

			{/* Текст задачи - кликабельный, обрезанный */}
			<div
				className={styles.titleContainer}
				onClick={handleTitleClick}
				title="Нажмите для просмотра деталей задачи"
			>
				<span className={styles.title}>
					{truncateText(todo.title)}
				</span>
				{todo.title.length > 50 && (
					<span className={styles.moreIndicator}>...</span>
				)}
			</div>

			{/* Иконка/кнопка для перехода на страницу задачи */}
			<button
				onClick={handleTitleClick}
				className={styles.detailsButton}
				title="Перейти к деталям задачи"
			>
				→
			</button>
		</li>
	);
};

export default TodoItem;
