import { useState, useEffect } from 'react';
import { Table, Button, Modal, TextInput, Box, Select, Title, Flex } from '@mantine/core';
import { getUsersByType, updateUser, deleteUser } from '../../services/userService';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  tipo: string;
  tipo_display: string;
  estado: string;
  estado_display: string;
}

interface UserManagementProps {
  userType: '1' | '2'; // "1" para Voluntario, "2" para Adoptante
  title: string; // Título a mostrar
}

const UserManagement = ({ userType, title }: UserManagementProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    tipo: userType, // Por defecto el tipo pasado
    estado: '1', // Por defecto "Activo"
  });

  useEffect(() => {
    fetchUsers();
  }, [userType]);

  const fetchUsers = async () => {
    try {
      const response = await getUsersByType(userType);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdate = async () => {
    if (editingUser) {
      await updateUser(editingUser.id, newUser);
    }
    fetchUsers();
    setModalOpen(false);
    setNewUser({ first_name: '', last_name: '', username: '', email: '', tipo: userType, estado: '1' });
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setNewUser({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      tipo: user.tipo === "1" ? "1" : "2",
      estado: user.estado,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <Box maw={1000} mx="auto">
      <Title order={2} mb="lg" ta="center">
        {title}
      </Title>
      <Table highlightOnHover withColumnBorders striped horizontalSpacing="sm" verticalSpacing="md">
        <thead style={{ backgroundColor: '#f4f4f4' }}>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.tipo_display}</td>
              <td>{user.estado_display}</td>
              <td>
                <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'sm', sm: 'lg' }} justify={{ sm: 'center' }}>
                  <Button onClick={() => handleEdit(user)} size="xs" mr="sm" color="gray">Editar</Button>
                  <Button onClick={() => handleDelete(user.id)} size="xs" color="red">Eliminar</Button>
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Editar Usuario">
        <TextInput
          label="Nombre"
          placeholder="Nombre"
          value={newUser.first_name}
          onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
          required
        />
        <TextInput
          label="Apellido"
          placeholder="Apellido"
          value={newUser.last_name}
          onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
          required
        />
        <TextInput
          label="Username"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <TextInput
          label="Email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <Select
          label="Tipo"
          placeholder="Selecciona el tipo"
          data={[
            { value: '1', label: 'Voluntario' },
            { value: '2', label: 'Adoptante' },
          ]}
          value={newUser.tipo}
          onChange={(value) => setNewUser({ ...newUser, tipo: value as '1' | '2' })}
          required
        />
        <Select
          label="Estado"
          placeholder="Selecciona el estado"
          data={[
            { value: '1', label: 'Activo' },
            { value: '2', label: 'Inactivo' },
          ]}
          value={newUser.estado}
          onChange={(value) => setNewUser({ ...newUser, estado: value || '1' })}
          required
        />
        <Button onClick={handleUpdate} fullWidth mt="md">
          Actualizar
        </Button>
      </Modal>
    </Box>
  );
};

export default UserManagement;

