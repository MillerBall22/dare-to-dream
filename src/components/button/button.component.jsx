import styles from './button.module.css';

const Button = ({title, onClick}) => {
    return (
        <div className={styles.container} onClick={onClick}  >
            <h3 className={styles.title}>
                {title}   
            </h3>
        </div>);
}

export default Button;