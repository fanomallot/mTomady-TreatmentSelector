import React, {useState,useEffect} from 'react';
import axios from 'axios'
import CategoryTreatment from './CategoryTreatement';
import Searchbar from '../../Treatements/component/Searchbar';
import '../category.scss';
import { func } from 'prop-types';


const CategoryList = ({filterText,filterTextC,onFindtextSearch}) => {
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
                {category.attributes.name}
                {status === category.id ?
                    (<>
                        <div className="search-box">
                            <Searchbar
                            placeholder="Find treatment"
                            filterText={filterText}
                            onFindtext={onFindtextSearch}
                            />
                        </div>
                        <CategoryTreatment
                            category_id={category.id}
                            treatmentValue={filterText}
                        />
                        <img src="/med.jpg" alt="icon" onClick={() => {setStatus(0), onFindtextSearch("")}}/> 
                    </>) : <img src="/doc.png" alt="icon" onClick={() => { setStatus(category.id), onFindtextSearch("")}}/> 

                }
                
                
            </div>
        )
    })
    
    return <div>{List}</div>
}

export default CategoryList;