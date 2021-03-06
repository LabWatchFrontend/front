import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from "../../services/auth";
import '../../assets/css/login.css';
import '../../assets/css/global.css';
import logo from '../../assets/img/logowatchh.png'
import desenho from '../../assets/img/desenho.png'
import axios from "axios";




export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [erroMensagem, setErroMensagem] = useState('');

    let navigate = useNavigate();

    function efetuarLogin(event) {

        event.preventDefault();

        setErroMensagem('')
        setIsLoading(true)
        axios.post("https://localhost:5001/api/Login", {
            email: email,
            senha: senha
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    console.log(resposta)
                    localStorage.setItem('usuario-login', resposta.data.tokenGerado)

                    setSenha('')

                    setEmail('')

                    setIsLoading(false)

                    navigate('/ListaProjetos')
                }
            })
            .catch(erro => {
                console.log(erro);
                setErroMensagem("E-mail e/ou Senha inválidos")
                setIsLoading(false)
            });
    }

    function show() {
        var senha = document.getElementById("senha");
        if (senha.type === "password") {
            senha.type = "text";
        } else {
            senha.type = "password";
        }
    }

    return (
        <>
            <main className="main_login">
                <div className="ContainerMain containerL">
                    <section className="box_login">
                        <div className="box_titulo">
                            <span className="titulo-login"> Hello Again!</span>
                            <span className="subtitulo-login"> Hurry Up! The time is flying!!!</span>
                        </div>
                        <form onSubmit={efetuarLogin} className="form-login">
                            <input className="input-login"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                type="email"
                                id="login_email" />

                            <input className="input-login"
                                placeholder="Password" required
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                name="senha"
                                type="password"
                                id="senha" />
                            <button type='button' className="botao_olho" onClick={show}>
                                <span id="olho" className="iconify olho" data-icon="el:eye-open"></span>
                            </button>
                            {/* <div className="box_recovery">
                                <Link to="/" className="link_recovery ">Recovery Password</Link>
                            </div> */}
                            <div className="botao-login">
                                {

                                    isLoading === false ? (
                                        <button type='submit' className="btn-login" id="btn_login">
                                            Login
                                        </button>
                                    ) : (
                                        <button
                                            className="btn_carregando"
                                            type="submit"
                                            disabled>Carregando...</button>
                                    )
                                }
                            </div>
                        </form>
                    </section>
                    <section className="box_azul">
                        <div>
                            <img className="img_logo" src={logo} alt="Logo" />
                        </div>
                        <div className="box_desenho">
                            <img className="img_desenho" src={desenho} alt="desenho" />
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
