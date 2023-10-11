import styles from "./Middle.module.css";
import PropTypes from 'prop-types';

function Middle(props) {
    return (
        <div className={styles.Middle}>
            {props.children}
        </div>
    )
}

Middle.propTypes = {
    children: PropTypes.node
}

export default Middle;