import React, { useEffect, useState } from 'react';
import { IconContext } from "react-icons";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
    weather: [
        {
            icon: string;
            description: string;
        }
    ];
    wind: {
        speed: number;
    };
}

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [loaded, setLoaded] = useState(false);

    function getCurrentDateTime() {
        const currentDate = new Date();
        return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', hour: '2-digit', minute: '2-digit' }).format(currentDate);
    }

    const formatLabel = (label: string, value: string) => {
        return (
            <div className='flex items-center font-serif'>
                <span className='text-lg font-serif text-end font-semibold'>{label}:</span>
                <span className='text-xl font-serif text-end font-semibold ml-2'>{value}</span>
            </div>
        );
    };

    useEffect(() => {
        if ('geolocation' in window.navigator) {
            const apiKey =  process.env.NEXT_PUBLIC_GEO_KEY
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
                fetch(apiUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        setWeatherData(data);
                        setLoaded(true);
                    })
                    .catch((error) => {
                        console.error("Erro ao obter dados do OpenWeatherMap:", error);
                    });
            });
        } else {
            console.log("Geolocalização não suportada pelo navegador.");
        }
    }, []);

    return (
        <div>
            {loaded && (
                <div className='bg-gray-100 m-8 rounded p-6 md:w-2/3 xl:w-1/2 mx-auto'>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-3xl md:text-4xl font-semibold antialiased font-serif text-center mb-4'>Clima em {weatherData?.name}</h1>
                    </div>
                    <div className='mr-4 inline-flex font-semibold text-3xl bg-gray-300 rounded p-2'>
                        <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} width={80} alt='Icon'></img>
                        {weatherData?.main.temp} ºC
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center'>
                        <div className='md:flex md:flex-col'>
                            {formatLabel('Umidade', `${weatherData?.main.humidity}%`)}
                            {formatLabel('Velocidade do vento', `${weatherData?.wind.speed} m/s`)}
                            <div className='flex'>
                                <div className='flex items-center' style={{ color: 'red' }}>
                                    <FaArrowDown />
                                    <p className='mr-2 text-2xl'>{weatherData?.main.temp_min}</p>
                                </div>
                                <div className='flex items-center' style={{ color: 'green' }}>
                                    <FaArrowUp />
                                    <p className='ml-2 text-2xl'>{weatherData?.main.temp_max}</p>
                                </div>
                            </div>
                        </div>
                        <div className='md:ml-auto flex flex-col mt-4 md:mt-0'>
                            <p className='font-serif font-semibold text-2xl text-center md:text-end leading-1'>Clima</p>
                            <p className='text-xl font-serif text-center md:text-end font-semibold text-gray-500'>{weatherData?.weather[0].description}</p>
                            <p className='text-xl font-semibold font-serif text-center md:text-end text-gray-500'>{getCurrentDateTime()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
