import React, { useState, useMemo } from 'react';
import api from '../services/api';
import Cookies from 'universal-cookie';
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import '../css/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faChevronRight, faCamera } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import https_headers from '../js/https_headers.json';

function Cadastro() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');
    const [avatar, setAvatar] = useState<any | null>(null);

    const preview = useMemo(() => {
        return avatar ? URL.createObjectURL(avatar) : null
    }, [avatar])

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);
        data.append('avatar', avatar);
        data.append('admin', "false");

        var myHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
        }

        Object.assign(myHeaders, https_headers)

        await api.post('/cadastrar', data,
            {
                headers: myHeaders
            })

            .then(function (response) {
                if (response.data.error) {
                    swal(response.data.error)
                    console.log(response.data.error)
                } else {
                    // alert("Cadastrado com sucesso!")
                    let token = response.data.token
                    let id = response.data.user._id
                    var d = new Date()
                    d.setHours(d.getHours() + 3)

                    const cookies = new Cookies()
                    cookies.set('token', token, { path: "/", expires: d })
                    cookies.set('id', id, { path: '/', expires: d })
                    cookies.set('email', email, { path: '/', expires: d })
                    console.log(cookies.get('token'))
                    window.location.href = "/"
                }
            })
    }

    return (
        <>
            <div id="">

                <div className="container" id="box">

                    <h5 className="text-blue text-center" id="h51">Cadastro</h5>
                    <form action="">
                        <fieldset>
                            <label>Nome: </label>
                            <input type="text" name="nome" id="inputNomeCad" placeholder="Digite seu nome"
                                onChange={(e => setName(e.target.value))} />
                        </fieldset>
                        <fieldset>
                            <label>Email: </label>
                            <input type="email" name="email" id="inputEmailCad" placeholder="Digite seu email"
                                onChange={(e => setEmail(e.target.value))} />
                        </fieldset>
                        <fieldset>
                            <label>Senha: </label>
                            <input type="password" name="senha" id="inputSenhaCad" placeholder="Digite sua senha"
                                onChange={(e => setSenha(e.target.value))} />
                        </fieldset>

                        <fieldset>
                            Avatar:<label
                                id='avatar'
                                style={{ backgroundImage: `url(${preview})` }}
                                className={preview ? 'has-avatar' : ''}>
                                <input type="file" onChange={e => (setAvatar(e.target.files![0]))} />
                                <i><FontAwesomeIcon icon={faCamera} /></i>
                            </label>
                        </fieldset>
                        <button id="botaoForm" type="submit" onClick={handleSubmit}>
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Cadastro;