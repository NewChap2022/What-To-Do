import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function TaskDetails({ task, showDetail, setShowDetail, setShowEditor, setEditTask, type }) {
    const handleEdit = () => {
        setShowDetail(false);
        setShowEditor(true);
        setEditTask(task);
    };

    return (
        <Modal
            show={showDetail}
            onHide={() => setShowDetail(false)}
            dialogClassName="modal-90w"
            aria-labelledby="custom-modal-styling-title"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    {task.title}
                </Modal.Title>
                <Badge bg="primary" style={{marginLeft: "auto"}} pill>
                    {task.deadline}
                </Badge>
                <Badge bg="primary" style={{marginLeft: "auto"}}>
                    STATUS: {type}
                </Badge> 
            </Modal.Header>
            <Modal.Body>
                <p>
                    {task.details}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleEdit} className="primary-button" variant="primary">Edit</Button>
            </Modal.Footer>
        </Modal>
    );
};