import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/About.css';

class SobreNos extends Component {
    render() {
        return (
            <div className="aboutContent">
                <h1 className="aboutTitle">Sobre Nós</h1>
                <div className="aboutText">
                    <p className="aboutParagraph">
                        Formada por Lucas Ciziks, Melissa de Lima, Miguel Shiniti, Paula Gonzalez, Paulini Procaci
                        e Vivian Ayumi, a equipe The Coders criou a plataforma Web Lab com a missão de
                        transformar a aprendizagem de Informática em um processo autônomo e dinâmico.
                        Acreditamos que, assim como o mundo evolui progressivamente, a Educação também não
                        pode permanecer estagnada! Em prol de um ensino repaginado e moderno, oferecemos
                        gratuitamente um ambiente acadêmico em que você pode realizar inscrições nos cursos de
                        sua preferência e disponibilizar o próprio material para que outros usuários façam uso dele.
                    </p>
                    <p className="aboutParagraph">
                        Com base em princípios voltados à metodologia de ludificação, os módulos e exercícios
                        presentes em nossa aplicação rendem títulos colecionáveis aos usuários que se dedicam a
                        explorar as diversas funções existentes nessa nova ferramenta educativa. Assim, motivados
                        pela perspectiva de desbloquear novas conquistas, os alunos são estimulados a
                        progredirem cada vez mais em seus estudos, buscando uma nova condecoração para ser
                        adicionada ao acervo pessoal. Reunindo ensino e objetivos desafiadores, nós garantimos
                        que a propagação de conhecimento nunca tem fim por aqui.
                    </p>
                    <p className="aboutParagraph">
                        Além disso, acreditamos na importância de romper as fronteiras que limitam a integração
                        educacional e, por isso, não trabalhamos sozinhos: cada estudante cadastrado é parte
                        fundamental dessa ideia e exerce o papel de protagonista na construção dessa comunidade
                        ativa que reconhece a inexistência de barreiras para aqueles que desejam saber sempre
                        mais!
                    </p>
                </div>
            </div>
        )
    }
};


export default SobreNos;