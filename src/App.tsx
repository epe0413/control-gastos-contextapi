import { useEffect, useMemo } from 'react';
import BudgetForm from './components/BudgetForm';
import { useBudget } from './hooks/useBudget';
import BudgetTracker from './components/BudgetTracker';
import ExpenseModal from './components/ExpenseModal';
import ExpenseList from './components/ExpenseList';

function App() {

  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className="bg-blue-600 py-3 max-h-72">
        <h1 className="text-center font-black text-2xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className=" max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-7 p-7">
        {isValidBudget ? <BudgetTracker/>: <BudgetForm/>}
      </div>

      {isValidBudget && (
        <main className='max-w-3xl mx-auto py10'>
          <ExpenseModal/>
          <ExpenseList/>
        </main>
      )}
    </>
  )
}

export default App
