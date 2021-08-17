import React, { useState, useEffect } from 'react';
import './Facultades.css';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';

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
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

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

const styles = {
    cardCategoryWhite: {
        '&,& a,& a:hover,& a:focus': {
            color: 'rgba(255,255,255,.62)',
            margin: '0',
            fontSize: '14px',
            marginTop: '0',
            marginBottom: '0',
        },
        '& a,& a:hover,& a:focus': {
            color: '#FFFFFF',
        },
    },
    cardTitleWhite: {
        color: '#FFFFFF',
        marginTop: '0px',
        minHeight: 'auto',
        fontWeight: '300',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: '3px',
        textDecoration: 'none',
        '& small': {
            color: '#777',
            fontSize: '65%',
            fontWeight: '400',
            lineHeight: '1',
        },
    },
};

const api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKURL}`,
});

const useStyles = makeStyles(styles);

function Facultades() {
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
        { title: 'codigo', field: 'codigo' },
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
        api.get('/facultad', { headers: headers })
            .then((res) => {
                console.log(res.data);
                console.log(res.data.facultades);
                setData(res.data.facultades);
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

        if (errorList.length < 1) {
            api.patch('/facultad/' + newData.id, newData)
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

        if (errorList.length < 1) {
            //no error
            api.post('/facultad', newData)
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
        api.delete('/facultad/' + oldData.id)
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

    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <div>
                    {iserror && (
                        <Alert severity="error">
                            {errorMessages.map((msg, i) => {
                                return <div key={i}>{msg}</div>;
                            })}
                        </Alert>
                    )}
                </div>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>
                            Programacion de mis clases
                        </h4>
                        <p className={classes.cardCategoryWhite}>
                            Aqui se encuentran las clases planificadas con los
                            temas a revisar
                        </p>
                    </CardHeader>
                    <CardBody>
                        <MaterialTable
                            title="Facultades"
                            columns={columns}
                            data={data}
                            icons={tableIcons}
                            editable={{
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve) => {
                                        handleRowUpdate(
                                            newData,
                                            oldData,
                                            resolve
                                        );
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
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}

export default Facultades;
