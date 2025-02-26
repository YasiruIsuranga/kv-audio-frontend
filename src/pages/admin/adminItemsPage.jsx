const sampleArr = [
    {
        key: "P001",
        name: "Wireless Keyboard",
        price: 25.99,
        category: "Electronics",
        dimensions: "17.5 x 5.5 x 1 inches",
        description: "A sleek and ergonomic wireless keyboard with long battery life.",
        availability: true,
        image: ["https://example.com/keyboard.jpg"]
    },
    {
        key: "P002",
        name: "Bluetooth Headphones",
        price: 49.99,
        category: "Electronics",
        dimensions: "6.5 x 3 x 7 inches",
        description: "Noise-canceling over-ear headphones with deep bass and clear sound.",
        availability: true,
        image: ["https://example.com/headphones.jpg"]
    },
    {
        key: "P003",
        name: "Ceramic Coffee Mug",
        price: 9.99,
        category: "Kitchen",
        dimensions: "4 x 3 x 3 inches",
        description: "A durable ceramic coffee mug with a stylish design.",
        availability: true,
        image: ["https://example.com/mug.jpg"]
    },
    {
        key: "P004",
        name: "LED Desk Lamp",
        price: 34.99,
        category: "Home & Office",
        dimensions: "12 x 5 x 15 inches",
        description: "A modern LED desk lamp with adjustable brightness and USB charging port.",
        availability: false,
        image: ["https://example.com/lamp.jpg"]
    },
    {
        key: "P005",
        name: "Running Shoes",
        price: 69.99,
        category: "Sportswear",
        dimensions: "10 x 4 x 5 inches",
        description: "Lightweight and comfortable running shoes for daily workouts.",
        availability: true,
        image: ["https://example.com/shoes.jpg"]
    }
];


import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItemsPage(){
    return(
        <div className="w-full h-full relative">

            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Availability</th>
                </thead>
                <tbody>
                    {
                        sampleArr.map((product)=>{
                            console.log(product)
                            return(
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.availability ? "Available" : "Not Available"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Link to="/admin/items/add">
                <CiCirclePlus className="text-[70px] absolute right-2 bottom-2 hover:text-red-900"/>
            </Link>
        </div>
    )
}