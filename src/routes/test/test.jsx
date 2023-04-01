
import styles from './test.module.css'

export default function Test() {
  const dateArray = Date().split(' ')
  const date = `${dateArray[1]}. ${dateArray[2]}, ${dateArray[3]}`
  console.log(dateArray)
  return (
    <div className={styles.container}>
        <h1>{date}</h1>
    </div>
  )
}
