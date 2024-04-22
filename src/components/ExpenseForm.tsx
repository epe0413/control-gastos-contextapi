import { ChangeEvent, useState } from "react";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import { DraftExpense, Value } from "../types";

export default function ExpenseForm() {

    const[expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date(),
    })

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

    return (
        <form
            action=""
            className="space-y-5"
        >
            <legend
                className="text-center text-2xl font-black border-b-4 border-blue-500 py-1"
            >
                Nuevo Gasto
            </legend>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-lg"
                >Nombre Gasto:</label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el Nombre del Gasto"
                    className="bg-slate-100 p-2 rounded-md"
                    name="expenseName"
                    value= {expense.expenseName}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-lg"
                >Cantidad:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 p-2 rounded-md"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-lg"
                >Categoria:</label>
                <select
                    id="category"
                    className="bg-slate-100 p-2 rounded-md"
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
                    className="text-lg"
                >Fecha Gasto:</label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
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
                value="Registrar Gasto"
            />
        </form>
    )
}
