import { useState, useEffect } from 'react';
import { Table, Button, Modal, Box, Select, Title, Flex } from '@mantine/core';
import { getAllAdopciones, createAdopcion, updateAdopcion, deleteAdopcion } from '../../services/adopcionService';
import { getAllAnimals } from '../../services/animalService';
import { getUsersByType } from '../../services/userService';

interface Adoption {
  id: string;
  animal: any;
  voluntario: any;
  adoptante: any;
  estado: string;
  estado_display: string;
}

const Adopciones = () => {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAdoption, setEditingAdoption] = useState<Adoption | null>(null);
  const [newAdoption, setNewAdoption] = useState({
    animal: '',
    voluntario: '',
    adoptante: '',
    estado: '2', // Por defecto "En proceso"
});

  const [animals, setAnimals] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [adopters, setAdopters] = useState([]);

  useEffect(() => {
    fetchAdoptions();
    fetchAnimals();
    fetchUsers();
  }, []);

  const fetchAdoptions = async () => {
    try {
      const response = await getAllAdopciones();
      setAdoptions(response.data);
    } catch (error) {
      console.error('Error fetching adoptions:', error);
    }
  };

  const fetchAnimals = async () => {
    try {
      const response = await getAllAnimals();
      setAnimals(response.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };

  // Aquí utilizamos getUsersByType para obtener tanto voluntarios como adoptantes
  const fetchUsers = async () => {
    try {
      const volunteersResponse = await getUsersByType('1'); // Voluntarios
      setVolunteers(volunteersResponse.data);

      const adoptersResponse = await getUsersByType('2'); // Adoptantes
      setAdopters(adoptersResponse.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (editingAdoption) {
      await updateAdopcion(editingAdoption.id, newAdoption);
    } else {
      await createAdopcion(newAdoption);
    }
    fetchAdoptions();
    setModalOpen(false);
    setNewAdoption({ animal: '', voluntario: '', adoptante: '', estado: '2' });
    setEditingAdoption(null);
  };

  const handleEdit = (adoption: Adoption) => {
    setEditingAdoption(adoption);
    setNewAdoption({
      animal: adoption.animal.id.toString(),
      voluntario: adoption.voluntario?.id?.toString() || '',
      adoptante: adoption.adoptante?.id?.toString() || '',
      estado: adoption.estado,
    });
    setModalOpen(true);
};

  const handleDelete = async (id: string) => {
    await deleteAdopcion(id);
    fetchAdoptions();
  };

return (
  <Box maw={1000} mx="auto">
    <Title order={2} mb="lg" ta="center">
      Gestión de Adopciones
    </Title>
    <Button onClick={() => setModalOpen(true)} mb="md" color="lime">Agregar Adopción</Button>
    <Table highlightOnHover withColumnBorders striped horizontalSpacing="sm" verticalSpacing="md">
      <thead style={{ backgroundColor: '#f4f4f4' }}>
        <tr>
          <th>Id</th>
          <th>Animal</th>
          <th>Voluntario</th>
          <th>Adoptante</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
          {adoptions.map((adoption) => (
            <tr key={adoption.id}>
              <td>{adoption.id}</td>
              <td>{adoption.animal.nombre}</td>
              <td>{adoption.voluntario?.first_name} {adoption.voluntario?.last_name}</td>
              <td>{adoption.adoptante?.first_name} {adoption.adoptante?.last_name}</td>
              <td>{adoption.estado_display}</td>
              <td>
                <Flex direction={{ base: 'column', sm: 'row' }} gap={{ base: 'sm', sm: 'lg' }} justify={{ sm: 'center' }}>
                  <Button onClick={() => handleEdit(adoption)} size="xs" mr="sm" color="gray">Editar</Button>
                  <Button onClick={() => handleDelete(adoption.id)} size="xs" color="red">Eliminar</Button>
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
    </Table>

    <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={editingAdoption ? 'Editar Adopción' : 'Agregar Adopción'}>
      <Select
        label="Animal"
        placeholder="Selecciona un animal"
        data={animals.map((animal: any) => ({ value: animal.id.toString(), label: animal.nombre }))}
        value={newAdoption.animal}
        onChange={(value) => setNewAdoption({ ...newAdoption, animal: value || '' })}
        required
      />
      <Select
        label="Voluntario"
        placeholder="Selecciona un voluntario"
        data={volunteers.map((vol: any) => ({ value: vol.id.toString(), label: `${vol.first_name} ${vol.last_name}` }))}
        value={newAdoption.voluntario}
        onChange={(value) => setNewAdoption({ ...newAdoption, voluntario: value || '' })}
      />
      <Select
        label="Adoptante"
        placeholder="Selecciona un adoptante"
        data={adopters.map((adopter: any) => ({ value: adopter.id.toString(), label: `${adopter.first_name} ${adopter.last_name}` }))}
        value={newAdoption.adoptante}
        onChange={(value) => setNewAdoption({ ...newAdoption, adoptante: value || '' })}
        required
      />
      <Select
        label="Estado"
        placeholder="Selecciona el estado de adopción"
        data={[
          { value: '1', label: 'Finalizado' },
          { value: '2', label: 'En proceso' },
          { value: '3', label: 'Cancelado' },
        ]}
        value={newAdoption.estado}
        onChange={(value) => setNewAdoption({ ...newAdoption, estado: value || '2' })}
        required
      />
      <Button onClick={handleCreateOrUpdate} fullWidth mt="md">
        {editingAdoption ? 'Actualizar' : 'Agregar'}
      </Button>
    </Modal>
  </Box>
  );
};

export default Adopciones;