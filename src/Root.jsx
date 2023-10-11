import { useState, useEffect } from 'react'
import './App.css'
import BGVideo from './components/BGVideo/BGVideo';
import Header from './components/Header/Header';
import CartSlider from './components/CartSlider/CartSlider';
import Middle from './components/Middle/Middle';
import styles from "./components/Middle/Middle.module.css";
import { Outlet } from "react-router-dom";
import "./All.css";

function Root() {

  let [cart, setCart] = useState([]);
  let [showCart, setShowCart] = useState(false);
  let [background, setBackground] = useState("bg_1");
  let [page, setPage] = useState("");
  let [buttonColor, setButtonColor] = useState("#db8c24");
  let [setLink, setSetLink] = useState("");


  useEffect(() => {
    let r = document.querySelector(':root');
    r.style.setProperty("--button-color", buttonColor);
  }, [buttonColor]);

  const toggleCart = () => {
    setShowCart(!showCart);
  }

  const handlePage = (path) => {
    if(path != page ) {
        setPage(path);
        return new Promise( resolve => {

            let middle = document.querySelector(`.${styles.Middle}`);
    
            middle.style.transform = "translateX(-100%)";
    
            setTimeout(() => {
                resolve(true);
                middle.style.transition = "transform .25s ease-in-out";
                setTimeout(() => {
                    middle.style.transform = "translateX(0%)";
                }, 0);
                
            }, 250)
        });
    }
    
  }

  return (
    <>
      
      <CartSlider cart={cart} setCart={setCart} showCart={showCart} toggleCart={toggleCart}/>
      <div className="container" style={{filter: showCart ? "blur(1px) brightness(80%)" : "none"}}>     
        <BGVideo value={background}/>   
        <Header changePage={handlePage} cartTotal={cart.length} toggleCart={toggleCart}/>
        <Middle className={styles.Middle}>
            <Outlet context={{setBackground, handlePage, setButtonColor, buttonColor, cart, setCart, setLink, setSetLink}}/>
        </Middle>
      </div>

    </>
  )
}

export default Root;
