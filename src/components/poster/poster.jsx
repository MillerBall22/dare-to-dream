import React from 'react';
import { PDFReader } from 'reactjs-pdf-reader';
import useWindowDimensions from '../../utils/useWindowDimensions/useWindowDimensions';
import styles from './poster.module.css'

function Poster() {
  const { height, width } = useWindowDimensions();
  return (
    <div className={styles.container} >
      <div className={styles.pdf }>
      {width > 1300 ? (
        <PDFReader url="poster.pdf" showAllPage={true} scale="2" />
        ) : width > 700 ? (
          <PDFReader url="poster.pdf" showAllPage={true} scale="1" />
        ) : (
          <PDFReader url="poster.pdf" showAllPage={true} width="250" />
        )
      }
      </div>
    </div>
  );
};

export default Poster;