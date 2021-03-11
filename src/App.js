import React from 'react';
import Header from './Header'
import ItemsContainer from './ItemsContainer'
import CartContainer from './CartContainer'
import {connect} from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

class App extends React.Component{

  state = {
    term: ""
  }

  addToCart = (id) => {
    // find the Item with that id 
    const foundItem = this.state.items.find(item => item.id === id)
    // update state to show that the item is in the cart
    this.setState((prevState) => ({
      cart: [...prevState.cart, foundItem]
    }), () => console.log(this.state) )
  }

  // LCM can ONLY be used in a class component 
  componentDidMount(){
    // typcially fetch requests happen in a componentDidMount

    fetch("http://localhost:3000/items")
    .then(res => res.json())
    .then(json => {
      //replace with dispatch
      this.props.setItems(json)
    })
  }



  render(){
    return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/items" component={(stuff) =>  <ItemsContainer stuff={stuff} addToItems={this.addToItems}  addToCart={this.addToCart} /> 
            }/>
            <Route path="/cart">
              <CartContainer cart={this.state.cart}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setItems: (items) => {
      dispatch({type: "SET_ITEMS", items: items})
    }
  }
}

export default connect(null, mapDispatchToProps)(App)