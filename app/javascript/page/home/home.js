import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
const Home = () => (
    <div className="home-box">
        <div className="content">
            <p>Welcome to mTomady</p> 
            <Link to={"/treatments"}>Get Treatment</Link>
        </div>
    </div>
)
export default Home;
