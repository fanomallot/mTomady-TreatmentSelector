import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import Getlist from './components/Getlist';
import './patient.scss'

class Patients extends Component{

    constructor(props) {
        super(props)
    }
    render() {
        const { t } = this.props;
        return <div className="patient-box">
            <div className="Title">{t("patient.title")}</div>
         <Getlist/>
        </div>
    }

}
export default withTranslation()(Patients);