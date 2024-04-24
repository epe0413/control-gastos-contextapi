import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import AmountDisplay from './AmountDisplay';
import { useBudget } from '../hooks/useBudget';
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTracker() {

    const {state, totalExpense, remainingBudget} = useBudget();

    const percentage = +((totalExpense / state.budget) * 100).toFixed(2);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: percentage === 100 ? '#DC2626' :'rgb(23 37 84 / var(--tw-bg-opacity))',
                        trailColor: '#F5F5F5',
                        textSize: 9,
                        textColor: percentage === 100 ? '#DC2626' :'rgb(23 37 84 / var(--tw-bg-opacity))',
                    })}
                    text={`${percentage}% Gastado`}
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">

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
