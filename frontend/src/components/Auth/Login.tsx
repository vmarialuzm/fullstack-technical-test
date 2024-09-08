import { useState } from 'react';
import { TextInput, Button, PasswordInput, Group, Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import AuthFormWrapper from '../Layout/AuthFormWrapper';


interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.data.access);
      setNotification({ message: 'Inicio de sesión exitoso', type: 'success' });
      setLoading(false);
      onLoginSuccess(); // Actualiza el estado de autenticación
      navigate('/home'); // Redirige a Home
    } catch (error) {
      setNotification({ message: 'Error al iniciar sesión. Revisa tu email o contraseña.', type: 'error' });
      setLoading(false);
    }
  };

  const handleToggleForm = () => {
    navigate('/register');
  }

  return (
    <AuthFormWrapper title="Iniciar Sesión" toggleForm={handleToggleForm} toggleText="Crear Cuenta">
      {notification.message && (
        <Notification icon={notification.type === 'success' ? <IconCheck size="1.1rem" /> : <IconX size="1.1rem" />} color={notification.type}>
          {notification.message}
        </Notification>
      )}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          placeholder="tu-email@ejemplo.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Group mt="md">
          <Button type="submit" loading={loading} fullWidth mt="md">
            Iniciar Sesión
          </Button>
        </Group>
      </form>
    </AuthFormWrapper>
  );
};

export default Login;