import React from 'react';
import { PDFReader } from 'reactjs-pdf-reader';
import styles from './poster.module.css'

function Poster() {
  return (
    <div className={styles.container} >
      <div className={styles.pdf }>
        <PDFReader url="poster.pdf" showAllPage={true}/>
      </div>
    </div>
  );
};

export default Poster;