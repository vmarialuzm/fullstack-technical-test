import { Paper, Title, Text, Container, Anchor } from '@mantine/core';
import { ReactNode } from 'react';

interface AuthFormWrapperProps {
  title: string;
  children: ReactNode;
  toggleForm?: () => void;
  toggleText?: string;
}

const AuthFormWrapper = ({ title, children, toggleForm, toggleText }: AuthFormWrapperProps) => {
  return (
    <Container size={420} my={40}>
      <Title style={{ fontFamily: 'Greycliff CF, sans-serif', fontWeight: 900 }}>
        {title}
      </Title>
      <Text size="sm" mt={5}>
        {toggleText ? (
          <>
            ¿Ya tienes una cuenta?{' '}
            <Anchor<'a'> size="sm" onClick={toggleForm}>
              {toggleText}
            </Anchor>
          </>
        ) : null}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {children}
      </Paper>
    </Container>
  );
};

export default AuthFormWrapper;
