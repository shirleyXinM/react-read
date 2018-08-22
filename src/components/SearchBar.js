import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class SearchBar extends Component {
  constructor(props){
    super(props);
    this.handleBarClose = this.handleBarClose.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
  }
  handleBarClose(){
    this.props.onBarClose();
  }
  handleInputKeyUp(e){
    if(e.keyCode === 13){
      console.log('enter');
      this.props.onSearchKeyUp(e.target.value);
    }
  }
  render(){
    return (
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onKeyUp={this.handleInputKeyUp}/>
        </div>
      </div>
    );
  }
}


export default SearchBar;
