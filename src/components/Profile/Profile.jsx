import styles from "./Profile.module.css"
import { useOutletContext } from "react-router-dom";

function Profile() {
    const {buttonColor, setButtonColor, setBackground} = useOutletContext();

    const handleColor = (e) => {
        setButtonColor(e.target.value);
    }

    return(
        <div className={styles.Profile}>
            <div className={styles.settings}>
                Background
                <ul>
                    <li onClick={()=> {setBackground("bg_1")}}><video loop autoPlay muted src="./src/assets/bg_1.mp4"/></li>
                    <li onClick={()=> {setBackground("bg_2")}}><video loop autoPlay muted src="./src/assets/bg_2.mp4"/></li>
                    <li onClick={()=> {setBackground("bg_3")}}><video loop autoPlay muted src="./src/assets/bg_3.mp4"/></li>
                    <li onClick={()=> {setBackground("bg_4")}}><video loop autoPlay muted src="./src/assets/bg_4.mp4"/></li>
                    <li onClick={()=> {setBackground("bg_5")}}><video loop autoPlay muted src="./src/assets/bg_5.mp4"/></li>
                    <li onClick={()=> {setBackground("bg_6")}}><video loop autoPlay muted src="./src/assets/bg_6.mp4"/></li>
                    <li onClick={()=> {setBackground("bg_7")}}><video loop autoPlay muted src="./src/assets/bg_7.mp4"/></li>
                </ul>
                Button Coloring
                <input type="color" value={buttonColor} onChange={handleColor}/>
            </div>
        </div>
    )
}

export default Profile