import React, {Component} from 'react';
const shelfMap ={
  currentlyReading: 'currently_reading',
  wantToRead: 'want_to_read',
  read: 'read'
}
class Book extends Component{
  handleSelectChange = (e,book) =>{
    this.props.onUpdateBook(e,book);
  }
  render(){
    return (
      <li id={this.props.book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
                 style={{width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => this.handleSelectChange(e, this.props.book)} value={shelfMap[this.props.book.shelf]}>
                <option value="move"
                        disabled={this.props.disabled}>Move to...
                </option>
                <option value="currently_reading">Currently Reading</option>
                <option value="want_to_read">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title"> {this.props.book.title} </div>
          <div className="book-authors"> {this.props.book.authors.length && this.props.book.authors.join(',')} </div>
        </div>
      </li>
    )
  }
}

export default Book;