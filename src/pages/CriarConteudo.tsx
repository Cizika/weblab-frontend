import React, { Component, useState, useMemo } from 'react';
import ReactDOMServer from 'react-dom/server'
import $ from 'jquery';
import api from '../services/api';
import Form from 'react-bootstrap/Form';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCamera } from '@fortawesome/free-solid-svg-icons';
import https_headers from '../js/https_headers.json';

function CriarConteudo() {
    const [type, setType] = useState('');
    const [source, setSource] = useState('');
    const [thumbnail, setThumbnail] = useState<any | null>(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    const popover = (
        <Popover id='content-options'>
            <Popover.Title className='text-center'>Selecione um dos conteúdos</Popover.Title>

            <Popover.Content className='text-center'>
                <Button variant='outline-dark' className='mr-2' onClick={() => manageContent('text')}>Texto</Button>

                <Button variant='outline-dark' onClick={() => manageContent('image')}>Imagem</Button>

                <Button variant='outline-dark' className='mt-2' onClick={() => manageContent('video')}>Vídeo</Button>
            </Popover.Content>
        </Popover>
    )

    const Options = () => (
        <OverlayTrigger trigger='click' placement='bottom-start' overlay={popover}>
            <Button variant='outline-dark' className='mt-2'>Tipos de conteúdo</Button>
        </OverlayTrigger>
    )

    function manageContent(type: string) {
        setType(type);

        if (type == 'text') {
            $('#contentMedia').addClass('d-none')
            $('#contentText').toggleClass('d-none')
        } else {
            $('#contentText').addClass('d-none')
            $('#contentMedia').toggleClass('d-none')
        }
    }

    async function handleSubmit() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const moduloId = cookies.get('module_id');
        const conteudo = (thumbnail == null ? source : thumbnail);

        const data = new FormData();
        data.append('type', type);
        data.append('source', conteudo);
        data.append('module_id', moduloId);

        var myHeaders = {
            'authorization': 'Bearer ' + token,
            'Content-type': 'multipart/form-data'
        }

        Object.assign(myHeaders, https_headers)

        await api.post('/conteudo/inserir', data,
            {
                headers: myHeaders
            }
        )
            .then(function (response) {
                if (response.data.error) {
                    swal(response.data.error)
                }
                else {
                    swal('Conteúdo cadastrado com sucesso!').then(function(){ 
                        window.location.reload()
                    });
                }
            })
    }

    return (
        <>
            <div className='container-fluid'>
                <Options />

                <Form className='mt-2'>

                    <Form.Group id='explicacaoTexto'>
                        <p>Para criar um conteúdo, clique no botão acima "Tipos de conteúdo" e escolha a opção que deseja.</p>
                        <p>Para textos, clique na opção "Texto" e preencha o espaço "Conteúdo do texto" com o assunto de sua escolha.</p>
                        <p>Para multimídias, escolha a opção "Imagem" ou "Vídeo" e selecione o arquivo que pretende adicionar ao seu curso.</p>
                        <p>Depois de selecionar o tipo de conteúdo e preencher com o material de sua escolha, clique no botão "Adicionar" para cadastrar esse conteúdo. Você pode cadastrar vários dessa mesma forma!</p>
                        <p>Adicione quantos conteúdos desejar e, após finalizar, clique no botão "Criar exercícios" para acessar a seção de criação de testes.</p>
                    </Form.Group>

                    <Form.Group id='contentText' className='d-none'>
                        <Form.Label>Insira o texto desejado: </Form.Label>

                        <Form.Control as='textarea' cols={30} rows={10} placeholder='Conteúdo do texto'
                            onChange={(e => setSource(e.target.value))}></Form.Control>
                    </Form.Group>

                    <Form.Group id='contentMedia' className='d-none'>
                        <fieldset>
                            Multimídia: <label
                                id='thumbnail'
                                style={{ backgroundImage: `url(${preview})` }}
                                className={preview ? 'has-thumbnail' : ''}>
                                <input type="file" onChange={e => (setThumbnail(e.target.files![0]))} />
                                <i><FontAwesomeIcon icon={faCamera} /></i>
                            </label>
                        </fieldset>
                    </Form.Group>

                    <Form.Group className='text-center'>
                        <Button variant='outline-dark' className='mr-2' onClick={handleSubmit}>Adicionar</Button>

                        <Button variant='outline-dark' onClick={() => window.location.href = '/exercicio/criar'}>Criar exercícios</Button>
                    </Form.Group>
                </Form>
            </div>
        </>
    )
}

export default CriarConteudo;