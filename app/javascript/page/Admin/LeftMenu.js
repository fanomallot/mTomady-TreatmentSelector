import { faColumns, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const LeftMenu = () => {
    const [t, i18n] = useTranslation()
    return <>
        <div className="link-menu">
            <Link to={"/Admin-dashboard/patient-list"} title={t("left_menu.patient")}>
                <FontAwesomeIcon icon={faUsers} />  
               <i>{t("left_menu.patient")}</i> 
            </Link>
        </div>
        <div className="link-menu">
            <Link to={"/Admin-dashboard/category"} title={t("left_menu.category")}>
            <FontAwesomeIcon icon={faColumns} />  
            <i>{t("left_menu.category")}</i> 
            </Link>
        </div>
    </>
}
export default LeftMenu;