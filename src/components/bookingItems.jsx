import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import axios from "axios";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";

export default function BookingItems(props) {
  const { itemKey, qty, refresh } = props;
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          console.log(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
          removeFromCart(itemKey);
          refresh();
        });
    }
  }, [status]);

  if (status === "loading") {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!item) {
    return null;
  }

  return (
    <div className="flex items-center w-[800px] max-w-2xl p-4 mb-4 bg-secondary rounded-lg shadow-md relative">
      <div className="absolute right-[-45px] p-[8px] cursor-pointer hover:text-white hover:bg-red-500 text-red-500 rounded-full">
        <FaTrash onClick={()=>{
          removeFromCart(itemKey);
          refresh();
        }}/>
      </div>
      {/* Product Image */}
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md mr-4 border border-accent"
      />

      {/* Product Info */}
      <div className="flex flex-row items-center relative w-full">
        <h2 className="text-lg font-semibold text-accent w-[220px]">{item.name}</h2>
        <div className="absolute flex right-0 gap-1">
          <p className="font-bold w-[100px] text-center">Rs. {item.price.toFixed(2)}</p>
          <p className="font-bold w-[100px] text-center relative flex justify-center">
            <button 
              className="absolute top-[-22px] hover:text-accent"
              onClick={()=>{
                addToCart(itemKey, 1);
                refresh();
              }}
            >
              <FaArrowUp />
            </button>
            {qty}
            <button
              className="absolute top-[30px] hover:text-accent"
              onClick={()=>{
                if(qty == 1){
                  removeFromCart(itemKey);
                  refresh();
                }else{
                  addToCart(itemKey, -1);
                  refresh();
                }
              }}
            >
              <FaArrowDown />
            </button>
            </p>
          <p className="text-accent font-bold">Rs. {(item.price * qty).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
