import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newList = [...cartList]
    const item = cartList.findIndex(each => id === each.id)
    newList[item].quantity += 1
    this.setState({cartList: newList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newLists = [...cartList]
    const items = cartList.findIndex(each => id === each.id)
    newLists[items].quantity -= 1
    if (newLists[items].quantity === 0 && cartList.length > 1) {
      const filtered = cartList.filter(eachItem => id !== eachItem.id)
      this.setState({cartList: filtered})
    } else if (newLists[items].quantity === 0 && cartList.length === 1) {
      this.setState({cartList: []})
    } else {
      this.setState({cartList: newLists})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const check = cartList.findIndex(each => product.id === each.id)
    if (check === -1) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const newList = [...cartList]
      const item = cartList.findIndex(each => product.id === each.id)
      newList[item].quantity += 1
      this.setState({cartList: newList})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
