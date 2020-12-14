import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'


function Navbar() {
    const { t, i18n } = useTranslation();
    return <header className="text-white body-font bg-gray-400">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src="/doc.png" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24" alt="sary"/>
            <span className="ml-3 text-xl text-white">mTomady-Treatment</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-gray-900" to={"/"}>{t("navbar.home")}</Link>
            <Link className="mr-5 hover:text-gray-900" to={"/treatments"}>{t("navbar.treatments")}</Link>
            <Link className="mr-5 hover:text-gray-900" to={"/categories"}>{t("navbar.categories")}</Link>
        </nav>
        </div>
  </header>
}
export default Navbar;
