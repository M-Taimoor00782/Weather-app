import { useState } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState(false);
  const [city, setCity] = useState('');
  const [wDetails, setWDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const inputShow = () => {
    setSearch(!search);
  }

  const getDate = (e) => {
    setIsLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod == "404") {
          setWDetails(undefined)
        }
        else {
          setWDetails(finalRes);
        }

        setIsLoading(false);
      })

    e.preventDefault();
    setCity(' ');
  }

  return (
    <>
      <div className="mainContainer w-screen h-screen flex items-center justify-center bg-slate-400">
        <div className='bg-[linear-gradient(90deg,#2c3e50,#3a6073)] max-w-lg h-96 w-full p-10 drop-shadow-[10px_10px_20px_rgba(0,0,0,0.5)] rounded-3xl text-white relative'>

          <img src="https://i.gifer.com/ZKZg.gif"
            className={`w-20 absolute left-[40%] top-[30%] bg-transparent 
          ${isLoading ? '' : 'hidden'}`} />

          <div className='flex justify-between items-center relative'>

            <h1 className='font-bold text-2xl text-center'>Weather App</h1>

            <i className="fa-solid fa-magnifying-glass cursor-pointer"
              onClick={() => inputShow()}
            >

            </i>

            <form className={`absolute top-0 right-6
              ${search ? "" : 'hidden'}`} onSubmit={getDate}>

              <input type="text" placeholder='Search' className='border border-[1px solid white] outline-none px-2 rounded-lg py-1'
                value={city} onChange={(e) => setCity(e.target.value)} />
            </form>
          </div>

          <div className='mt-10 '>
            {
              wDetails !== undefined
                ? <>
                  <div className='flex items-center justify-around'>
                    <div>
                      <h2 className='text-3xl flex gap-2 mb-1'>
                        {wDetails.name}
                        <span className='text-sm'>
                          {wDetails.sys.country}
                        </span>
                      </h2>
                      <p>{wDetails.weather[0].description}</p>
                    </div>


                    <div className='flex gap-2 items-start'>
                      <h2 className='text-2xl flex gap-1'>
                        {Math.floor(wDetails.main.temp)}
                        <span className='text-[16px]'>°C</span>
                      </h2>
                      <img className='w-18'
                        src={`https://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} />
                    </div>
                  </div>

                  <div className='flex items-center  justify-around mt-4'>
                    <p>
                      Feel like: {Math.floor(wDetails.main.feels_like)}
                       <span className='text-[16px]'> °C</span>
                    </p>
                    <p>Wind : {wDetails.wind.speed} km/h</p>
                  </div>
                  <div className='flex items-center justify-around mt-5'>
                    <p>Humidity : {wDetails.main.humidity}%</p>
                    <p>Pressure : <i className="fa-solid fa-arrow-down-long text-[12px] font-normal"></i>
                      {wDetails.main.pressure} mb</p>
                  </div>
                </>
                :
                'No data'
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default App
