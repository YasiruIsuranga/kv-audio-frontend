import { useState } from "react"

export default function Testing(){

    const[count,setCount] = useState(0);
    const[itemName,setItemNama] = useState("Coconut")

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-9xl">{count} {itemName}s</h1>
            <button className="w-[200px] h-[60px] bg-black text-white text-3xl rounded-lg" onClick={
                ()=>{
                    const newCount = count + 1
                    setCount(newCount)
                }
            }>
                Count
            </button>
            <div className="w-full flex justify-evenly items-center p-4">
                <button className="w-[200px] h-[60px] bg-black text-white text-3xl rounded-lg" onClick={
                    ()=>{
                        setItemNama("Coconut")
                    }
                }>
                    Coconut
                </button>
                <button className="w-[200px] h-[60px] bg-black text-white text-3xl rounded-lg" onClick={
                    ()=>{
                        setItemNama("Banana")
                    }
                }>
                    Banana
                </button>
                <button className="w-[200px] h-[60px] bg-black text-white text-3xl rounded-lg" onClick={
                    ()=>{
                        setItemNama("Apple")
                    }
                }>
                    Apple
                </button>
                <button className="w-[200px] h-[60px] bg-black text-white text-3xl rounded-lg" onClick={
                    ()=>{
                        setItemNama("Other")
                    }
                }>
                    Other
                </button>
            </div>
        </div>
    )
}