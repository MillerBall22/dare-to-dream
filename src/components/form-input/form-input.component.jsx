import styles from './form-input.module.css';

const FormInput = ({label, ...otherProps}) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>
                {label}
            </label>
            <input className={styles.input} {...otherProps} />
        </div>
        );
}

export default FormInput;