import React from 'react';
import { Card } from 'react-bootstrap';
import Todo from './Todo';
import getTodoContract from '../contracts/Todo_ABI';

const TodoList = ({ todolist, onTodoRemoved }) => {

    const handleTodoRemove = async (taskid) => {
        const { contract } = getTodoContract();

        if (contract) {
            try {
                const tx = await contract.TodoRemove(taskid);
                await tx.wait();

                // Todoリストを再取得
                if (onTodoRemoved) {
                    onTodoRemoved();
                }

            } catch (error) {
                console.error("Error removing Todo:", error);
                alert("Todoの削除に失敗しました。");
            }
        } else {
            alert("コントラクトがロードされていません。");
        }
    };

    const filteredTodos = todolist.filter(todo => todo.completed);

    return (
        <Card>
            <Card.Header>Todo List</Card.Header>
            <Card.Body>
                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo, index) => (
                        <Todo
                            key={index}
                            task={todo.task}
                            taskid={todo.id}
                            TodoRemove={handleTodoRemove}
                        />
                    ))
                ) : (
                    <p>まだTodoがありません。</p>
                )}
            </Card.Body>
        </Card>
    );
};

export default TodoList;
