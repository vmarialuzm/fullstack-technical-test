import { useState, useEffect } from 'react';
import { Table, Button, Modal, TextInput, Box, Select, Title, Flex } from '@mantine/core';
import { getAllAnimals, createAnimal, updateAnimal, deleteAnimal } from '../../services/animalService';
import { createAdopcion } from '../../services/adopcionService'
import { parseJwt } from '../../services/authService'
import { getUsersById } from '../../services/userService'


interface Animal {
  id: string;
  nombre: string;
  edad: string;
  raza: string;
  tipo: string;
  tipo_display: string;
  estado: string;
  estado_display: string;
}

interface Adoption {
  animal: any;
  adoptante: any;
}

const Home = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [newAnimal, setNewAnimal] = useState({ nombre: '', edad: '', raza: '', tipo: '', estado: ''});
  const [tipoDisplay, setTipoDisplay] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log(typeof token);

      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken?.user_id) {
          setUserId(decodedToken?.user_id);
          try {
            const response = await getUsersById(decodedToken?.user_id);
            setTipoDisplay(response.data.tipo_display);
          } catch (error) {
            console.error("Error al obtener el usuario:", error);
          }
        }
      } else {
        console.log("No se encontró un token en localStorage.");
      }
      console.log(tipoDisplay)
    };
    fetchUserData();
    fetchAnimals()
  }, []);

  const fetchAnimals = async () => {
    try {
      const response = await getAllAnimals();
      setAnimals(response.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (editingAnimal) {
      await updateAnimal(editingAnimal.id, newAnimal);
    } else {
      await createAnimal(newAnimal);
    }
    fetchAnimals();
    setModalOpen(false);
    setNewAnimal({ nombre: '', edad: '', raza: '', tipo: '', estado: ''});
    setEditingAnimal(null);
  };

  const handleEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setNewAnimal({ nombre: animal.nombre, edad: animal.edad, raza: animal.raza, tipo: animal.tipo, estado: animal.estado });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteAnimal(id);
    fetchAnimals();
  };
  
  const handleAdopcion = (adoption: Adoption ) => {
    createAdopcion(adoption)
  }

  return (
    <Box maw={1000} mx="auto">
      <Title order={2} mb="lg" ta="center">
        Albergue de Animales Rescatados
      </Title>
      {tipoDisplay !== 'Adoptante' && (
        <>
          <Button onClick={() => setModalOpen(true)} mb="md" color='lime'>Agregar Animal</Button>
        </>
      )}
      <Table highlightOnHover withColumnBorders striped horizontalSpacing="sm" verticalSpacing="md">
        <thead style={{ backgroundColor: '#f4f4f4' }}>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Raza</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody >
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.id}</td>
              <td>{animal.nombre}</td>
              <td>{animal.edad}</td>
              <td>{animal.raza}</td>
              <td>{animal.tipo_display}</td>
              <td>{animal.estado_display}</td>
              <td>
                <Flex
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
                justify={{ sm: 'center' }}
                >
                  {tipoDisplay !== 'Adoptante' && (
                    <>
                      <Button onClick={() => handleEdit(animal)} size="xs" mr="sm" color="gray">Editar</Button>
                      <Button onClick={() => handleDelete(animal.id)} size="xs" color="red">Eliminar</Button>
                    </>
                  )}
                  {tipoDisplay === 'Adoptante' && (
                    <>
                      <Button onClick={() => handleAdopcion({ animal: animal.id, adoptante: userId })} size="xs" color="blue">
                        Solicitar adopción
                      </Button>
                    </>
                  )}
                </Flex>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={editingAnimal ? 'Editar Animal' : 'Agregar Animal'}>
        <TextInput
          label="Nombre"
          placeholder="Nombre"
          value={newAnimal.nombre}
          onChange={(e) => setNewAnimal({ ...newAnimal, nombre: e.target.value })}
          required
        />
        <TextInput
          label="Edad"
          placeholder="Edad"
          value={newAnimal.edad}
          onChange={(e) => setNewAnimal({ ...newAnimal, edad: e.target.value })}
          required
        />
        <TextInput
          label="Raza"
          placeholder="Raza"
          value={newAnimal.raza}
          onChange={(e) => setNewAnimal({ ...newAnimal, raza: e.target.value })}
          required
        />
        <Select
          label="Tipo"
          placeholder="Selecciona el tipo"
          data={[
            { value: '1', label: 'Perro' },
            { value: '2', label: 'Gato' },
          ]}
          value={newAnimal.tipo}
          onChange={(value) => setNewAnimal({ ...newAnimal, tipo: value || '' })}
          required
        />
        <Select
          label="Estado"
          placeholder="Selecciona el estado"
          data={[
            { value: '1', label: 'Adoptado' },
            { value: '2', label: 'En adopción' },
            { value: '3', label: 'En espera de adopción' },
          ]}
          value={newAnimal.estado}
          onChange={(value) => setNewAnimal({ ...newAnimal, estado: value || '' })}
          required
        />
        <Button onClick={handleCreateOrUpdate} fullWidth mt="md">
          {editingAnimal ? 'Actualizar' : 'Agregar'}
        </Button>
      </Modal>
    </Box>
  );
};

export default Home;
