import { Box, Button, Typography } from '@mui/material'
import React, { Component } from 'react'
import { styles } from './MuiCounterStyles';

interface IState {
    counter: number;
}

export default class MuiCounter extends Component<{}, IState> {
    constructor(props: {}) {
        super(props)
        this.state = { counter: 0 }
    }

    handleIncrement = () => {
        this.setState((prevState) => ({ counter: prevState.counter+1}))
    }

    handleDecrement = () => {
        const {counter} = this.state
        if(counter > 0){
            this.setState((prevState) => ({counter: prevState.counter-1}))
        }        
    };

    handleReset = () => {
        this.setState({ counter: 0 })
    }

    render() {
        const { counter } = this.state
        return (
            <>
                <Box sx={styles.bgContainer}>
                    <Box sx={styles.counterCard}>
                        <Typography variant='h1'>Counter</Typography>
                        <Typography variant='h2' data-testId={'counter'}>{counter}</Typography>
                        <Box sx={styles.btnsBox}>
                            <Button color={'secondary'} variant='contained' sx={styles.btn} onClick={this.handleIncrement}>Increament</Button>
                            <Button color={'error'} variant='outlined' sx={styles.btn} onClick={this.handleDecrement}>Decreament</Button>
                            <Button variant='contained' sx={styles.btn} disabled={counter === 0} onClick={this.handleReset}>Reset</Button>
                        </Box>
                    </Box>
                </Box>
            </>
        )
    }
}
