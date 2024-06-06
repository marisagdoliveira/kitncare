



import DoughnutChart from "./graficos/DoughnutChart"

let totalConsumo=2
let totalRecursos=20
export default function AlimentacaoTotal() {
    return (

        <div className="rounded-lg bg-white p-5 shadow-lg">
            <div className="w-[300px] h-[200px] flex flex-col gap-5 justify-center items-center">
                <h1 className="text-xl font-bold text-[#cfab6d]">Normal Food</h1>
                <DoughnutChart totalRecursos={totalRecursos} totalConsumo={totalConsumo} />
                <div className='flex gap-16 justify-center font-semibold text-zinc-500'>
                    <p>Demand: {totalConsumo}kg</p>
                    <p>Supply: {totalRecursos}kg</p>
                </div>
            </div>
        </div>

    )
}