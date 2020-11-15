import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Cookies from 'universal-cookie';
// import Button from 'react-bootstrap/Button'
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import https_headers from '../js/https_headers.json';

function AcessarConteudo(props: { array: any; }) {
    const [conteudos, setConteudos] = useState<any>([]);
    const cookies = new Cookies();
    const token = cookies.get('token');

    useEffect(() => {
        async function loadConteudos() {
            const conteudosTemp: any = [];

            var myHeaders = {
                'authorization': 'Bearer ' + token
            }

            Object.assign(myHeaders, https_headers)

            for (let i = 0; i < props.array.length; i++) {
                // console.log(props.array[i])
                await api.post('/conteudo/', {
                    'id': `${props.array[i].item}`
                }, {
                    headers: myHeaders
                }).then(res => {
                    if (res.data.error) {
                        swal(res.data.error)
                    } else {
                        console.log(res.data)
                        conteudosTemp.push(res.data)
                    }
                })
            }

            setConteudos(conteudosTemp);

        }

        loadConteudos();
    }, [props.array])

    return (
        <>
            {conteudos.length > 0 ? (
                conteudos.map((conteudo: any) => {
                    if (conteudo.type === 'text') {
                        return (
                            <p className='text-justify' style={{ fontSize: '30px' }} key={conteudo._id}>{conteudo.source}</p>
                        )
                    } else {
                        if (conteudo.type === 'image') {
                            return (
                                <img className='mr-auto ml-auto d-block img-fluid' key={conteudo._id} src={`https://weblab-backend.herokuapp.com/files/${conteudo.source}`} alt="image" />
                            )
                        } else {
                            return (
                                <div className='embed-responsive embed-responsive-16by9'>
                                    <iframe src={`https://weblab-backend.herokuapp.com/files/${conteudo.source}`} className='embed-responsive-item'></iframe>
                                </div>
                            )
                        }
                    }
                })
            ) : (
                    <>
                        <p>Não há conteúdos disponíveis</p>
                    </>
                )}

        </>
    )
}

export default AcessarConteudo;