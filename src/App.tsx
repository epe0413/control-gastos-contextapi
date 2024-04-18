import BudgetForm from './components/BudgetForm';
function App() {

  return (
    <>
      <header className="bg-blue-600 py-3 max-h-72">
        <h1 className="text-center font-black text-2xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className=" max-w-xl mx-auto bg-white shadow-lg rounded-lg mt-7 p-7">
        <BudgetForm/>
      </div>
    </>
  )
}

export default App
