import styles from './slideshow.module.css';
import Logo from '../../assets/dare-to-dream.png'

const Slideshow = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sidephoto}>
                <h1>Sponsors</h1>
            </div>
            <div>
                <img src={Logo} alt="Dare to Dream Logo" className={styles.photo}/>
            </div>
            <div className={styles.sidephoto}>
                <h1>Prizes</h1>
            </div>
        </div>);
}

export default Slideshow;