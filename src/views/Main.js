import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom'
import MyBookShelf from './components/BookShelf';
import Book from "./components/Book";
import EmptyShelf from './components/EmptyShelf';

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


class Main extends Component {
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
  render(){
    return (
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
}

export default Main;
