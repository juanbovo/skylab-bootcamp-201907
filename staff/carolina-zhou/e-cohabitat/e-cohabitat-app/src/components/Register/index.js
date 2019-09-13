import React from 'react'
import logic from '../../logic/'
import { withRouter } from 'react-router-dom'

function Register({ history }) {

    function handleSubmit(event) {
            event.preventDefault()

            const { target: { username: { value: username }, name: { value: name }, surname: { value: surname }, email: { value: email }, password: { value: password } } } = event

            handleRegister(username, name, surname, email, password)

    }

    async function handleRegister(username, name, surname, email, password) {

        try {
            await logic.registerUser(username, name, surname, email, password)

            history.push('/sign-up-success')
        } catch(error) {
            console.log(error.message)
        }

    }

    return <>
        <main className="main"> 
            <section className="register">
                <h1 className="register__title">Sign up</h1>
                <form onSubmit={ handleSubmit }>
                    <ul>
                        <li className="register__form-item">
                            <label><input className="register__form-input" type="text" name="username" placeholder="username"/></label>
                        </li>
                        <li className="register__form-item">
                            <label><input className="register__form-input" type="text" name="name" placeholder="name"/></label>
                        </li>
                        <li className="register__form-item">
                            <label><input className="register__form-input" type="text" name="surname" placeholder="surname" /></label>
                        </li>
                        <li className="register__form-item">
                            <label><input className="register__form-input" type="email" name="email" placeholder="email"/></label>
                        </li>
                        <li className="register__form-item">
                            <label><input className="register__form-input" type="password" name="password" placeholder="password"/></label>
                        </li>
                        <li className="register__form-item">
                            <label><input className="register__form-input" type="password" name="repassword" placeholder="repeat password"/></label>
                        </li>
                        <button className="register__form-button">Register</button>
                    </ul>
                </form>
                <a href={`/`} className="register__back-link"><i className="fas fa-arrow-left"></i> Go back</a>
            </section>
        </main>
    </>
}

export default withRouter(Register)