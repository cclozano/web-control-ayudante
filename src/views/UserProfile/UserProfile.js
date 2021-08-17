import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

import avatar from 'assets/img/faces/marc.png';

const styles = {
    cardCategoryWhite: {
        color: 'rgba(255,255,255,.62)',
        margin: '0',
        fontSize: '14px',
        marginTop: '0',
        marginBottom: '0',
    },
    cardTitleWhite: {
        color: '#FFFFFF',
        marginTop: '0px',
        minHeight: 'auto',
        fontWeight: '300',
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: '3px',
        textDecoration: 'none',
    },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
    const classes = useStyles();
    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>
                                Editar Perfil
                            </h4>
                            <p className={classes.cardCategoryWhite}>
                                Completa tu perfil
                            </p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                    <CustomInput
                                        labelText="Facultad (disabled)"
                                        id="company-disabled"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            disabled: true,
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={3}>
                                    <CustomInput
                                        labelText="Nombre"
                                        id="nombre"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Email"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Carrera"
                                        id="carrera"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Ciudad"
                                        id="ciudad"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Pais"
                                        id="pais"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <InputLabel style={{ color: '#AAAAAA' }}>
                                        Acerca de mi
                                    </InputLabel>
                                    <CustomInput
                                        labelText="Completaremos la integradora 2021."
                                        id="about-me"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            multiline: true,
                                            rows: 5,
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary">Actualizar Perfil</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardAvatar profile>
                            <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <img src={avatar} alt="..." />
                            </a>
                        </CardAvatar>
                        <CardBody profile>
                            <h6 className={classes.cardCategory}>AYUDANTE</h6>
                            <h4 className={classes.cardTitle}>Axell Concha</h4>
                            <p className={classes.description}>
                                Ayudante de catedra desde el 2017
                            </p>
                            <Button color="primary" round>
                                Editar
                            </Button>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
