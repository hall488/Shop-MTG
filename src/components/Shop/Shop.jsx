import styles from "./Shop.module.css"
import { useEffect, useState, useRef } from "react"
import { useOutletContext } from "react-router-dom";
import Cards from "./Cards";
import { requestSearch, requestSetNames } from "./Requests";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch} from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

function Shop() {

    let searchValue = useRef("");
    let [sets, setSets] = useState([]);
    let [activeSet, setActiveSet] = useState("");
    let colors = useRef({W: false, U: false, B: false, R: false, G: false, C: false});
    let [cards, setCards] = useState([]);
    let [loading, setLoading] = useState(false);
    let scrollTop = useRef(0);
    const { cart, setCart, setLink, setSetLink } = useOutletContext();

    useEffect(() => {
        let sb = document.querySelector(`.${styles.searchbar} > input`);
        let ss = document.querySelector(`.${styles.setSearch}`);

        function handlePress(e) {
            if(e.key == "Enter" && (sb === document.activeElement || ss === document.activeElement) && !e.repeat) {
                handleSearch();
            }
        }

        document.addEventListener("keydown", handlePress);

        return function cleanup() {
            document.removeEventListener("keydown", handlePress);
        }
    }, []);

    useEffect(() => {
        if(setLink != "") {
            setActiveSet(setLink);
        } else {
            setActiveSet("");
        }
    }, [])

    useEffect(() => {
        if(activeSet != "" && sets.map(s => s.code).includes(activeSet) && setLink != "") {
            handleSearch();
            setSetLink("");
        }
            
    }, [activeSet, sets]);

    useEffect(() => {
        let el = document.querySelector(".scroller");
        if(el != null) {
            el.scrollTop = scrollTop.current;
        }
    });

    useEffect(() => {
        requestSetNames().then(response => {
            let array = [];
            response.forEach(set => {
                array.push(set);
            });
            setSets(array);
        });
    }, [])

    

    const handleSearchChange = (e) => {
        searchValue.current = e.target.value;
    }

    const handleSearch = () => {
        setLoading(true);
        requestSearch(searchValue, sets, activeSet, colors).then( response => {
            //console.log(response);
            if(response.object == 'error') {
                setCards([]);
            } else if(response.object == 'list') {                    
                setCards(response.data);                
            }
            setLoading(false);
        });
    
    }

    const handleSetChange = (e) => {
        if(!sets.map(s=>s.code).includes(e.target.value) && e.target.value != "") {
            e.target.style.borderColor = "red";
        } else {
            e.target.style.borderColor = "";
        }
        setActiveSet(e.target.value);
    }

    const handleColors = (e) => {
        let colorless = document.querySelector("#C");
        let tempColors = structuredClone(colors.current);
        if(e.target.checked && colorless.checked) {
            colorless.checked = false;
            tempColors.C = false;
        }

        tempColors[e.target.id] = e.target.checked;
        colors.current = tempColors;
    }

    const handleColorless = (e) => {
        let siblings = [...e.target.parentNode.parentNode.children];
        let tempColors = structuredClone(colors.current);
        siblings.forEach(s=> {
            let input = s.querySelector("input");
            if(input.id !== e.target.id) {
                input.checked = false;
            }
            tempColors[input.id] = input.checked;
        });
        colors.current = tempColors;
    }


    return(
        <div className={styles.Shop}>
            <div className={styles.sidebar}>
                <div className={styles.search}>Search</div>
                <div className={styles.searchbar}>
                    <input id="search" onChange={handleSearchChange} placeholder="Search"></input>
                    <FontAwesomeIcon onClick={handleSearch} icon="search" />
                </div>
                <div className={styles.sets}>Sets</div>
                <input name="setSearch" className={styles.setSearch} value={activeSet} placeholder="Choose a set" onChange={handleSetChange} list="sets"/>
                <datalist id="sets">
                    {sets.map(s => {
                        return <option value={s.code} key={s.code}>{s.name}</option>
                    })}
                </datalist>
                <div className={styles.cbTitle}>Colors</div>
                <div className={styles.checkboxes}>
                    <div className={styles.cbWrapper}>
                        <img src="./src/assets/Color_W.png"/><input type="checkbox" onChange={handleColors} id="W"/>
                    </div>
                    <div className={styles.cbWrapper}>
                        <img src="./src/assets/Color_U.png"/><input type="checkbox" onChange={handleColors} id="U"/>
                    </div>
                    <div className={styles.cbWrapper}>
                        <img src="./src/assets/Color_B.png"/><input type="checkbox" onChange={handleColors} id="B"/>
                    </div>
                    <div className={styles.cbWrapper}>
                        <img src="./src/assets/Color_R.png"/><input type="checkbox" onChange={handleColors} id="R"/>
                    </div>
                    <div className={styles.cbWrapper}>
                        <img src="./src/assets/Color_G.png"/><input type="checkbox" onChange={handleColors} id="G"/>
                    </div>
                    <div className={styles.cbWrapper}>
                        <img src="./src/assets/Color_C.png"/><input type="checkbox" onChange={handleColorless} id="C"/>
                    </div>
                </div>
                
                <button onClick={handleSearch}>Apply Filters</button>
            </div>
            <div className={styles.cardWrapper}>
                    <Cards loading={loading} cards={cards} scrollTop={scrollTop} cart={cart} setCart={setCart}/>
            </div>
        </div>
    )
}

export default Shop;