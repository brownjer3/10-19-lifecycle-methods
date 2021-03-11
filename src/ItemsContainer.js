import React from 'react'
import Item from './Item'
import FilterBar from './FilterBar'
import ItemForm from './ItemForm'
import ItemShow from './ItemShow'
import {
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux'

class ItemsContainer extends React.Component {

    state = {
      searchTerm: ""
    }

    componentDidMount(){
        console.log("Items Container mounted")
        console.log(this.props)
      }

    filterItems = (e) => {
      const searchTerm = e.target.value
      console.log(searchTerm)
      this.setState({searchTerm: searchTerm})
    }

    displayItems(){

      const itemsToDisplay = this.props.items.filter(i => i.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))

      return itemsToDisplay.map(item => <Item  key={item.id} name={item.name} price={item.price} id={item.id} image1={item.image1} image2={item.image2} />) 
    }

    render(){
        return(
            <div id="ItemsContainer">
              <Switch>
                <Route exact path="/items">
                  <FilterBar filterItems={this.filterItems} />
                  { this.displayItems()}
                </Route>
                <Route exact path="/items/new">
                  <ItemForm />
                </Route>
                <Route path="/items/:id"  component={(routeInfo) => {
                  const id = parseInt(routeInfo.match.params.id)
                  const item = this.props.items.find(i => i.id === id)
                  return !!item ? <ItemShow routeInfo={routeInfo} item={item}/> : <div>Not Found!</div>
                }}/>
              </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(ItemsContainer)