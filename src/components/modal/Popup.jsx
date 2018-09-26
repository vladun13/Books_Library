import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

export class Popup extends React.Component {

    constructor() {
        super();
        this.state = {
          author: '',
          publishedDate: '',
          title: ''
        };
    }

    render() {
        return (
          <div className="popup-overlay">
            <div className="popup-content">
              <form onSubmit={(e) => {e.preventDefault(); this.props.onSubmit({authors: this.state.author, publishedDate: this.state.publishedDate, title: this.state.title})}}>
                Author: <input className="authors" defaultValue={this.props.item.volumeInfo.authors} onChange={e => this.setState({author: e.target.value })}/> <br/>
                Date: <input className="publDate" defaultValue={this.props.item.volumeInfo.publishedDate} onChange={e => this.setState({publishedDate: e.target.value }) } /> <br/>
                Title: <input className="title" defaultValue={this.props.item.volumeInfo.title} onChange={e => this.setState({title: e.target.value }) } /> <br/>
                <button type="submit">Submit</button>
              </form>
              <button onClick={this.props.onClose}>Close</button>
            </div>
          </div>
        );
    }
}

export default Popup;


