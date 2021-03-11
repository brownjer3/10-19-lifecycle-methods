import React from 'react'
import {connect} from 'react-redux'

class Item extends React.Component {

    state = {
        image: "image1"
    }

    isInCart(){
       return !!this.props.cart.find(item => item.id === this.props.id)
    } // this coud be moved to the ItemsContainer and passed as a prop 

    shouldComponentUpdate(nextProps, nextState){
        //expecting to receive a TRUE or FALSE to tell it if it should render
        // TRUE => re-render 
        // FALSE => skipds the re-render

        // the item was not in the props.cart but IS in the nextProps.cart
        return (!this.isInCart() && !!nextProps.cart.find(item => item.id === this.props.id)) || this.state != nextState
    }

    componentDidUpdate(){
        console.log("UPDATED", this.props.id)
    } // NEVER want to call setState UNLESS you have it inside of a condition

    switchImage = () => {
        
       this.setState((prevState) => {
           const newImage = prevState.image === "image1" ? "image2" : "image1"
           return(
            {
                image: newImage
            })
        }, () => console.log(this.state))
    }

    render(){
        return (
            <div className="item" id={this.props.id + "-item"}>
                <h3>{this.props.name}</h3>
                <div onMouseEnter={this.switchImage} onMouseLeave={this.switchImage}>
                  <img alt={this.props.name + " image"} src={this.props[this.state.image]}/>
                </div>
                
                <br/>
                Price: {this.props.price}
                <br/>
                {!this.isInCart() && <button onClick={(e) => this.props.addToCart(this.props.id)}>Add To Cart</button>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {cart: state.cart}
}

export default connect(mapStateToProps)(Item)