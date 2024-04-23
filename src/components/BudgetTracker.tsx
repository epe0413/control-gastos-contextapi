import { useMemo } from 'react';
import AmountDisplay from './AmountDisplay';
import { useBudget } from '../hooks/useBudget';

export default function BudgetTracker() {

    const {state} = useBudget();

    const totalExpense = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0) ,[state.expenses])
    const remainingBudget = state.budget - totalExpense;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src="/grafico.jpg" alt="Gráfico de gastos" />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white font-bold rounded-lg"
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Presupuesto"
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={remainingBudget}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={totalExpense}
                />

            </div>

        </div>
    )
}
