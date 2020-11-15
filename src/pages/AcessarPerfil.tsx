import React, { Component } from 'react';
import api from '../services/api';
import '../css/Perfil.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import CursosCadastrados from './CursosInscritos';
import CursosInscritos from './CursosInscritos';
import ResultadoPesquisa from './ResultadoPesquisa';
import CursosAcessarPerfil from './CursosAcessarPerfil';
import CursosCriadosAcessarPerfil from './CursosCriadosAcessarPerfil';
import https_headers from '../js/https_headers.json';

interface AppState {
    name: any,
    avatar_url: any,
    title: any

}

class AcessarPerfil extends Component<{}, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            avatar_url: '',
            title: ''

            // cursos: []
        }
    }

    componentDidMount() {

        const cookies = new Cookies()
        const token = cookies.get('token');
        const id = cookies.get('idAcessoPerfil');

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        api.get('/perfil/usuario?id=' + id, {
            headers: myHeaders
        }).then(res => {
            if (res) {
                console.log(res.data)
                this.setState({ title: res.data.title })
                this.setState({ name: res.data.name })
                this.setState({ avatar_url: res.data.avatar_url })
                // this.setState({cursos: res.data.courses})
            }
        })
    }

    render() {
        console.log(this.state)
        return (
            <>
                <div id='content'>
                    <div className="container-fluid">
                        <div className='row'>
                            <div className='col-sm-12 text-center mt-2'>
                                <div id='imgPerfil' className='mr-auto ml-auto'>
                                    <img src={this.state.avatar_url} alt="avatar usuario" className='img-fluid rounded-circle' />
                                </div>

                                <h5 className='text-blue mt-1' id="nome">{this.state.name} {this.state.title}</h5>
                            </div>

                            <div className='col-sm-12 mt-3 text-center'>
                                <h5 className='text-blue' id="secao1AccPerfil">Meus cursos</h5>
                                <CursosAcessarPerfil />
                                <h5 className='text-blue' id="secao2perfil">Cursos cadastrados</h5>
                                <CursosCriadosAcessarPerfil />

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default AcessarPerfil;