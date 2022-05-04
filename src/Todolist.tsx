import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TodolistsType} from './App';
import MapForTasks from "./MapForTasks";
import Fullinput from "./Fullinput";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskID: string) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    setTodolists: (todolists: Array<TodolistsType>) => void
    todolists: Array<TodolistsType>
}

export function Todolist(props: PropsType) {

    function changeFilter(todolistID: string, value: FilterValuesType) {
        props.setTodolists(props.todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    const onAllClickHandler = () => changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => changeFilter(props.todolistID, "completed");

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistID,newTitle)
    }

    return <div>
        <h3>{props.title}
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <Fullinput callBack={addTaskHandler}/>
        <MapForTasks
            todolistID={props.todolistID}
            tasksForTodolist={tasksForTodolist}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
        />
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
