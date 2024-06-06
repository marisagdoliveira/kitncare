
import PieChart from "./graficos/PieChart"

let totalConsumo = 2
let totalRecursos = 20
export default function AlimentacaoEspecial() {
    return (

        <div className="rounded-2xl bg-[#ffffff] p-5 shadow-lg">
            <div className="w-[300px] h-[200px] flex flex-col gap-5 justify-center items-center">
                <h1 className="text-xl font-bold text-[#cfab6d]">Special Food</h1>
                <PieChart totalRecursos={totalRecursos} totalConsumo={totalConsumo} />
                <div className='flex gap-16 justify-center font-semibold text-zinc-500'>
                    <p>Demand: {totalConsumo}kg</p>
                    <p>Supply: {totalRecursos}kg</p>
                </div>
            </div>
        </div>

    )
}