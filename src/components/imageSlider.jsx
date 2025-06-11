import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    const [selectedImage, setSelectedImage] = useState(images[0])

    return(
        <div className="w-full flex flex-col items-center">
            <img src={selectedImage} alt="product" className="w-full h-[300px] md:h-[350px] object-contain" />
            <div className="w-full h-[90px] mt-[20px] flex justify-center items-center">
                {
                    images.map((image,index)=>{
                        return <img key={index} src={image} alt="product" className={`w-[70px] h-[70px] object-cover cursor-pointer mr-[2px] ${image == selectedImage && "border border-accent"}`} onClick={()=>{setSelectedImage(image)}}/>
                    })
                }
            </div>
        </div>
    )
}