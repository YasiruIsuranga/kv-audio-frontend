import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


export default function AdminItemsPage() {
    const [items, setItems] = useState([]);
    const [itemsLoaded, setItemsLoaded] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if(!itemsLoaded){
            const token = localStorage.getItem("token");
            axios.get("http://localhost:3000/api/products", { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                console.log(res.data);
                setItems(res.data);
                setItemsLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            });
        }
        
    }, [itemsLoaded]);

    const handleDelete = (key) => {
        if (window.confirm("Are you sure you want tot delete this item")) {
            setItems(items.filter((item) => item.key !== key));
            const token = localStorage.getItem("token");
            axios.delete(`http://localhost:3000/api/products/${key}`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then(
                (res) => {
                    console.log(res.data);
                    setItemsLoaded(false);
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )
        }
    };

    return (
        <div className="w-full h-full p-6 bg-gray-100 flex flex-col items-center">
            {!itemsLoaded &&<div className="border-4 my-4 border-b-green-500 w-[100px] h-[100px] rounded-full animate-spin"></div>}
            {itemsLoaded &&<div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-3 text-left">Key</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Availability</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((product) => (
                            <tr key={product.key} className="border-b hover:bg-gray-100">
                                <td className="p-3">{product.key}</td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">${product.price.toFixed(2)}</td>
                                <td className="p-3">{product.category}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-sm font-medium ${product.availability
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}>
                                        {product.availability ? "Available" : "Not Available"}
                                    </span>
                                </td>
                                <td className="p-3 flex justify-center gap-3">
                                    <button onClick={() => {
                                        navigate('/admin/items/edit', {state:product})
                                    }} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 flex items-center">
                                        <FaEdit className="mr-1" />Edit
                                    </button>
                                    <button onClick={() => handleDelete(product.key)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 flex items-center ">
                                        <FaTrashAlt className="inline mr-1" />Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}

            <Link to="/admin/items/add" className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
                <CiCirclePlus className="text-5xl" />
            </Link>
        </div>
    );
}
