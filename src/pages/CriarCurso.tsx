import React, { useState, useMemo, useEffect } from 'react';
import api from '../services/api';
import Cookies from 'universal-cookie';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';
import '../css/Criarcurso.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faChevronRight, faCamera } from '@fortawesome/free-solid-svg-icons';
import https_headers from '../js/https_headers.json';

function CriarCurso() {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState<any | null>(null);
    const [categories, setCategories] = useState<any | null>([]);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('token');

        console.log(category)

        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('name', name);
        data.append('description', description);
        data.append('category', category);
    
        var myHeaders = {
            'authorization': 'Bearer ' + token,
            'Content-type': 'multipart/form-data'
        }
        
        Object.assign(myHeaders, https_headers)
                
        await api.post('/curso/criar', data,
        {
            headers: myHeaders
        }
        )
            .then(function (response) {
                if(response.data.error) {
                    swal(response.data.error)
                }
                else {
                    console.log(response.data);

                    const cursoId = response.data.course._id;
                    var d = new Date()
                    d.setHours(d.getHours() + 3)
                    cookies.set('course_id', cursoId, { path: "/", expires: d})

                    swal('Curso cadastrado com sucesso!').then(function(){ 
                        window.location.href = "/modulo/criar"
                    });
                }
            })

    }

    useEffect(() => {
        async function loadCategorias() {
            const cookies = new Cookies();
            const token = cookies.get('token');
    
            var myHeaders2 = {
                'authorization': `Bearer ${token}`
            }
            
            Object.assign(myHeaders2, https_headers)
            
            await api.get('/categorias', {
                headers: myHeaders2
            }).then(res => {
                if(res) {
                    setCategories(res.data)
                } 
            })
    
            console.log(categories)
        }
    
        loadCategorias();
    }, [])


        return (
            <>
            <div id="contentCurso">
                    {/* Formulario de inscrição de curso */}
                    <div className="container" id="box3">
                    <h5 className="text-blue text-center" id="tituloForm">Cadastrar curso</h5>
                        <form action="">
                            <fieldset>
                                <label htmlFor="nome" >Nome: </label>
                                <input type="text" name="nome"  placeholder="Digite o nome de seu curso" id="nomeCurso"
                                    onChange = {(e => setName(e.target.value))}/>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="categoria">Categoria: </label>
                                <select name="categorias" id="categoriasId"
                                onChange={e => setCategory(e.target.value)}>
                                    <option value="">Escolha a categoria</option>
                                    {categories.map((categoria: any) => {
                                        return (
                                            <option value={categoria._id}>{categoria.name}</option>
                                        )
                                    })}
                                </select>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="descricao" >Descrição: </label> <br/>
                                <textarea  placeholder="Descreva seu curso" name="descricao" id="descricaoCurso" cols={35} rows={8}
                                    onChange = {(e => setDescription(e.target.value))}></textarea>
                            </fieldset>

                            <fieldset>
                                Capa: <label
                                // mudar o nome de acordo com o que for (imagem, thumbnail, capa...) 
                                    id='thumbnail' 
                                    style={{backgroundImage: `url(${preview})`}}
                                    className={preview ? 'has-thumbnail' : ''}>
                                    <input type="file" onChange={e => (setThumbnail(e.target.files![0]))}/>
                                    <i><FontAwesomeIcon icon={faCamera}/></i>
                                </label>
                            </fieldset>
                            
                            <div className='text-right'>
                                <Button variant="outline-dark" type="submit" id="btnCadastro"
                                    onClick={handleSubmit}> <FontAwesomeIcon icon={faChevronRight}/> </Button>
                            </div> 
                            {/* <button id="botaoForm" type="submit" onClick={handleSubmit}>Criar</button> */}
                        </form>
                    </div>
                    
                </div>
            </>
        );  
};

export default CriarCurso;