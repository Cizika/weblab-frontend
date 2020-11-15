import React, {Component, useState} from 'react';
import $ from 'jquery';
import api from '../services/api';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Cookies from 'universal-cookie';
import { Button, Col, Row } from 'react-bootstrap';
import https_headers from '../js/https_headers.json';

interface State {
    question: string,
    correctAnswer: string
}

class CriarExercicio extends Component<{}, State>  {

    constructor(props: any) {
        super(props);
        this.state = {
            question: '',
            correctAnswer: ''
        };
    }

    async handleAnswer() {
        let answer1 = $('#alt1').val();
        let answer2 = $('#alt2').val();
        let answer3 = $('#alt3').val();
        let answer4 = $('#alt4').val();

        let answers = [answer1, answer2, answer3, answer4];
        
        const cookies = new Cookies();
        const moduloId = cookies.get('module_id');
        const token = cookies.get('token');

        var myHeaders = {
            'authorization': 'Bearer ' + token              
        }
        
        Object.assign(myHeaders, https_headers)
        
        await api.post('/exercicio/inserir', {
            'question': this.state.question,
            'answers': answers,
            'correct_answer': this.state.correctAnswer,
            'module_id': moduloId
        }, {
            headers: myHeaders
        }).then(res => {
            if(res.data.error) {
                swal(res.data.error)
            } else {
                swal('Exercício cadastrado').then(function(){ 
                    window.location.reload()
                });
            }
        })
    }

    handleCorrectAnswer = (value: string) => {
        this.setState({correctAnswer: value})
    }

    render() {
        return (
            <>
                <div className='container-fluid'>
                    <Form className='mt-2'>
                        <Form.Label>Insira o enunciado da questão: </Form.Label>
                        <Form.Control as='textarea' cols={30} rows={10} placeholder='Enunciado'
                        onChange={e => this.setState({question: e.target.value})}></Form.Control>
    
                        <Form.Group>
                            <h5 className='text-center mt-1'>Alternativas</h5>
    
                            <Form.Group as={Row}>
                                <Col sm={1}>
                                    <Form.Check type='checkbox' value='0'
                                    onClick = {() => this.handleCorrectAnswer('0')}></Form.Check>
                                </Col>
    
                                <Col sm={11}>
                                    <Form.Control as='textarea' placeholder='Insira o texto da alternativa 1' id='alt1' cols={30} rows={3}
                                    
                                   ></Form.Control>
                                </Col>
                            </Form.Group>
    
                            <Form.Group as={Row}>
                                <Col sm={1}>
                                    <Form.Check type='checkbox' value='1'
                                    onClick = {() => this.handleCorrectAnswer('1')}></Form.Check>
                                </Col>
    
                                <Col sm={11}>
                                    <Form.Control as='textarea' placeholder='Insira o texto da alternativa 2' id='alt2' cols={30} rows={3}
                                   ></Form.Control>
                                </Col>
                            </Form.Group>
    
                            <Form.Group as={Row}>
                                <Col sm={1}>
                                    <Form.Check type='checkbox' value='2'
                                    onClick = {() => this.handleCorrectAnswer('2')}></Form.Check>
                                </Col>
    
                                <Col sm={11}>
                                    <Form.Control as='textarea' placeholder='Insira o texto da alternativa 3' id='alt3' cols={30} rows={3}
                                   ></Form.Control>
                                </Col>
                            </Form.Group>
    
                            <Form.Group as={Row}>
                                <Col sm={1}>
                                    <Form.Check type='checkbox' value='3'
                                    onClick = {() => this.handleCorrectAnswer('3')}></Form.Check>
                                </Col>
    
                                <Col sm={11}>
                                    <Form.Control as='textarea' placeholder='Insira o texto da alternativa 4' id='alt4' cols={30} rows={3}
                                    ></Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group className='text-center'>
                                <Button variant='outline-dark' className='mb-2' onClick={() => this.handleAnswer()}>Cadastrar</Button>

                                <Button variant='outline-dark' className='ml-2' onClick={() => window.location.href='/modulo/criar'}>Finalizar módulo</Button>
                            </Form.Group>
                        </Form.Group>
                    </Form>
                </div>
            </>
        )
    }
    
}

export default CriarExercicio