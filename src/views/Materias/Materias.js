import React, { Component } from "react";
import toastr from "cogo-toast";
import Create from "./Create";
import Edit from "./Edit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Materias extends Component {
  constructor() {
    super();
    const headers = {
      "Content-Type": "application/json",
      "x-token": cookies.get("token"),
    };
    axios.get(`${process.env.REACT_APP_BACKURL}/materias`,{headers:headers})
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          console.log(response.usuarios);
          if (response.ok === true) {
            this.state = {
              users:response.usuarios,
              editUser: {},
            }
            this.setState((prevState) => ({
              users: prevState.users.filter((user, i) => {
                return i !== 11;
              }),
            }));
            console.log(this.state)
          } else {
            alert("El usuario o la contraseña no son correctos");
          }
        })
        .catch((error) => {
          console.log(error);
        });

    this.state = {
      users     : [
        {_id : 11, nombre : "Axell Concha", estado : "88018 29887799", email : "moazzam@gmail.com"},
        {_id : 22, nombre : "Axell Concha2", estado : "88017 23665544", email : "azim@gmail.com"},
        {_id : 33, nombre : "Axell Concha3", estado : "88016 26332211", email : "sojol@gmail.com"}
      ],
      editUser : {}
    }

    this.handleUpdateState = this.handleUpdateState.bind(this);
  }

  handleUpdateState(data, operation) {
    if (operation === 1) {
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => {
          if (user._id === data._id) return Object.assign(user, data);
          else return user;
        }),
      }));
      return;
    }
    var new_users = this.state.users.concat(data);
    this.setState({
      users: new_users,
    });
  }
  handleEditUser(userId) {
    this.setState({
      editUser: this.state.users.find((x) => x._id === userId),
    });
  }
  handleDeleteUser(id) {
    this.setState((prevState) => ({
      users: prevState.users.filter((user, i) => {
        return i !== id;
      }),
    }));
    toastr.info("Usuario eliminado correctamente!", {
      position: "top-right",
      heading: "Done",
    });
  }

  render() {
    return (
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="card-title"> Users </h4>
          <button type="button" className="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#addModal">
            Nuevo Usuario
          </button>
        </div>
        <div className="card-body">
          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th> Id </th>
                  <th> Nombre </th>
                  <th> Email </th>
                  <th> Estado </th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, i) => (
                  <tr key={i}>
                    <td> {user._id} </td>
                    <td> {user.nombre} </td>
                    <td> {user.email} </td>
                    <td> {user.estado} </td>
                    <td>
                      <button
                        className="btn btn-info btn-sm mr-2"
                        onClick={this.handleEditUser.bind(this, user._id)}
                        data-toggle="modal"
                        data-target="#editModal"
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={this.handleDeleteUser.bind(this, i)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Create updateState={this.handleUpdateState} />
        <Edit updateState={this.handleUpdateState} user={this.state.editUser} />
      </div>
    );
  }
}
export default Materias;
