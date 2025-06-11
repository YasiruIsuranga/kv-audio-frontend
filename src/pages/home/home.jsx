export default function Home() {
    return (
        <section
            className=" relative w-full min-h-screen bg-cover bg-center flex bg-[#BBE7FB]"
            style={{backgroundImage: "url('../../public/mucian1.jpg')"}}>
            {/* Hero section */}
            <div className="absolute inset-0 bg-opacity-50"></div>

            <div className="w-[400px] h-[300px] flex flex-col items-center justify-center bg-[#CA7842]/70 rounded-3xl text-white m-20">
                <h3 className="text-[32px] font-bold text-center">
                    Instrument Rentals The Easy Way
                </h3>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, nam.</p>
            </div>
        </section>
    )
}