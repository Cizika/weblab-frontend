import React, { Component } from 'react';
import Routes from './routes';
// import Menu from './pages/Menu';
import api from './services/api';
import Cookies from 'universal-cookie';
import './css/Menu.css';
import './css/App.css';
import './js/Menu.js';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import https_headers from './js/https_headers.json';

class App extends React.Component<{}, { pesquisa: string }> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            pesquisa: ""
        };

        this.setPesquisa = this.setPesquisa.bind(this);
    }

    async setPesquisa() {
        const pesquisaName = this.state.pesquisa;
        var d = new Date();
        d.setHours(d.getHours() + 3)
        const cookies = new Cookies()
        cookies.set('pesquisa', pesquisaName, { path: "/", expires: d })

    }

    async logoff() {

        const cookies = new Cookies()
        var token = cookies.get('token')
        console.log(cookies.get('token'))

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        await api.get('/sair', {
            headers: myHeaders
        })
            .then(function (response) {
                if (response.data.error) {
                    swal(response.data.error)
                } else {
                    cookies.remove('token')
                    cookies.remove('id')
                    cookies.remove('email')
                    swal(response.data.message).then(function () {
                        window.location.href = '/'
                    });
                }
            })
    }
    render() {
        return (
            <div>
                {/* <Menu/> */}
                <div className="wrapper">
                    <div id="sidebar">
                        <div className="sidebar-header text-right">
                            <button className="btn no-bg d-lg-none" id="sidebarClose"> <FontAwesomeIcon icon={faTimes} color="white" /> </button>
                        </div>

                        <ul className="list-unstyled components text-center">
                            <li>
                                <a href="/">Menu Inicial</a>
                            </li>
                            <div id='menuVisitante'>
                                <li>
                                    <a href="/login">Entrar</a>
                                </li>
                                <li>
                                    <a href="/cadastro">Criar conta</a>
                                </li>
                            </div>
                            <li>
                                <a href="/cursos">Cursos disponíveis</a>
                            </li>
                            <div className='d-none' id='menuSessao'>
                                <li>
                                    <a href="/perfil">Perfil</a>
                                </li>
                                <li>
                                    <a href="/curso/criar">Criar curso</a>
                                </li>
                                <li>
                                    <a href="/notificar">Notificar erro</a>
                                </li>

                                <li>
                                    <a href="#" onClick={this.logoff}>Sair</a>
                                </li>

                            </div>

                        </ul>
                    </div>

                    <div id="content" >
                        <div className="navbar navbar-expand-lg navbar-light bg-orange">
                            <div className="container-fluid">
                                <button id="sidebarCollapse" className="navbar-toggler">
                                    <FontAwesomeIcon icon={faBars} color="white" />
                                </button>

                                {/* <a href="/" className="navbar-brand mr-auto ml-auto title-blue" id="title">WebLab</a> */}
                                <a href="/" className="navbar-brand mr-auto title-blue" id="title">WebLab</a>

                                <input className='d-none'
                                    type="search"
                                    name="pesquisa"
                                    id="inputPesquisar"
                                    placeholder="Pesquisar"
                                    onChange={e => this.setState({ pesquisa: e.target.value })}
                                />

                                <a className='d-none' id="botaoPesquisa" onClick={this.setPesquisa} href="/resultadoPesquisa">
                                    <FontAwesomeIcon icon={faSearch} id="iconPesquisa"></FontAwesomeIcon>
                                </a>
                            </div>
                        </div>
                        <Routes />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
