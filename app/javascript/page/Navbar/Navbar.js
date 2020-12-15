import { connect } from 'react-redux';
import React,{useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { userLogoutAttempt } from '../redux/Auth/auth.action';


function Navbar(props) {
    const { t, i18n } = useTranslation();
    const [statuslangue, setStatuslangue] = useState(0)
    const { isAuthenticated } = props;
    const logout = (e) => {
        e.preventDefault()
        props.userLogoutAttempt()
    }
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('languageNavigator', language);
        setStatuslangue(0);
    };
    const changeStatus = () => {
        if (statuslangue == 1) {
            setStatuslangue(0);   
        } else {
            setStatuslangue(1);
        }
    }
    
    return <>
        <header className="text-white body-font bg-gray-400">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link to={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <img src="/doc.png" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24" alt="sary"/>
                <span className="ml-3 text-xl text-white">mTomady-Treatment</span>
            </Link>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <Link className="mr-5 hover:text-gray-900" to={"/"}>{t("navbar.home")}</Link>
                <Link className="mr-5 hover:text-gray-900" to={"/treatments"}>{t("navbar.treatments")}</Link>
                <Link className="mr-5 hover:text-gray-900" to={"/categories"}>{t("navbar.categories")}</Link>
                {isAuthenticated ? <Link to="#" className="mr-5 hover:text-gray-900" onClick={(e) => logout(e)}> {t("login.out")}</Link> : null}
                <div className="language-box" onClick={changeStatus}>
                    {(i18n.language == "mg")? <div > <img src="/Flag_of_Madagascar.svg" alt="Mg"/> </div> : (i18n.language == "fr")?  <div > <img src="/Flag_of_France.svg" alt="Fr"/> </div> :  <div > <img src="/british.png" alt="En"/> </div>}
                </div>
            </nav>
            </div>
        </header>
        {statuslangue === 1? (<div className="langue">
            <div className="image" onClick={() => changeLanguage("en")}> <img src="/british.png" alt="En"/> </div>
            <div className="image" onClick={() => changeLanguage("mg")}> <img src="/Flag_of_Madagascar.svg" alt="Mg"/> </div>
            <div className="image" onClick={() => changeLanguage("fr")}> <img src="/Flag_of_France.svg" alt="Fr"/> </div>
            </div>) : null
        }
    </>
}
const mapStateToprops =(state) => {
    return {
        ...state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        userLogoutAttempt: () => dispatch(userLogoutAttempt())
    }
}
export default connect(mapStateToprops, mapDispatchToProps)(Navbar);
