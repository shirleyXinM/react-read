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
    BooksAPI.search(val).then((books) => {
      for(let index in books){
        for(let myBook of this.state.books){
          if(books[index].id === myBook.id){
            console.log('match',myBook.shelf)
            books[index].shelf = myBook.shelf;
            break;
          }
          books[index].shelf = 'none';
        }
      }
      this.setState({
        searchBook: books
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
      let Mybooks = books
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
        books: Mybooks,
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
        <Route exact path="/search" key={'search'}render={() => (
          <div className="search-books">
            <SearchBar onBarClose={this.handleCloseSearchBar}
                       onSearchKeyUp={this.handleSearchKeyUp}/>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.searchBook.length > 0 && this.state.searchBook.map((book) => (
                    <Book book={book} disabled={false} key={book.id}
                          onUpdateBook={this.handleSelectChange}/>
                  ))
                }
              </ol>
            </div>
          </div>)
        } />
        <Route exact path="/" key={'root'} render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  Object.keys(shelfMap).map(item =>{
                    return (
                      this.state[item].length > 0 ? (
                        <MyBookShelf key={item} title={shelfMap[item]}
                                     books={this.state[item]}
                                     onUpdateBook={this.handleUpdateBook}
                        />
                      ) : (
                        <EmptyShelf key={item} title={shelfMap[item]} msg={"没有书籍"}/>
                      )
                    )
                  })
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
