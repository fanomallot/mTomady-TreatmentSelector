import React from 'react';
import {Link} from 'react-router-dom';
const Home = () => (
    <div className="home-box">
        <div className="content">
            Welcome to mTomady
            <Link to={"/treatments"}>Get Treatment</Link>
        </div>
    </div>
)
export default Home;
