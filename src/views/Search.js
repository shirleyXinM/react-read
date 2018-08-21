import React, {Component} from 'react';
import SearchBar from "../components/SearchBar";
import Book from "../components/Book";

class Search extends Component {
  handleCloseSearchBar = () => {
    this.setState({
      showSearchPage: false
    })
  }
  render(){
    return (
      <div className="search-books">
        <SearchBar onBarClose={this.handleCloseSearchBar}
                   onSearchKeyUp={this.handleSearchKeyUp}/>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.searchBook.length > 0 && this.state.searchBook.map((book) => (
                <Book book={book} disabled={false}
                      onUpdateBook={this.handleSelectChange}/>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;
