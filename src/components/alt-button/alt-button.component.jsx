import styles from './alt-button.module.css';

const AltButton = ({title, onClick}) => {
    return (
        <div className={styles.container} onClick={onClick}  >
            <h3>
                {title}   
            </h3>
        </div>);
}

export default AltButton;