import React, {Component} from 'react'

class SelectStatus extends Component {
  constructor (props) {
    super(props)
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange = (e) => {
    console.log('statusChange',this.props.bookId);
    this.props.handleS
  }

  render () {
    return (
      <select onChange={this.handleSelectChange} >
        <option value="move"
                disabled>Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    )
  }
}

export default SelectStatus;
