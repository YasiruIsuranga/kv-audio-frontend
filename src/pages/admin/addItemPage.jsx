import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddItemPage() {
    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("audio");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDescription, setProductDescription] = useState("");

    const navigate = useNavigate();

    async function handleAddItem(){
        console.log(productKey, productPrice, productName, productCategory, productDimensions, productDescription)
        const token = localStorage.getItem("token")

        if(token){
            try{
                const result = await axios.post("http://localhost:3000/api/products", {
                    key : productKey,
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
            <h1>Add Items</h1>
            <div className="w-[400px] border flex flex-col items-center">
                <input
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
                <input
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={productDescription}
                    type="text"
                    placeholder="Product Description"
                />
                <button onClick={handleAddItem}>Add</button>
                <button onClick={()=>{navigate("/admin/items")}}>Cancel</button>
            </div>
        </div>
    );
}
