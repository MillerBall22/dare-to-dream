import styles from './loading-message.module.css';

const LoadingMessage = () => {
    
    return (
        <div className={styles.container} >
            <h2>Loading... Please wait.</h2>
        </div>
        );
}

export default LoadingMessage;