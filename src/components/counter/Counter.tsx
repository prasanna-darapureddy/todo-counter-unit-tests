import React, { Component } from 'react'
import './Counter.css'

interface IState {
    counter: number;
    text: string
}


class Counter extends Component<{}, IState> {
    constructor(props: {}) {
        super(props)
        this.state = { counter: 0, text: '' }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({text: event.target.value})
    }

    handleDecrement = () => {
        const { counter } = this.state
        if (counter > 0) {
            this.setState((prevState: IState) => ({ counter: prevState.counter - 1 }))
        }
    };

    handleIncrement = () => {
        this.setState((prevState: IState) => ({ counter: prevState.counter + 1 }))
    };

    handleReset = () => {
        this.setState({counter:0})
    }

    render() {
        const { counter, text } = this.state

        return (
            <div className='page'>
                <div className='counter-container'>
                    <h1>Counter</h1>
                    <h1 data-testid='count'>{counter}</h1>
                    <div className='btns-container'>
                        <button className='dec-btn' data-testid='decBtn' onClick={this.handleDecrement}>Increase</button>
                        <button className='inc-btn' data-testid='incBtn' onClick={this.handleIncrement}>Decrease</button>
                        <button onClick={this.handleReset} disabled={counter === 0}>Reset</button>
                    </div>
                    <h1 data-testid='text'>{text}</h1>
                    <input placeholder='Text' data-testid='input' value={text} onChange={this.handleChange}/>
                </div>
            </div>
        )
    }
}
export default Counter