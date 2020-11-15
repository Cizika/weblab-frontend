import React, { Component } from 'react';
import api from '../services/api';
import Cookies from 'universal-cookie';
import Foto1 from '../img/aprendizagem-online.png'
import Foto2 from '../img/educacao-global.png'
import Foto3 from '../img/certificado-online.png'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Inicial.css';
import '../js/Menu.js';
import swal from 'sweetalert';
import https_headers from '../js/https_headers.json';

class Inicial extends Component<{}, { name: string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        api.get('/perfil', {
            headers: myHeaders
        }).then(res => {
            if (res) {
                console.log(res.data)
                this.setState({ name: res.data.name })
                // this.setState({cursos: res.data.courses})
            }
        })


        var myHeaders2 = {
            'authorization': 'Bearer ' + token,
            'Content-type': 'application/json'
        }

        Object.assign(myHeaders2, https_headers)

        const conquistaID = "5f7d0ef39e49a1228c65a58a"

        //conquista Cadastro na Plataforma
        api.post('/desbloquear', {
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

    render() {
        return (
            <>
                <div className='content'>
                    <section id='section1' className='container-fluid title-blue text-center p-2'>
                        <div>
                            <p id='bemvindoUser' className='d-none'>Bem vindo(a), {this.state.name}!</p>
                            <p>Web Lab é uma plataforma inteiramente gratuita de cursos que lhe permite lecionar e aprender tudo aquilo que você ama de forma
                                inteligente e conectada, descartando métodos tradicionais em prol da inovação.</p>
                        </div>
                        <div className='img-div'>
                            <img src={Foto1} className='img-fluid m-0' />
                        </div>
                    </section>

                    <section id='section2' className='container-fluid title-blue text-center p-2'>
                        <div className='img-div'>
                            <img src={Foto2} className='img-fluid' />
                        </div>
                        <div>
                            <p>Junte-se a essa ideia e ajude a construir nossa comunidade de compartilhamento e enriquecimento educacional mútuo.</p>
                            <Button className='bg-blue text-white' href='/cursos'>Saiba mais</Button>
                        </div>
                    </section>

                    <section id='section3' className='container-fluid title-blue text-center p-2'>
                        <div>
                            <p>Faça uso de nossas ferramentas com sabedoria: disponibilize conteúdos ou curse o que você desejar e conquiste títulos colecionáveis.</p>
                            <Button className='bg-blue text-white d-none' id='btnCurso' onClick={e => (window.location.href = '/curso/criar')}>Criar curso</Button>
                        </div>
                        <div className='img-div'>
                            <img src={Foto3} className='img-fluid mt-2' />
                        </div>
                    </section>
                </div>
            </>
        )
    }
};

export default Inicial;