// src/components/TodoList/TodoList.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import TodoForm from '../TodoForm/TodoForm';
import SearchBar from '../SearchBar/SearchBar';
import SortButton from '../SortButton/SortButton';

const TodoList = () => {
	// 1. Объявили состояния
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [operationError, setOperationError] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortAlphabetical, setSortAlphabetical] = useState(false);

	// Функция для загрузки задач (GET)
	useEffect(() => {
		const fetchTodos = async () => {
			setLoading(true);
			try {
				const response = await fetch('http://localhost:3000/todos');
				if (!response.ok) throw new Error('Ошибка загрузки');
				const data = await response.json();
				setTodos(data);
				setError(null); // Сбрасываем ошибку загрузки при успехе
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchTodos();
	}, []);

	// Функция handleAddTodo для POST запроса
	const handleAddTodo = async (newTodo) => {
		try {
			// Отправляем POST запрос на JSON Server
			const response = await fetch('http://localhost:3000/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTodo),
			});

			if (!response.ok) {
				throw new Error('Ошибка при добавлении задачи');
			}

			const createdTodo = await response.json();

			// Обновляем состояние, добавляя новую задачу в начало
			setTodos(prevTodos => [createdTodo, ...prevTodos]);
			setOperationError(null); // Сбрасываем ошибку операций

			console.log('Задача добавлена:', createdTodo);
		} catch (error) {
			console.error('Ошибка:', error);
			setOperationError('Не удалось добавить задачу');
			// Автоочистка через 3 секунды
			setTimeout(() => setOperationError(null), 3000);
		}
	};

	// Функция для обновления статуса задачи (только completed)
	const handleUpdateTodoStatus = async (id, completed) => {
		try {
			const response = await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ completed }),
			});

			if (!response.ok) {
				throw new Error('Ошибка при обновлении статуса задачи');
			}

			const updatedTodo = await response.json();

			// Обновляем состояние
			setTodos(prevTodos =>
				prevTodos.map(todo =>
					todo.id === id ? { ...todo, ...updatedTodo } : todo
				)
			);
			setOperationError(null); // Сбрасываем ошибку операций

			console.log('Статус задачи обновлён:', updatedTodo);
		} catch (error) {
			console.error('Ошибка:', error);
			setOperationError('Не удалось обновить статус задачи');
			// Автоочистка через 3 секунды
			setTimeout(() => setOperationError(null), 3000);
		}
	};

	// Функция для обработки изменения поискового запроса
	const handleSearchChange = (term) => {
		setSearchTerm(term);
	};

	// Функция для обработки переключения сортировки
	const handleToggleSort = () => {
		setSortAlphabetical(prev => !prev);
	};

	// Функция для сортировки и фильтрации задач
	const getSortedAndFilteredTodos = () => {
		let result = [...todos];

		// Применяем поиск
		if (searchTerm) {
			result = result.filter(todo =>
				todo.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Применяем сортировку
		if (sortAlphabetical) {
			result = [...result].sort((a, b) => {
				return a.title.localeCompare(b.title, 'ru', { sensitivity: 'base' });
			});
		}

		return result;
	};

	const sortedAndFilteredTodos = getSortedAndFilteredTodos();

	// Рендер компонента
	return (
		<div className="todo-list">
			{/* Форма добавления новой задачи */}
			<TodoForm onAddTodo={handleAddTodo} />

			{/* Ошибки операций */}
			{operationError && (
				<div className="operation-error">
					{operationError}
				</div>
			)}

			{/* Поиск задач */}
			<SearchBar
				searchTerm={searchTerm}
				onSearchChange={handleSearchChange}
				resultsCount={sortedAndFilteredTodos.length}
				totalCount={todos.length}
			/>

			{/* Кнопка сортировки */}
			<SortButton
				isSorted={sortAlphabetical}
				onToggle={handleToggleSort}
			/>

			{/* Статистика */}
			<div className="todo-stats">
				<div>
					Всего задач: {todos.length} |
					Выполнено: {todos.filter(todo => todo.completed).length} |
					Активных: {todos.filter(todo => !todo.completed).length}
				</div>
				<div className="stats-details">
					{searchTerm && (
						<span className="search-stats">
							Поиск: {sortedAndFilteredTodos.length} из {todos.length}
						</span>
					)}
					{sortAlphabetical && (
						<span className="sort-stats">
							| Сортировка: по алфавиту
						</span>
					)}
				</div>
			</div>

			{/* Состояния загрузки/ошибки */}
			{loading && <div className="loading">Загрузка...</div>}
			{error && <div className="error">{error}</div>}

			{/* Список задач */}
			{!loading && !error && (
				<>
					{sortedAndFilteredTodos.length === 0 ? (
						<div className="empty-state">
							{searchTerm ? (
								<>
									<p>По запросу "<strong>{searchTerm}</strong>" ничего не найдено</p>
									<button
										onClick={() => setSearchTerm('')}
										className="clear-search-btn"
									>
										Показать все задачи
									</button>
								</>
							) : (
								"Нет задач. Добавьте первую!"
							)}
						</div>
					) : (
						<ul className="todo-items">
							{sortedAndFilteredTodos.map((todo) => (
								<TodoItem
									key={todo.id}
									todo={todo}
									// Теперь передаем только функцию для обновления статуса (чекбокс)
									onToggleStatus={handleUpdateTodoStatus}
								/>
							))}
						</ul>
					)}
				</>
			)}
		</div>
	);
}

export default TodoList;
