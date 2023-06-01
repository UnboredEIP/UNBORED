import React from "react";
import Nav from "../components/Nav/Nav";
import {
  Box,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  Flex,
} from "@chakra-ui/react";
// import { Link } from "react-router-dom";

const LoginHeader: React.FC<{}> = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Heading> Connectes toi !</Heading>
      <Text>
        Ou <Link href="/register">crées ton compte </Link>
        si tu n'en a pas encore
      </Text>
    </Box>
  );
};

const LoginForm: React.FC<{}> = () => {
  return (
    <Box textAlign="center">
      <form>
        <FormControl mt={10} textAlign="left">
          <FormLabel textAlign="left">Email</FormLabel>
          <Input
            type="email"
            placeholder="Entres ton addresse mail"
            textAlign="center"
          ></Input>
          <FormLabel textAlign="left">Mot de passe</FormLabel>
          <Input
            type="password"
            placeholder="Entres ton mot de passe"
            textAlign="center"
          ></Input>
        </FormControl>
        <Stack isInline justifyContent="space-between">
          <Box>
            <Checkbox>Se souvenir de moi</Checkbox>
          </Box>
          <Box>*Mot de passe oublié ?</Box>
        </Stack>
        <Link href="/home">
          <Button mt={4} my={4} borderRadius={50} boxShadow="lg">
            Se connecter
          </Button>
        </Link>
        <Stack isInline justifyContent="space-between" my={4}>
          <Button borderRadius={50} boxShadow="lg">
            Continuer avec Google
          </Button>
          <Button borderRadius={50} boxShadow="lg">
            Continuer avec Facebook
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

const LoginPage: React.FC<{}> = () => {
  return (
    <Flex minHeight="100vh" align="center" width="full" justifyContent="center">
      <Box borderWidth={5} px={4} borderRadius={40}>
        <LoginHeader />
        <LoginForm />
      </Box>
    </Flex>
  );
};

export default LoginPage;
