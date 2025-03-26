import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function UpdateItemPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [productKey, setProductKey] = useState(location.state.key);
    const [productName, setProductName] = useState(location.state.name);
    const [productPrice, setProductPrice] = useState(location.state.price);
    const [productCategory, setProductCategory] = useState(location.state.category);
    const [productDimensions, setProductDimensions] = useState(location.state.dimensions);
    const [productDescription, setProductDescription] = useState(location.state.description);
    const [productImages, setProductImages] = useState([]);


    console.log(location);

    async function handleUpdateItem() {

        let updatingImages = location.state.image

        if (productImages.length > 0) {
            const promises = [];
            
            for (let i = 0; i < productImages.length; i++) {
                console.log(productImages[i]);
                const promise = mediaUpload(productImages[i]);
                promises.push(promise)
            }

            updatingImages = await Promise.all(promises);

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

        if (token) {
            try {
                const result = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}`, 
                {
                    name: productName,
                    price: productPrice,
                    category: productCategory,
                    dimensions: productDimensions,
                    description: productDescription,
                    image : updatingImages,
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                toast.success(result.data.message);
                navigate("/admin/items")
            } catch (err) {
                console.log(err)
                toast.error(err.response.data.error)
            }
        } else {
            toast.error("You are not authorized to add items");
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1>update Items</h1>
            <div className="w-[400px] p-4 border flex flex-col items-center">
                <input
                    disabled
                    onChange={(e) => setProductKey(e.target.value)}
                    value={productKey}
                    type="text"
                    placeholder="Product Key"
                    className="w-full mt-2 p-2 border rounded"
                />
                <input
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                    type="text"
                    placeholder="Name"
                    className="w-full mt-2 p-2 border rounded"
                />
                <input
                    onChange={(e) => setProductPrice(e.target.value)}
                    value={productPrice}
                    type="number"
                    placeholder="Price"
                    className="w-full mt-2 p-2 border rounded"
                />
                <select
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full mt-2 p-2 border rounded"
                >
                    <option value="audio">Audio</option>
                    <option value="lights">Lights</option>
                </select>
                <input
                    onChange={(e) => setProductDimensions(e.target.value)}
                    value={productDimensions}
                    type="text"
                    placeholder="Product Dimensions"
                    className="w-full mt-2 p-2 border rounded"
                />
                <textarea
                    onChange={(e) => setProductDescription(e.target.value)}
                    value={productDescription}
                    type="text"
                    placeholder="Product Description"
                    className="w-full mt-2 p-2 border rounded"
                />
                <input type="file" multiple onChange={(e) => { setProductImages(e.target.files) }} className="w-full p-2 mt-2 border rounded" />
                <button onClick={handleUpdateItem} className="w-full p-2 m-2 bg-blue-500 hover:bg-blue-700 text-white">Update Item</button>
                <button onClick={() => { navigate("/admin/items") }} className="w-full p-2 bg-red-500 hover:bg-red-700 text-white">Cancel</button>
            </div>
        </div>
    );
}
