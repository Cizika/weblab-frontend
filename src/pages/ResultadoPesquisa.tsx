import React, { Component } from 'react';
import api from '../services/api';
import '../css/ResultadoPesquisa.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import { Button, Card } from 'react-bootstrap';
import { isToken } from 'typescript';
import https_headers from '../js/https_headers.json';

interface State {
    resultado: any[],
    pesquisa: string,
    usuarios: any[],
}

class ResultadoPesquisa extends Component<{}, State> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            resultado: [],
            pesquisa: "",
            usuarios: [],
        };
        this.setSearchedUser = this.setSearchedUser.bind(this);
    }
    
    async setSearchedUser(idusuario: any) {
        const id = idusuario;
        var d = new Date();
        d.setHours(d.getHours() + 3)
        const cookies = new Cookies()
        cookies.set('idAcessoPerfil', id, { path: "/", expires: d })
    }

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        this.setState({ pesquisa: cookies.get('pesquisa') })
        const pesquisaName = cookies.get('pesquisa')

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        api.post('/pesquisa/usuarios', {
            "name": pesquisaName
        },
            {
                headers: myHeaders
            })
            .then(resp => {
                if (resp) {
                    this.setState({ usuarios: resp.data })
                }
            })

        api.post('/pesquisa/cursos', {
            "name": pesquisaName
        },
            {
                headers: myHeaders
            })
            .then(res => {
                if (res) {
                    this.setState({ resultado: res.data })
                    console.log(res.data);
                }
            })


    }

    render() {
        const { resultado: resposta } = this.state;
        console.log(this.state.pesquisa);
        // console.log(resposta);
        const { usuarios: users } = this.state;

        return (
            <>
                <h5 id="tituloResultado" className='text-center title-blue mt-2'>Resultado para "{this.state.pesquisa}"</h5>
                <div id="tituloCursos" className='text-center title-blue mt-2'>Cursos</div>
                <div className='row' id="linha" >
                    {resposta ? (
                        resposta.map(curso => (
                            <div className='col-sm-12 col-md-4 mt-2'>
                                <Card id="cardPesquisa">
                                    <Card.Img variant='top' src={curso.thumbnail_url} />
                                    <Card.Body>
                                        <Card.Title>{curso.name}</Card.Title>
                                        <Card.Text>
                                            {curso.description}
                                        </Card.Text>
                                        <Button variant="primary bg-blue" href={`/acessarCurso/${curso.id}`}>Acessar curso</Button>
                                    </Card.Body>
                                </Card>
                            </div>

                        ))
                    ) : (
                            <p>Não há cursos!</p>
                        )} </div>

                <div id="tituloUsuarios" className='text-center title-blue mt-2'>Usuários</div>
                <div className='row' id="linha" >
                    {users ? (
                        users.map(usuario => (

                            <div className='col-sm-12 col-md-4 mt-3'>
                                <Card id="cardPesquisa">
                                    <Card.Img variant='top' src={usuario.avatar_url} />
                                    <Card.Body>
                                        <Card.Title>{usuario.name} </Card.Title>
                                        <Card.Subtitle id="subtituloCard">{usuario.title}  </Card.Subtitle>
                                        <Button variant="primary bg-blue" onClick={() => this.setSearchedUser(usuario._id)} href="acessarPerfil">Acessar perfil</Button>
                                    </Card.Body>
                                </Card>
                            </div>

                        ))
                    ) : (
                            <p>Não há Usuários!</p>
                        )}
                </div>


            </>
        )
    }
};

export default ResultadoPesquisa;