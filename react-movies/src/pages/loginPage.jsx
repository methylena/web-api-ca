import { useContext, useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router';
import { AuthContext } from '../contexts/authContext';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const LoginPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async () => {
    setError('');
    const result = await context.authenticate(userName, password);
    if (!result.success) {
      setError(result.msg);
    }
  };

  if (context.isAuthenticated === true) {
    return <Navigate to={from} />;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, px: 2 }}>
      <Paper sx={{ p: 4, maxWidth: 420, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Log in
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          You must log in to view protected pages such as Favorites and Add Review.
        </Typography>
        {error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
          Log in
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Not registered? <Link to="/signup">Sign up</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
