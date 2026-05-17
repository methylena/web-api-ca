import { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router';
import { AuthContext } from '../contexts/authContext';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');

  const register = async () => {
    setError('');
    if (!PASSWORD_REGEX.test(password)) {
      setError(
        'Password must be at least 8 characters with uppercase, lowercase, digit, and symbol (@$!%*?&).'
      );
      return;
    }
    if (password !== passwordAgain) {
      setError('Passwords do not match.');
      return;
    }
    const result = await context.register(userName, password);
    if (result) {
      setRegistered(true);
    } else {
      setError('Registration failed. Username may already exist.');
    }
  };

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, px: 2 }}>
      <Paper sx={{ p: 4, maxWidth: 480, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Sign up
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create an account to access Favorites, Upcoming playlist, and movie reviews.
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
        <TextField
          fullWidth
          label="Confirm password"
          type="password"
          margin="normal"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={register}>
          Register
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUpPage;
