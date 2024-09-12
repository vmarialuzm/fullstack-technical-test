import { useState, useEffect } from 'react';
import { Table, Button, Modal, TextInput, Box, Select, Title, Flex } from '@mantine/core';
import { getUsersByType, updateUser, deleteUser } from '../../services/volunterService';

interface Volunteer {
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

const VolunteerCRUD = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);
  const [newVolunteer, setNewVolunteer] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    tipo: '1', // Por defecto "Voluntario"
    estado: '1', // Por defecto "Activo"
  });

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await getUsersByType('1'); // Voluntarios son tipo "1"
      setVolunteers(response.data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const handleUpdate = async () => {
    if (editingVolunteer) {
      await updateUser(editingVolunteer.id, newVolunteer);
    } 
    fetchVolunteers();
    setModalOpen(false);
    setNewVolunteer({ first_name: '', last_name: '', username: '', email: '', tipo: '1', estado: '1' });
    setEditingVolunteer(null);
  };

  const handleEdit = (volunteer: Volunteer) => {
    setEditingVolunteer(volunteer);
    setNewVolunteer({
      first_name: volunteer.first_name,
      last_name: volunteer.last_name,
      username: volunteer.username,
      email: volunteer.email,
      tipo: volunteer.tipo,
      estado: volunteer.estado,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    fetchVolunteers();
  };

  return (
    <Box maw={1000} mx="auto">
      <Title order={2} mb="lg" ta="center">
        Gestión de Voluntarios
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
          {volunteers.map((volunteer) => (
            <tr key={volunteer.id}>
              <td>{volunteer.id}</td>
              <td>{volunteer.first_name}</td>
              <td>{volunteer.last_name}</td>
              <td>{volunteer.email}</td>
              <td>{volunteer.tipo_display}</td>
              <td>{volunteer.estado_display}</td>
              <td>
                <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'sm', sm: 'lg' }} justify={{ sm: 'center' }}>
                  <Button onClick={() => handleEdit(volunteer)} size="xs" mr="sm" color="gray">Editar</Button>
                  <Button onClick={() => handleDelete(volunteer.id)} size="xs" color="red">Eliminar</Button>
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Editar Voluntario">
        <TextInput
          label="Nombre"
          placeholder="Nombre"
          value={newVolunteer.first_name}
          onChange={(e) => setNewVolunteer({ ...newVolunteer, first_name: e.target.value })}
          required
        />
        <TextInput
          label="Apellido"
          placeholder="Apellido"
          value={newVolunteer.last_name}
          onChange={(e) => setNewVolunteer({ ...newVolunteer, last_name: e.target.value })}
          required
        />
        <TextInput
          label="Username"
          placeholder="Username"
          value={newVolunteer.username}
          onChange={(e) => setNewVolunteer({ ...newVolunteer, username: e.target.value })}
          required
        />
        <TextInput
          label="Email"
          placeholder="Email"
          value={newVolunteer.email}
          onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
          required
        />
        <Select
          label="Tipo"
          placeholder="Selecciona el tipo"
          data={[
            { value: '1', label: 'Voluntario' },
            { value: '2', label: 'Adoptante' },
          ]}
          value={newVolunteer.tipo}
          onChange={(value) => setNewVolunteer({ ...newVolunteer, tipo: value || '1' })}
          required
        />
        <Select
          label="Estado"
          placeholder="Selecciona el estado"
          data={[
            { value: '1', label: 'Activo' },
            { value: '2', label: 'Inactivo' },
          ]}
          value={newVolunteer.estado}
          onChange={(value) => setNewVolunteer({ ...newVolunteer, estado: value || '1' })}
          required
        />
        <Button onClick={handleUpdate} fullWidth mt="md">
          Actualizar
        </Button>
      </Modal>
    </Box>
  );
};

export default VolunteerCRUD;

