import React from 'react';
import { Link } from 'react-router-dom'


function Navbar() {
    return <div style={{background: "#0000"}}>
        <Link to={"/"}>Home</Link>
        <br/>
        <Link to={"/treatments"}>Treatments</Link>
        <br/>
        <Link to={"/categories"}>Categories</Link>
    </div>
}
export default Navbar;





