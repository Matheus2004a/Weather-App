import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { FiSearch } from "react-icons/fi"
import Loader from "../Loader/Loader"
import Forecast from "../Forecast/Forecast"
import { BASE_URL, BASE_URL_DAY, KEY, UNIT_TEMPERATURE, LANG } from "../../services/api"

import "./Form.css"

const Form = () => {
    const [loader, setLoader] = useState(false)
    const [forecast, setForecast] = useState(false)
    const [location, setLocation] = useState("")
    const [data, setData] = useState([])
    const [days, setDays] = useState([])

    const getDataForAWeek = async () => {
        const api = `${BASE_URL_DAY}q=${location}&cnt=${7}&${UNIT_TEMPERATURE}&${LANG}&appid=${KEY}`

        const response = await fetch(api).then(request => request.json()).then(data => {
            return data
        }).catch(error => {
            return error
        })

        setDays([response])
    }

    const handleApi = async () => {
        if (location === "") {
            return toast.warning("Digite o nome de um local", {
                theme: "colored"
            })
        }

        const api = `${BASE_URL}q=${location}&${UNIT_TEMPERATURE}&${LANG}&appid=${KEY}`

        setLoader(true)

        const response = await fetch(api).then(request => request.json()).then(data => {
            setLocation("")
            return data
        }).catch(error => {
            return error
        })

        setLoader(false)

        if (response.cod === "404") {
            return toast.error(response.message = "Local não encontrado", {
                theme: "colored"
            })
        }

        setForecast(true)
        setData([response])
        
        getDataForAWeek()
    }

    const searchLocation = e => {
        e.preventDefault()
        handleApi()
    }

    return (
        <>
            <ToastContainer />

            <form className="form-weather" onSubmit={e => searchLocation(e)}>
                <fieldset>
                    <input
                        aria-label="location"
                        type="text"
                        placeholder="Digite o nome da sua cidade"
                        autoFocus={true}
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                    <FiSearch />
                </fieldset>
                <button type="submit" hidden></button>
            </form>

            {loader && <Loader />}

            {forecast && <Forecast details={data} daysTemp={days} />}
        </>
    )
}

export default Form