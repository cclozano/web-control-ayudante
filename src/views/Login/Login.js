import React, { Component } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";
import Logo from "../../assets/svg/logo.svg";

const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      username: "",
      password: "",
    },
  };

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  iniciarSesion = async () => {
    console.log(`${process.env.REACT_APP_BACKURL}/api/login`);

    const json = JSON.stringify({
      email: this.state.form.username,
      password: this.state.form.password,
    });
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    };
    await axios
      .post(`${process.env.REACT_APP_BACKURL}/api/login`, json, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((response) => {
        if (response.length > 0 && response[0].ok === true) {
          var respuesta = response[0];
          var usuario = respuesta.usuario;
          cookies.set("id", respuesta.id, { path: "/" });
          cookies.set("apellido_paterno", respuesta.apellido_paterno, {
            path: "/",
          });
          cookies.set("apellido_materno", respuesta.apellido_materno, {
            path: "/",
          });
          cookies.set("nombre", respuesta.usuario.nombre, { path: "/" });
          cookies.set("username", respuesta.username, { path: "/" });
          alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`);
          window.location.href = "./menu";
        } else {
          alert("El usuario o la contraseña no son correctos");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (cookies.get("username")) {
      window.location.href = "./menu";
    }
  }

  render() {
    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="turtleLogo">
            <img src={Logo} alt="Logo"></img>
          </div>

          <div
            style={{
              fontStyle: "bold",
              fontSize: "2rem",
              paddingBottom: "2rem",
            }}
          >
            Ingreso
          </div>

          <div className="inputContainer">
            <i className="fa fa-envelope-o icon"></i>
            <input
              type="text"
              className="inputField"
              placeholder="Correo"
              name="username"
              onChange={this.handleChange}
            />
          </div>

          <div className="inputContainer">
            <i className="material-icons icon">lock_outline</i>
            <input
              type="password"
              className="inputField"
              name="password"
              placeholder="Contrasena"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button className="loginBtn" onClick={() => this.iniciarSesion()}>
              Ingresar
            </button>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <p>¿No tienes cuenta?</p>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "midnightblue",
              }}
            >
              Crea una ahora!
            </p>
            <p>Términos y condiciones de uso</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
