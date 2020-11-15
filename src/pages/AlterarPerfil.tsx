import React, { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import '../css/AlterarConta.css';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import https_headers from '../js/https_headers.json';

function AlterarPerfil() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [avatar, setAvatar] = useState<any | null>(null);
    const [oldName, setOldName] = useState('');
    const [oldEmail, setOldEmail] = useState('');

    const preview = useMemo(() => {
        return avatar ? URL.createObjectURL(avatar) : null
    }, [avatar])

    useEffect(() => {
        const cookies = new Cookies()
        const token = cookies.get('token')

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        api.get('/perfil', {
            headers: myHeaders
        }).then(res => {
            if (res) {
                console.log(res.data)
                setOldName(res.data.name)
                setOldEmail(res.data.email)
            }
        })
    }, []);

    async function updateUsuario(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get('token');

        const data = new FormData();
        data.append('email', email);
        data.append('oldPassword', oldPassword)
        data.append('name', name);
        data.append('avatar', avatar);
        data.append('password', password);

        var myHeaders = {
            'authorization': 'Bearer ' + token,
            'Content-type': 'multipart/form-data'
        }

        Object.assign(myHeaders, https_headers)

        await api.post('/perfil/editar', data,
            {
                headers: myHeaders
            }
        )

            .then(function (res) {
                if (res.data.error) {
                   swal(res.data.error)
                } else {
                    swal(res.data.message).then(function(){ 
                        window.location.href = "/"
                    });
                }

            })
    }

    return (
        <>
            <div id="">

                <div className="container" id="box2">

                    <h5 className="text-blue text-center" id="h51">Alterar dados</h5>
                    <h4 className="text-blue text-center" id="h41">Digite apenas o que deseja alterar</h4>
                    <form action="">
                        <fieldset>
                            <label>Nome: </label>
                            <input type="text" name="nome" id="inputNome" placeholder={oldName}
                                onChange={(e => setName(e.target.value))} />
                        </fieldset>

                        <fieldset>
                            <label>Email: </label>
                            <input type="email" name="email" id="inputEmail" placeholder={oldEmail}
                                onChange={(e => setEmail(e.target.value))} />
                        </fieldset>

                        <fieldset>
                            <label>Senha: </label>
                            <input type="password" name="senha" id="inputSenha" placeholder="Nova senha"
                                onChange={(e => setPassword(e.target.value))} />
                        </fieldset>

                        <fieldset>
                            Avatar:<label id='avatar'
                                style={{ backgroundImage: `url(${preview})` }}
                                className={preview ? 'has-avatar' : ''}>
                                <input type="file" onChange={e => (setAvatar(e.target.files![0]))} />
                                <i><FontAwesomeIcon icon={faCamera} /></i>
                            </label>
                        </fieldset>

                        <fieldset>
                            <label>Senha Atual: </label>
                            <input type="password" name="senhaAtual" id="inputSenhaAtual" placeholder="Digite sua senha atual"
                                onChange={(e => setOldPassword(e.target.value))} />
                        </fieldset>

                        <button id="botaoForm" type="submit" onClick={updateUsuario}>
                            Alterar
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
};

export default AlterarPerfil;