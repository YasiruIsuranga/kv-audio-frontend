import './App.css'
import ProductCard from './components/productCard'
import { GoGraph } from "react-icons/go";
import { FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { MdOutlineSpeaker } from 'react-icons/md';

function App() {

  return (
    <div className='w-full h-screen flex'>
      <div className='w-[400px] h-full bg-green-200'>
        <button className='w-full h-[40px] text-[25px] font-bold flex items-center justify-evenly'>
          Dashboard
          <GoGraph />
        </button>
        <button className='w-full h-[40px] text-[25px] font-bold flex items-center justify-evenly'>
          Bookings
          <FaRegBookmark />
        </button>
        <button className='w-full h-[40px] text-[25px] font-bold flex items-center justify-evenly'>
          Items
          <MdOutlineSpeaker />
        </button>
        <button className='w-full h-[40px] text-[25px] font-bold flex items-center justify-evenly'>
          Users
          <FaRegUser />
        </button>
      </div>
      <div className='w-full bg-red-900'>
      </div>
    </div>
  )
}

export default App
