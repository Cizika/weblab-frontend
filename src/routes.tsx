import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Login from './pages/Login';
import Inicial from './pages/Inicial';
import Cadastro from './pages/Cadastro';
import Cursos from './pages/Cursos';
import VisualizarCurso from './pages/VisualizarCurso';
import CriarCurso from './pages/CriarCurso';
import CriarModulo from './pages/CriarModulo';
import AcessarModulo from './pages/AcessarModulo';
import AcessarPerfil from './pages/AcessarPerfil';
import Perfil from './pages/Perfil';
import AcessarCurso from './pages/AcessarCurso';
import CriarExercicio from './pages/CriarExercicio';
import CriarConteudo from './pages/CriarConteudo';
import ExcluirConta from './pages/ExcluirConta';
import FormNotificacao from './pages/FormNotificacao';
import ResultadoPesquisa from './pages/ResultadoPesquisa';
import AlterarPerfil from './pages/AlterarPerfil'

export default function Routes() {
    return (
        <CookiesProvider>
            <BrowserRouter>
                <Route path="/" exact component={Inicial} />
                <Route path="/login" exact component={Login} />
                <Route path="/cadastro" exact component={Cadastro} />
                <Route path="/cursos" exact component={Cursos} />
                <Route path="/acessarCurso/:id" component={AcessarCurso} />
                <Route path='/curso/visualizar/:id' component={VisualizarCurso} />
                <Route path="/curso/criar" exact component={CriarCurso} />
                <Route path="/modulo/criar" exact component={CriarModulo} />
                <Route path="/modulo/conteudo/:id" component={AcessarModulo} />
                <Route path="/exercicio/criar" exact component={CriarExercicio} />
                <Route path="/conteudo/criar" exact component={CriarConteudo} />
                <Route path="/perfil" exact component={Perfil} />
                <Route path="/alterarPerfil" exact component={AlterarPerfil} />
                <Route path="/excluirConta" exact component={ExcluirConta} />
                <Route path="/notificar" exact component={FormNotificacao} />
                <Route path="/acessarPerfil" exact component={AcessarPerfil} />
                <Route path="/resultadoPesquisa" exact component={ResultadoPesquisa} />
            </BrowserRouter>
        </CookiesProvider>

    );
}

