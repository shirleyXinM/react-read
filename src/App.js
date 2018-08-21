import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBar from './components/SearchBar';
import MyBookShelf from './components/BookShelf';
import './App.css'
import Book from "./components/Book";
import EmptyShelf from './components/EmptyShelf';
import {Route, Link} from 'react-router-dom';

const shelfs = {
  none: 'none',
  currently_reading: "Currently Reading",
  want_to_read: "Want to Read",
  already_read: "Already Read",
  //
  currentlyReading: "currentlyReading",
  wantToRead: "wantToRead",
  read: "read",
};

const shelfMap ={
  currently_reading: "currentlyReading",
  want_to_read: "wantToRead",
  read: "read",
}

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    searchValue: '',
    currently_reading: [],
    want_to_read: [],
    read: [],
    searchBook: []
  }

  handleCloseSearchBar = () => {
    this.setState({
      showSearchPage: false
    })
  }

  handleSearchKeyUp = (val) => {
    this.setState({
      searchValue: val
    })
    console.log('search', val);
    BooksAPI.search(val).then((data) => {
      console.log('searchBook', data);
      this.setState({
        searchBook: data
      })
    })
  }

  handleUpdateBook = (book, shelf) => {
    console.log('update', book.id);
    BooksAPI.update(book, shelfMap[shelf]).then((res) => {
      this.getAllBooks();
    })
  }
  handleSelectChange = (e,book) =>{
    this.handleUpdateBook(book,e.target.value);
  }

  getAllBooks () {
    BooksAPI.getAll().then((books) => {
      let currently_reading = books.filter((book) => {
        return book.shelf === shelfs.currentlyReading
      });
      let want_to_read = books.filter((book) => {
        return book.shelf === shelfs.wantToRead
      });
      let read = books.filter((book) => {
        return book.shelf === shelfs.read
      });

      this.setState({
        currently_reading,
        want_to_read,
        read
      })
    })
  }

  componentDidMount () {
    this.getAllBooks();
  }

  render () {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
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
          </div>)
        } />
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.currently_reading.length > 0 ? (
                  <MyBookShelf title={"Currently Reading"}
                               books={this.state.currently_reading}
                               onUpdateBook={this.handleUpdateBook}></MyBookShelf>
                ) : (<EmptyShelf title={"Currently Reading"} msg={"没有正在阅读的书籍"}></EmptyShelf>)}
                {this.state.want_to_read.length > 0 ? (
                  <MyBookShelf title={"Want to Read"}
                               books={this.state.want_to_read}
                               onUpdateBook={this.handleUpdateBook}></MyBookShelf>
                ) : (<EmptyShelf title={"Want to Read"} msg={"没有想要的书籍"}></EmptyShelf>)}
                {
                  this.state.read.length > 0 ? (
                    <MyBookShelf title={"Read"}
                                 books={this.state.read}
                                 onUpdateBook={this.handleUpdateBook}></MyBookShelf>
                  ) : (<EmptyShelf title={"Read"} msg={"没有已读的书籍"}></EmptyShelf>)
                }
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
        }
        />
      </div>
    )
  }
}

export default BooksApp
