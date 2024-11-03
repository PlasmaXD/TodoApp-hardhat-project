// client/src/components/TodoInput.js
import React, { Component } from 'react';
import { Card, Form, FormControl, InputGroup, Button } from 'react-bootstrap';

class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: ''
        };
    }

    onAddTodo(event) {
        this.setState({ task: event.target.value });
    }

    async onTodoCreate(event) {
        event.preventDefault();

        const { contract, account, onTodoCreated } = this.props;

        if (contract && account) {
            try {
                // トランザクションに署名とガスを指定
                const tx = await contract.TodoCreate(this.state.task, { gasLimit: 500000, from: account });
                await tx.wait(); // トランザクションの完了を待つ

                // 入力フィールドをクリアし、リストを更新
                this.setState({ task: '' });
                if (onTodoCreated) onTodoCreated();
            } catch (error) {
                console.error("Error creating Todo:", error);
                alert("Todoの追加に失敗しました。");
            }
        } else {
            alert("コントラクトまたはアカウントがロードされていません。");
        }
    }

    render() {
        return (
            <Card className="mt-3 mb-3">
                <Card.Body>
                    <Form onSubmit={this.onTodoCreate.bind(this)}>
                        <InputGroup>
                            <FormControl
                                placeholder="Todoを入力してください"
                                value={this.state.task}
                                onChange={this.onAddTodo.bind(this)}
                            />
                            <InputGroup.Append>
                                <Button type="submit" variant="success">Add</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default TodoInput;
