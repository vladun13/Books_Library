import React, { Component } from 'react';
import './App.css';
import Popup from './components/modal/Popup.jsx';

const DEFAULT_QUERY = '';
const PATH_BASE = 'https://www.googleapis.com/books/v1/volumes?q=';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      result: null,
      searchTerm: "DEFAULT_QUERY",
    };


    this.setSearchTopBooks = this.setSearchTopBooks.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.fetchSearchTopBooks = this.fetchSearchTopBooks.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }


      fetchSearchTopBooks(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopBooks(result))
    .catch(error => error);
    }


  setSearchTopBooks(result) {
    this.setState({ result });
  }

  onSearchSubmit(event) {
  const { searchTerm } = this.state;
  this.fetchSearchTopBooks(searchTerm);
  event.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopBooks(result))
      .catch(error => error);
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedBooks = this.state.result.items.filter(isNotId);
    this.setState({ 
      result: {...this.state.result, items: updatedBooks}
     });
  }


  render() {
    const { searchTerm, result } = this.state;
    if (!result) { return null; }
    return (
      <div className="page">
          <div className='interactions'>
            <Search>
              value = {searchTerm}
              onChange = {this.onSearchChange}
              onSubmit = {this.onSearchSubmit}>
              Search
            </Search>
          </div>
        { result &&
          <Table
            list={result.items}
            onDismiss={this.onDismiss}
          />
          }
      </div>
    );
  }
}

const Search = ({
      value,
      onChange,
      onSubmit,
      children
    }) => 
      <form onSubmit={onSubmit}>
        <input type="text"
        value={value}
        onChange={onChange}
        />
        <button type="submit">
          Search
        </button>
      </form>


class Table extends Component {
    constructor(props){
      super(props);
      this.state = {text: '', 
      isPopupShown: false}
    }
      openPopup = () => this.setState({ isPopupShown: true })
      closePopup = () => this.setState({ isPopupShown: false })
      render(){
        return(
          <div className="table">
              {this.state.isPopupShown ? <Popup /> : null}
              {this.props.list.map(item =>
              <div key={item.id} className="books_info">
                <span className="authors">{item.volumeInfo.authors} <br/></span>
                <span className="publDate">{item.volumeInfo.publishedDate} <br/></span>
                <span className="title">{item.volumeInfo.title} <br/></span>
                <div>
                  <label>
                      Enter text to edit the book fields:
                  </label>
                  <input className="form-control"
                      type="text" 
                      value={ this.state.text }
                      onChange={ e => this.setText(e.target.value) }
                  />
                  <p>
                      <button className="btn btn-primary" onClick={e => this.openPopup() } type="button" >
                          Edit field
                      </button>
                      <button className="btn btn-warning" onClick={e => this.closePopup() } type="button" >
                          Save changes
                      </button>
                  </p>
                </div>
              </div>
                )}
            </div>
          )};
        }
export default App;