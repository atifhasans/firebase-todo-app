import React, { useState } from 'react';
import { Typography, TextField, Button, Box, Card, CardContent, Alert } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = (event) => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    setError('');

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
    
    setEmail('');
    setPassword('');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f7f7f7">
      <Card sx={{ maxWidth: 400, boxShadow: 3, p: 3, borderRadius: 3 }}>
        <CardContent>
          <Box className="d-flex flex-column align-items-center gap-3">
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
              Create an Account
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              placeholder="Enter a secure password"
              sx={{ mt: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                width: '100%',
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
              onClick={registerUser}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
