import React from 'react';
import { Link } from 'react-router-dom';


const LeftMenu = () => {
    return <>
        <div className="link-menu">
            <Link to={"/Admin-dashboard/patient-list"}>
                <img src="/doc.png" alt="icon"/>
                Patients list
            </Link>
        </div>
        <div className="link-menu">
            <Link to={"/Admin-dashboard/category"}>
                <img src="/med.jpg" alt="icon"/>
                Category
            </Link>
        </div>
    </>
}
export default LeftMenu;