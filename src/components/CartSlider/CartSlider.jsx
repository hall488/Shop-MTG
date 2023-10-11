import styles from "./CartSlider.module.css";
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDeleteLeft} from "@fortawesome/free-solid-svg-icons";

import Quantity from "../Shop/Quantity";

library.add(faDeleteLeft);

function CartSlider({cart, setCart, showCart, toggleCart}) {

    const handleCart = (e) => {
        e.stopPropagation();
    }

    const handleDelete = (e) => {
      let array = [...cart];
      let card = array.find(c => c.name == e.target.parentNode.id);
      array.splice(card, 1);
      setCart(array);
    }

    const handleQuantity = (val, name) => {
      let array = [...cart];
      cart.find(item=> item.name == name).quantity = val;
      setCart(array);
    }

    const handleTotal = () => {
      let sum = cart.reduce((a,b) => { return a + b.quantity * parseFloat(b.price.substring(1))}, 0);
      return sum.toFixed(2);
    }

    return (
      <div className={styles.cartSlider} onClick={toggleCart}
        style={{
            pointerEvents: showCart ? "all" : "none",
            
            }}>
        <div className={styles.cart} onClick={handleCart} style={{transform: showCart ? "translateX(-300px)" : "translateX(0)"}}>
            <div className={styles.title}>Cart</div>
            {cart.map(o => <div className={styles.item} id={o.name} key={o.name}>
              <div className={styles.info}>
                {o.name}
                <div className={styles.pricing}><Quantity disable={false} quantity={o.quantity} setQuantity={(val) => {handleQuantity(val, o.name)}}/> x {o.price}</div>
              </div>
              <FontAwesomeIcon onClick={handleDelete} icon="delete-left" />
            </div>)}
            <div className={styles.total}>Total: ${handleTotal()}</div>
            <button>Checkout</button>
        </div>
      </div>
    )
}

CartSlider.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
  showCart: PropTypes.bool,
  toggleCart: PropTypes.func
}

export default CartSlider