import React, { Component, useState } from 'react';
import api from '../services/api.js';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import '../css/MenuCursos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
// import swal from 'sweetalert';
import https_headers from '../js/https_headers.json';
import Swal from 'sweetalert2';
import Trofeu from '../img/trofeu.png'

interface State {
    response: any[],
    categorias: any[],
    selectedCategory: string
}

class MenuCursos extends Component<{}, State> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            response: [],
            categorias: [],
            selectedCategory: ''
        };
    }

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        api.get('/cursos', {
            headers: myHeaders
        })
            .then(res => {
                if (res) {
                    this.setState({ response: res.data })
                }
            })

        this.loadCategorias();

        var myHeaders2 = {
            'authorization': 'Bearer ' + token,
            'Content-type': 'application/json'
        }

        Object.assign(myHeaders2, https_headers)

        //conquista Compartilhando Conhecimento
        api.post('/desbloquear', {
            "id": "5f7d102d9e49a1228c65a58f"
        },
            {
                headers: myHeaders2
            })

            .then(res => {
                if (res.data.error) {
                    console.log(res.data.error)
                } else {
                    // swal("Parabéns!", "Você desbloqueou a conquista '" + res.data.achievement.name + "'!\n" + res.data.achievement.description)
                    Swal.fire({
                        title: 'Conquista desbloqueada!',
                        html: "Parabéns! Você desbloqueou a conquista '" + res.data.achievement.name + "'!\n<br>" + res.data.achievement.description,
                        imageUrl: Trofeu,
                        imageAlt: 'Troféu',
                    })
                }
            })

            .catch(error => {
                console.log(error.response.data.error);
            });

        //conquista Criou 3 cursos
        api.post('/desbloquear', {
            "id": "5f7d106d9e49a1228c65a590"
        },
            {
                headers: myHeaders2
            })

            .then(res => {
                if (res.data.error) {
                    console.log(res.data.error)
                } else {
                    // swal("Parabéns!", "Você desbloqueou a conquista '" + res.data.achievement.name + "'!\n" + res.data.achievement.description)
                    Swal.fire({
                        title: 'Conquista desbloqueada!',
                        html: "Parabéns! Você desbloqueou a conquista '" + res.data.achievement.name + "'!\n<br>" + res.data.achievement.description,
                        imageUrl: Trofeu,
                        imageAlt: 'Troféu',
                    })
                }
            })

            .catch(error => {
                console.log(error.response.data.error);
            });
    }

    exibirCursos = (response: any) => {
        var elements: any = [];

        for (let i = 0; i < response.length; i++) {
            elements.push(
                <div className='col-sm-12 col-md-6 col-lg-4 mt-2' key={response[i].id}>
                    <Card id="cardCursos">
                        <Card.Img variant='top' src={response[i].thumbnail_url} />
                        <Card.Body>
                            <Card.Title>{response[i].name}</Card.Title>
                            <Card.Text>
                                {response[i].description}
                            </Card.Text>
                            <Button variant="primary bg-blue" href={`/acessarCurso/${response[i].id}`}>Acessar curso</Button>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        return elements;
    }

    async loadCategorias() {
        const cookies = new Cookies();
        const token = cookies.get('token');

        var myHeaders3 = {
            'authorization': `Bearer ${token}`
        }

        Object.assign(myHeaders3, https_headers)

        await api.get('/categorias', {
            headers: myHeaders3
        }).then(res => {
            if (res) {
                this.setState({ categorias: res.data })
            }
        })

        console.log(this.state.categorias)
    }

    handleCategorias(categoria: string) {

        const cookies = new Cookies();
        const token = cookies.get('token');

        var cursos: any = [];
        var elements: any = [];

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        if (categoria !== '') {
            api.get(`/curso/categoria?id=${categoria}`, {
                headers: myHeaders
            })
                .then(res => {
                    if (res) {
                        this.handleCursos(res.data)
                    }
                })

            this.exibirCursos(this.state.response)
        } else {
            api.get('/cursos', {
                headers: myHeaders
            })
                .then(res => {
                    if (res) {
                        this.setState({ response: res.data })
                    }
                })
        }
    }

    handleCursos(cursos: any) {
        let cursosTemp = []
        for (let curso of cursos) {
            cursosTemp.push(curso)
        }

        this.setState({ response: cursosTemp })
    }

    render() {
        const { response } = this.state;

        return (
            <>
                <h5 className='text-center title-blue mt-2'>Cursos disponíveis</h5>
                <label htmlFor="categorias">Categorias: </label>
                <select name="categorias" id="categoriasId"
                    onChange={e => this.handleCategorias(e.target.value)}>
                    <option value="">Todas</option>
                    {this.state.categorias.map((categoria: any) => {
                        return (
                            <option value={categoria._id}>{categoria.name}</option>
                        )
                    })}
                </select>

                <div className='row' id='cursosDiv'>
                    {this.exibirCursos(response)}
                </div>
            </>
        )
    }
};

export default MenuCursos;