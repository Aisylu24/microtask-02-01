import React, {ChangeEvent, useState} from 'react';

type PropsType= {
    title: string
    callback: (newTitle:string) => void
}

const EditableSpan = (props:PropsType) => {

    let [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const changeToInput = () => {
        debugger
        setEdit(!edit)
       // setNewTitle(props.title)
    }

    const setTitleGlobal = () => {
        debugger
        setEdit(!edit)
        props.callback(newTitle)
    }

    return edit
        ? <input value={newTitle} onChange={onChangeHandler}
                onBlur={setTitleGlobal}
                // onBlur={changeToInput}
                 autoFocus/>
       : <span onDoubleClick={changeToInput}>{props.title}</span>

};

export default EditableSpan;