import {
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  RiAppleFill,
  RiAppleLine,
  RiGoogleFill,
  RiLock2Line,
} from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignUp() {
  const { user, signIn, signUp } = useContext(AuthContext);

  const router = useRouter();
  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const size = useWindowSize();

  const [login, setLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(user !== null) {
      router.push("/")
    }
  }, [user])

  async function handleSignIn() {
    const response = await signIn({ email, password });
    console.log(response);
    if (response.error === true) {
      toast({
        status: "error",
        description: response.message,
      });
    } else if (response.status === "Sucesso!")  {
      toast({
        status: "success",
        description: response.message,
      });
    }
  }

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);
    return windowSize;
  }

  return (
    <Flex maxH={size.height} h="100vh" bg="#eee">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      {user ? (
        <Flex justify="center" align="center" h="100vh" w="100vw">
          <Spinner size="xl" color="#42ba96" />
        </Flex>
      ) : (
        <Flex
          flexDir="column"
          py="4"
          justify="space-between"
          align="center"
          h="100vh"
          w="100vw"
        >
          <Flex align="center">
            <Image
              src="http://192.168.0.20:5556/images/inconformedia.png"
              w="45"
              h="45"
              ml={-5}
              mr="2"
            />
            <Flex flexDir="column">
              <Text fontSize="22" fontWeight="bold" color="#000">
                Inconformedia
              </Text>
              <Text fontSize="sm" color="#000">
                powered by uppernodes
              </Text>
            </Flex>
          </Flex>
          <Flex
            borderRadius="5"
            mt="4"
            w={size.width > 800 ? 500 : 350}
            flexDir="column"
            p="4"
            boxShadow="rgba(0,0,0,0.1) 0 0 10px"
            justify="center"
            align="center"
            bg="#FFF"
          >
            <Text color="#777" fontSize="xl" fontWeight="bold">
              Entrar na sua conta
            </Text>

            <Input
              fontSize="sm"
              color="#333"
              style={{
                height: 50,
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
              mt="4"
              autoCapitalize="none"
              placeholder="Digite seu email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />

            <Input
              fontSize="sm"
              color="#333"
              style={{
                height: 50,
                width: "100%",
                border: "1px solid #e0e0e0",
              }}
              mt="4"
              placeholder="Sua senha"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />

            <Text mt="4" fontSize="xs" color="#aaa">
              Ao se registrar, voce concorda que leu e que aceita os nossos
              Termos de Servico e Politica de Privacidade.
            </Text>
            <Flex
              onClick={() => {
                if (!email) {
                  toast({
                    status: "error",
                    description: "Voce precisa inserir seu email",
                  });
                } else if (!password) {
                  toast({
                    status: "error",
                    description: "Voce precisa inserir sua senha",
                  });
                } else {
                  handleSignIn();
                }
              }}
              _hover={{
                transition: "0.5s",
                color: "#FFF",
                backgroundColor: "green",
              }}
              style={{
                height: 50,
                width: "100%",
              }}
              cursor="pointer"
              mt="4"
              bg="#ddd"
              color="#333"
              borderRadius="5"
              justify="center"
              align="center"
            >
              Continuar
            </Flex>
            <Text mt="4" fontSize="xs" color="#aaa">
              OU
            </Text>
            <Flex
              style={{
                height: 50,
                width: "100%",
              }}
              cursor="pointer"
              mt="4"
              bg="#FFF"
              color="#333"
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              borderRadius="5"
              justify="center"
              align="center"
            >
              <Icon
                as={RiGoogleFill}
                mt={-1}
                mr="2"
                color="#000"
                fontSize="18"
              />
              <Text>Continuar com Google</Text>
            </Flex>
            <Flex
              style={{
                height: 50,
                width: "100%",
              }}
              cursor="pointer"
              mt="4"
              bg="#FFF"
              color="#333"
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              borderRadius="5"
              justify="center"
              align="center"
            >
              <Icon
                as={RiAppleFill}
                mt={-1}
                mr="2"
                color="#000"
                fontSize="18"
              />
              <Text>Continuar com Apple</Text>
            </Flex>

            <div
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#e0e0e0",
                marginTop: 20,
              }}
            />
            <Flex justify="space-around" w="100%">
              <Text color="#0000aa" fontSize="sm" mt="4">
                Problemas ao entrar?
              </Text>
              <Text color="#0000aa" fontSize="sm" mt="4">
                •
              </Text>
              <Link href="/auth/signup">
                <Text cursor="pointer" color="#0000aa" fontSize="sm" mt="4">
                  Criar sua conta
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Flex
            borderTop="1px solid #e0e0e0"
            w={size.width > 800 ? 500 : 350}
            flexDir="column"
            justify="center"
            align="center"
          ></Flex>
        </Flex>
      )}
    </Flex>
  );
}
