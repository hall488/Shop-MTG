import styles from "./Quantity.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

library.add(faPlus, faMinus);

function Quantity({disable, quantity, setQuantity}) {

    const handleQuantity = (e) => {
        if(e.target.value == "") {
            setQuantity(0);
        } else if(!isNaN(e.target.value)) {
            setQuantity(bound(e.target.value));
        }
    }

    const onAdd = () => {
        setQuantity(bound(quantity + 1));
    }

    const onSub = () => {
        setQuantity(bound(quantity - 1));
    }

    const bound = (val) => {
        return Math.min(100, Math.max(0, parseInt(val)));   
    }

    return (
        <div style={{display: !disable ? "flex" : "none"}}className={styles.Quantity}>
            <FontAwesomeIcon onClick={onSub} icon="minus" />
            <input name="quan" style={{width: `${quantity.toString().length * 20}px`}} value={quantity} onChange={handleQuantity}/>
            <FontAwesomeIcon onClick={onAdd} icon="plus" />
        </div>
    )
}

Quantity.propTypes = {
    disable: PropTypes.bool,
    quantity: PropTypes.number,
    setQuantity: PropTypes.func
}

export default Quantity;