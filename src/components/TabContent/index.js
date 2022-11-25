import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import listBackground from '../../assets/images/list.jpg';
import { idbPromise } from '../../utils/helpers';
import { UPDATE_TASK, UPDATE_CURRENT_TAB } from '../../utils/actions';
import TaskDetails from '../TaskDetails';
import TaskEditor from '../TaskEditor';

export default function TabContent({ tasks, title }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [selectedTask, setSelectedTask] = useState();
    const [editTask, setEditTask] = useState();
    const dispatch = useDispatch();

    const viewDetails = task => {
        setShowDetail(true);
        setSelectedTask(task);
    };

    const addNewTask = () => {
        setEditTask();
        setShowEditor(true);
    }

    const handleStatusChange = (event) => {
        event.stopPropagation();
        const type = title.replace(/\s/g, '').toLowerCase();
        const id = parseInt(event.target.id);
        const task = tasks.find(task => task.id === id);

        if (event.target.value !== type) {
            idbPromise("tasks", "put", { ...task, status: event.target.value });
            dispatch({
                type: UPDATE_TASK,
                task: { ...task, status: event.target.value }
            })
            dispatch({
                type: UPDATE_CURRENT_TAB,
                currentTab: event.target.value
            })
        };
    };

    return (
        <div
            className="text-center"
            style={{
                backgroundImage: `url(${listBackground})`,
                minHeight: "500px",
                marginTop: 0
            }}>
            <div>
                <p
                    style={{
                        fontWeight: "bolder",
                        paddingLeft: "10px",
                        fontSize: "30px",
                        marginBottom: "10px"
                    }}>
                    {title}
                </p>
                <Button variant="primary" className="primary-button" onClick={addNewTask} style={{ width: "200px", marginBottom: "10px" }}>
                    <strong>+</strong> Add New Task
                </Button>
            </div>
            <ListGroup as="ol" style={{ backgroundColor: "transparent", margin: "0 20px" }}>
                {tasks && tasks.map((task, index) => (
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-center list-group-item-action"
                        key={index}
                        onClick={() => viewDetails(task)}
                    >
                        <div className="ms-2 me-auto fw-bold text-start">
                            {task.title}
                        </div>

                        <Form.Select
                            defaultValue={task.status}
                            id={task.id}
                            style={{ width: "90px", height: "38px", marginRight: "10px" }}
                            aria-label="task status"
                            onClick={handleStatusChange}
                        >
                            <option value="todo">To Do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </Form.Select>

                        <Badge bg="primary" pill>
                            {task.deadline}
                        </Badge>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {showDetail &&
                <TaskDetails
                    task={selectedTask}
                    showDetail={showDetail}
                    setShowDetail={setShowDetail}
                    setShowEditor={setShowEditor}
                    setEditTask={setEditTask}
                    type={title}
                />
            }
            {showEditor &&
                <TaskEditor
                    showEditor={showEditor}
                    setShowEditor={setShowEditor}
                    setEditTask={setEditTask}
                    task={editTask}
                />
            }
        </div>
    )
}