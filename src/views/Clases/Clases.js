import React, { useState, useEffect } from 'react';
import './style.css';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const tableIcons = {
    Add: forwardRef((prps, ref) => <AddBox {...prps} ref={ref} />),
    Check: forwardRef((prps, ref) => <Check {...prps} ref={ref} />),
    Clear: forwardRef((prps, ref) => <Clear {...prps} ref={ref} />),
    Delete: forwardRef((prps, ref) => <DeleteOutline {...prps} ref={ref} />),
    DetailPanel: forwardRef((prps, ref) => (
        <ChevronRight {...prps} ref={ref} />
    )),
    Edit: forwardRef((prps, ref) => <Edit {...prps} ref={ref} />),
    Export: forwardRef((prps, ref) => <SaveAlt {...prps} ref={ref} />),
    Filter: forwardRef((prps, ref) => <FilterList {...prps} ref={ref} />),
    FirstPage: forwardRef((prps, ref) => <FirstPage {...prps} ref={ref} />),
    LastPage: forwardRef((prps, ref) => <LastPage {...prps} ref={ref} />),
    NextPage: forwardRef((prps, ref) => <ChevronRight {...prps} ref={ref} />),
    PreviousPage: forwardRef((prps, ref) => (
        <ChevronLeft {...prps} ref={ref} />
    )),
    ResetSearch: forwardRef((prps, ref) => <Clear {...prps} ref={ref} />),
    Search: forwardRef((prps, ref) => <Search {...prps} ref={ref} />),
    SortArrow: forwardRef((prps, ref) => <ArrowDownward {...prps} ref={ref} />),
    ThirdStateCheck: forwardRef((prps, ref) => <Remove {...prps} ref={ref} />),
    ViewColumn: forwardRef((prps, ref) => <ViewColumn {...prps} ref={ref} />),
};

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKURL}`,
});

function validateEmail(email) {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
}

function Clases() {
    var columns = [
        { title: 'id', field: '_id', hidden: true },
        {
            title: 'Avatar',
            render: (rowData) => (
                <Avatar
                    maxInitials={1}
                    size={40}
                    round={true}
                    name={rowData === undefined ? ' ' : rowData.nombre}
                />
            ),
        },
        { title: 'Nombre', field: 'nombre' },
        { title: 'E-mail', field: 'email' },
        { title: 'Rol', field: 'rol' },
        { title: 'Password', field: 'password' },
    ];
    const [data, setData] = useState([]); //table data

    //for error handling
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const headers = {
        'Content-Type': 'application/json',
        'x-token': cookies.get('token'),
    };
    useEffect(() => {
        api.get('/usuario', { headers: headers })
            .then((res) => {
                console.log(res.data);
                console.log(res.data.usuarios);
                setData(res.data.usuarios);
            })
            .catch(() => {
                console.log('Error');
            });
    }, []);

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = [];
        if (newData.nombre === '') {
            errorList.push('Por favor ingresa un nombre');
        }
        if (newData.codigo === '') {
            errorList.push('Por favor ingresa un codigo');
        }
        if (newData.email === '' || validateEmail(newData.email) === false) {
            errorList.push('Please enter a valid email');
        }

        if (errorList.length < 1) {
            api.patch('/usuario/' + newData.id, newData)
                .then(() => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve();
                    setIserror(false);
                    setErrorMessages([]);
                })
                .catch(() => {
                    setErrorMessages(['Actualizacion fallida! Server error']);
                    setIserror(true);
                    resolve();
                });
        } else {
            setErrorMessages(errorList);
            setIserror(true);
            resolve();
        }
    };

    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = [];
        if (newData.nombre === undefined) {
            errorList.push('Por favor ingresa un nombre');
        }
        if (newData.codigo === undefined) {
            errorList.push('Por favor ingresa un codigo');
        }
        if (
            newData.email === undefined ||
            validateEmail(newData.email) === false
        ) {
            errorList.push('Ingresa un email valido');
        }

        if (errorList.length < 1) {
            //no error
            api.post('/usuario', newData)
                .then(() => {
                    let dataToAdd = [...data];
                    dataToAdd.push(newData);
                    setData(dataToAdd);
                    resolve();
                    setErrorMessages([]);
                    setIserror(false);
                })
                .catch(() => {
                    setErrorMessages([
                        'No se pudo agregar los datos. Server error!',
                    ]);
                    setIserror(true);
                    resolve();
                });
        } else {
            setErrorMessages(errorList);
            setIserror(true);
            resolve();
        }
    };

    const handleRowDelete = (oldData, resolve) => {
        api.delete('/usuario/' + oldData.id)
            .then(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
            })
            .catch(() => {
                setErrorMessages(['Delete failed! Server error']);
                setIserror(true);
                resolve();
            });
    };

    return (
        <div className="App">
            <Grid container spacing={1}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <div>
                        {iserror && (
                            <Alert severity="error">
                                {errorMessages.map((msg, i) => {
                                    return <div key={i}>{msg}</div>;
                                })}
                            </Alert>
                        )}
                    </div>
                    <MaterialTable
                        title="Clases"
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    handleRowUpdate(newData, oldData, resolve);
                                }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    handleRowAdd(newData, resolve);
                                }),
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    handleRowDelete(oldData, resolve);
                                }),
                        }}
                    />
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
}

export default Clases;
