import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistID:string, taskID: string) {
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskID);
        setTasks({...tasks});
    }

    function addTask(todolistID:string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        tasks[todolistID] = [newTask, ... tasks[todolistID]];
        setTasks({...tasks});
    }

    function changeStatus(todolistID:string,taskID: string, isDone: boolean) {
        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ?
            {...t, isDone} : t);
        setTasks({...tasks});
    }

    function removeTodolist(todolistID:string) {
        todolists = todolists.filter(tl => tl.id !== todolistID)
            setTodolists([...todolists])
    }

    return (
        <div className="App">
            {todolists.map(el => {
                return (
                    <Todolist
                        todolistID={el.id}
                        key={el.id}
                        title={el.title}
                        tasks={tasks[el.id]}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        setTodolists={setTodolists}
                        todolists={todolists}
                    />
                )
            })}
        </div>
    );
}

export default App;
