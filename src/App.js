import React, { Component } from 'react';
import './App.css';
import Popup from './components/modal/Popup.jsx';

import api from './api';

const DEFAULT_QUERY = '';
const PATH_BASE = 'https://www.googleapis.com/books/v1/volumes?q=';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      result: null,
      placeholder:'Search',
      isPopupShown: false
    };


    this.setSearchTopBooks = this.setSearchTopBooks.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.fetchSearchTopBooks = this.fetchSearchTopBooks.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onCreateNew = this.onCreateNew.bind(this);
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

    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    //   .then(response => response.json())
    //   .then(result => this.setSearchTopBooks(result))
    //   .catch(error => error);

    this.setSearchTopBooks(api);
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

  onEdit(items) {
    this.setState({
      result: {
        items: [
          ...this.state.result.items.map(item => {
            if (item.id === items.id) {
              item.volumeInfo = {
                ...item.volumeInfo,
                ...items
              };
            }
            return item;
          })
        ]
      }
    }, () => console.log(this.state));
  }

  onCreateNew(item) {
    console.log('create', item);
    this.setState({
      result: {
        ...this.state.result,
        items: [
          {
            volumeInfo: {
              ...item
            }
          },
          ...this.state.result.items
        ]
      }
    });
    this.closePopup();
  }

  openPopup = (item) => this.setState({ isPopupShown: true });
  closePopup = () => this.setState({ isPopupShown: false });

  render() {
    const { searchTerm, result } = this.state;
    console.log(result);
    if (!result) { return null; }
    return (
      <div className="page">
          <div className='interactions'>
            <Search
              value = {searchTerm}
              onChange = {this.onSearchChange}
              onSubmit = {this.onSearchSubmit}>
              Search
            </Search>
            <div>
              <button onClick={this.openPopup} id = "add">Add new</button>
            </div>
            {this.state.isPopupShown ? (
              <Popup
                item={{
                  volumeInfo: {
                    author: '',
                    publishedDate: '',
                    title: ''
                  }
                }}
                onClose={this.closePopup}
                onSubmit={this.onCreateNew}
              />
            ) : null}
          </div>
        { result &&
          <Table
            list={result.items}
            onDismiss={this.onDismiss}
            onEdit={this.onEdit}
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

    onSubmit = (val) => {
      let update = this.state.item;
      console.log(val);
      if(val.authors) update.authors = val.authors;
      if(val.publishedDate) update.publishedDate = val.publishedDate;
      if(val.title) update.title = val.title;
      this.props.onEdit(update);
      this.closePopup();
    };
      openPopup = (item) => this.setState({ isPopupShown: true, item });
      closePopup = () => this.setState({ isPopupShown: false });
      render(){
        return(
          <div className="table">
            {this.state.isPopupShown ? (
              <Popup
                item={this.state.item}
                onClose={this.closePopup}
                onSubmit={this.onSubmit}
              />
            ) : null}

              {this.props.list && this.props.list.map(item =>
              <div key={item.id} className="books_info">
                <span className="authors">{item.volumeInfo.authors} <br/></span>
                <span className="publDate">{item.volumeInfo.publishedDate} <br/></span>
                <span className="title">{item.volumeInfo.title} <br/></span>
                <div className="button-container">
                  <p>
                      <button className="btn btn-primary" onClick={e => this.openPopup(item) } type="button" >
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