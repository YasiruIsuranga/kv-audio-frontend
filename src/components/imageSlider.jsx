import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    const [selectedImage, setSelectedImage] = useState(images[0])

    return(
        <div className="w-full h-full flex flex-col items-center">
            <img src={selectedImage} alt="product" className="w-[90%] h-[70%] object-cover" />
            <div className="w-full h-[150px] mt-[20px] flex justify-center">
                {
                    images.map((image,index)=>{
                        return <img key={index} src={image} alt="product" className={`w-[100px] h-[100px] object-cover cursor-pointer mr-[2px] ${image == selectedImage && "border border-accent"}`} onClick={()=>{setSelectedImage(image)}}/>
                    })
                }
            </div>
        </div>
    )
}