import {
  Box,
  Flex,
  Button,
  Input,
  ButtonGroup,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Image,
  Heading,
  Text,
  Stack,
  useToast,
  Tooltip,
  Icon,
  Table,
  Thead,
  Tbody,
  IconButton,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiVolumeFull } from "react-icons/bi";

import {
  MdOutlinePlayCircleFilled,
  MdSkipPrevious,
  MdSkipNext,
  MdPauseCircleFilled,
} from "react-icons/md";
import GridMain from "../Pages/Grid";
import { useSelector } from "react-redux";
import { useState, useRef, useContext } from "react";
import Sidebar from "../Components/side";
import Footermain from "../Pages/Footermain";
import { FaSearch } from "react-icons/fa";
import { MdOutlineSettingsVoice } from "react-icons/md";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import store from "../Redux/store";
import { FaPlay } from "react-icons/fa";
import {MyContext} from '../Components/context'

const SearchPage = ({ action, debounce }) => {
  const { myState, toggle } = useContext(MyContext);
  const [liked, setLike] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  // const[data2,setData2]=useState(null)
  // store.subscribe(()=>{
  //   // setData2(store.getState().searchResults)
  //   console.log(store.getState().searchResults)
  // })
  let toast = useToast();
  let [speech, setSpeech] = useState("");
  let [searchText, setSearchText] = useState("");
  let timerId = useRef(null);
  // console.log(state)
  let data = useSelector((store) => {
    return store.CategoryPlaylists;
  });
  // console.log(data)
  let data2 = useSelector((store) => {
    return store.searchResults;
  });
  // console.log(data2)
  let data3 = useSelector((store) => {
    return store.getPlaylists;
  });
  console.log(data3);
  const { transcript, reset, listening } = useSpeechRecognition();
  // action(transcript)

  if (listening) {
    timerId.current = setTimeout(() => {
      clearTimeout(timerId.current);
      action(transcript);
      setSpeech(transcript);
    }, 2000);
  }
  // console.log(speech,searchText);
  const handleMouseEnter = (value) => {
    setIsHovered(value);
    console.log(value,"ohgafosdihf")
  };

  const handleMouseLeave = () => {
    setIsHovered();
    console.log(isHovered,"hover value")
  };

  console.log(data2,"from search page")
  return (
    <div style={{ background: "rgba(0, 0, 0, 0.900)" }}>
      <Sidebar />

      <Flex
        alignItems="center"
        justify="space-between"
        p="4"
        bg="rgb(16,16,16)"
        position="sticky"
        top="0"
        // position={}
      >
        <InputGroup w="35rem" ml="22rem">
          <InputLeftElement
            pointerEvents="none"
            fontSize={25}
            mt="0.3rem"
            ml="0.5rem"
            children={<FaSearch />}
          />
          <Input
            type="ser"
            borderRadius="5rem"
            value={speech ? speech : searchText}
            bg="white"
            placeholder="Search here...."
            p=" 1.5rem 3.5rem"
            onChange={(e) => {
              setSpeech(null);
              setSearchText(e.target.value);
              action(e.target.value);
            }}
          />
          <InputRightElement
            fontSize={25}
            mr="0.7rem"
            mt="0.2rem"
            children={<MdOutlineSettingsVoice />}
            onClick={SpeechRecognition.startListening}
          />
        </InputGroup>

        <Box>
          <ButtonGroup spacing={2}>
            <Button colorScheme="black" color="white" mr="2">
              Sign Up
            </Button>
            <Button p={6} borderRadius="20px">
              Log In
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>

      {debounce.length == 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: "30px",
            width: "84%",
            margin: "15px",
            marginLeft: "14%",
            marginTop: "1rem",
            marginBottom: "10px",
            padding: "2rem",
          }}
        >
          {data.map((elm, i) => {
            return (
              <div key={i}>
                <img src={elm.icons[0].url} style={{ borderRadius: "1rem" }} />

                <p
                  style={{
                    color: "white",
                    position: "absolute",
                    marginTop: "-60px",
                    fontSize: "25px",
                    marginLeft: "15px",
                  }}
                >
                  {elm.name}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            width: "84%",
            margin: "15px",
            marginLeft: "14%",

            marginBottom: "10px",
            padding: "2rem",
          }}
        >
          <Flex columnGap={"3rem"}>
            <Box w="35rem" mb="2rem">
              <Heading color="white">Top Results</Heading>
            </Box>
            <Box>
              <Heading color="white">Songs</Heading>
            </Box>
          </Flex>
          <Flex>
            {data2.length > 0 && (
              <>
                <Box
                  shadow="0 0 4px black"
                  borderRadius="1rem"
                  color="white"
                  w="35rem"
                  p="1rem"
                  lineHeight="2rem"
                  _hover={{
                    bg:'rgba(40,40,40,255)',
                    boxShadow:'dark-lg'
                  }}
                  onMouseEnter={() => handleMouseEnter(data2[1].id)}
                  
                  onMouseLeave={handleMouseLeave}
                >
                  <Image w="10rem" src={data2[1].album.images[1].url} />
                  <Heading mt="1rem">{data2[1].album.name}</Heading>
                  <Flex mt="0.5rem" color="#b3b3b3">
                    <p>{data2[1].artists[0].name + ","}</p>
                    <p style={{ margin: "0 0.2rem" }}>
                      {data2[1].artists[1].name}
                    </p>
                    <p>{data2[1].artists[2].name}</p>
                  </Flex>
                  <Flex justifyContent="right">
                     <IconButton
                       position="absolute"
                       borderRadius={30}
                       variant="ghost"
                       aria-label="Play"
                       color="black"
                       bg="green"
                       icon={<FaPlay />}
                       size="lg"
                       opacity={isHovered == data2[1].id ? 1 : 0}
                       transition="opacity 0.2s"
                       transform="translate(-11px, -55px)"
                     />
                    
                   </Flex>
                </Box>
              </>
            )}
            <Box ml="3rem" w="50rem">
              <Table colorScheme="facebook">
                <Tbody
                  className="playlist-tr"
                  bg={"rgb(25,25,25)"}
                  color={"white"}
                >
                  {data2.length > 0 &&
                    data2.map((e, id) => {
                      return (
                        <Tr>
                          <Td border={"0"}>
                            <Flex alignItems={"center"}>
                              <Image
                                src={e.album.images[2].url}
                                w={"40px"}
                                h={"40px"}
                                mr={"16px"}
                              />
                              <Stack direction={"column"} spacing={"1"}>
                                <Text
                                  fontSize={"md"}
                                  noOfLines={1}
                                  _hover={{ textDecoration: "underline" }}
                                >
                                  {e.name}
                                </Text>
                                <Text
                                  fontSize={"sm"}
                                  noOfLines={1}
                                  _hover={{ textDecoration: "underline" }}
                                >
                                  {e.artists.map((e) => e.name).join(", ")}
                                </Text>
                              </Stack>
                            </Flex>
                          </Td>

                          <Tooltip
                            bg="black"
                            p={"10px 16px"}
                            label="Add to like songs"
                            placement={"left"}
                            hasArrow
                          >
                            <Td border={"0"}>
                              <Icon
                                onClick={(event) => {
                                  event.stopPropagation();
                                  toast({
                                    title: e.name,
                                    description: "Added to Liked Song",
                                    status: "success",
                                    duration: 2000,
                                  });

                                  localStorage.setItem(
                                    "liked",
                                    JSON.stringify([...liked, e])
                                  );
                                  setLike([...liked, e]);
                                }}
                                as={AiOutlineHeart}
                              />
                            </Td>
                          </Tooltip>
                          <Td border={"0"}>
                            {Math.floor(e.duration_ms / 60000)}:
                            {((e.duration_ms % 60000) / 1000).toFixed(0)}
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </Box>
          </Flex>
          <Heading color="white" mt="2rem">
            Related Search
          </Heading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5,1fr)",
              gap: "2rem",
              marginTop: "4rem",
            }}
          >
            {data3.map((elm) => {
              return (
                <div
                  style={{
                    color: "white",
                    boxShadow: "0 0 4px black",
                    padding: "1rem",
                    borderRadius: "1rem",
                  }}
                >
                  <img src={elm.images[0].url} alt="" />
                  <Heading as={"h3"} fontSize={"1rem"} mt="0.8rem">
                    {elm.name}
                  </Heading>
                  <p style={{ marginTop: "0.5rem", color: "#b3b3b3" }}>
                    {elm.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Footermain />
    </div>
  );
};

export default SearchPage;
