import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Task from '../Task';
import listBackground from '../../assets/images/list.jpg';

export default function TaskListLg ({tasks}) {
    return(
        <Row
                    className="text-center"
                    style={{
                        backgroundImage: `url(${listBackground})`,
                        flexGrow: 1,
                        borderRadius: "25px 225px 25px 255px / 255px 25px 225px 25px"
                    }}>
                    <Col style={{
                        borderRadius: "25px 225px 25px 255px / 255px 25px 225px 25px",
                        borderStyle: "solid"
                    }}>
                        <p style={{fontSize: 45}}>TO DO</p>
                        <Row>
                            {tasks.map((task, index) => (
                                <Col lg={6} key={index}><Task task={task}/></Col>
                            ))}
                        </Row>
                    </Col>
                    <Col style={{
                        borderRadius: "255px 25px 225px 25px / 25px 225px 25px 255px",
                        borderStyle: "solid"
                    }}>
                        <p style={{fontSize: 45}}>DOING</p> 
                    </Col>
                    <Col style={{
                        borderRadius: "25px 225px 25px 255px / 255px 25px 225px 25px",
                        borderStyle: "solid"
                    }}>
                        <p style={{fontSize: 45}}>DONE</p>
                    </Col>
                </Row>
    )
}