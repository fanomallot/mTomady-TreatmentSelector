import React, {useState,useEffect} from 'react';
import axios from 'axios'
import CategoryTreatment from './CategoryTreatement';
import Searchbar from '../../Treatements/component/Searchbar';
import '../category.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';

const CategoryList = ({ filterText, filterTextC, onFindtextSearch }) => {
    const {t,i18n} = useTranslation()
    const [categories, setCategories] = useState([])
    const [status, setStatus] = useState(0)
    
    useEffect(() => { 
        axios
            .get('/api/mtomady/category')
            .then((resp) => {
                setCategories(resp.data.data)
            })
            .catch((resp) => console.log(resp))
    }, [categories.length])
    
    function check_language(item) {
        if (i18n.language == "fr") {
            if (item.name_fr == "" || item.name_fr == null || item.name_fr == " ") {
                return item.name
            }
            return item.name_fr
        } else if (i18n.language == "mg") {
            if (item.name_mg == "" || item.name_mg == null || item.name_mg == " ") {
                return item.name
            }
            return item.name_mg
        } else {
            return item.name
        } 
    }    
    const List = categories.map((category, key) => {
        if (category.attributes.name.toUpperCase().indexOf(filterTextC.toUpperCase()) === -1) { 
            return
        }
        function change() {
            if (status === category.id) {
                setStatus(0)
            } else {
                setStatus(category.id)
            }
        }
        return (
        <div key={key} className="category-box" >
            {check_language(category.attributes)}
            {status === category.id ?
                (<>
                    <div className="search-box">
                        <Searchbar
                        placeholder={("treatment.plh_find")}
                        filterText={filterText}
                        onFindtext={onFindtextSearch}
                        />
                    </div>
                    <CategoryTreatment
                        category_id={category.id}
                        treatmentValue={filterText}
                    />
                    <FontAwesomeIcon icon={faArrowUp} onClick={() => { setStatus(0), onFindtextSearch("")}} />  
                </>) : <FontAwesomeIcon icon={faArrowDown} onClick={() => { setStatus(category.id), onFindtextSearch("")}} />

            }
        </div>
    )
    })
    
    return <div>{List}</div>
}

export default CategoryList;