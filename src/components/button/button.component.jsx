import styles from './button.module.css';

const Button = ({title, onClick}) => {
    return (
        <div className={styles.container} onClick={onClick}  >
            <h3>
                {title}   
            </h3>
        </div>);
}

export default Button;