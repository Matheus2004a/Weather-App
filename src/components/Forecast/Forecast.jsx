import { useState, useEffect } from "react"
import { ICON } from "../../services/api"
import { FiMapPin, FiWind, FiDroplet, FiCloudLightning } from "react-icons/fi"
import "./Forecast.css"

const Forecast = (props) => {
    const [dates, setDates] = useState([{}])

    const formatHours = date => {
        const hours = date.getHours()
        const minutes = date.getMinutes()

        const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
        const hoursAndMin = `${hours}:${minutesFormatted}`
        return hoursAndMin
    }

    const getDay = () => {
        const date = new Date()
        const day = date.getDay()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        const detailsDate = {
            day,
            month,
            year,
            hours: formatHours(date)
        }

        setDates(detailsDate)
    }

    const getDateByDay = dates => {
        const date = new Date(dates)
        const dayAndMonth = `0${date.getDate()}/0${date.getMonth() + 1}`
        return dayAndMonth
    }

    const formatHoursByDay = dates => {
        const date = new Date(dates)
        return formatHours(date)
    }

    useEffect(() => {
        getDay()
    }, [])

    return (
        <main className="card">
            <div className="content">
                {props.details.map((item, index) => (
                    <>
                        <figure>
                            <img src={`${ICON}/${item.weather[index].icon}.png`} alt={`${item.weather[index].description}`} />
                            <figcaption>
                                <h1>{Math.round(item.main.temp)}<sup>º</sup>C</h1>
                                <p>{item.weather[index].description}</p>
                            </figcaption>
                        </figure>

                        <article>
                            <section className="section-location">
                                <figure className="location">
                                    <FiMapPin />
                                    <figcaption>
                                        <strong>{item.name}</strong>, {item.sys.country}
                                    </figcaption>
                                </figure>
                                <h4>Hoje: {dates.hours}</h4>
                            </section>

                            <section className="section-details">
                                <figure>
                                    <FiWind />
                                    <figcaption>
                                        <h4>{item.wind.speed} km/h</h4>
                                        <p>Velocidade do vento</p>
                                    </figcaption>
                                </figure>

                                <figure>
                                    <FiDroplet />
                                    <figcaption>
                                        <h4>{item.main.humidity} %</h4>
                                        <p>Humidade</p>
                                    </figcaption>
                                </figure>

                                <figure>
                                    <FiCloudLightning />
                                    <figcaption>
                                        <h4>{item.main.pressure} mb</h4>
                                        <p>Pressão do ar</p>
                                    </figcaption>
                                </figure>
                            </section>
                        </article>
                    </>
                ))}

                {props.daysTemp.map((item, index) => (
                    <article key={index}>
                        <h4>Previsão hoje nas próximas horas</h4>
                        <section>
                            {item.list.map((list) => (
                                <>
                                    <figure>
                                        <p>{getDateByDay(list.dt_txt)}</p>
                                        <img src={`${ICON}/${list.weather[index].icon}.png`} alt={`${list.weather[index].description}`} />
                                        <figcaption>
                                            <p>{formatHoursByDay(list.dt_txt)}</p>
                                            <h4>{Math.round(list.main.temp)}<sup>º</sup>C</h4>
                                        </figcaption>
                                    </figure>
                                </>
                            ))}
                        </section>
                    </article>
                ))}
            </div>
        </main>
    )
}

export default Forecast