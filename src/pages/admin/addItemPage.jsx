import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
    const [productKey, setProductKey] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productCategory, setProductCategory] = useState("audio");
    const [productDimensions, setProductDimensions] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImages, setProductImages] = useState([]);
    const navigate = useNavigate();

    async function handleAddItem() {
        console.log(productImages);
        const promises =[];
        for(let i=0; i<productImages.length; i++){
            console.log(productImages[i]);
            const promise = mediaUpload(productImages[i]);
            promises.push(promise)
        }

        
        console.log(
            productKey,
            productPrice,
            productName,
            productCategory,
            productDimensions,
            productDescription
        )

        const token = localStorage.getItem("token")

        if(token){
            try{
                // Promise.all(promises).then((result)=>{
                //     console.log(result)
                // }).catch((err)=>{
                //     toast.error(err)
                // })

                const imageUrls = await Promise.all(promises);

                const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
                    key : productKey,
                    name : productName,
                    price : productPrice,
                    category : productCategory,
                    dimensions : productDimensions,
                    description : productDescription,
                    image : imageUrls,
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
            <div className="w-[400px] p-4 border flex flex-col items-center">
                <input
                    onChange={(e) => setProductKey(e.target.value)}
                    value={productKey}
                    type="text"
                    placeholder="Product Key"
                    className="w-full p-2 border rounded"
                />
                <input
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                />
                <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    value={productPrice}
                    type="number"
                    placeholder="Price"
                    className="w-full p-2 border rounded"
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
                    className="w-full p-2 border rounded"
                />
                <textarea
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={productDescription}
                    type="text"
                    placeholder="Product Description"
                    className="w-full p-2 border rounded"
                />
                <input type="file" multiple onChange={(e) => { setProductImages(e.target.files) }} className="w-full p-2 border rounded" />
                <button onClick={handleAddItem} className="w-full p-2 border rounded bg-blue-500 text-white hover:bg-blue-700">Add</button>
                <button onClick={() => { navigate("/admin/items") }} className="w-full p-2 border rounded bg-red-500 text-white hover:bg-red-700">Cancel</button>
            </div>
        </div>
    );
}
