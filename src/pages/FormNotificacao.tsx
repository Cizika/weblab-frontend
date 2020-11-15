import React from 'react';
import api from '../services/api';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Formnotificacao.css';
import https_headers from '../js/https_headers.json';

class FormNotificacao extends React.Component<{}, { assunto: string, descricao: string }>{
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            assunto: "",
            descricao: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const cookies = new Cookies();
        var token = cookies.get('token');
        const assunto = this.state.assunto;
        const descricao = this.state.descricao;

        var myHeaders = {
            'authorization': 'Bearer ' + token
        }

        Object.assign(myHeaders, https_headers)

        await api.post('/erro', {
            "assunto": assunto,
            "descricao": descricao
        },
            {
                headers: myHeaders
            }
        )
            .then(function (response) {
                if (response.data.error) {
                    swal(response.data.error)
                }
                else {
                    console.log(response.data);
                    swal('Problema reportado com sucesso!').then(function () {
                        window.location.href = "/"
                    });
                }
            })

    }


    render() {
        return (
            <>
                <div className="content">
                    <div className="container" id="box2">
                        <h5 id="h51" className="text-blue text-center">Reportar erro</h5>
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <label>Assunto</label>
                                <input
                                    type="text"
                                    name="assunto"
                                    id="inputAssunto"
                                    placeholder="Digite o assunto"
                                    onChange={e => this.setState({ assunto: e.target.value })} />
                            </fieldset>
                            <label>Descrição do erro</label>
                            <textarea
                                placeholder="Descreva o erro" cols={35} rows={8}
                                onChange={e => this.setState({ descricao: e.target.value })}>
                            </textarea>
                            <button id="botaoForm" type="submit" onClick={this.handleSubmit}>Enviar</button>

                        </form>
                    </div>
                </div>
            </>
        );
    };
};

export default FormNotificacao;