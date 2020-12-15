import { connect } from 'react-redux';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './home.scss';
const Home = (props) => {
    const { t, i18n } = useTranslation();
    const { isAuthenticated } = props;
    return <div className="home-box">
        <div className="content">
            <p>{t("home.title")}</p> 
            <div className="flex">
                <Link to={"/treatments"}>{t("home.button1")}</Link>
                {isAuthenticated ? <Link to={"/Admin-dashboard/patient-list"}>{t('home.dash')}</Link> : <Link to={"/secret-page-admin/login"}>{t("home.button2")}</Link> }
            </div>
        </div>
    </div>
}
const mapStateToprops =(state) => {
    return {
        ...state.auth
    }
}
export default connect(mapStateToprops)(Home);
