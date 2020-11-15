import React from 'react';
import api from '../services/api';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
import https_headers from '../js/https_headers.json';

class Login extends React.Component<{}, { email: string, senha: string }>{
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            email: "",
            senha: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const email = this.state.email;
        const senha = this.state.senha;

        await api.post('/entrar', {
            "email": email,
            "password": senha
        },
            {
                headers: https_headers
            }
        )
            .then(function (response) {
                if (response.data.error) {
                    swal(response.data.error)
                }
                else {
                    let token = response.data.token
                    let id = response.data.user._id
                    var d = new Date()
                    d.setHours(d.getHours() + 3)

                    const cookies = new Cookies()
                    cookies.set('token', token, { path: "/", expires: d })
                    cookies.set('id', id, { path: '/', expires: d })
                    cookies.set('email', email, { path: '/', expires: d })

                    console.log(cookies.get('token'))
                    window.location.href = "/"
                }
            })
    }
    render() {
        return (
            <>
                <div className="content">
                    <div className="container" id="box2">
                        <h5 id="h51" className="text-blue text-center">Login</h5>
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <label>Email: </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="inputEmailLogin"
                                    placeholder="Digite seu email"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </fieldset>
                            <label>Senha: </label>
                            <input
                                type="password"
                                name="senha"
                                id="inputSenhaLogin"
                                placeholder="Digite sua senha"
                                onChange={e => this.setState({ senha: e.target.value })} />

                            <button id="botaoForm" type="submit" onClick={this.handleSubmit}>Entrar</button>

                        </form>
                    </div>
                </div>
            </>
        );
    };
};

export default Login;