import React, { Component, useState } from 'react';
import api from '../services/api.js';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import '../css/MenuCursos.css';
import '../pages/MenuCursos.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import https_headers from '../js/https_headers.json';

interface State {
    response: any[]
}

class CursosCriados extends Component<{}, State> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            response: []
        };
    }

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
       
        var myHeaders = {
            'authorization': 'Bearer ' + token              
        }
        
        Object.assign(myHeaders, https_headers)

        api.get('/curso/cadastrados', {
            headers: {
                'authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                if (res) {
                   
                    this.setState({ response: res.data })
                    console.log(res.data)
                }
            })

    }

    render() {
        const { response } = this.state;
        console.log(response);
        const categories: string[] = [];

        for (let i = 0; i < response.length; i++) {
            // console.log(response[i]);
            if (categories.indexOf(response[i].category) != -1) {
                continue;
            } else {
                categories.push(response[i].category)
            }
        }

        return (
            <>
                <div className='row'>
                    {response ? (
                        response.map(curso => (
                                <div className='col-sm-12 col-md-4 mt-2'>
                                <Card id="cardCursos">
                                    <Card.Img variant='top' src={"http://localhost:3333/files/" + curso.thumbnail} />
                                    <Card.Body>
                                        <Card.Title>{curso.name}</Card.Title>
                                        <Card.Text>
                                            {curso.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Body>
                                        <Button variant="primary bg-blue"  className='mt-2' onClick={() => window.location.href=`/curso/${curso.id}`}>Acessar curso</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    ) : (<p>Não há cursos cadastrados!</p>)}
                </div>
            </>
        )
    }
};

export default CursosCriados;