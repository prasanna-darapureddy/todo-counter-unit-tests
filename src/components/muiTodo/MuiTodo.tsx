import { Box, IconButton, InputAdornment, InputBase, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { Component } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from './MuiTodoStyles';
import { Done, Edit } from '@mui/icons-material';

interface IState {
    text: string;
    todoList: {
        id: number;
        text: string;        
    }[],
    id: number;
    editedText: string;
    isEditable: boolean;
}

export default class MuiTodo extends Component<{}, IState> {
    constructor(props: {}) {
        super(props)
        this.state = { text: '', todoList: [], editedText: '', isEditable: false, id: 0 }
    }

    handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ text: event.target.value })
    }

    handleAddTodo = () => {
        const { text, todoList } = this.state
        const newTodo = {
            id: todoList.length + 1,
            text: text,
        }
        this.setState((prevState) => ({ todoList: [...prevState.todoList, newTodo] }))
        this.setState({ text: '' })
    }

    handleDelete = (id: number) => {
        const { todoList } = this.state
        const filteredTodo = todoList.filter((todo) => todo.id !== id)
        this.setState({ todoList: filteredTodo })
        this.setState({ text: '' })
    }

    handleEdit = (todo: { id: number, text: string }) => {
        this.setState({editedText: todo.text, id: todo.id, isEditable: true})
    }

    handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ editedText: event.target.value })
    }

    handleEditDone = (id: number) => {
        const { todoList, editedText } = this.state
        this.setState({ isEditable: false })
        const editedList = todoList.map((todo) => {
            if (todo.id === id) {
                return { id, text: editedText }
            } else {
                return todo
            }
        })
        this.setState({ todoList: editedList })
    }

    render() {
        const { text, todoList, editedText, isEditable, id} = this.state
        return (
            <>
                <Box sx={styles.bgContainer}>
                    <Box component={'h1'}>Todos</Box>
                    <TextField
                        onChange={this.handleChangeInput}
                        data-testid='textfield'
                        value={text}
                        sx={styles.input}
                        InputProps={{
                            placeholder: 'Write here',
                            endAdornment: text !== '' && (
                                <InputAdornment position="end">
                                    <IconButton onClick={this.handleAddTodo} data-testid='addBtn'>
                                        <Done />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction={'column'} gap={2} data-testid='todosList' component={'ul'}>
                        {todoList.map((eachTodo) => (
                            <Paper sx={styles.todo} key={eachTodo.id} component={'li'}>
                                {isEditable && eachTodo.id === id?
                                    <InputBase inputProps={{'data-testid':'editInput'}} value={editedText} onChange={this.handleEditChange} autoFocus/>
                                    :
                                    <Typography data-testid='todoText'>{eachTodo.text}</Typography>
                                }
                                <Stack direction={'row'} gap={1}>
                                    {isEditable && eachTodo.id === id?
                                        <IconButton onClick={() => this.handleEditDone(eachTodo.id)} data-testid='editDoneBtn'>
                                            <Done />
                                        </IconButton>
                                        :
                                        <IconButton data-testid='editBtn' onClick={() => this.handleEdit(eachTodo)} >
                                            <Edit />
                                        </IconButton>
                                    }
                                    <IconButton onClick={() => this.handleDelete(eachTodo.id)} data-testid='deleteBtn'>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                </Box>
            </>
        )
    }
}
