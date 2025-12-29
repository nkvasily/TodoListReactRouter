// src/components/TodoForm/TodoForm.jsx
import { useState } from 'react';
import styles from './TodoForm.module.css';

const TodoForm = ({ onAddTodo }) => {
	const [title, setTitle] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!title.trim()) {
			alert('Введите текст задачи');
			return;
		}

		setIsSubmitting(true);

		// Здесь будет POST запрос
		const newTodo = {
			title: title.trim(),
			completed: false
		};

		// Вызываем функцию из props для добавления
		onAddTodo(newTodo);

		// Очищаем поле ввода
		setTitle('');
		setIsSubmitting(false);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Введите новую задачу..."
				className={styles.input}
				disabled={isSubmitting}
			/>
			<button
				type="submit"
				className={styles.button}
				disabled={isSubmitting}
			>
				{isSubmitting ? 'Добавляем...' : 'Добавить'}
			</button>
		</form>
	);
};

export default TodoForm;
