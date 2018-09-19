import React, { Component } from 'react';

export default class Table extends Component {
  isSearched(searchTerm) {
    return function (item) {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }

  render(){
    const { list, pattern, onDismiss } = this.props;
    return(
      <div>
        {list.filter(this.isSearched(pattern)).map(item =>
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
          </div>
        )}
      </div>
      );
    }
  }
