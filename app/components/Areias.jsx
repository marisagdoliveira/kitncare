import ProgressBar from "./graficos/ProgressBar"



let totalConsumo = 159
let totalRecursos = 200
export default function Areias() {
    return (

        <div className="rounded-2xl bg-white/80 p-5 shadow-lg">
            <div className="w-[300px] h-[100px] flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold text-[#cfab6d]">Areias</h1>
                <ProgressBar totalRecursos={totalRecursos} totalConsumo={totalConsumo}/>
                <div className='flex gap-16 justify-center font-semibold text-zinc-500'>
                    <p>Demand: {totalConsumo}kg</p>
                    <p>Supply: {totalRecursos}kg</p>
                </div>
            </div>
        </div>

    )
}