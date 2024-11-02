import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/firebaseconfig';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 

  const handleLogin = (event) => {
    event.preventDefault(); 
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/todo'); 
      })
      .catch((error) => {
        setError(error.message); 
      });

    setEmail('');
    setPassword('');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: '#f4f6f8' }}>
      <Paper elevation={3} sx={{ p: 4, width: { xs: '90%', sm: '400px' }, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" display="flex" flexDirection="column" gap={2} alignItems="center" onSubmit={handleLogin}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2, width: '100%' }}
            type="submit"
          >
            Sign In
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don’t have an account?{' '}
            <Button color="primary" onClick={() => navigate('/register')} sx={{ textTransform: 'none' }}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
