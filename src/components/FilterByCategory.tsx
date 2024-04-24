import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
    
    const {dispatch} = useBudget();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch ({type: 'add-filter-category', payload: {id: e.target.value}})
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-10">
            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar Gastos</label>
                    <select
                        id="category"
                        className="p-1.5 rounded-md border-0 focus:ring-indigo-600 text-gray-900 ring-1 ring-inset ring-gray-300 flex-1"
                        onChange={handleChange}
                    >
                        <option value="">-- Todas las categorias --</option>
                        {categories.map(category => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
