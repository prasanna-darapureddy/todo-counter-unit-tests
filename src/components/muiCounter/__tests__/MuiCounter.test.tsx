import React from 'react';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import MuiCounter from '../MuiCounter';

describe('Testing with MUI', () => {
    test('checking initial count value', () => {
        const {getByTestId} = render(<MuiCounter />);
        const counterEl = getByTestId('counter');
        expect(counterEl).toHaveTextContent('0');
    })

    test('decrementing counter value', () => {
        const {getByText, getByTestId} = render(<MuiCounter />);
        const decBtn = getByText(/decreament/i);
        const incBtn = getByText(/increament/i);
        const counterEl = getByTestId('counter');        
        fireEvent.click(decBtn);
        expect(counterEl).toHaveTextContent('0')
        fireEvent.click(incBtn);
        fireEvent.click(decBtn);
        expect(counterEl).toHaveTextContent('0') 
    })

    test('increamenting counter vlaue', () => {
        const {getByText, getByTestId} = render(<MuiCounter />);
        const incBtn = getByText(/increament/i);
        const counterEl = getByTestId('counter');
        fireEvent.click(incBtn)
        expect(counterEl).toHaveTextContent('1')
    })

    test('reseting counter vlaue to zero', () => {
        const {getByText, getByTestId} = render(<MuiCounter />);
        const resetBtn = getByText(/reset/i);
        const counterEl = getByTestId('counter');
        const incBtn = getByText(/increament/i)
        fireEvent.click(incBtn)
        fireEvent.click(resetBtn)
        expect(counterEl).toHaveTextContent('0')
    })
})    