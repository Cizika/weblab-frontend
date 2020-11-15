import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button'
import $ from 'jquery';
import AcessarExercicio from './AcessarExercicio';
import AcessarConteudo from './AcessarConteudo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import https_headers from '../js/https_headers.json';

interface ModuleRouteParams {
    id: string
}

function AcessarModulo() {

    const conteudosId: any = [];
    const exerciciosId: any = [];
    const [items, setItems] = useState<any>([]);
    const [modulo, setModulo] = useState<any>({});

    const cookies = new Cookies();
    const token = cookies.get('token');
    const {id} = useParams<ModuleRouteParams>()
    
    var myHeaders = {
        'authorization': 'Bearer ' + token              
    }
    
    Object.assign(myHeaders, https_headers)
    
    useEffect(() => {

        async function loadModule() {
            await api.post('/modulo/', {
                    'id': id
                }, {
                    headers: myHeaders
                }).then(res => {
                    if(res.data.error) {
                        swal(res.data.error)
                    } else {
                        setModulo(res.data)
                        setItems(res.data.items)
                    }
                })
        }

        loadModule();
    }, [])

    function loadContent() {
        for(let item of items) {
            if(item.type == 'Content') {
                conteudosId.push(item)
            } else {
                exerciciosId.push(item)
            }
        }
    }

    loadContent();

    return (
        <>
            <div className='container-fluid'>
                <div className='jumbotron mt-2' style={{backgroundColor: '#d2d2d2', width: '100%'}}>
                    <h1 className='text-center text-blue'>{modulo.name}</h1>
                </div>

                <div id='divConteudo'>
                    <AcessarConteudo array={conteudosId}/>

                    <div className='text-right mt-3'>
                        <Button variant='outline-dark' onClick={() => {
                            $('#divConteudo').addClass('d-none')
                            $('#divExercicio').removeClass('d-none')
                        }
                        }> Ir para exercícios </Button>
                    </div>
                </div>

                <div className='d-none' id='divExercicio'>
                    <AcessarExercicio array={exerciciosId}/>
                </div>
            </div>
        </>
    )
};

export default AcessarModulo;

