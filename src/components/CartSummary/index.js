import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const noItems = cartList.length

      let prices = 0

      function renderMoney(each) {
        const amount = each.price * each.quantity
        prices += amount
      }

      cartList.map(each => renderMoney(each))

      return (
        <div className="price-container">
          <h1 className="price-head">
            Order Total :<span className="total-price"> {prices}/-</span>
          </h1>
          <p className="price-para">
            <span>{noItems}</span> Items in cart
          </p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
