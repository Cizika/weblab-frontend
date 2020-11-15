import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button'
import $ from 'jquery';
import AcessarExercicio from './AcessarExercicio';
import AcessarConteudo from './AcessarConteudo';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import swal from 'sweetalert';
import https_headers from '../js/https_headers.json';

interface ModuleRouteParams {
    id: string
}

function VisualizarCurso() {

    const cookies = new Cookies();
    const token = cookies.get('token');
    const [curso, setCurso] = useState<any>([]);
    const [modulos, setModulo] = useState<any>([]);
    const { id } = useParams<ModuleRouteParams>()

    var myHeaders = {
        'authorization': 'Bearer ' + token
    }

    Object.assign(myHeaders, https_headers)

    useEffect(() => {
        async function loadCurso() {
            await api.get(`/curso?id=${id}`, {
                headers: myHeaders
            }).then(res => {
                if (res.data.error) {
                    console.log(res.data.error)
                } else {
                    setCurso(res.data.curso)
                    setModulo(res.data.curso.modules)
                }
            })
        }
        loadCurso();

        var myHeaders2 = {
            'authorization': 'Bearer ' + token,
            'Content-type': 'application/json'
        }

        Object.assign(myHeaders2, https_headers)

        //conquista Primeiro Módulo concluído
        const conquistaID = "5f7d0f649e49a1228c65a58c"
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

        //conquista Primeiro Curso finalizado
        api.post('/desbloquear', {
            "id": "5f7d0f899e49a1228c65a58d"
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

        //conquista Sede por Conhecimento
        api.post('/desbloquear', {
            "id": "5f7d0fec9e49a1228c65a58e"
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

        //conquista Variedade de Conhecimentos 
        api.post('/desbloquear', {
            "id": "5f7d10a39e49a1228c65a591"
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

        //conquista Expert do Assunto 
        api.post('/desbloquear', {
            "id": "5f7d10ea9e49a1228c65a592"
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

        //conquista Formado no Assunto 
        api.post('/desbloquear', {
            "id": "5f7d111a9e49a1228c65a593"
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
    }, [])



    const exibirModulos = () => {
        var d = new Date()
        d.setHours(d.getHours() + 3)
        cookies.set('id_course', curso.id, { path: "/", expires: d })

        var elements: any = []
        for (let i = 0; i < modulos.length; i++) {
            console.log(modulos[i])
            elements.push(
                <div className='mb-2 text-center' key={modulos[i]}>
                    {/* <Card.Body className='text-center'> */}
                    <p className='text-blue' style={{ fontSize: '30px', fontWeight: 'bold' }}>Seção {i + 1}</p>
                    <Button variant='primary bg-blue'
                        style={{ width: '100px', borderRadius: '100px', height: '100px', backgroundColor: '#d2d2d2' }}
                        onClick={() => window.location.href = `/modulo/conteudo/${modulos[i]}`}>
                        <FontAwesomeIcon icon={faBookReader}></FontAwesomeIcon>
                    </Button>
                    {/* </Card.Body> */}
                </div>
            )
        }
        return elements;
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='jumbotron mt-2 mb-3' style={{ backgroundColor: '#d2d2d2', width: '100%' }}>
                    <h1 className='text-center text-blue'>{curso.name}</h1>
                </div>

                {exibirModulos()}
            </div>
        </>
    )
}

export default VisualizarCurso;