import styles from "./BGVideo.module.css"
import { useEffect } from "react";
import PropTypes from 'prop-types';

function BGVideo({value}) {

    useEffect(() => {
        let div = document.querySelector(`.${styles.BGVideo}`)
        if(div != null) {
            div.load();
        }
      }, [value]);

    return (
        <div className={styles.BGDiv}>
            <video className={styles.BGVideo} loop autoPlay muted>
              <source src={`./${value}.mp4`} type="video/mp4"></source>
            </video>
        </div>
    )
}

BGVideo.propTypes = {
    value: PropTypes.string
}

export default BGVideo;