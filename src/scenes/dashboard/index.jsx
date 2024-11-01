import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, CardHeader, Typography, Avatar } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Stepper, Step, StepIndicator } from '@mui/joy';

import { colors } from "../../styles/colorPalette";
import { fetchLocation } from '../../actions/fetchLocation';
import { fetchTimeZones } from '../../actions/fetchTimeZones';
import { fetchTasks } from '../../actions/fecthTasks';
import { fetchCountries } from "../../actions/fetchCountries";
import { AuthContext } from '../../utils/AuthContext';

const Dashboard = () => {
    const { userId } = useContext(AuthContext);
    const [location, setLocation] = useState({});
    const [weather, setWeather] = useState({});
    const [time, setTime] = useState({});
    const [timeZones, setTimeZones] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [countries, setCountries] = useState([]);

    const handleInfo = async (countryCode, countryName) => {
        
        try {
            console.log('Country Code: ', countryCode, 'Country Name: ', countryName);
            const data = await fetchLocation(countryName);
            const dataTZ = await fetchTimeZones(countryCode);

            setLocation({
                capital: data.location.name,
                region: data.location.region,
                country: data.location.country,
                lat: data.location.lat,
                lon: data.location.lon,
            });
            setWeather({
                temp_c: data.current.temp_c,
                condition_text: data.current.condition.text,
                condition_icon: data.current.condition.icon
            });
            setTime({
                datetime: data.location.localtime,
                tz: data.location.tz_id
            });
            setTimeZones(dataTZ.zones);
        } catch(error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(userId){
                    const data = await fetchTasks(userId);
                    setTasks(data);
                }
            } catch (error) {
                console.error('Error fetching tasks: ', error)
            }
        }
        fetchData();
    }, [userId]);

    useEffect(() => {
        const fetchCountriesData = async () => {
            try {
                const data = await fetchCountries();
                console.log('Data: ', data);
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries: ', error);
            }
        }

        fetchCountriesData();
    }, []);

    return (
        <Box bgcolor={colors.background} p={'1rem 1rem 0 1rem'} sx={{ height: '100%', width: '100%' }}>
            <Grid container spacing={2} mb={'1rem'}>
                <Grid size={4}>
                    <Card>
                        <CardHeader 
                            title={
                                <Typography
                                    sx={{
                                        color: colors.secondary,
                                    }}
                                >PAIS SELECCIONADO</Typography>
                            }
                            sx={{
                                backgroundColor: '#d3d3d385'
                            }}
                        />
                        <CardContent>
                            <Typography variant="body">{location.country}</Typography> <br />
                            <Typography variant="body" sx={{ fontWeight: 'bold' }}>Capital: </Typography> <Typography variant="body">{location.capital}</Typography> <br />
                            <Typography variant="body" sx={{ fontWeight: 'bold' }}>Región: </Typography> <Typography>{location.region}</Typography><br />
                            <Typography variant="body" sx={{ fontWeight: 'bold' }}>Latitud: </Typography> <Typography>{location.lat}</Typography>
                            <Typography variant="body" sx={{ fontWeight: 'bold' }}>Longitud: </Typography> <Typography>{location.lon}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={4}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography
                                    sx={{
                                        color: colors.secondary,
                                    }}
                                >CLIMA</Typography>
                            }
                            sx={{
                                backgroundColor: '#d3d3d385'
                            }}
                        />
                        <CardContent>
                            <Box display={'flex'} flexDirection={'row'} gap={'1rem'}>
                                <img src={weather.condition_icon}/>
                                <Typography variant="body">{weather.temp_c} °C <br />{weather.condition_text}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={4}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography
                                    sx={{
                                        color: colors.secondary,
                                    }}
                                >PAISES DISPONIBLES</Typography>
                            }
                            sx={{
                                backgroundColor: '#d3d3d385'
                            }}
                        />
                        <CardContent>
                            <Box>
                                {countries && (
                                    countries.map((country) => (
                                        <Box
                                        sx={countryButtonStyles}
                                        component={'button'}
                                        onClick={() => handleInfo(country.codigo_pais, country.nombre_pais)}
                                        >
                                            <Avatar>{country.codigo_pais}</Avatar>
                                            <Typography variant="h6">
                                                {country.nombre_pais}
                                            </Typography>
                                        </Box>
                                    ))
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Mostrar otras tarjetas */}
            <Grid container spacing={2}>
                <Grid size={4}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography
                                    sx={{
                                        color: colors.secondary,
                                    }}
                                >Otras tareas</Typography>
                            }
                            sx={{
                                backgroundColor: '#d3d3d385'
                            }}
                        />
                        <CardContent>
                        <Stepper orientation="vertical" sx={{ width: '90%' }}>
                                {tasks.map((task) => (
                                    <Step key={task.id} 
                                    indicator={
                                        task.estado_tarea === "completada" ? (
                                            <StepIndicator variant="solid" color="success"></StepIndicator>
                                        ) : (
                                            <StepIndicator variant="solid" color="warning"></StepIndicator>
                                        )
                                    }>{task.nombre_tarea}</Step>
                                ))}
                            </Stepper>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={4}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography
                                    sx={{
                                        color: colors.secondary,
                                    }}
                                >Zonas horarias disponibles</Typography>
                            }
                            sx={{
                                backgroundColor: '#d3d3d385'
                            }}
                        />
                        <CardContent>
                            {timeZones.map((timeZone) => (
                                <Box>
                                    <Typography key={timeZone.zoneName} variant="body">{timeZone.zoneName}</Typography> <br />
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: '1rem' }}>
                <Grid size={4}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography
                                    sx={{
                                        color: 'blue',
                                        textAlign: 'center'
                                    }}
                                >Hora</Typography>
                            }
                            sx={{
                                backgroundColor: '#d3d3d385'
                            }}
                        />
                        <CardContent>
                            <Typography variant="body">{time.datetime}</Typography> <br />
                            <Typography variant="body">{time.tz}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};


const countryButtonStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    border: 'none',
    color: `${colors.secondary}`,
    background: 'none',
    cursor: 'pointer'
}

export default Dashboard;