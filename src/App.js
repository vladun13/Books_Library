import React, { Component } from 'react';
import './App.css';
import Table from './components/Table'
import Search from './components/Search'


const list = [
  {
    title: 'React',
    url: 'https:reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },

  {
    title: 'Redux',
    url: 'https:redux.js.org/',
    author: 'Dan Abramov',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm: "",
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <Search
          value = {searchTerm}
          onChange = {this.onSearchChange}
        />
        <Table
          list = {list}
          pattern = {searchTerm}
          onDismiss = {this.onDismiss}
        />
      </div>
    );
  }
}

export default App;