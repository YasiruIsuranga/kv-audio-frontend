import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateItemPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [productKey, setProductKey] = useState(location.state.key);
    const [productName, setProductName] = useState(location.state.name);
    const [productPrice, setProductPrice] = useState(location.state.price);
    const [productCategory, setProductCategory] = useState(location.state.category);
    const [productDimensions, setProductDimensions] = useState(location.state.dimensions);
    const [productDescription, setProductDescription] = useState(location.state.description);


    console.log(location);

    async function handleAddItem(){
        console.log(productKey, productPrice, productName, productCategory, productDimensions, productDescription)
        const token = localStorage.getItem("token")

        if(token){
            try{
                const result = await axios.put("http://localhost:3000/api/products/"+productKey, {
                    name : productName,
                    price : productPrice,
                    category : productCategory,
                    dimensions : productDimensions,
                    description : productDescription
                },{
                    headers : {
                        Authorization : "Bearer " + token
                    }
                });
                toast.success(result.data.message);
                navigate("/admin/items")
            }catch(err){
                toast.error(err.response.data.error)
            }
        }else{
            toast.error("You are not authorized to add items");
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1>update Items</h1>
            <div className="w-[400px] border flex flex-col items-center">
                <input
                    disabled
                    onChange={(e) => setProductKey(e.target.value)}
                    value={productKey}
                    type="text"
                    placeholder="Product Key"
                />
                <input
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                    type="text"
                    placeholder="Name"
                />
                <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    value={productPrice}
                    type="number"
                    placeholder="Price"
                />
                <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                >
                    <option value="audio">Audio</option>
                    <option value="lights">Lights</option>
                </select>
                <input
                    onChange={(e) => setProductDimensions(e.target.value)}
                    value={productDimensions}
                    type="text"
                    placeholder="Product Dimensions"
                />
                <textarea
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={productDescription}
                    type="text"
                    placeholder="Product Description"
                />
                <button onClick={handleAddItem} className="w-full p-2 m-2 bg-blue-500 hover:bg-blue-700 text-white">Update Item</button>
                <button onClick={()=>{navigate("/admin/items")}} className="w-full p-2 bg-red-500 hover:bg-red-700 text-white">Cancel</button>
            </div>
        </div>
    );
}
