import Card from "./Card";
import PropTypes from 'prop-types';
import { useState } from "react";
import styles from "./Cards.module.css";

function Cards({loading, cards, scrollTop, cart, setCart}) {

    let [expanded, setExpanded] = useState("");

    if(loading) {
        return <>Loading...</>;
    }

    if(cards.length == 0) {
        return <>No Cards Found</>;
    }

    const determinePrice = (card) => {
        if(card.prices.usd) {
            return "$" + card.prices.usd;
        }

        if(card.foil && card.prices.usd_foil) {
            return "$" + card.prices.usd_foil
        }

        return "No Sale"
    }

    const handleScroll = (e) => {
        scrollTop.current = e.target.scrollTop;
    }

    return (
        <div className="scroller" onScroll={handleScroll}>
            {cards.map(c => {
            if("image_uris" in c)
                return <Card key={c.id} id={c.id} src={c.image_uris.normal} price={determinePrice(c)} name={c.name} cart={cart} setCart={setCart}/>
            else if("card_faces" in c)
                return <Card key={c.id} id={c.id} src={c.card_faces[0].image_uris.normal} price={determinePrice(c)} name={c.name} cart={cart} setCart={setCart}/>
            })}

        </div>
    )
}

Cards.propTypes = {
    loading: PropTypes.bool,
    cards: PropTypes.array,
    scrollTop: PropTypes.object,
    cart: PropTypes.array,
    setCart: PropTypes.func
}

export default Cards;