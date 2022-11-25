import React from "react";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { idbPromise } from "../../utils/helpers";
import { ADD_TASK, DELETE_TASK, UPDATE_CURRENT_TAB, UPDATE_TASK } from "../../utils/actions";

export default function TaskEditor({
    showEditor,
    setShowEditor,
    setEditTask,
    task,
}) {
    const dispatch = useDispatch();

    const handleTaskSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const taskInfo = {
            title: data.get("title"),
            details: data.get("details"),
            deadline: data.get("deadline"),
            status: data.get("status"),
        };
        if (task) {
            const updatedTask = {
                id: task.id,
                ...taskInfo,
            };
            idbPromise("tasks", "put", updatedTask);
            dispatch({
                type: UPDATE_TASK,
                task: updatedTask,
            });
            dispatch({
                type: UPDATE_CURRENT_TAB,
                currentTab: updatedTask.status
            })
            setEditTask();
        } else {
            const addedTask = {
                ...taskInfo,
                status: "todo",
            };
            idbPromise("tasks", "put", addedTask).then(result =>
                dispatch({
                    type: ADD_TASK,
                    task: {...addedTask, id: result},
                })
            );
            dispatch({
                type: UPDATE_CURRENT_TAB,
                currentTab: "todo"
            })
        };
        setShowEditor(false);
    };

    const handleDelete = () => {
        idbPromise("tasks", "delete", task);
        dispatch({
            type: DELETE_TASK,
            id: task.id
        });
        setEditTask();
        setShowEditor(false);
    };

    return (
        <Modal
            show={showEditor}
            onHide={() => {
                setShowEditor(false);
                setEditTask();
            }}
            dialogClassName="modal-90w"
            aria-labelledby="custom-modal-styling-title"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    {task ? "Edit Task" : "Add New Task"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleTaskSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            defaultValue={task && task.title}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="details"
                            defaultValue={task && task.details}
                            rows={3}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="date"
                            name="deadline"
                            defaultValue={task && task.deadline}
                        />
                    </Form.Group>
                    {task && (
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select defaultValue={task && task.status} name="status">
                                <option value="todo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </Form.Select>
                        </Form.Group>
                    )}
                    <Button
                        type="submit"
                        className="primary mt-2 text-centre primary-button"
                    >
                        {task ? "UPDATE" : "ADD"}
                    </Button>
                    {task && (
                        <Button
                            onClick={handleDelete}
                            className="primary mt-2 text-centre primary-button"
                        >
                            DELETE
                        </Button>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
    );
}
