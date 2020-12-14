import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './home.scss';
const Home = () => {
    const { t, i18n } = useTranslation();
    return <div className="home-box">
        <div className="content">
            <p>{t("home.title")}</p> 
            <div className="flex">
                <Link to={"/treatments"}>{t("home.button1")}</Link>
                <Link to={"/secret-page-admin/login"}>{t("home.button2")}</Link>
            </div>
        </div>
    </div>
}

export default Home;
