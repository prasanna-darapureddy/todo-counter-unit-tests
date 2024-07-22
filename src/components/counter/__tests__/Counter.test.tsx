import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Counter from '../Counter';

describe('Counter', () => {
    test('initialCount', () => {
        render(<Counter />)
        const counter = screen.getByTestId('count');
        expect(counter).toHaveTextContent('0')
    });

    test('increment btn triggering', () => {
        const {getByTestId} = render(<Counter />);
        const incButton = getByTestId('incBtn')
        const counter = getByTestId('count');
        fireEvent.click(incButton);
        expect(counter).toHaveTextContent('1');
    });

    test('decrement btn triggering', () => {
        const {getByTestId} = render(<Counter />);
        const decButton = getByTestId('decBtn');
        const incButton = getByTestId('incBtn');
        const countEl = getByTestId('count');
        fireEvent.click(decButton);
        expect(countEl).toHaveTextContent('0')
        fireEvent.click(incButton);
        fireEvent.click(decButton);
        expect(countEl).toHaveTextContent('0') 
    });

    test('Reset btn triggering', () => {
        const {getByText, getByTestId} = render(<Counter />);
        const resetBtn = getByText('Reset');
        const incBtn = getByTestId('incBtn');
        const countEl = getByTestId('count');
        fireEvent.click(incBtn);
        fireEvent.click(resetBtn);
        expect(countEl).toHaveTextContent('0')
    })

    test('Change text event for random text', () => {
        const { getByTestId} = render(<Counter />)
        const inputEl = getByTestId('input')        
        fireEvent.change(inputEl, {target: {value: 'first text'}});        
    })
})

