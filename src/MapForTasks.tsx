import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import EditableSpan from "./EditableSpan";

export type PropsType ={
    todolistID: string
    tasksForTodolist: Array<TaskType>
    removeTask: (todolistID: string, taskID: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    editTaskTitle: (todolistID: string, taskID: string, newTaskTitle: string ) => void
}

const MapForTasks = ({todolistID,tasksForTodolist, removeTask, ...props } : PropsType) => {

    function editTaskTitleHandler(taskID:string, newTaskTitle: string) {
        props.editTaskTitle(todolistID,taskID, newTaskTitle)
    }
    return (
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => removeTask(todolistID,t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(todolistID,t.id, e.currentTarget.checked);
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={(newTaskTitle)=>editTaskTitleHandler(t.id, newTaskTitle)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
    );
};

export default MapForTasks;