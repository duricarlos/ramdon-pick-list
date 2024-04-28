import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import event_data from './assets/tv_coupon_event.json'

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

  const getRandomNumber = (last: boolean) => {
    const length = event_data[2].data?.length
    const random = Math.floor(Math.random() * length!) + 1
    //only show the first 4 digits of the coupon and the rest with *
    setRandomNumber(event_data[2].data![random].coupon.slice(0,4) + '*'.repeat(8))
    //if the last number is true, show the full coupon
    if (last) setRandomNumber(event_data[2].data![random].coupon)
    // setRandomNumber(event_data[2].data![random].coupon)
  }


  return (
    <>
      <div className="card">
        <button onClick={()=>{
          // getRandomNumber()
          //Loop getting 30 random numbers with a delay create suspense
          let dots = 0
          for (let i = 0; i < 150; i++) {
            setTimeout(() => {
              dots <= 3 ? dots++ : dots = 0
              setLoadingText(`Cargando${'.'.repeat(dots)}`)
              getRandomNumber(i === 149)
              // getRandomNumber()
              if(i === 149) setLoadingText('¡Cupon Ganador!')
            }, 40 * i);
            // when the loop ends, set the final message
          }
          
        }}>
          Elegir un número aleatorio
        </button>
      <h1>{randomNumber}</h1>
      <h2>{loadingText}</h2>
      </div>
    </>
  )
}

export default App
