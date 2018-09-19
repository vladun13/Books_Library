import React, { Component } from 'react';
import './App.css';
import Table from './components/Table'
import Search from './components/Search'

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
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  setSearchTopBooks(result) {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() {
    const { searchTerm, result } = this.state;
    return (
      <div className="App">
        <Search
          value = {searchTerm}
          onChange = {this.onSearchChange}
        />
        { result
          ? <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
          : null
          }
      </div>
    );
  }
}

export default App;