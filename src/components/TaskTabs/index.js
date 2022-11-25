import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TabContent from '../TabContent';
import { UPDATE_CURRENT_TAB } from '../../utils/actions';

export default function TaskTabs() {
    // const [key, setKey] = useState('todo');
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);
    const currentTab = useSelector(state => state.currentTab);

    const setSelectedTab = (k) => {
        dispatch({
            type: UPDATE_CURRENT_TAB,
            currentTab: k
        })
    };

    const filteredtasks = (status) => {
        let result = [];
        tasks.forEach(task => {
            if (task.status === status) {
                result.push(task)
            }
        });
        return result;
    };

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={currentTab}
            onSelect={(k) => setSelectedTab(k)}
            className="mb-3"
        >
            <Tab eventKey="todo" title="TO DO">
                <TabContent
                    tasks={filteredtasks("todo")}
                    title="TO DO"
                />
            </Tab>
            <Tab eventKey="doing" title="DOING">
                <TabContent 
                    tasks={filteredtasks("doing")} 
                    title="DOING" 
                />
            </Tab>
            <Tab eventKey="done" title="DONE">
                <TabContent 
                    tasks={filteredtasks("done")}  
                    title="DONE" 
                />
            </Tab>
        </Tabs>
    );
}
