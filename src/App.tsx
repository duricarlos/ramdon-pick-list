import { useState } from 'react'
import './App.css'
import ibos from './assets/ibos.json'
import ConfettiExplosion from 'react-confetti-explosion';
import melogo from './assets/melogo.png'

export type Welcome = {
  type:      string;
  version?:  string;
  comment?:  string;
  name?:     string;
  database?: string;
  data:     Datum[];
}

export type Datum = {
  id:        string;
  ibo:       string;
  coupon:    string;
  qty:       string;
  event_sku: string;
  Mercado:   Mercado;
  email:     string;
  order_id:  null | string;
}

export type Mercado = "USA";


function App() {

  const [randomNumber, setRandomNumber] = useState<string | null>(null)
  const [loadingText, setLoadingText] = useState<string>('')
  const [, setLoading] = useState<boolean>(false)
  const [confetti, setConfetti] = useState<boolean>(false)

  const getRandomNumber = () => {
    // const length = event_data[2].data?.length
    const length = ibos.length - 1
    const random = Math.floor(Math.random() * length!) + 1
    const currentNumber = ibos[random].IBO.toString()
    //only show the first 4 digits of the coupon and the rest with *
    // setRandomNumber(event_data[2].data![random].coupon.slice(0,4) + '*'.repeat(8))
    setRandomNumber(currentNumber)
    //if the last number is true, show the full coupon
    // if (last) setRandomNumber(event_data[2].data![random].coupon)
    // if (last) setRandomNumber(currentNumber)
    // setRandomNumber(event_data[2].data![random].coupon)
    return random
  }

  const confettiProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 450,
    width: window.innerWidth * 1.2,
    height: window.innerHeight,
    gravity: 0.1,
  }
  const runConfetti = () => {
    console.log('run confetti')
    setConfetti(true)
    setTimeout(() => {
      setConfetti(false)
    }, 3000)
  }

  return (
    <>
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1>CONVENCIÓN SEPTIEMBRE 2024</h1>
      <h2>Rifa Salon VIP</h2>
      <img src={melogo} alt="logo" style={{
        width: '300px',
        height: 'auto',
        margin: 'auto',
      }}/>
    </section>
    <section style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {confetti && <ConfettiExplosion {...confettiProps} />}
    </section>
      <div className="card">
        <button onClick={()=>{
          // getRandomNumber()
          //Loop getting random numbers with a delay create suspense
          setRandomNumber(null)
          setLoadingText('')
          let dots = 0
          for (let i = 0; i < 100; i++) {
            setTimeout(() => {
              dots <= 3 ? dots++ : dots = 0
              // setLoadingText(`Cargando${'.'.repeat(dots)}`)
              setLoading(true)
              const id = getRandomNumber()
              console.log(id)
              // getRandomNumber()
              // if(i === 149) setLoadingText('IBO Ganador!')
              if(i === 99) {
                console.log('winner')
                setLoading(false)
                runConfetti()
                setLoadingText(ibos[id].NAME)
              }
            }, 30 * i);
            // when the loop ends, set the final message
          }
          
        }}>
          Elegir un número aleatorio
        </button>
      
      <h1>{randomNumber}</h1>
      <h2>{loadingText}</h2>
        {/* {loading && <Loading />} */}
      </div>
    </>
  )
}

export default App
