import { Link } from "react-router-dom";

function Logout(){

    sessionStorage.setItem('access_token',"");
    sessionStorage.setItem('id_token',"");
    
    return(
        <>
            <Link to={"/login"}>Login</Link>
        </>
    )
}

export default Logout;