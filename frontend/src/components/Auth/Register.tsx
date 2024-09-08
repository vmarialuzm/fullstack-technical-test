import { useState } from 'react';
import { TextInput, Button, PasswordInput, Select, Box } from '@mantine/core';
import { registerUser } from '../../services/authService';

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
      console.log(response.data); // Muestra la respuesta
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box maw={400} mx="auto">
        xddddd
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
    </Box>
  );
};

export default Register;
