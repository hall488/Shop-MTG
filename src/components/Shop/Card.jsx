import Quantity from "./Quantity";
import { useState, useRef, useEffect } from "react";
import styles from "./Card.module.css";
import PropTypes from 'prop-types';
import VanillaTilt from "vanilla-tilt";

function Card({id, src, price, cart, setCart, name}) {

    let [item, setItem] = useState({name, quantity: 0, price});
    

    const inCart = () => {
        return cart.map(c=>c.name).includes(name);
    }

    useState(() => {
        if(inCart()) {
            setItem({...item, quantity: cart.find(c => c.name == name).quantity});
        }
        
    }, []);

    const handleATC = () => {
        
        if(!inCart()) {
            let array = [...cart];
            array.push(item);
            setCart(array);
        }
    }

    const handleQuantity = (val) => {
        setItem({...item, quantity: val});
        if(inCart()) {
            let array = [...cart];
            cart.find(item=> item.name == name).quantity = val;
            setCart(array);
        }
    }

    function Tilt(props) {
        const { options, ...rest } = props;
        const tilt = useRef(null);
      
        useEffect(() => {
          VanillaTilt.init(tilt.current, options);
        }, [options]);
      
        return <div ref={tilt} {...rest} />;
    }


    return (
        <div className={styles.Card} key={id}>
            <Tilt className={styles.imgW} options={{scale: 1.1}}>
                <img src={src}/>
            </Tilt>
            <div className={styles.text}>{price}</div>
            <Quantity disable={price=="No Sale"} quantity={item.quantity} setQuantity={handleQuantity}/>
            <button onClick={handleATC} style={{display: price!="No Sale" ? "flex" : "none"}}>{inCart() ? "In Cart" : "Add to Cart"}</button>
        </div>
    )
}

Card.propTypes = {
    options: PropTypes.any,
    id: PropTypes.string,
    src: PropTypes.string,
    price: PropTypes.string,
    cart: PropTypes.array,
    setCart: PropTypes.func,
    name: PropTypes.string
}

export default Card;