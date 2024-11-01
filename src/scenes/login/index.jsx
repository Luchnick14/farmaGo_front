import React, { useContext, useState } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Card, CardContent, CardActions, Typography, Button, Divider, InputAdornment, IconButton } from "@mui/material";
import { colors } from "../../styles/colorPalette";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
        
            const data = await response.json();
            if (response.ok){
                login(data.user.id);
                navigate('/dashboard');
            } else {
                const errorMessage = data.message;
                setLoginError(errorMessage);
                
            }
        } catch (error) {
            console.error('Error en la autenticación', error);
            setLoginError('Hubo un problema en el servidor');
        }
    }

    return(
        <Box
            mt={'5rem'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Card
                sx={{
                    border: `0.2rem solid ${colors.primary}`,
                    borderRadius: '0.8rem',
                    width: '25rem'
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}
                        component={'form'} 
                        onSubmit={handleLogin}
                    >
                        <Typography 
                            variant='h2'
                            sx={{
                                color: colors.accent,
                                marginBottom: '1.5rem',
                                fontWeight: '400'
                            }}
                        >Login</Typography>
                        <TextField 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            label="Email"
                            required
                            variant="outlined"
                            sx={{
                                width: '90%'
                            }}
                        />
                        <TextField 
                            type={showPassword ? "text" : "password"}
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            label="Password"
                            required
                            variant="outlined"
                            sx={{
                                width: '90%'
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                        {loginError && 
                        <Typography 
                            variant='p'
                            sx={{ 
                                color: 'red',
                                fontWeight: 'bold',
                                margin: '1rem'
                            }}
                        >{loginError}</Typography>}
                        <Button
                            type='submit'
                            variant="contained"
                            sx={{
                                bgcolor: colors.accent,
                                color: colors.primary,
                                fontWeight: "bold",
                                width: "5rem",
                                marginBottom: "1.5rem"
                            }}
                        >Login</Button>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box m={'1rem'}>
                        <Typography
                            variant="body"
                            sx={{
                                color: colors.light
                            }}
                        >
                            <Link to="/registro" style={{ color: `${colors.light}`, textDecoration: 'none' }}>
                                ¿Necesitas una cuenta? ¡Registrate!
                            </Link>
                        </Typography>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
};

export default Login;