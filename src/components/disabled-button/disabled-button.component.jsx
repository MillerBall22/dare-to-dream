import styles from './disabled-button.module.css';

const DisabledButton = ({title}) => {
    return (
        <div className={styles.container} >
            <h3>
                {title}   
            </h3>
        </div>);
}

export default DisabledButton;