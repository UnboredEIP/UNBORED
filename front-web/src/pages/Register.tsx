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

const RegisterHeader: React.FC<{}> = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Heading> Crées ton compte !</Heading>
      <Text>
        Ou <Link href="/login">connectes-toi </Link>
        si tu en as déjà un
      </Text>
    </Box>
  );
};

const RegisterForm: React.FC<{}> = () => {
  return (
    <Box textAlign="center">
      <form>
        <FormControl mt={10} textAlign="left">
          <FormLabel textAlign="left">Nom d'utilisateur</FormLabel>
          <Input
            type="username"
            placeholder="Entres ton nom d'utilisateur"
            textAlign="center"
          ></Input>
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
          <FormLabel textAlign="left">Mot de passe</FormLabel>
          <Input
            type="password"
            placeholder="Confirmes ton mot de passe"
            textAlign="center"
          ></Input>
        </FormControl>
        <Stack isInline justifyContent="space-between">
          <Box>
            <Checkbox>Se souvenir de moi</Checkbox>
          </Box>
          <Box>
            *Mot de passe oublié ?
          </Box>
        </Stack>
        <Link href="/home">
          <Button mt={4} my={4} borderRadius={50} boxShadow="lg">
            Créer mon compte
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

const RegisterPage: React.FC<{}> = () => {
  return (
    <Flex minHeight="100vh" align="center" width="full" justifyContent="center">
      <Box borderWidth={5} px={4} borderRadius={40}>
        <RegisterHeader />
        <RegisterForm />
      </Box>
    </Flex>
  );
};

export default RegisterPage;
