import styles from './slideshow.module.css';
import Logo from '../../assets/dare-to-dream.png'
import SponsorsText from '../../assets/sponsors-text.svg'
import PrizesText from '../../assets/prizes-text.svg'
import GrandPrize from '../../assets/prizes/grand-prize.svg'
import Prize1 from '../../assets/prizes/Prize1.JPG'
import Prize2 from '../../assets/prizes/Prize2.png'
import Prize3 from '../../assets/prizes/Prize3.png'
import Prize4 from '../../assets/prizes/Prize4.png'
import Prize5 from '../../assets/prizes/Prize5.png'
import Sponsor1 from '../../assets/sponsors/sponsor1.png'
import Sponsor2 from '../../assets/sponsors/sponsor2.png'
import Sponsor3 from '../../assets/sponsors/sponsor3.png'
import Sponsor4 from '../../assets/sponsors/sponsor4.png'
import Sponsor5 from '../../assets/sponsors/sponsor5.png'
import { useEffect, useState } from 'react';

const Slideshow = () => {
    const [prize, setPrize] = useState(PrizesText)
    const [prizeCount, setPrizeCount] = useState(1)
    const [sponsor, setSponsor] = useState(SponsorsText)
    const [sponsorCount, setSponsorCount] = useState(1)
    const [delay, setDelay] = useState(5000)

    useEffect(() => {
    const interval = setInterval(() => {
        switch (sponsorCount) {
            case 1:
                setSponsor(Sponsor2)
                break;
            case 2:
                setSponsor(Sponsor3)
                break;
            case 3:
                setSponsor(Sponsor4)
                break;
            case 4:
                setSponsor(Sponsor5)
                break;        
            default:
                setSponsor(Sponsor1)
                break;
        }
        if (sponsorCount === 4) {
            setSponsorCount(0)
        } else {
            setSponsorCount(sponsorCount + 1)
        }
        setDelay(2000)
    }, delay);
    return () => clearInterval(interval);
}, [sponsorCount]);

    useEffect(() => {
        const interval = setInterval(() => {
            switch (prizeCount) {
                case 1:
                    setPrize(GrandPrize)
                    break;
                case 2:
                    setPrize(Prize3)
                    break;
                case 3:
                    setPrize(Prize4)
                    break;
                case 4:
                    setPrize(Prize5)
                    break; 
                case 5:
                    setPrize(Prize2)
                    break;       
                default:
                    setPrize(Prize1)
                    break;
            }
            if (prizeCount === 5) {
                setPrizeCount(0)
            } else {
                setPrizeCount(prizeCount + 1)
            }
        }, delay);
        return () => clearInterval(interval);
    }, [prizeCount]);

    return (
        <div className={styles.container}>
            <div className={styles.sidephoto}>
                <img src={sponsor} alt="Sponsors" className={styles.sidePhoto}/>
            </div>
            <div>
                <img src={Logo} alt="Dare to Dream Logo" className={styles.photo}/>
            </div>
            <div className={styles.sidephoto}>
                <img src={prize} alt="Prizes" className={styles.sidePhoto}/>
            </div>
        </div>);
}

export default Slideshow;