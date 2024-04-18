import { ChangeEvent, useMemo, useState } from "react"

export default function BudgetForm() {
    const [budget, setBudget] = useState(0)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    }

    const isValid = useMemo(()=> {
        return isNaN(budget) || budget <= 0
    }, [budget])

    return (
        <form
            className="space-y-5"
        >
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-2xl text-blue-600 font-bold text-center">
                    Definir Presupuesto
                </label>
            </div>
            <input
                id="budget"
                type="number"
                className="w-full bg-white border border-blue-200 p-2 rounded-md"
                placeholder="Define tu presupuesto"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
            <input
                type="submit"
                value='Definir Presupuesto'
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black rounded-md disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
}
