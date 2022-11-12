import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import styled from 'styled-components';
import {
  Box, Button, ButtonGroup,
  Container,
  Heading,
  NumberInput, NumberInputField, NumberInputStepper,
  NumberIncrementStepper, NumberDecrementStepper,
  Switch,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td,
  TableCaption, TableContainer,
} from '@chakra-ui/react';
import { MdBuild, MdDataSaverOff } from "react-icons/md"
import { db } from "../../utils/firebase";
import Loading from '../admin_components/Loading';
import Fail from '../admin_components/Loading/Fail';
import { defaultSliderSettings } from '../../data/defaultSliderSettings';

const ASCContainer = styled.div`
  padding-left: 50px;
`

const AdminSliderController = () => {
  const [sliderConfig, setSliderConfig] = useState({})
  const [loading, setLoading] = useState(false);
  const [loadFail, setLoadFail] = useState(false);
  const [projDots, setProjDots] = useState(true);
  const [projInfinite, setProjInfinite] = useState(true);
  const [projSlidesToShow, SetProjSlidesToShow] = useState();
  const [projSlidesToScroll, setProjSlidesToScroll] = useState(1);
  const [projInitialSlide, setProjInitialSlide] = useState(0);
  const [projAutoPlay, setProjAutoPlay] = useState(true);
  const [projSpeed, setProjSpeed] = useState(100);
  const [projAutoplaySpeed, setProjAutoplaySpeed] = useState(2000);

  const [proj1BP, setProj1BP] = useState(1200);
  const [proj1Dots, setProj1Dots] = useState(true);
  const [proj1Infinite, setProj1Infinite] = useState(true);
  const [proj1SlidesToShow, SetProj1SlidesToShow] = useState(1);
  const [proj1SlidesToScroll, setProj1SlidesToScroll] = useState(1);
  const [proj1InitialSlide, setProj1InitialSlide] = useState(0);

  const [proj2BP, setProj2BP] = useState(600);
  const [proj2Dots, setProj2Dots] = useState(true);
  const [proj2Infinite, setProj2Infinite] = useState(true);
  const [proj2SlidesToShow, SetProj2SlidesToShow] = useState(1);
  const [proj2SlidesToScroll, setProj2SlidesToScroll] = useState(1);
  const [proj2InitialSlide, setProj2InitialSlide] = useState(0);

  const [proj3BP, setProj3BP] = useState(480);
  const [proj3Dots, setProj3Dots] = useState(true);
  const [proj3Infinite, setProj3Infinite] = useState(true);
  const [proj3SlidesToShow, SetProj3SlidesToShow] = useState(1);
  const [proj3SlidesToScroll, setProj3SlidesToScroll] = useState(1);
  const [proj3InitialSlide, setProj3InitialSlide] = useState(0);

  // useEffect(() => {
  //   setLoading(true); 
  //   const unsubscribe = onSnapshot(doc(db, "Slider", "setting"),
  //     async (snapshot) => {
  //       if (snapshot.docs.length !== 0) {
  //         const configData = await snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         setSliderConfig(configData);
  //         setLoading(false);
  //       } else {
  //         setLoading(false);
  //         setLoadFail(true);
  //         console.log("Nothing in database")
  //       }
  //     },
  //     (error) => {
  //       console.log('Error message', error);
  //     }
  //   );
  //   return () => unsubscribe();
  // }, []);

  const resetConfig = () => {
    setSliderConfig(defaultSliderSettings);

  }

  const saveConfig = () => {
    setSliderConfig();
  }

  return (
    <ASCContainer>
      <Container w='800px' bg='gray.100' centerContent>
        <Heading
          m='10px'
          size="lg"
          color=''
        >
          Sidebar Controller
        </Heading>

        {loading ? (
          <Loading />
        ) : loadFail ? (
          <Fail />
        ) : (
          <Box>
            <TableContainer>
              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>General</Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Dots</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme="green"
                        isChecked={projDots}
                      />
                    </Td>
                    <Td>Infinite</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme='green'
                        isChecked={projInfinite}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>SlidesToShow</Td>
                    <Td>
                      <NumberInput defaultValue={15} min={10} max={20}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>SlidesToScroll</Td>
                    <Td>
                      <NumberInput defaultValue={15} min={10} max={20}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>InitialSlide</Td>
                    <Td>
                      <NumberInput defaultValue={15} min={10} max={20}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Autoplay</Td>
                    <Td>
                      <NumberInput defaultValue={15} min={10} max={20}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Speed</Td>
                    <Td>
                      <NumberInput defaultValue={15} min={10} max={20}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>AutoplaySpeed</Td>
                    <Td>
                      <NumberInput defaultValue={15} min={10} max={20}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>



            <ButtonGroup gap='10'>
              <Button
                w='100px'
                leftIcon={<MdBuild />}
                colorScheme='pink'
                onClick={() => resetConfig}
              >
                Reset
              </Button>
              <Button
                w='100px'
                leftIcon={<MdDataSaverOff />}
                colorScheme='blue'
                variant='outline'
                onClick={() => saveConfig}
              >
                Save
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </Container>
    </ASCContainer>
  )
}

export default AdminSliderController;