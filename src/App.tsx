import { useEffect, useMemo } from 'react';
import BudgetForm from './components/BudgetForm';
import { useBudget } from './hooks/useBudget';
import BudgetTracker from './components/BudgetTracker';
import ExpenseModal from './components/ExpenseModal';
import ExpenseList from './components/ExpenseList';
import FilterByCategory from './components/FilterByCategory';

function App() {

  const { state, dispatch } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  const handleReset = () => {
    dispatch({type: 'reset-app'})
    dispatch({type: 'close-budget'})
  }

  return (
    <>
      <header className="bg-blue-950 p-3 shadow-lg">
        <div className='max-w-3xl mx-auto flex justify-between items-center'>
          <h1 className="text-center font-black text-2xl text-white">
            Planificador de Gastos
          </h1>

          

            {state.budget > 0 && (
              <div className='flex justify-between items-center gap-2'>
                <button
                    type="button"
                    className="bg-pink-600 hover:bg-pink-700 p-2 text-white font-bold text-sm rounded-lg"
                    onClick={() => handleReset()}
                >
                    Resetear App
                </button>
                <button
                    type="button"
                    className="bg-gray-600 hover:bg-gray-700 p-2 text-white font-bold text-sm rounded-lg"
                    onClick={() => dispatch({type: 'show-budget'})}
                >
                    Actualizar Presupuesto
                </button>
              </div>
            )}
        </div>
      </header>

      {state.budgetE && (
        <div className='max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-7 p-7'>
          <BudgetForm/>
        </div>
      )}

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-7 p-7">
        {isValidBudget 
          ?<BudgetTracker/>
          :<BudgetForm/>
        }
      </div>


      {isValidBudget && (
        <main className='max-w-xl mx-auto py-10'>
          <ExpenseModal/>
          <FilterByCategory/>
          <ExpenseList/>
        </main>
      )}
    </>
  )
}

export default App
