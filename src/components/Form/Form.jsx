import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Loader from "../Loader/Loader"

import { key } from "../../services/api"

import "./Form.css"

const Form = () => {
    const [loader, setLoader] = useState(false)

    async function handleApi(local) {
        if (local === "") {
            return toast.warning("Digite o nome de um local", {
                theme: "colored"
            })
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${key}`
        setLoader(true)

        const response = await fetch(url).then(request => request.json()).then(data => {
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

        console.log(response)
    }

    const searchCity = e => {
        e.preventDefault()
        const input = e.target[1].value
        handleApi(input)
    }

    return (
        <>
            <ToastContainer />

            <form className="form-weather" onSubmit={(e) => searchCity(e)}>
                <fieldset>
                    <input type="text" placeholder="Digite o nome da sua cidade" autoFocus={true} />
                </fieldset>
                <button type="submit">Pesquisar</button>
            </form>

            {loader && <Loader />}
        </>
    )
}

export default Form