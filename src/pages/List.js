import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
// import TaskListLg from "../components/TaskListLg";
import TaskTabs from "../components/TaskTabs";
import { idbPromise } from "../utils/helpers";
import { useDispatch } from 'react-redux';
import { CURRENT_TASKS } from "../utils/actions";

// const tasks = [
//     {
//         id: 1,
//         title: "Prepare a resume that suits the company's need",
//         details: "Write an updated resume with newly projects including 'My School' and 'What to do'.",
//         deadline: "2022-11-25",
//         status: "todo"
//     },
//     {
//         id: 2,
//         title: "Prepare a resume",
//         details: "Write an updated resume with newly projects including 'My School' and 'What to do'.",
//         deadline: "2022-11-25",
//         status: "todo"
//     },
//     {
//         id: 3,
//         title: "Create a cover letter format",
//         details: "create a cover letter format that can be easily adapts to job application.",
//         deadline: "2022-11-30",
//         status: "doing"
//     }
// ]

export default function List() {
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();
    // useEffect(() => {
    //     function handleResize() {
    //         setScreenWidth(window.innerWidth)
    //     }
    //     window.addEventListener('resize', handleResize)
    // });
    useEffect(() => {
        idbPromise("tasks", "get").then((result) => {
            dispatch({
                type: CURRENT_TASKS,
                tasks: result,
            })
        });
    }, [dispatch]);

    return (
        <Container>
            <div className="fluid d-flex flex-column"
                style={{ minHeight: "100vh" }}>
                <div style={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "255px 25px 225px 25px / 25px 225px 25px 255px"
                }}>
                    <h1 className="text-center">What To Do</h1>
                    <figure className="text-center">
                        <blockquote className="blockquote">
                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                        </blockquote>
                        <figcaption className="blockquote-footer">
                            Someone famous in <cite title="Source Title">Source Title</cite>
                        </figcaption>
                    </figure>
                </div>
                <TaskTabs />
                {/* {tasks && <>{screenWidth >= 992 ? <TaskListLg tasks={tasks} /> : <TaskTabs tasks={tasks} />}</>} */}
            </div>
        </Container>
    )
};