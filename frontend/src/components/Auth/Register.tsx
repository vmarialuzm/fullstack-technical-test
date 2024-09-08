import { useState } from 'react';
import { TextInput, Button, PasswordInput, Select, Notification } from '@mantine/core';
import { registerUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom'; 
import AuthFormWrapper from '../Layout/AuthFormWrapper';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    tipo: '',
    email: '',
    password: '',
    password2: '',
  });

  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string | null) => {
    if (value !== null) {
      setFormData({
        ...formData,
        tipo: value,
      });
    }
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setNotification({ message: 'Registro exitoso', type: 'success' });
      console.log(response.data); // Muestra la respuesta

      // Redirigir al login después del registro exitoso
      navigate('/login'); 
    } catch (error) {
      setNotification({ message: 'Error al registrar. Intenta nuevamente.', type: 'error' });
      console.error(error);
    }
  };

  // Redirigir al login si el usuario hace clic en "Inicia sesión"
  const handleToggleForm = () => {
    navigate('/login'); // Redirige a la ruta de login
  };

  return (
    <AuthFormWrapper title="Crea tu cuenta" toggleText="Inicia sesión" toggleForm={handleToggleForm}>
      {notification.message && (
        <Notification color={notification.type === 'success' ? 'green' : 'red'}>
          {notification.message}
        </Notification>
      )}

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Username"
          placeholder="Tu nombre de usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextInput
          label="First Name"
          placeholder="Tu nombre"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <TextInput
          label="Last Name"
          placeholder="Tu apellido"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <Select
          label="Tipo"
          placeholder="Selecciona tu tipo"
          data={[
            { value: '1', label: 'Voluntario' },
            { value: '2', label: 'Adoptante' },
          ]}
          value={formData.tipo}
          onChange={handleSelectChange}
          required
        />
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
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirma tu contraseña"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          required
        />
        <Button type="submit" fullWidth mt="md">
          Registrar
        </Button>
      </form>
    </AuthFormWrapper>
  );
};

export default Register;