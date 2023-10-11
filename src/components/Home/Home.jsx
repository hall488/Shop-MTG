import styles from "./Home.module.css";
import { useNavigate, useOutletContext } from "react-router-dom";

function Home() {

    const { handlePage, setSetLink } = useOutletContext();
    const navigate = useNavigate();

    const clickLink= (path) => {
        let prom = handlePage(path);

        if(prom) {
            prom.then(() => {
            navigate(`/${path}`);
            })
        }
    }

    return (
          <div className={styles.wrapper}>
              <ul className={styles.menu}>
                  <li>
                      <button onClick={() => {setSetLink(""); clickLink("shop")}}>Search Cards</button>
                  </li>
                  <li className={styles.latest}>Latest Sets</li>
                  <li><button onClick={() => {setSetLink("who"); clickLink("shop")}}>Doctor Who</button></li>
                  <li><button onClick={() => {setSetLink("woe"); clickLink("shop")}}>Wilds of Eldraine</button></li>
                  <li><button onClick={() => {setSetLink("cmm"); clickLink("shop")}}>Commander Masters</button></li>
              </ul>
          </div>
      )
}

export default Home;