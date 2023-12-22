import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test-utils";
import FilterButton from "../../src/components/FilterButton";
import React from "react";
import { screen, waitFor } from "@testing-library/react";
import store from "../../src/app/store";
import { fileterTodo } from "../../src/features/todoSlice";
import { act } from "react-dom/test-utils";

describe('Fillter Butoon', () => {

    it('Is "ALL" button display ?', () => {
        renderWithProviders(<FilterButton />)
        const allButton = screen.getByRole('button', { name: /ALL/i })
        expect(allButton).toBeInTheDocument()
    })
     it('Is "ALL" button background style change when clicked ?', async () => {
        renderWithProviders(<FilterButton />, { store })
        // An update React State should be wrapped in act(...).
        await act(async () => {
            store.dispatch(fileterTodo("all"));
        });
        const updateAllButton = screen.getByText("ALL")
        expect(updateAllButton).toHaveClass("bg-teal-600")
     })
    it('Is "ALL" button initiate global state { filter } correctly ?', async () => {
        renderWithProviders(<FilterButton />, { store })
        const allButton = screen.getByText("ALL");
        expect(allButton).toBeInTheDocument()
        await waitFor(() => {
            // Log the action payload before dispatch
            console.log("Action payload before dispatch:", store.getState().todos.filter);
            // Check if filterTodo action is dispatched with the correct payload
            console.log("Current state:", store.getState().todos.filter);
            expect(store.getState().todos.filter).toBe("all");
        })
    })




    it('Is "active" button display ?', () => {
        renderWithProviders(<FilterButton />)
        const activeButton = screen.getByRole('button', { name: /ACTIVE/i })
        expect(activeButton).toBeInTheDocument()
    })
    it('Is "active" button background style change when clicked ?', async () => {
        renderWithProviders(<FilterButton />, { store })
        // An update React State should be wrapped in act(...).     
        await act(async () => {
            store.dispatch(fileterTodo("active"));
        });
        const updateActiveButton = screen.getByText("ACTIVE")
        expect(updateActiveButton).toHaveClass("bg-teal-600")

    })
    it('Is "active" button initiate global state { filter } correctly ?', async () => {
        renderWithProviders(<FilterButton />, { store })
        const activeButton = screen.getByText("ACTIVE");
        expect(activeButton).toBeInTheDocument()
        await waitFor(() => {
            // Log the action payload before dispatch
            console.log("Action payload before dispatch:", store.getState().todos.filter);
            // Check if filterTodo action is dispatched with the correct payload
            console.log("Current state:", store.getState().todos.filter);
            expect(store.getState().todos.filter).toBe("active");
        })
    })



    
    it('Is "completed" button display ?', () => {
        renderWithProviders(<FilterButton />)
        const completedButton = screen.getByRole('button', { name: /COMPLETED/i })
        expect(completedButton).toBeInTheDocument()
    })
    it('Is "completed" button background style change when clicked ?', async () => {
        renderWithProviders(<FilterButton />, { store })
        // An update React State should be wrapped in act(...).     
        await act(async () => {
            store.dispatch(fileterTodo("completed"));
        });
        const updateCompletedButton = screen.getByText("COMPLETED")
        expect(updateCompletedButton).toHaveClass("bg-teal-600")

    })
    it('Is "comleted" button initiate global state { filter } correctly ?', async () => {
        renderWithProviders(<FilterButton />, { store })
        const completedButton = screen.getByText("COMPLETED");
        expect(completedButton).toBeInTheDocument()
        await waitFor(() => {
            // Log the action payload before dispatch
            console.log("Action payload before dispatch:", store.getState().todos.filter);
            // Check if filterTodo action is dispatched with the correct payload
            console.log("Current state:", store.getState().todos.filter);
            expect(store.getState().todos.filter).toBe("completed");
        })
    })


})