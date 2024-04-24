import { ChangeEvent, FormEvent, useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget";
import ErrorMessage from "./ErrorMessage";
import { formatCurrency } from "../helpers";

export default function BudgetForm() {
    const [budget, setBudget] = useState(0)
    const { dispatch, totalExpense, state } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    }

    const isValid = useMemo(()=> {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if( totalExpense > budget ){
            dispatch({type:'add-error', payload: {error:  `El presupuesto no puede ser menor a lo gastado: ${formatCurrency(totalExpense)}`}})
            // state.error='Ese gasto se sale del preupuesto'
            return
        }

        dispatch({type: 'add-budget', payload: { budget } })
        dispatch({type: 'close-budget'})
    }

    return (
        <form
            className="space-y-5"
            onSubmit = {handleSubmit}
        >
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-2xl text-blue-900 font-bold text-center">
                    Definir Presupuesto
                </label>
            </div>

            {state.error && <ErrorMessage>{state.error}</ErrorMessage>}

            <input
                id="budget"
                type="number"
                className="w-full bg-white border border-blue-200 p-2 rounded-md"
                placeholder="Define tu presupuesto"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
            <div className="flex place-content-center">

                <input
                    type="submit"
                    value='Definir Presupuesto'
                    className="bg-blue-800 hover:bg-blue-900 cursor-pointer p-2 text-white font-black rounded-md disabled:opacity-40 disabled:cursor-auto disabled:hover:bg-blue-800"
                    disabled={isValid}
                />
            </div>
        </form>
    )
}
