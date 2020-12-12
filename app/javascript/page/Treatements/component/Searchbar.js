import React, { Component } from 'react';
class Searchbar extends Component {
    constructor(props) {
        super(props)
        this.makechangetext = this.makechangetext.bind(this)
    }
    makechangetext(e) {
        this.props.onFindtext(e.target.value)
    }
    render() {
        return <div>
            <input type="text" value={this.props.filtertext} placeholder="Recherche" onChange={ this.makechangetext}/>
        </div>
    }
}
export default Searchbar;