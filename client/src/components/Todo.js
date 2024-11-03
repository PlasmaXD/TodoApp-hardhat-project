import React from 'react';
import { ListGroup, Button, Row, Col } from 'react-bootstrap'; // ここを編集

function Todo(props) {
    return (
        <ListGroup variant="flush">
            <ListGroup.Item>
                {/* ここから追加 */}
                <Row>
                    {/* Todoのタスクを表示する */}
                    <Col sm={10}>{props.task}</Col>
                    
                    {/* TodoRemoveが呼び出せるように、Doneボタンを用意する */}
                    <Col sm={2}>
                        <Button variant="outline-danger" onClick={() => props.TodoRemove(props.taskid)}>Done</Button>
                    </Col>
                </Row>
                {/* ここまで追加 */}
            </ListGroup.Item>
        </ListGroup>
    );
}

export default Todo;
