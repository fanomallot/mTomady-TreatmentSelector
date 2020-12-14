import { faColumns, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const LeftMenu = () => {
    const [t, i18n] = useTranslation()
    return <>
        <div className="link-menu">
            <Link to={"/Admin-dashboard/patient-list"}>
                <FontAwesomeIcon icon={faUsers} />  
                {t("left_menu.patient")}
            </Link>
        </div>
        <div className="link-menu">
            <Link to={"/Admin-dashboard/category"}>
            <FontAwesomeIcon icon={faColumns} />  
            {t("left_menu.category")}
            </Link>
        </div>
    </>
}
export default LeftMenu;