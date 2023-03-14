import React from 'react';
import { PDFReader } from 'reactjs-pdf-reader';
import useWindowDimensions from '../../utils/useWindowDimensions/useWindowDimensions';
import styles from './poster.module.css'

function Poster() {
  const { height, width } = useWindowDimensions();
  return (
    <div className={styles.container} >
      <div className={styles.pdf }>
        <img src={'/static/Poster1.png'} className={styles.poster} alt={''}/>
        <img src={'/static/Poster2.png'} className={styles.poster} alt={''}/>
        <img src={'/static/Poster3.png'} className={styles.poster} alt={''}/>
        <img src={'/static/Poster4.png'} className={styles.poster} alt={''}/>
      </div>
    </div>
  );
};

export default Poster;