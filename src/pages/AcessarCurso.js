import React, { Component } from 'react';
import api from '../services/api.js';
import Button from 'react-bootstrap/Button';
import '../css/AcessarCurso.css';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import https_headers from '../js/https_headers.json';

//dois atributos, curso (com dados do curso) e isSubscribed
class AcessarCurso extends Component {
    constructor() {
        super();
        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
        this.state = {
            inscrito: '',
            curso: ''
        }
    }

    async componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const { id } = this.props.match.params;

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        await api.get(`/curso?id=` + id, {
            headers: myHeaders
        })

            .then(res => {
                if (res) {
                    this.setState({ inscrito: res.data.isSubscribed })
                    this.setState({ curso: res.data.curso });
                }
            })
    }

    async handleSubscribe(e) {
        e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('token');
        const { id } = this.props.match.params;

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        await api.get('/curso/inscrever?course=' + id, {
            headers: myHeaders
        })
            .then(res => {
                if (res.data.error) {
                    swal(res.data.error)
                } else {
                    // swal("Inscrição realizada!")
                    // window.location.href = "/cursos"
                    // document.location.reload();
                    this.setState({ inscrito: true });
                }
            })

        const conquistaID = "5f7d0f3b9e49a1228c65a58b"

        var myHeaders2 = {
            'authorization': 'Bearer ' + token,
            'Content-type': 'application/json'
        }

        Object.assign(myHeaders2, https_headers)

        //conquista Buscando Conhecimento
        await api.post('/desbloquear', {
            "id": conquistaID
        },
            {
                headers: myHeaders2
            })

            .then(res => {
                if (res.data.error) {
                    console.log(res.data.error)
                } else {
                    swal("Parabéns!", "Você desbloqueou a conquista '" + res.data.achievement.name + "'!\n" + res.data.achievement.description)
                }
            })

            .catch(error => {
                console.log(error.response.data.error);
            });
    }

    async handleUnsubscribe(e) {
        e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('token');
        const { id } = this.props.match.params;

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        await api.get('/curso/inscrever?course=' + id, {
            headers: myHeaders
        })
            .then(res => {
                if (res.data.error) {
                    swal(res.data.error)
                } else {
                    // swal("Inscrição cancelada!")
                    // window.location.href = "/cursos"
                    // document.location.reload();
                    this.setState({ inscrito: false });
                }
            })
    }

    render() {
        const { curso } = this.state;
        const { inscrito } = this.state;
        const cookies = new Cookies();
        var token = cookies.get('token');
        let button;
        let buttonAcessar;
        const isSubscribed = inscrito;

        if (isSubscribed) {
            button = <Button variant="primary bg-blue" onClick={this.handleUnsubscribe}>Cancelar inscrição</Button>;
            buttonAcessar = <Button variant="primary bg-blue" onClick={() => window.location.href = `/curso/${curso.id}`}>Acessar Curso</Button>
        } else {
            button = <Button variant="primary bg-blue" onClick={this.handleSubscribe}>Inscrever-se</Button>;
        }

        if (token) {
            return (
                <div className="conteudo">
                    <h2 className="tituloCurso">{curso.name}</h2>

                    <div className="containerCurso">

                        {/* <img className="imgCurso" src={"http://localhost:3333/files/" + curso.thumbnail} alt="Thumbnail"></img> */}
                        <img className="imgCurso" src={curso.thumbnail_url} alt="Thumbnail"></img>

                        <div className="descricaoCurso">
                            {curso.description}

                            <br /><br />
                            <div className='text-center'>
                                {button}
                                {buttonAcessar}
                            </div>
                        </div>

                    </div>
                </div>

            )
        } else {
            swal("Faça login para acessar o curso").then(function(){ 
                window.location.href = "/login";
            });
            return false;
        }
    }
}

export default AcessarCurso;
