import React, {useState,useEffect} from 'react';
import axios from 'axios'
import CategoryTreatment from './CategoryTreatement';



const CategoryList = ({filterText,filterTextC}) => {
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
        return (
            <li key={key} onClick={() => { setStatus(category.id)}}>
                {category.attributes.name}
                {status == category.id ? 
                (<CategoryTreatment
                    category_id={category.id}
                    treatmentValue={filterText}
                />): null
                }
            </li>
        )
    })
    
    return <ul>{List}</ul>
}

export default CategoryList;