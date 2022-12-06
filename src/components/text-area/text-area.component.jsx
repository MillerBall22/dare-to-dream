import styles from './text-area.module.css';

const TextArea = ({label, ...otherProps}) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>
                {label}
            </label>
            <textarea className={styles.input} {...otherProps}/>
        </div>
        );
}

export default TextArea;