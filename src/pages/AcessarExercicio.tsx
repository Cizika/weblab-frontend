import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import '../css/AcessarExercicio.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import https_headers from '../js/https_headers.json';

interface ModuleRouteParams {
    id: string
}

function AcessarExercicio(props: { array: any; }) {
    const [exercicios, setExercicios] = useState<any>([]);
    var acertos = 0;

    const { id } = useParams<ModuleRouteParams>()
    const cookies = new Cookies();
    const token = cookies.get('token');
    
    useEffect(() => {
        async function loadConteudos() {
            const exerciciosTemp: any = [];

            var myHeaders = {
                'authorization': 'Bearer ' + token              
            }
        
            Object.assign(myHeaders, https_headers)

            for (let i = 0; i < props.array.length; i++) {
                await api.post('/exercicio/', {
                    'id': `${props.array[i].item}`
                }, {
                    headers: myHeaders
                }).then(res => {
                    if (res.data.error) {
                        swal(res.data.error)
                    } else {
                        exerciciosTemp.push(res.data)
                    }
                })
            }

            setExercicios(exerciciosTemp);
        }

        loadConteudos();
    }, [props.array])

    const checkAnswer = (id: string, indice: number) => {
        let isCorrect = false;
        let counterJ = 0;

        for (let j = 0; j < exercicios[indice].answers.length; j++) {
            if (exercicios[indice].answers[j].replace(/\s/g, "").toLowerCase() == id) {
                counterJ = j;
            }
        }

        if (exercicios[indice].correct_answer === counterJ) {
            isCorrect = true;
        }

        if (isCorrect) {
            $(`#${id}`).css('background-color', '#87ff8f')
            acertos += 1;
        } else {
            $(`#${id}`).css('background-color', '#ff6e6e')
        }
    }

    async function completeModule() {
        console.log(id)
        const course_id = cookies.get('id_course')

        var myHeaders2 = {
            'authorization': `Bearer ${token}`             
        }
        
        Object.assign(myHeaders2, https_headers)
        
        await api.get(`/modulo/completar?module=${id}`, {
            headers: myHeaders2
        }).then(res => {
            if (res.data.error) {
                swal(res.data.error).then(function(){ 
                    window.location.href = `/curso/${course_id}`
                });
            } else {
                swal('Módulo completo!').then(function(){ 
                    window.location.href=`/curso/${course_id}`
                });
            }
        })
    }

    const exibirExercicios = () => {
        var tests = [];
        for (let i = 0; i < exercicios.length; i++) {
            tests.push(
                <div className='exercicio mb-4'>
                    <p style={{fontSize:"25px"}}>{exercicios[i].question}</p>

                        {exercicios[i].answers.length > 0 ? (
                            exercicios[i].answers.map((answer: any) => (
                                <>
                                <Button variant='light' className='alternativa' id={answer.replace(/\s/g, "").toLowerCase()} onClick={() => checkAnswer(answer.replace(/\s/g, "").toLowerCase(), i)}> {answer} <FontAwesomeIcon icon={faCheckCircle}/> </Button>
                                <br/>    
                                </> 
                            ))
                        ) : (
                            <>
                            </>
                        )}
                </div>
            )
        }

        tests.push(
            <div className='text-center mb-3'>
                {/* Adicionar caminho do curso */}
                <Button variant='outline-dark' onClick={() => completeModule()}>Finalizar módulo</Button>
            </div>
        )
        return tests;
    }

    return (
        <>
            <p className='text-center text-blue' style={{ fontSize: '30px', fontWeight: 'bold' }}>Exercícios</p>
            {exibirExercicios()}
        </>
    )
}

export default AcessarExercicio;