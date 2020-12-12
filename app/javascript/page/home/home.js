import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
const Home = () => (
    <div className="home-box">
        <div className="content">
            <p>Welcome to mTomady</p> 
            <div className="flex">
                <Link to={"/treatments"}>Get Treatment</Link>
                <Link to={"/secret-page-admin/login"}>I'm a Doctor</Link>
            </div>
        </div>
    </div>
)
export default Home;
