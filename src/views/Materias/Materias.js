import React, {Component} from 'react'
import toastr from 'cogo-toast';
import Create from './Create'
import Edit from './Edit'

class Materias extends Component
{
	constructor() {
		super();

		this.state = {
			materias     : [
				{id : 11, nombre : "Fundamentos de Programacion", codigo : "FIEC001", facultad : "FIEC"},
				{id : 11, nombre : "Lenguajes de Programacion", codigo : "FIEC002", facultad : "FIEC"},
				{id : 11, nombre : "Materia Integradora", codigo : "FIEC003", facultad : "FIEC"},
			],
			editMateria : {}
		}

		this.handleUpdateState = this.handleUpdateState.bind(this);
	}

	handleUpdateState(data, operation) {
		if(operation === 1) {
			this.setState(prevState => ({
				materias : prevState.materias.filter(materia => {
					if(materia.id === data.id)
						return Object.assign(materia, data);
					else
						return materia;
				})
			}))
			return;
		}

		var new_mats = this.state.materias.concat(data);
		this.setState({
			materias : new_mats
		})
	}

	handleEditMateria(materiaId) {
		this.setState({
			editMateria : this.state.materias.find(x => x.id === materiaId)
		})
	}

	handleDeleteMateria(id) {
		this.setState(prevState => ({
			materias : prevState.materias.filter((materia, i) => {
				return i !== id;
			})
		}))
		toastr.error('User has been deleted successfully!', {position : 'top-right', heading: 'Done'});
	}

    render() {
      return(
          	<div className="card mt-4">
			    <div className="card-header">
			        <h4 className="card-title"> Materias </h4>
			        <button type="button" className="btn btn-primary btn-sm pull-right" data-toggle="modal" data-target="#addModal"> Agregar Materia </button>
			    </div>
			    <div className="card-body">
			        <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th> Id </th>
                                    <th> Nombre </th>
                                    <th> Codigo </th>
                                    <th> Facultad </th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.materias.map((materia, i) => (
                                <tr key={i}>
                                    <td> {materia.id} </td>
                                    <td> {materia.nombre} </td>
                                    <td> {materia.codigo} </td>
                                    <td> {materia.facultad} </td>
                                    <td>
                                        <button className="btn btn-info btn-sm mr-2" onClick={this.handleEditMateria.bind(this, materia.id)} data-toggle="modal" data-target="#editModal"> Editar </button>
                                        <button className="btn btn-danger btn-sm" onClick={this.handleDeleteMateria.bind(this, i)}> Eliminar </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
			        </div>
			    </div>
			    <Create updateState = {this.handleUpdateState} />
			    <Edit updateState = {this.handleUpdateState} materia = {this.state.editMateria} />
			</div>
        )
    }
}
export default Materias