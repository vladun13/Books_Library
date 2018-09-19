import React, { Component } from 'react';
import './App.css';
import Table from './components/Table'

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
    const updatedBooks = this.state.result.books.filter(isNotId);
    this.setState({ 
      result: {...this.state.result, books: updatedBooks}
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
            list={result.books}
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
          {children}
        </button>
      </form>

const Table = ({ list, onDismiss }) =>
        <div className="table">
          {list.map(item =>
            <div key={item.objectID}>
              <span>
                  <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button onClick={() => onDismiss(item.objectID)} type="button">
                  Delete
                </button>
              </span>
              );
            } 
            </div>
export default App;