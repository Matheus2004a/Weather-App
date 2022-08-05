import { useState, useEffect } from "react"
import { ICON } from "../../services/api"
import { FiMapPin, FiWind, FiDroplet, FiCloudLightning } from "react-icons/fi"
import "./Forecast.css"

const Forecast = (props) => {
    const [dates, setDates] = useState({})

    function getDay() {
        const date = new Date()
        const day = date.getDay()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        const hours = date.getHours()
        const minutes = date.getMinutes()

        const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes

        const detailsDate = {
            day,
            month,
            year,
            hours: `${hours}:${minutesFormatted}`
        }

        setDates(detailsDate)
    }

    useEffect(() => {
        getDay()
    }, [])

    return (
        <main className="card">
            {props.details.map((item, index) => (
                <div className="content" key={index}>
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
                            <h4>Today: {dates.hours}</h4>
                        </section>

                        <section className="section-details">
                            <figure>
                                <FiWind />
                                <figcaption>
                                    <h4>{item.wind.speed} km/h</h4>
                                    <p>Wind Speed</p>
                                </figcaption>
                            </figure>

                            <figure>
                                <FiDroplet />
                                <figcaption>
                                    <h4>{item.main.humidity} %</h4>
                                    <p>Humidity</p>
                                </figcaption>
                            </figure>

                            <figure>
                                <FiCloudLightning />
                                <figcaption>
                                    <h4>{item.main.pressure} mb</h4>
                                    <p>Air pressure</p>
                                </figcaption>
                            </figure>
                        </section>
                    </article>
                </div>
            ))}
        </main>
    )
}

export default Forecast