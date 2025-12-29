// src/components/TaskDetail/TaskDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './TaskDetail.module.css';

const TaskDetail = () => {
	const { id } = useParams(); // Получаем ID из URL
	const navigate = useNavigate(); // Для навигации
	const [task, setTask] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState('');

	// Загрузка задачи при монтировании или изменении ID
	useEffect(() => {
		const fetchTask = async () => {
			setLoading(true);
			try {
				const response = await fetch(`http://localhost:3000/todos/${id}`);
				if (!response.ok) {
					if (response.status === 404) {
						throw new Error('Задача не найдена');
					}
					throw new Error('Ошибка загрузки задачи');
				}
				const data = await response.json();
				setTask(data);
				setEditText(data.title);
				setError(null);
			} catch (err) {
				setError(err.message);
				setTask(null);
			} finally {
				setLoading(false);
			}
		};

		fetchTask();
	}, [id]);

	// Обработчик сохранения изменений
	const handleSave = async () => {
		if (!editText.trim()) {
			alert('Текст задачи не может быть пустым');
			return;
		}

		try {
			const response = await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title: editText.trim() }),
			});

			if (!response.ok) {
				throw new Error('Ошибка при обновлении задачи');
			}

			const updatedTask = await response.json();
			setTask(updatedTask);
			setIsEditing(false);
			alert('Задача успешно обновлена!');
		} catch (error) {
			console.error('Ошибка:', error);
			alert('Не удалось обновить задачу');
		}
	};

	// Обработчик удаления задачи
	const handleDelete = async () => {
		if (window.confirm(`Удалить задачу "${task?.title}"?`)) {
			try {
				const response = await fetch(`http://localhost:3000/todos/${id}`, {
					method: 'DELETE',
				});

				if (!response.ok) {
					throw new Error('Ошибка при удалении задачи');
				}

				alert('Задача успешно удалена!');
				navigate('/'); // Возвращаемся на главную страницу
			} catch (error) {
				console.error('Ошибка:', error);
				alert('Не удалось удалить задачу');
			}
		}
	};

	// Обработчик изменения статуса задачи
	const handleToggleStatus = async () => {
		try {
			const response = await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ completed: !task.completed }),
			});

			if (!response.ok) {
				throw new Error('Ошибка при изменении статуса');
			}

			const updatedTask = await response.json();
			setTask(updatedTask);
		} catch (error) {
			console.error('Ошибка:', error);
			alert('Не удалось изменить статус задачи');
		}
	};

	// Кнопка "Назад" - используем history для возврата
	const handleBack = () => {
		navigate(-1); // Возврат на предыдущую страницу в истории
	};

	// Отображение загрузки
	if (loading) {
		return (
			<div className={styles.container}>
				<button onClick={handleBack} className={styles.backButton}>
					← Назад
				</button>
				<div className={styles.loading}>Загрузка задачи...</div>
			</div>
		);
	}

	// Отображение ошибки
	if (error) {
		return (
			<div className={styles.container}>
				<button onClick={handleBack} className={styles.backButton}>
					← Назад
				</button>
				<div className={styles.error}>
					<h3>Ошибка</h3>
					<p>{error}</p>
					<button onClick={() => navigate('/')} className={styles.homeButton}>
						На главную
					</button>
				</div>
			</div>
		);
	}

	// Отображение задачи
	return (
		<div className={styles.container}>
			{/* Кнопка "Назад" */}
			<button onClick={handleBack} className={styles.backButton}>
				← Назад
			</button>

			{/* Заголовок */}
			<h2 className={styles.title}>Детали задачи</h2>

			{/* Карточка задачи */}
			<div className={`${styles.taskCard} ${task.completed ? styles.completed : ''}`}>
				{/* Статус задачи */}
				<div className={styles.statusSection}>
					<label className={styles.statusLabel}>
						<input
							type="checkbox"
							checked={task.completed}
							onChange={handleToggleStatus}
							className={styles.checkbox}
						/>
						<span className={styles.statusText}>
							{task.completed ? 'Выполнена' : 'Активна'}
						</span>
					</label>
					<span className={styles.taskId}>ID: {task.id}</span>
				</div>

				{/* Текст задачи */}
				<div className={styles.contentSection}>
					{isEditing ? (
						<div className={styles.editMode}>
							<textarea
								value={editText}
								onChange={(e) => setEditText(e.target.value)}
								className={styles.editTextarea}
								rows="4"
								autoFocus
							/>
							<div className={styles.editButtons}>
								<button onClick={handleSave} className={styles.saveButton}>
									Сохранить
								</button>
								<button
									onClick={() => {
										setIsEditing(false);
										setEditText(task.title);
									}}
									className={styles.cancelButton}
								>
									Отмена
								</button>
							</div>
						</div>
					) : (
						<div className={styles.viewMode}>
							<p className={styles.taskText}>{task.title}</p>
						</div>
					)}
				</div>

				{/* Кнопки действий */}
				<div className={styles.actionsSection}>
					{!isEditing && (
						<button
							onClick={() => setIsEditing(true)}
							className={styles.editButton}
						>
							Редактировать
						</button>
					)}
					<button onClick={handleDelete} className={styles.deleteButton}>
						Удалить задачу
					</button>
				</div>
			</div>

			{/* Информация о задаче */}
			<div className={styles.infoSection}>
				<div className={styles.infoItem}>
					<span className={styles.infoLabel}>Создана:</span>
					<span className={styles.infoValue}>
						{new Date().toLocaleDateString('ru-RU')}
					</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.infoLabel}>Статус:</span>
					<span className={`${styles.infoValue} ${task.completed ? styles.completedStatus : styles.activeStatus}`}>
						{task.completed ? 'Выполнена ✓' : 'В процессе...'}
					</span>
				</div>
			</div>
		</div>
	);
};

export default TaskDetail;
