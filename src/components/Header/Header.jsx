import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faCircleUser , faHouse} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

library.add(faCartShopping, faCircleUser, faHouse);

function Header({cartTotal, toggleCart, changePage}) {

  const navigate = useNavigate();

  const clickLink= (path) => {
    let prom = changePage(path);

    if(prom) {
      prom.then(() => {
        navigate(`/${path}`);
      })
    }
  }

    return (
      <div className={styles.Header}>
        <img className={styles.logo} src="./src/assets/mtg-logo.png" onClick={() => {clickLink("")}}/>
        <FontAwesomeIcon onClick={() => {clickLink("")}} icon="house" className={styles.hoverable}/>
        <FontAwesomeIcon onClick={() => {clickLink("profile")}} icon="circle-user" className={styles.hoverable}/>
        <div className={styles.cartWrapper} onClick={toggleCart}>
            <div className={styles.total}>{cartTotal}</div>
            <FontAwesomeIcon icon="cart-shopping" />
        </div>
      </div>
    )
}
 
Header.propTypes = {
  cartTotal: PropTypes.number,
  toggleCart: PropTypes.func,
  changePage: PropTypes.func
}

export default Header;