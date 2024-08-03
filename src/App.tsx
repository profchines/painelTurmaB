import { Fragment } from "react"
import { NovuComponent } from './components/NovuComponent'
import styles from './styles/global.module.css'

function App() {

  return (
    <Fragment key={"unico"}>
      <NovuComponent />
      <h1 className={styles.title}>Hello World</h1>
      <h1 style={{
        color: 'red',
        backgroundColor: 'blue'
      }}>
        Hello World
      </h1>
    </Fragment>
  )
}

export default App
