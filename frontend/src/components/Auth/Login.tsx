import { useState } from 'react';
import { TextInput, Button, PasswordInput, Box } from '@mantine/core';
import { loginUser } from '../../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log(response.data); // Maneja la respuesta
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maw={400} mx="auto">
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
        <Button type="submit" fullWidth mt="md">
          Iniciar Sesión
        </Button>
      </form>
    </Box>
  );
};

export default Login;
