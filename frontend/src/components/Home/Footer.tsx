import { Box, Text, Anchor, Group } from '@mantine/core';

const Footer = () => {
  return (
    <Box
      style={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        padding: theme.spacing.md,
        borderTop: `1px solid ${theme.colors.gray[3]}`,
        textAlign: 'center',
      })}
    >
      <Group align="center" mb="xs">
        <Anchor href="#" size="sm">
          Acerca de
        </Anchor>
        <Anchor href="#" size="sm">
          Privacidad
        </Anchor>
        <Anchor href="#" size="sm">
          Contacto
        </Anchor>
      </Group>
      <Text size="sm" color="dimmed">
        &copy; {new Date().getFullYear()} Albergue de Animales. Todos los derechos reservados.
      </Text>
    </Box>
  );
};

export default Footer;
