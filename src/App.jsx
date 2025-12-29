// 'src/App.jsx'
import { Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList/TodoList';
import TaskDetail from './components/TaskDetail/TaskDetail';
import NotFound from './components/NotFound/NotFound';
import styles from './App.module.css'

export function App() {
	return (
		<>
			<div className={styles.app}>
				<h1>The compiler of current tasks</h1>
				<Routes>
					<Route path="/" element={<TodoList />} />
					<Route path="/task/:id" element={<TaskDetail />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</>
	);
}

