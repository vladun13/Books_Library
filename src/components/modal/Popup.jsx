import React from 'react';

class Popup extends React.Component {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
        <div className="popup">
          <form action="">
              <input type="text"/>
          </form>
          <button className="popup-close" onClick={this.props.onClose}>✖</button>
          {this.props.children}
        </div>
    );
  }
}

export default Popup;