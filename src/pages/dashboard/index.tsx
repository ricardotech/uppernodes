import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Stat,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  StatArrow,
  StatGroup,
  useBreakpointValue,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BiLayerPlus, BiListPlus, BiLogOut, BiUserPlus } from "react-icons/bi";
import { FiChevronDown, FiFolderPlus, FiPlusSquare } from "react-icons/fi";
import {
  RiArrowDropDownFill,
  RiMenu2Line,
  RiMenuLine,
  RiNotification2Line,
  RiPulseLine,
  RiSearch2Line,
  RiShareLine,
  RiUser3Fill,
  RiUser3Line,
  RiUserFill,
  RiVideoUploadLine,
} from "react-icons/ri";
import TopNav from "../../components/TopNav";
import { AuthContext, signOut } from "../../contexts/AuthContext";

export default function Landing() {
  const { user, signOut } = useContext(AuthContext);

  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const route = useRouter();

  const [publicacao, setPublicacao] = useState(false);
  const [curso, setCurso] = useState(false);
  const [produto, setProduto] = useState(false);

  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState(false);

  const [tarefa, setTarefa] = useState(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const size = useWindowSize();

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  function Header() {
    return (
      <Flex
        zIndex="1000"
        position="fixed"
        style={{ height: 80, width: "100vw" }}
        align="center"
        mx="auto"
        p="5"
        justify="space-between"
        flexDir="row"
      >
        <Flex flexDir="row" align="center">
          <Image
            src="https://503a-168-228-216-82.sa.ngrok.io/images/inconformedia.png"
            w="45"
            h="45"
            mr="2"
          />
          <Text
            fontSize={isWideVersion ? "2xl" : "md"}
            fontWeight="bold"
            color="#000"
          >
            uppernodes
          </Text>
          <Flex
            style={{ height: 50, width: 1, backgroundColor: "#eee" }}
            mx="5"
          />
          {isWideVersion && (
            <>
              <Menu>
                <MenuButton>
                  <Text fontSize="md" cursor="pointer" color="#000">
                    Adicionar
                  </Text>
                </MenuButton>
                <MenuList zIndex="2" bg="#eee" py="0">
                  <MenuItem
                    justifyContent="space-between"
                    py="4"
                    onClick={() => {
                      onOpen();
                    }}
                    color="#333"
                    fontSize="sm"
                  >
                    Curso
                    <Icon as={BiListPlus} fontSize="md" color="#facebook.400" />
                  </MenuItem>
                  <MenuItem
                    justifyContent="space-between"
                    py="4"
                    onClick={() => {
                      onOpen();
                    }}
                    color="#333"
                    fontSize="sm"
                  >
                    Instrutor
                    <Icon as={BiUserPlus} fontSize="md" color="#facebook.400" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
        <Flex flexDir="row" align="center">
          <Menu>
            <MenuButton
              mr="5"
              onClick={() => {
                setSearch(!search);
                setSearchResults(false);
              }}
            >
              <Icon as={RiSearch2Line} mt="1.5" color="#777" fontSize="25" />
            </MenuButton>
            <MenuList
              zIndex="2"
              bg="#eee"
              style={{ height: "40vh" }}
            ></MenuList>
          </Menu>
          <Menu>
            <MenuButton mr="5">
              <Icon
                as={RiNotification2Line}
                mt="1.5"
                color="#777"
                fontSize="25"
              />
            </MenuButton>
            <MenuList
              zIndex="2"
              bg="#eee"
              style={{ height: "40vh" }}
            ></MenuList>
          </Menu>
          <Menu>
            <MenuButton>
              <Avatar name={user ? user.name : "A"} size="sm" />
            </MenuButton>
            <MenuList zIndex="2" bg="#eee" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                {user &&
                  user.name.split(" ")[0] +
                    " " +
                    user.name.split(" ")[user.name.split(" ").length - 1]}
                <Icon as={BiListPlus} fontSize="md" color="#facebook.400" />
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  signOut();
                }}
                color="#333"
                fontSize="sm"
              >
                Sair da sua conta
                <Icon as={BiLogOut} fontSize="md" color="#facebook.400" />
              </MenuItem>
            </MenuList>
          </Menu>
          {!isWideVersion && (
            <Menu>
              <MenuButton ml="5">
                <Icon as={RiMenuLine} fontSize="22" color="#333" />
              </MenuButton>
              <MenuList bg="#eee" py="0">
                <MenuItem
                  justifyContent="space-between"
                  py="4"
                  onClick={() => {
                    onOpen();
                  }}
                  color="#333"
                  fontSize="sm"
                >
                  Feature
                  <Icon as={BiListPlus} fontSize="md" color="#facebook.400" />
                </MenuItem>
                <MenuItem
                  justifyContent="space-between"
                  py="4"
                  onClick={() => {
                    onOpen();
                  }}
                  color="#333"
                  fontSize="sm"
                >
                  Feature
                  <Icon as={BiUserPlus} fontSize="md" color="#facebook.400" />
                </MenuItem>
                <MenuItem
                  justifyContent="space-between"
                  py="4"
                  onClick={() => {
                    onOpen();
                  }}
                  color="#333"
                  fontSize="sm"
                >
                  Feature
                  <Icon as={BiListPlus} fontSize="md" color="#facebook.400" />
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    );
  }

  function Dashboard() {
    return (
      <>
        <Flex mt="4" flexDir="row" justify="space-between" alignItems="center">
          <Text color="#000" fontWeight="bold" mt="4" fontSize="2xl">
            Dashboard
          </Text>
          <Menu>
            <MenuButton mt="4" style={{ height: 40 }}>
              <Flex
                flexDir="row"
                borderRadius="5"
                justify="center"
                align="center"
                style={{ width: 100, height: 40 }}
                bg="#FFF"
              >
                <Text color="#555">7 dias</Text>
                <Icon as={FiChevronDown} fontSize="16" color="#555" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList bg="#FFF" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                14 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                30 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                Histórico
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex
          flexDir="column"
          mt="4"
          p="4"
          borderRadius="12"
          bg="#FFF"
          width="100%"
        >
          <Flex borderRadius="12" bg="#FFF" width="100%">
            <StatGroup
              flexDir="row"
              justifyContent="space-between"
              width="100vw"
            >
              <Stat>
                <StatLabel color="#000" fontSize="md">
                  Assinaturas
                </StatLabel>
                <StatNumber color="#333">345</StatNumber>
                <StatHelpText color="#333">
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel color="#000" fontSize="md">
                  Faturamento
                </StatLabel>
                <StatNumber color="#333">50.715</StatNumber>
                <StatHelpText color="#333">
                  <StatArrow type="increase" />
                  18.36%
                </StatHelpText>
              </Stat>
              <Stat>
                <StatLabel color="#000" fontSize="md">
                  Assinantes
                </StatLabel>
                <StatNumber color="#333">345</StatNumber>
                <StatHelpText color="#333">
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Flex>

          <Flex
            justify="space-between"
            align="flex-end"
            pb="4"
            borderBottom="1px solid #e3e3e3"
          >
            <Text color="#333" mt="4">
              Envie para{" "}
              <div style={{ fontWeight: "bold" }}>345 novos assinantes</div>
              uma mensagem privada.
            </Text>
            <Flex
              style={{ height: 40 }}
              px="4"
              cursor="pointer"
              flexDir="row"
              bg="#FFF"
              border="1px solid #BBB"
              justify="center"
              align="center"
              borderRadius="5"
            >
              <Text color="#333" fontWeight="bold">
                Enviar
              </Text>
            </Flex>
          </Flex>

          <Flex justify="space-between" align="flex-end" pb="1">
            <Text color="#333" mt="4">
              <div style={{ fontWeight: "bold" }}>R$8.425,45</div>
              Disponível para retirada
            </Text>
            <Flex
              style={{ height: 40 }}
              px="4"
              cursor="pointer"
              flexDir="row"
              bg="#FFF"
              border="1px solid #BBB"
              justify="center"
              align="center"
              borderRadius="5"
            >
              <Text color="#333" fontWeight="bold">
                Retirar
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }

  function Banner() {
    return (
      <Flex mt="6" flexDir="column" bg="#FFF" p="4" borderRadius="12">
        <Text color="#000" fontWeight="bold" fontSize="2xl">
          Está na hora de monetizar
        </Text>
        <Text color="#000" fontSize="md">
          Um software desenvolvido para quem deseja monetizar o seu conteúdo.
        </Text>
        <Text color="#000" fontSize="md">
          Uma maneira simples de vender.
        </Text>
        <Flex flexDir="row" align="center" justify="space-between">
          <Flex
            onClick={() => [onOpen()]}
            cursor="pointer"
            mt="4"
            borderRadius="5"
            style={{ height: 40, width: 200 }}
            bg="#333"
            justifyContent="center"
            alignItems="center"
            p="3"
          >
            <Text color="#FFF">Criar conteudo</Text>
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Products() {
    const products = [
      {
        avatar: "https://github.com/0xrfsd.png",
        faturamento: 120000,
        title: "Desenvolvimento web",
      },
      {
        avatar: "https://github.com/ricardofsdomene.png",
        faturamento: 200000,
        title: "Desenvolvimento Mobile",
      },
    ];

    return (
      <>
        <Flex mt="4" flexDir="row" justify="space-between" alignItems="center">
          <Text color="#000" fontWeight="bold" mt="4" fontSize="2xl">
            Produtos
          </Text>
          <Menu>
            <MenuButton mt="4" style={{ height: 40 }}>
              <Flex
                flexDir="row"
                borderRadius="5"
                justify="center"
                align="center"
                style={{ width: 100, height: 40 }}
                bg="#FFF"
              >
                <Text color="#555">7 dias</Text>
                <Icon as={FiChevronDown} fontSize="16" color="#555" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList bg="#FFF" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                14 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                30 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                Histórico
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flexDir="column" mt="4" bg="#FFF" borderRadius="5" p="4">
          <Flex justify="space-between" w="100%" pb="3">
            <Text color="#333">Produtos</Text>
            <Text color="#333">Receita</Text>
          </Flex>
          <div style={{ height: 1, width: "100%", backgroundColor: "#eee" }} />
          <Flex flexDir="column" justify="space-between">
            {products.map((product, i) => {
              return (
                <Flex
                  key={i}
                  py="4"
                  align="center"
                  justify="space-between"
                  borderBottom={i !== products.length - 1 && "1px solid #eee"}
                  pb={i !== products.length - 1 && "3"}
                >
                  <Flex align="center">
                    <Image
                      borderRadius="5"
                      src={product.avatar}
                      style={{ height: 50, width: 50 }}
                      mr="2"
                    />
                    <Text color="#333" fontSize="sm">
                      {product.title}
                    </Text>
                  </Flex>
                  <Text color="#333" fontSize="md" fontWeight="bold">
                    R${product.faturamento}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
          <Flex
            _hover={{
              transition: "ease 0.5s",
              border: "3px solid #000",
            }}
            w="100%"
            mt="5"
            bg="#fff"
            border="3px solid #ddd"
            borderRadius="5"
            justify="center"
            align="center"
            p="3"
            cursor="pointer"
          >
            <Text color="#000" fontWeight="bold">
              Ver todos os produtos
            </Text>
          </Flex>
        </Flex>
      </>
    );
  }

  function Messages() {
    const messages = [
      {
        name: "El Ethel",
        username: "@ethel",
        avatar: "https://github.com/0xrfsd.png",
        comment: "The app looks great!",
        timestamp: "1h",
      },
      {
        name: "Daniel Simoes",
        username: "@danielscabral",
        avatar: "https://github.com/ethel.png",
        comment: "Achei facil de usar",
        timestamp: "2h",
      },
      {
        name: "Micaely Beatriz",
        username: "@ximicas",
        avatar: "https://github.com/esther.png",
        comment: "Muito bonita as interfaces.",
        timestamp: "3h",
      },
    ];

    return (
      <>
        <Flex mt="4" flexDir="row" justify="space-between" alignItems="center">
          <Text color="#000" fontWeight="bold" mt="4" fontSize="2xl">
            Mensagens
          </Text>
          <Menu>
            <MenuButton mt="4" style={{ height: 40 }}>
              <Flex
                flexDir="row"
                borderRadius="5"
                justify="center"
                align="center"
                style={{ width: 100, height: 40 }}
                bg="#FFF"
              >
                <Text color="#555">7 dias</Text>
                <Icon as={FiChevronDown} fontSize="16" color="#555" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList bg="#FFF" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                14 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                30 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                Histórico
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flexDir="column" mt="4" bg="#FFF" borderRadius="5" p="4">
          <Flex flexDir="column" justify="space-between">
            {messages.map((message, i) => {
              return (
                <Flex
                  py="4"
                  align="center"
                  justify="space-between"
                  borderBottom={i !== messages.length - 1 && "1px solid #eee"}
                  pb={i !== messages.length - 1 && "3"}
                >
                  <Flex align="center" justify="space-between" w="100%">
                    <Flex>
                      <Image
                        borderRadius="5"
                        src={message.avatar}
                        style={{ height: 50, width: 50 }}
                        mr="2"
                      />
                      <Flex flexDir="column">
                        <Flex align="center">
                          <Text color="#000" fontWeight="bold" fontSize="sm">
                            {message.name}
                          </Text>
                          <Text color="#333" fontSize="xs" ml="1">
                            {message.username}
                          </Text>
                        </Flex>
                        <Text color="#000" fontSize="lg">
                          {message.comment}
                        </Text>
                      </Flex>
                    </Flex>
                    <Text color="#555">{message.timestamp}</Text>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          <Flex
            _hover={{
              transition: "ease 0.5s",
              border: "3px solid #000",
            }}
            w="100%"
            mt="5"
            bg="#fff"
            border="3px solid #ddd"
            borderRadius="5"
            justify="center"
            align="center"
            p="3"
            cursor="pointer"
          >
            <Text color="#000" fontWeight="bold">
              Ver todas as mensagens
            </Text>
          </Flex>
        </Flex>
      </>
    );
  }

  function Todo() {
    const [selected, setSelected] = useState("");

    const [todos, setTodos] = useState([
      {
        id: "0x",
        title: "uppernodes ...",
      },
      {
        id: "1x",
        title: "uppernodes...",
      },
      {
        id: "2x",
        title: "uppernodes...",
      },
    ]);

    useEffect(() => {
      if (selected) {
        setTimeout(() => {
          const filtered = todos.filter((item) => item.id !== selected);
          setTodos(filtered);
        }, 3333);
      }
    }, [selected]);

    return (
      <>
        <Flex mt="4" flexDir="row" justify="space-between" alignItems="center">
          <Text color="#000" fontWeight="bold" mt="4" fontSize="2xl">
            Tarefas
          </Text>
          <Menu>
            <MenuButton mt="4" style={{ height: 40 }}>
              <Flex
                flexDir="row"
                borderRadius="5"
                justify="center"
                align="center"
                style={{ width: 100, height: 40 }}
                bg="#FFF"
              >
                <Text color="#555">de hoje</Text>
                <Icon as={FiChevronDown} fontSize="16" color="#555" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList bg="#FFF" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                +7 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                +14 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                +30 dias
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flexDir="column" mt="4" bg="#FFF" borderRadius="5" p="4">
          {tarefa && (
            <Flex flexDir="column" justify="space-between">
              {todos.map((todo, i) => {
                return (
                  <Flex
                    onClick={() => {
                      setSelected(todo.id);
                    }}
                    py="4"
                    align="center"
                    justify="space-between"
                    borderBottom={i !== todos.length - 1 && "1px solid #eee"}
                    pb={i !== todos.length - 1 && "3"}
                  >
                    <Text color="#333">{todo.title}</Text>
                    <Flex
                      align="center"
                      justify="center"
                      bg="#eee"
                      cursor="pointer"
                      style={{ height: 25, width: 25 }}
                      borderRadius="5"
                    >
                      {selected === todo.id && <Text fontSize="25">✅</Text>}
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          )}
          <Flex
            onClick={() => setTarefa(!tarefa)}
            _hover={{
              transition: "ease 0.5s",
              border: "3px solid #000",
            }}
            w="100%"
            mt={tarefa ? "5" : "0"}
            bg="#fff"
            border="3px solid #ddd"
            borderRadius="5"
            justify="center"
            align="center"
            p="3"
            cursor="pointer"
          >
            <Text color="#000" fontWeight="bold">
              Adicionar tarefa
            </Text>
          </Flex>
        </Flex>
      </>
    );
  }

  function Projects() {
    const projetos = [
      {
        status: "pause",
        name: "eudigonao",
        username: "@eudigonao",
        avatar: "https://github.com/ricardofsdomene.png",
        repository: "https://github.com/ricardofsdomene/eudignao",
        team: ["Rhuan Marques"],
        comments: [],
        todo: [],
        totest: [],
        tested: [],
        build: [],
        deadline: "pra hoje",
        timestamp: "1h",
      },
      {
        status: "pause",
        name: "Financial Co",
        username: "@financial.company",
        avatar: "https://github.com/ricardofsdomene.png",
        repository: "https://github.com/ricardofsdomene/financial-next",
        team: ["Lucas F. Fleury"],
        comments: [],
        todo: [],
        totest: [],
        tested: [],
        build: [],
        deadline: "1st july",
        timestamp: "1h",
      },
      {
        status: "dev",
        name: "Inconformedia",
        username: "@inconformedia",
        avatar: "https://github.com/ricardofsdomene.png",
        repository: "https://github.com/ricardofsdomene/financial-next",
        team: ["Alice"],
        comments: [],
        todo: [],
        totest: [],
        tested: [],
        build: [],
        deadline: "t/weekend",
        timestamp: "1h",
      },
    ];

    return (
      <>
        <Flex mt="4" flexDir="row" justify="space-between" alignItems="center">
          <Text color="#000" fontWeight="bold" mt="4" fontSize="2xl">
            Projetos
          </Text>
          <Menu>
            <MenuButton mt="4" style={{ height: 40 }}>
              <Flex
                flexDir="row"
                borderRadius="5"
                justify="center"
                align="center"
                style={{ width: 100, height: 40 }}
                bg="#FFF"
              >
                <Text color="#555">7 dias</Text>
                <Icon as={FiChevronDown} fontSize="16" color="#555" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList bg="#FFF" py="0">
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                14 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                30 dias
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                py="4"
                onClick={() => {
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                Histórico
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex flexDir="column" mt="4" bg="#FFF" borderRadius="5" p="4">
          <Flex flexDir="column" justify="space-between">
            {projetos.map((projeto, i) => {
              return (
                <Flex
                  align="center"
                  pt={i !== 0 && "3"}
                  justify="space-between"
                  borderBottom={i !== projetos.length - 1 && "1px solid #eee"}
                  pb={i !== projetos.length - 1 && "3"}
                >
                  <Flex align="center" justify="space-between" w="100%">
                    <Flex align="center" w="100%">
                      <Image
                        borderRadius="5"
                        src={projeto.avatar}
                        style={{ height: 60, width: 60 }}
                        mr="2"
                      />
                      <Flex flexDir="column" w="100%">
                        <Flex flexDir="column" w="100%">
                          <Flex justify="space-between" w="100%" align="center">
                            <Text color="#000" fontWeight="bold" fontSize="md">
                              {projeto.name}
                            </Text>
                            <Flex align="center">
                              <Flex
                                bg="#eee"
                                borderRadius="full"
                                py="0.5"
                                px="4"
                              >
                                <Text fontSize="sm" color="#333">
                                  {projeto.status}
                                </Text>
                              </Flex>
                              <Icon
                                ml="2"
                                as={RiShareLine}
                                color="#333"
                                fontSize="sm"
                              />
                            </Flex>
                          </Flex>
                          <Text color="#333" fontSize="xs">
                            {projeto.repository}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Text color="#555" fontSize="sm"></Text>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
          <Flex
            _hover={{
              transition: "ease 0.5s",
              border: "3px solid #000",
            }}
            w="100%"
            mt="5"
            bg="#fff"
            border="3px solid #ddd"
            borderRadius="5"
            justify="center"
            align="center"
            p="3"
            cursor="pointer"
          >
            <Text color="#000" fontWeight="bold">
              Ver todos os projetos
            </Text>
          </Flex>
        </Flex>
      </>
    );
  }

  function SearchBar() {
    return (
      <Flex
        w="100%"
        style={{
          paddingTop: 80,
        }}
        px="4"
        align="center"
        justify="space-between"
      >
        <Menu>
          <MenuButton>
            <Flex
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              border="1px solid #e0e0e0"
              style={{
                height: 50,
                width: 300,
              }}
              borderRadius="5"
              bg="#FFF"
              align="center"
              justify="space-between"
              px="4"
            >
              <Text color="#333" fontWeight="bold">
                Adicionar
              </Text>
              <Text color="#333" cursor="pointer" fontWeight="bold">
                Curso
              </Text>
              <Text color="#333" cursor="pointer" fontWeight="bold">
                E-Book
              </Text>
              <Flex
                cursor="pointer"
                border="1px solid #e0e0e0"
                bg="#333"
                justify="center"
                align="center"
                p="4"
                style={{
                  height: 30,
                  width: 30,
                }}
                borderRadius="full"
              >
                <Icon as={BiListPlus} color="#FFF" fontSize="18" />
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList
            style={{
              width: 300,
            }}
            boxShadow="rgba(0,0,0,0.1) 0 0 10px"
            mt="1"
            bg="#FFF"
            borderRadius="5"
            zIndex="3"
            border="1px solid #e0e0e0"
            py="0"
          >
            <Link href="/create/curso">
              <MenuItem
                _focus={{
                  borderRadius: 5,
                  backgroundColor: "#eee",
                }}
                _hover={{
                  borderRadius: 5,
                  backgroundColor: "#eee",
                }}
                justifyContent="space-between"
                py="4"
                borderRadius="5"
                color="#333"
                fontSize="sm"
              >
                Adicionar Curso
              </MenuItem>
            </Link>
            <MenuItem
              _hover={{
                borderRadius: 5,
                backgroundColor: "#eee",
              }}
              borderRadius="5"
              justifyContent="space-between"
              py="4"
              onClick={() => {
                signOut();
              }}
              color="#333"
              fontSize="sm"
            >
              Adicionar E-Book
            </MenuItem>
          </MenuList>
        </Menu>
        <Flex align="center">
          <Menu>
            <MenuButton>
              <Flex
                ml="4"
                cursor="pointer"
                boxShadow="rgba(0,0,0,0.1) 0 0 10px"
                style={{
                  height: 50,
                  width: 50,
                }}
                bg="#fff"
                align="center"
                justify="center"
                borderRadius="full"
              >
                <Icon as={RiVideoUploadLine} color="#333" fontSize="18" />
              </Flex>
            </MenuButton>
            <MenuList
              style={{
                width: 300,
                height: 300,
              }}
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
              mt="1"
              bg="#FFF"
              borderRadius="5"
              zIndex="3"
              border="1px solid #e0e0e0"
              py="0"
            ></MenuList>
          </Menu>
        </Flex>
      </Flex>
    );
  }

  function Content() {
    return (
      <Flex
        w={isWideVersion ? "40vw" : "100%"}
        px="auto"
        flexDir="column"
        justify="center"
        align="center"
        pr="10"
      >
        <Text
          color="#000"
          w="100%"
          textAlign="center"
          fontSize={isWideVersion ? "4xl" : "3xl"}
          maxW={600}
        >
          Acesso a educação a distância para todos. Agora gratuito para todos.
        </Text>
        <Text color="#000" w="100%" textAlign="center" fontSize="sm" maxW={600}>
          Com nossos serviços de criação de cursos com módulos e aulas
          personalizadas você consegue além de fazer disso uma fonte de renda
          espalhar conhecimento pelo mundo.
        </Text>
      </Flex>
    );
  }

  function Search() {
    return (
      <Flex
        mt="3"
        style={{
          height: 60,
          width: "100%",
        }}
        bg="#e0e0e0"
        align="center"
        pl="4"
        borderRadius="5"
      >
        <Icon as={RiSearch2Line} color="#b0b0b0" fontSize="22" />
        <Input
          onChange={(e) => {
            if (e.target.value !== "") {
              setSearchResults(!searchResults);
            }
          }}
          color="#333"
          _focus={{
            border: "0px solid #0069F6",
          }}
          placeholder="Pesquisar"
          style={{
            height: 50,
            width: "100%",
          }}
          border="0px solid transparent"
          borderRadius="5"
          bg="#e0e0e0"
        />
      </Flex>
    );
  }

  function SearchResults() {
    return (
      <Flex
        style={{
          height: 200,
          width: "100%",
        }}
        bg="#e0e0e0"
      ></Flex>
    );
  }

  // if (!user) {
  //   return (
  //     <Flex justify="center" align="center" h="100vh" w="100vw">
  //       <Spinner size="xl" color="#42ba96" />
  //     </Flex>
  //   );
  // }

  function Greeting() {
    return (
      <>
        <Flex align="center" justify="space-between">
          <Flex flexDir="column">
            <Text mt="5" color="#333" fontSize="md">
              Boa noite
            </Text>
            <Text color="#000" fontWeight="bold" fontSize="3xl">
              Ricardo
            </Text>
          </Flex>
          <Text fontSize="4xl" mt="4" ml="4">
            👋
          </Text>
        </Flex>
      </>
    );
  }

  function ContentCard() {
    return (
      <Flex
        mt="4"
        borderRadius="5"
        style={{
          width: isWideVersion ? 600 : "100%",
          height: 300,
        }}
        boxShadow="rgba(0,0,0,0.1) 0 0 10px"
        bg="#FFF"
      ></Flex>
    );
  }

  return (
    <Flex flexDir="column" bg="#eee" h="100vh">
      <TopNav />
      <SearchBar />
      <Flex flexDir="column" p="4">
        {!isWideVersion ? (
          <>
            <Content />
            <ContentCard />
          </>
        ) : (
          <>
            <Flex w="100%" justify="center" mt="4" align="center">
              <Content />
              <ContentCard />
              {/* <Image
                src="https://github.com/ricardofsdomene.png"
                style={{
                  borderRadius: 5,
                  width: size.width / 2 - 50,
                }}
              /> */}
            </Flex>
          </>
        )}
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={() => {
          onClose();
          setPublicacao(false);
          setCurso(false);
          setProduto(false);
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="#333" />

          {!publicacao && !curso && !produto ? (
            <>
              <DrawerBody pb="4" maxWidth={"100%"} width={600} mx="auto">
                <Text my="2" color="#333" fontWeight="bold" fontSize={22}>
                  Adicionar
                </Text>
                <Flex mt="4" flexDir="row" width="100%" justify="space-between">
                  <Flex
                    onClick={() => {
                      if (curso || produto) {
                        setProduto(false);
                        setCurso(false);
                        setPublicacao(!publicacao);
                      } else {
                        setPublicacao(!publicacao);
                      }
                    }}
                    cursor="pointer"
                    flexDir="row"
                    bg="#333"
                    justify="center"
                    align="center"
                    borderRadius="5"
                    p="4"
                    style={{ height: 65 }}
                    w="49%"
                  >
                    <Text color="#FFF" fontSize="lg" fontWeight="bold">
                      Projeto
                    </Text>
                  </Flex>
                  <Flex
                    onClick={() => {
                      if (publicacao || produto) {
                        setPublicacao(false);
                        setProduto(false);
                        setCurso(!curso);
                      } else {
                        setCurso(!curso);
                      }
                    }}
                    cursor="pointer"
                    flexDir="row"
                    justify="center"
                    bg="#333"
                    align="center"
                    borderRadius="5"
                    p="4"
                    style={{ height: 65 }}
                    w="49%"
                  >
                    <Text color="#FFF" fontSize="lg" fontWeight="bold">
                      Curso
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  mt="2"
                  onClick={() => {
                    if (publicacao || curso) {
                      setPublicacao(false);
                      setCurso(false);
                      setProduto(!produto);
                    } else {
                      setProduto(!produto);
                    }
                  }}
                  cursor="pointer"
                  flexDir="row"
                  bg="#333"
                  justify="center"
                  align="center"
                  borderRadius="5"
                  p="4"
                  style={{ height: 65 }}
                  w="100%"
                >
                  <Text color="#FFF" fontSize="lg" fontWeight="bold">
                    Produto
                  </Text>
                </Flex>
              </DrawerBody>
            </>
          ) : publicacao ? (
            <>
              <Text>Publi</Text>
            </>
          ) : curso ? (
            <>
              <Text>Curso</Text>
            </>
          ) : produto ? (
            <>
              <Text>Produto</Text>
            </>
          ) : null}

          {publicacao && (
            <DrawerFooter>
              <Flex
                maxW={550}
                mx="auto"
                flexDir="row"
                w="100%"
                style={{ height: 50 }}
                borderRadius="5"
                bg="#333"
                justify="center"
                align="center"
              >
                <Text color="#FFF" fontWeight="bold">
                  Adicionar
                </Text>
              </Flex>
            </DrawerFooter>
          )}
          {curso && (
            <DrawerFooter>
              <Flex
                maxW={550}
                mx="auto"
                flexDir="row"
                w="100%"
                style={{ height: 50 }}
                borderRadius="5"
                bg="#333"
                justify="center"
                align="center"
              >
                <Text color="#FFF" fontWeight="bold">
                  Adicionar
                </Text>
              </Flex>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
