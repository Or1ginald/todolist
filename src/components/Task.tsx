import React, {ChangeEvent, useCallback} from 'react';
import {ChangeText} from "./ChangeText";
import {deleteTaskTC, updateTaskTC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "../api/todolists-api";
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";


type TaskPropsType = {
    toDoListId: string
    id: string,
    status: TaskStatuses
    title: string
    // onChangeCallback: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log("one task render")
    const changeCheckBoxStatus = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.currentTarget.checked;
        const model = checked ? {status: TaskStatuses.Completed} : {status: TaskStatuses.New}
        console.log(model);
        dispatch(updateTaskTC(props.toDoListId, props.id, model))
    }
    const dispatch = useDispatch()
    const {id, title, status} = props
    const editTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTC(props.toDoListId, props.id, {title}))
    }, [dispatch, props.toDoListId, props.id])
    const deleteTask = () => {
        dispatch(deleteTaskTC(props.toDoListId, props.id))
    }
    const label = { inputProps: { 'aria-label': 'Task Status' } };
    return (
        <li key={id}>
            {/*<input type="checkbox" checked={status === TaskStatuses.Completed} onChange={changeCheckBoxStatus}/>*/}
            <Checkbox
                {...label}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                checked={status === TaskStatuses.Completed}
                onChange={changeCheckBoxStatus}
            />
            <ChangeText title={title} callBack={editTaskTitle}/>
            {/*<button onClick={deleteTask}>x</button>*/}
            <IconButton aria-label="delete" size="large" onClick={deleteTask}>
                <DeleteIcon />
            </IconButton>
        </li>
    );
});
