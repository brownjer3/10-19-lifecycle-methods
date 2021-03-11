import React from "react";
import {connect} from 'react-redux'
import {addToItems} from './actions'

class ItemForm extends React.Component {
  state = {
    name: "",
    price: "",
    image1: "",
    image2: "",
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: this.state }),
    };

    fetch("http://localhost:3000/items", requestObj)
      .then((res) => res.json())
      .then((item) => {
        this.props.addToItems(item);
      });

    this.setState({
      name: "",
      price: "",
      image1: "",
      image2: "",
    });
  };

  render() {
    return (
      <div id="ItemForm">
        <h1>Add a New Item:</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <br />
          <label>Price: </label>
          <input
            type="number"
            step=".01"
            name="price"
            value={this.state.price}
            onChange={this.handleInputChange}
          />
          <br />
          <label>Image 1 Url: </label>
          <input
            type="text"
            name="image1"
            value={this.state.image1}
            onChange={this.handleInputChange}
          />
          <br />
          <label>Image 2 Url: </label>
          <input
            type="text"
            name="image2"
            value={this.state.image2}
            onChange={this.handleInputChange}
          />
          <br />
          <input type="submit" value="Create Item" />
        </form>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToItems: (item) => dispatch(addToItems(item))
//   }
// }

export default connect(null, {addToItems})(ItemForm)