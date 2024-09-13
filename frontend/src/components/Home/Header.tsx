import { Button, Container, Flex, Box, Image, Group } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { parseJwt } from '../../services/authService'
import { getUsersById } from '../../services/userService'
import { useState, useEffect } from 'react';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header = ({ isAuthenticated, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const [tipoDisplay, setTipoDisplay] = useState('');

  const handleLogoutClick = () => {
    onLogout(); 
    navigate('/login'); 
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      console.log(typeof token);

      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken?.user_id) {
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
  }, []);

  return (
    <Box
      style={(theme) => ({
        backgroundColor: theme.colors.gray[0], 
        padding: theme.spacing.md,             
        borderBottom: `1px solid ${theme.colors.gray[3]}`, 
      })}
    >
      <Container>
        <Flex justify="space-between" align="center">
          {/* Logo y título */}
          <Flex align="center">
            <Image
              src="https://th.bing.com/th/id/OIG4.wUEZk.FBrgIC52n7YIrM?w=270&h=270&c=6&r=0&o=5&pid=ImgGn"
              alt="Logo"
              width={70} 
              height={70}
              fit='contain'
              mr="md" 
            />
          </Flex>

          {/* Menú central */}
          {isAuthenticated && (
            <Flex>
              <Group justify='center'>
                  <Link to='/home' style={{ textDecoration: 'none', margin: '0 10px' }}>
                    Animales
                  </Link>
                  {tipoDisplay !== 'Adoptante' && (
                    <>
                      {tipoDisplay !== 'Voluntario' && (
                        <Link to='/volunteer' style={{ textDecoration: 'none', margin: '0 10px' }}>
                          Voluntarios
                        </Link>
                      )}
                      <Link to='/adopter' style={{ textDecoration: 'none', margin: '0 10px' }}>
                        Adoptantes
                      </Link>
                      <Link to='/adopciones' style={{ textDecoration: 'none', margin: '0 10px' }}>
                        Adopciones
                      </Link>
                    </>
                  )}
                </Group>
            </Flex>
          )}

          {/* Botones de login, signup o logout */}
          <Flex>
            {!isAuthenticated ? (
              <>
                <Button onClick={() => navigate('/login')} color="blue" mr="sm">
                  Login
                </Button>
                <Button onClick={() => navigate('/register')} color="green">
                  Sign Up
                </Button>
              </>
            ) : (
              <Button onClick={handleLogoutClick} color="red">
                Logout
              </Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;

