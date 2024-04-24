import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const[expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date(),
    })
    const [error, setError] = useState('');
    const [previousAmount, setPreviousAmount] = useState(0);
    const { dispatch, state, remainingBudget } = useBudget();

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    },[state.editingId])

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }



    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);

        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar
        if(Object.values(expense).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }

        // Validar no pasarme del limite
        if( (expense.amount - previousAmount ) > remainingBudget ){
            setError('Ese gasto se sale del preupuesto')
            return
        }
        // Agregar o actualizar un nuevo gasto
        if(state.editingId) {
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        } else {
            dispatch({type: 'add-expense', payload: { expense} })
        }

        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date(),
        })
        setPreviousAmount(0)
    }

    return (
        <form
            className="space-y-5"
            onSubmit={handleSubmit}
        >
            <legend
                className="text-center text-2xl font-black border-b-4 border-blue-500 py-1"
            >
                {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
                {/* Nuevo Gasto */}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    // className="text-md"
                >Nombre Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el Nombre del Gasto"
                    className="p-1.5 rounded-md border-0 focus:ring-indigo-600 text-gray-900 ring-1 ring-inset ring-gray-300"
                    name="expenseName"
                    value= {expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    // className="text-md"
                >Cantidad:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="p-1.5 rounded-md border-0 focus:ring-indigo-600 text-gray-900 ring-1 ring-inset ring-gray-300"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    // className="text-md"
                >Categoria:</label>
                <select
                    id="category"
                    className="p-1.5 rounded-md border-0 focus:ring-indigo-600 text-gray-900 ring-1 ring-inset ring-gray-300"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map( category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="date"
                    // className="text-md"
                >Fecha Gasto:</label>
                <DatePicker
                    className="p-1.5 rounded-md border-0 focus:ring-indigo-600 text-gray-900 ring-1 ring-inset ring-gray-300"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
                {/* <input
                    type="date"
                    id="amount"
                    className="bg-slate-100 p-2 rounded-md"
                    name="amount"
                /> */}
            </div>
            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white font-bold rounded-lg"
                // value="Registrar Gasto"
                value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
            />
        </form>
    )
}
