import React, { Component } from 'react';
import { Field } from 'formik';
class Searchbar extends Component {
    constructor(props) {
        super(props)
        this.makechangetext = this.makechangetext.bind(this)
    }
    makechangetext(e) {
        console.log(e.target)
        this.props.onFindtext(e.target.value)
    }
    render() {
        return <div>
            <Field type="text" value={this.props.filtertext} placeholder="Recherche" onChange={ this.makechangetext}/>
        </div>
    }
}
export default Searchbar;