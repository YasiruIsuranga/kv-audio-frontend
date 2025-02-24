import { Link } from "react-router-dom";

export default function ErrorNotFound(){
    return(
        <>
        <h1>404 Error: Page Not Found </h1>
        <Link to="/" className="bg-[#efac38] p-1" >Go Back To Home</Link>
        </>
    )
}