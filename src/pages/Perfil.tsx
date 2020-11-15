import React, { Component } from 'react';
import api from '../services/api';
import '../css/Perfil.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import CursosInscritos from './CursosInscritos';
import CursosCriados from './CursosCriados';
import https_headers from '../js/https_headers.json';

interface State {
    name: any,
    avatar_url: any,
    achievementsIDs: any[],
    title: any,
    conquistasDesbloqueadas: any[]
}

class Perfil extends Component<{}, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            avatar_url: '',
            achievementsIDs: [],
            conquistasDesbloqueadas: [],
            title: ''
            // cursos: []
        }
    }

    componentDidMount() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        var titulos: string[] = [];

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        api.get('/perfil', {
            headers: myHeaders
        }).then(res => {
            if (res) {
                this.setState({ name: res.data.name })
                this.setState({ avatar_url: res.data.avatar_url })
                this.setState({ achievementsIDs: res.data.achievements })
                this.setState({ title: res.data.title })
            }

            for (var i = this.state.achievementsIDs.length; i >= 0; i--) {
                var idConquista = this.state.achievementsIDs[i];

                console.log(titulos)
                api.post('/conquista', {
                    "id": idConquista
                },
                    {
                        headers: myHeaders
                    }).then(response => {
                        titulos.push(response.data);
                        this.setState({ conquistasDesbloqueadas: titulos })

                    })
            }
            this.setState({ conquistasDesbloqueadas: titulos })
            console.log(this.state.conquistasDesbloqueadas)
        })

    }
    async mudarTitulo(conquistaID: string) {
        const cookies = new Cookies()
        const token = cookies.get('token')

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        api.post('/perfil/titulo', {
            "achievement_id": conquistaID
        },
            {
                headers: myHeaders
            }).then(response => {
                if (response) {
                    this.setState({ title: response.data.title })

                }
            })
    }
    render() {

        return (
            <>
                <div id='content'>
                    <div className="container-fluid">

                        <div className='row'>

                            <div className='col-sm-12 text-center mt-2'>
                                <div id='imgPerfil' className='mr-auto ml-auto'>
                                    <img src={this.state.avatar_url} alt="avatar usuario" className='img-fluid rounded-circle' />
                                </div>
                                <h5 className='text-blue mt-1' id="nome">{this.state.name} {this.state.title} </h5>
                                <span className='text-blue mt-1' id="tituloSelect"> Escolha um título: </span>
                                <select id="selectUserTitle" onChange={e => this.mudarTitulo(e.target.value)} >
                                    <option id="optionSelect" value="0"></option>
                                    {this.state.conquistasDesbloqueadas.map((conquista: any) => {
                                        return (
                                            <option id="optionSelect" value={conquista._id}>{conquista.title}</option>
                                        )
                                    })}
                                </select>

                            </div>
                            <div className='col-sm-12 text-center mt-2'>

                                <a className="botaoPerfil" id="botaoAlt" href="/alterarPerfil">
                                    Alterar
                               </a>
                                <a className="botaoPerfil" href="/excluirConta">
                                    Excluir
                               </a>
                            </div>


                            <div className='col-sm-12 mt-3 text-center'>
                                <h5 className='text-blue' id="secao1perfil">Meus cursos</h5>
                                <CursosInscritos />
                                <h5 className='text-blue' id="secao2perfil">Cursos cadastrados</h5>
                                <CursosCriados />
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default Perfil;