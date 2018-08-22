import React, {Component} from 'react';
import Book from './Book';
// import SelectStatus from './SelectStatus';

class MyBookShelf extends Component {
  constructor (props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange (e,book) {
    this.props.onUpdateBook(book,e.target.value);
  }

  render () {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book, index) => (
                  <Book onUpdateBook={this.handleSelectChange} book={book} key={book.id}/>
                )
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default MyBookShelf;
