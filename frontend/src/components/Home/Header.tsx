import { Button, Container, Flex, Box, Image, Anchor, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header = ({ isAuthenticated, onLogout }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); 
    navigate('/login'); 
  };

  return (
    <Box
      style={(theme) => ({
        backgroundColor: theme.colors.gray[0], // Aquí sí se accede al theme correctamente
        padding: theme.spacing.md,             // Lo mismo con el padding
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
                  <Anchor href='/home' underline="hover">
                    Animales
                  </Anchor>
                  <Anchor href='#' underline="hover">
                    Voluntarios
                  </Anchor>
                  <Anchor href='#' underline="hover">
                    Adoptantes
                  </Anchor>
                  <Anchor href='#' underline="hover">
                    Adopciones
                  </Anchor>
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

