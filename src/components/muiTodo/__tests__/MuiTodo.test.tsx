import React from 'react';
import { fireEvent, logRoles, render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom'
import MuiTodo from '../MuiTodo';

describe("Todo List Component Checks", () => {
    test("getting todo text from input", () => {
        const { getByPlaceholderText } = render(<MuiTodo />);
        const inputEl = getByPlaceholderText('Write here');
        fireEvent.change(inputEl, { target: { value: "first" } })
    })

    test("adding text to todo list", () => {
        const { getByTestId, getByPlaceholderText } = render(<MuiTodo />);
        const inputEl = getByPlaceholderText('Write here');
        fireEvent.change(inputEl, { target: { value: "first" } })
        const addBtnEl = getByTestId('addBtn');
        fireEvent.click(addBtnEl);
        const textEl = getByTestId('todoText');
        expect(textEl).toHaveTextContent('first');
        const todosListEl = getByTestId('todosList');
        const listItem = within(todosListEl).getAllByRole('listitem');
        expect(listItem).toHaveLength(1)
    })

    test("deleting todo from todo list", () => {
        const { getByTestId, getByPlaceholderText } = render(<MuiTodo />);
        const inputEl = getByPlaceholderText('Write here');
        fireEvent.change(inputEl, { target: { value: "first" } })
        const addBtnEl = getByTestId('addBtn');
        fireEvent.click(addBtnEl);
        const textEl = getByTestId('todoText');
        expect(textEl).toHaveTextContent('first');

        const todosListEl = getByTestId('todosList');
        let listItem = within(todosListEl).getAllByRole('listitem');
        expect(listItem).toHaveLength(1);

        const deleteBtn = getByTestId('deleteBtn');
        fireEvent.click(deleteBtn);
        listItem = within(todosListEl).queryAllByRole('listitem');
        expect(listItem).toHaveLength(0);
    })

    test("edit input is open to edit in todo", () => {
        const { getByTestId, getByPlaceholderText } = render(<MuiTodo />);
        const inputEl = getByPlaceholderText('Write here');
        fireEvent.change(inputEl, { target: { value: "first" } })
        const addBtnEl = getByTestId('addBtn');
        fireEvent.click(addBtnEl);
        const textEl = getByTestId('todoText');
        expect(textEl).toHaveTextContent('first');
        const editBtn = getByTestId('editBtn');
        fireEvent.click(editBtn);
        const editInputEl = getByTestId('editInput');
        expect(editInputEl).toBeInTheDocument();
    })

    test("todo edited data is appending to the todo text", () => {
        const { getByTestId, getAllByTestId, getByPlaceholderText } = render(<MuiTodo />);
        const inputEl = getByPlaceholderText('Write here');
        fireEvent.change(inputEl, { target: { value: "first" } })
        const addBtnEl = getByTestId('addBtn');
        fireEvent.click(addBtnEl);
        const textEl = getByTestId('todoText');
        expect(textEl).toHaveTextContent('first');
        let todosListEl = getByTestId('todosList');
        let listItem = within(todosListEl).getAllByRole('listitem');
        expect(listItem).toHaveLength(1);

        const inputEl2 = getByPlaceholderText('Write here');
        fireEvent.change(inputEl2, { target: { value: "second" } })
        const addBtnEl2 = getByTestId('addBtn');
        fireEvent.click(addBtnEl2);
        todosListEl = getByTestId('todosList');
        listItem = within(todosListEl).getAllByRole('listitem');
        expect(listItem).toHaveLength(2);

        const editBtn = getAllByTestId('editBtn')[0];
        fireEvent.click(editBtn);
        const editDoneBtnEl = getByTestId('editDoneBtn');
        expect(editDoneBtnEl).toBeInTheDocument();
        const editInputEl = getByTestId('editInput');
        expect(editInputEl).toBeInTheDocument();
        expect(textEl).not.toBeInTheDocument();

        const prevText = textEl.textContent
        fireEvent.change(editInputEl, { target: { value: prevText + ' edited' } });
        fireEvent.click(editDoneBtnEl);
        const updateTextEl = getAllByTestId('todoText')[0];
        expect(updateTextEl).toBeInTheDocument();
        expect(updateTextEl).toHaveTextContent('first edited');
        expect(editInputEl).not.toBeInTheDocument();
        // screen.logTestingPlaygroundURL()
        // logRoles(todosListEl)
    })

})