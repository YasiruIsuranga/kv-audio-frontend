import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[300px] p-4 m-2 border border-gray-200 relative">
            <img 
                src={item.image[0]} 
                alt={item.name} 
                className="w-full h-40 object-cover rounded-md"
            />
            <div className="mt-3">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-gray-500 text-sm mt-1">Category: <span className="font-medium">{item.category}</span></p>
                <p className="text-xl font-bold text-blue-600 mt-2">{item.price}</p>
                <p className={`text-sm font-semibold mt-2 ${item.availability ? 'text-green-500' : 'text-red-500'}`}>
                    {item.availability ? 'In Stock' : 'Out of Stock'}
                </p>
            </div>
            <Link to={"/product/"+item.key} className="text-center w-[90%] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition absolute mx-auto bottom-2">
                Add to Cart
            </Link>
        </div>
    );
}
