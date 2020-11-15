import React from 'react';
import api from '../services/api';
import Cookies from 'universal-cookie';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AlterarConta.css';
import https_headers from '../js/https_headers.json';

class ExcluirConta extends React.Component<{}, { email: string, password: string }>{
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };

        this.deletarConta = this.deletarConta.bind(this);
    }

    async deletarConta(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const cookies = new Cookies();
        var token = cookies.get('token');
        const password = this.state.password;
        const email = this.state.email;

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        await api.post('/perfil/remover',
            {
                "email": email,
                "password": password
            },
            {
                headers: {
                    'authorization': token
                }
            }
        )
            .then(function (response) {
                if (response.data.error) {
                    swal(response.data.error)
                } else {
                    cookies.remove('token')
                    cookies.remove('id')
                    swal("Conta excluida com sucesso!").then(function () {
                        window.location.href = "/"
                    });
                }
            })
    }
    render() {
        const cookies = new Cookies();
        var token = cookies.get('token')

        if (token) {
            return (
                <>
                    <div className="content">
                        <div className="container" id="box2">
                            <h5 id="h51" className="text-blue text-center">Excluir conta</h5>
                            <h2 id="h21" className="text-blue text-center">Deseja mesmo excluir sua conta?</h2>
                            <h2 id="h21" className="text-blue text-center">Confirme seus dados</h2>
                            <form>
                                <fieldset>
                                    <label>Email: </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="inputEmailExcluir"
                                        placeholder="Digite seu email"
                                        onChange={e => this.setState({ email: e.target.value })} />
                                </fieldset>
                                <label>Senha: </label>
                                <input
                                    type="password"
                                    name="senha"
                                    id="inputSenhaExcluir"
                                    placeholder="Digite sua senha"
                                    onChange={e => this.setState({ password: e.target.value })} />

                                <button id="botaoForm" type="submit" onClick={this.deletarConta}>Excluir</button>

                            </form>
                        </div>
                    </div>
                </>
            );
        } else {
            swal("Acesso negado.").then(function () {
                window.location.href = "/"
            });
        }
    };
};

export default ExcluirConta;