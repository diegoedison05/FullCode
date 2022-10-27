import React from "react";
import './login.css';

function Login(){
    return (
        <React.Fragment>
            <div id="contenedor">
                <div id="central">
                    <div id="login">
                        <div class="titulo">
                            Bienvenido
                        </div>
                        <form id="loginform">
                            <input type="text" name="usuario" placeholder="Usuario" required />
                            
                            <input type="password" placeholder="Contraseña" name="password" required />
                            
                            <button type="submit" title="Ingresar" name="Ingresar">Login</button>
                        </form>
                        <div class="pie-form">
                            <a href="#">¿Perdiste tu contraseña?</a>
                            <a href="#">¿No tienes Cuenta? Registrate</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    )
}

export { Login }