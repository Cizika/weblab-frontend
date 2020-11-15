import React, { Component } from 'react';
import api from '../services/api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Cookies from 'universal-cookie';
import https_headers from '../js/https_headers.json';

class CriarModulo extends Component<{}, {nome: string, descricao: string, url: string}> {

    constructor(props: any) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        nome: '',
        descricao: '',
        url: ''

    }

    async handleSubmit(e: any) {
        const cookies = new Cookies();
        const cursoId = cookies.get('course_id');
        const token = cookies.get('token');

        console.log(cursoId)

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        await api.post('/modulo/inserir', {
            'name': this.state.nome,
            'description': this.state.descricao,
            'course_id': cursoId
        }, {
            headers: myHeaders
        }).then(res => {
            if(res.data.error) {
                swal(res.data.error)
            } else {
                console.log(res.data)
                const moduleId = res.data._id;

                var d = new Date()
                d.setHours(d.getHours() + 3)
                cookies.set('module_id', moduleId, { path: "/", expires: d})

                swal('Módulo cadastrado').then(function(){ 
                    window.location.href = '/conteudo/criar'
                }); 
            }
        })
    }

    render() {
        return(
            <>
    
                <div id="contentModulo" className="w-100">
                        
                        <div id="modulos" className="container-fluid">
                            <Form.Label className="mt-2" htmlFor="nomeModulo">Insira o nome do módulo: </Form.Label>
                            <Form.Control type="text" name="nomeModulo" id="nomeModuloId"
                                onChange={e => this.setState({nome: e.target.value})}></Form.Control>

                            <Form.Label className="mt-2" htmlFor="descricaoModulo">Insira a descrição do módulo: </Form.Label>
                            <Form.Control as="textarea" name="descricaoModulo" id="descricaoModuloId" cols={30} rows={10}
                            onChange={e => this.setState({descricao: e.target.value})}></Form.Control>
                            
                            <Form.Group className='text-center'>
                                <Button variant="outline-dark" type="submit" id="btnCadastro" onClick={this.handleSubmit}> Cadastrar </Button>

                                <Button variant='outline-dark' className='ml-2' onClick={() => window.location.href='/cursos'}>Finalizar curso</Button>
                            </Form.Group>
                            
                        </div>
                    </div>
            </>
        )
    }
}

export default CriarModulo;