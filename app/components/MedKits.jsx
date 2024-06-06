import BarChart from "./graficos/BarChart"



let totalConsumo = 8
let totalRecursos = 32
export default function MedKits() {
    return (

        <div className="rounded-2xl bg-[#181818] p-5 shadow-lg">
            <div className="w-[300px] h-[200px] flex flex-col gap-5 justify-center items-center">
                <h1 className="text-xl font-bold text-[#cfab6d]">Medical Kits</h1>
                <BarChart totalRecursos={totalRecursos} totalConsumo={totalConsumo} />
                <div className='flex gap-16 justify-center font-semibold text-zinc-500'>
                    <p>Demand: {totalConsumo}kg</p>
                    <p>Supply: {totalRecursos}kg</p>
                </div>
            </div>
        </div>

    )
}