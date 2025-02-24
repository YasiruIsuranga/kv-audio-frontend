import { GoGraph } from "react-icons/go";
import { FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { MdOutlineSpeaker } from 'react-icons/md';
import { Link, Route, Routes } from "react-router-dom";

function AdminPage() {

  return (
    <div className='w-full h-screen flex'>
      <div className='w-[400px] h-full bg-green-200'>
        <button className='w-full h-[40px] text-[25px] font-bold flex items-center justify-evenly'>
          Dashboard
          <GoGraph />
        </button>
        <Link to="/admin/bookings" className='w-full h-[40px] text-[25px] font-bold flex items-center justify-evenly'>
          Bookings
          <FaRegBookmark />
        </Link>
        <Link to="/admin/items" className='w-full h-[40px] text-[25px] font-bold flex items-center justify-evenly'>
          Items
          <MdOutlineSpeaker />
        </Link>
        <button className='w-full h-[40px] text-[25px] font-bold flex items-center justify-evenly'>
          Users
          <FaRegUser />
        </button>
      </div>
      <div className='w-[calc(100vw-400px)] bg-blue-900'>
        <Routes path="/*">
            <Route path="/bookings" element={<h1>Booking</h1>} />
            <Route path="/items" element={<h1>Items</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminPage
