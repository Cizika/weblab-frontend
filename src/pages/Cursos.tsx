import React from 'react';
import MenuCursos from './MenuCursos';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Menu.css';
import '../js/Menu.js';

function Cursos(){
    return(
        <div id="content">
            <div className="container-fluid">
                <MenuCursos/>
            </div>
        </div>
    )
}

export default Cursos;