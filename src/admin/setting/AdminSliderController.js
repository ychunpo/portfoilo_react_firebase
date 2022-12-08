import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Box, Button, ButtonGroup,
  Heading,
  NumberInput, NumberInputField, NumberInputStepper,
  NumberIncrementStepper, NumberDecrementStepper,
  Switch,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer,
} from '@chakra-ui/react';
import { MdBuild, MdDataSaverOff } from "react-icons/md"
import { db } from "../../utils/firebase";
import Loading from '../admin_components/Loading';
import Fail from '../admin_components/Loading/Fail';
import { defaultSliderValue } from '../../data/defaultSliderValue';

const ASCContainer = styled.div`
  
`

const AdminSliderController = () => {
  const [sliderConfig, setSliderConfig] = useState(defaultSliderValue)
  const [loading, setLoading] = useState(false);
  const [loadFail, setLoadFail] = useState(false);
  // general setting
  const [projGrabCursor, setGrabCursor] = useState(false);
  const [projNavigation, setProjNavigation] = useState(true);
  const [projPagination, setProjPagination] = useState(true);
  const [projLoop, setProjLoop] = useState(true);
  const [projLoopFill, setProjLoopFill] = useState(false);
  const [projCenteredSlides, SetProjCenteredSlides] = useState(false);
  const [projRewind, setProjSlidesToScroll] = useState(false);
  const [projMousewheel, setMousewheel] = useState(false);
  const [projKeyboard, setKeyboard] = useState(false);


  const [projXSSlidesPerView, setProjXSSlidesPerView] = useState(0);
  const [projXSSlidesPerGroup, setProjXSSlidesPerGroup] = useState(0);
  const [projXSSpaceBetween, setProjXSSpaceBetween] = useState(0);

  const [projSMSlidesPerView, setProjSMSlidesPerView] = useState(0);
  const [projSMSlidesPerGroup, setProjSMSlidesPerGroup] = useState(0);
  const [projSMSpaceBetween, setProjSMSpaceBetween] = useState(0);

  const [projMDSlidesPerView, setProjMDSlidesPerView] = useState(0);
  const [projMDSlidesPerGroup, setProjMDSlidesPerGroup] = useState(0);
  const [projMDSpaceBetween, setProjMDSpaceBetween] = useState(0);

  const [projLGSlidesPerView, setProjLGSlidesPerView] = useState(0);
  const [projLGSlidesPerGroup, setProjLGSlidesPerGroup] = useState(0);
  const [projLGSpaceBetween, setProjLGSpaceBetween] = useState(0);

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
    setSliderConfig(defaultSliderValue);
  }

  const saveConfig = () => {
    setSliderConfig();
  }

  return (
    <ASCContainer>
      <Box w='100%' bg='gray.100'>
        <Heading p="15px 0" size="lg" color='' align="center">
          Slider Controller
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
                    <Th>General</Th><Th></Th><Th></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td>GrabCursor</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme="green"
                        isChecked={projGrabCursor}
                      />
                    </Td>

                    <Td>Navigation</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme='green'
                        isChecked={projNavigation}
                      />
                    </Td>

                    <Td>Pagination</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme="green"
                        isChecked={projPagination}
                      />
                    </Td>
                  </Tr>

                  <Tr>
                    <Td>Loop</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme="green"
                        isChecked={projLoop}
                      />
                    </Td>

                    <Td>LoopFillGroupWithBlank</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme='green'
                        isChecked={projLoopFill}
                      />
                    </Td>

                    <Td>CenteredSlides</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme="green"
                        isChecked={projCenteredSlides}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Rewind</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme='green'
                        isChecked={projRewind}
                      />
                    </Td>
                    <Td>Mousewheel</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme="green"
                        isChecked={projMousewheel}
                      />
                    </Td>
                    <Td>keyboard</Td>
                    <Td>
                      <Switch
                        size="md"
                        colorScheme='green'
                        isChecked={projKeyboard}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <TableContainer>
              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>below 599</Th><Th></Th><Th></Th>
                  </Tr>
                </Thead>
                <Tr>
                  <Td>SlidesPerView</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={2}
                      min={1}
                      max={30}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>

                  <Td>SlidesPerGroup</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={1}
                      min={1}
                      max={20}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>

                  <Td>SpaceBetween</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={0}
                      min={0}
                      max={90}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>
                </Tr>
              </Table>
            </TableContainer>

            <TableContainer>
              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>600 to 1023</Th><Th></Th><Th></Th>
                  </Tr>
                </Thead>
                <Tr>
                  <Td>SlidesPerView</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={2}
                      min={1}
                      max={30}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>

                  <Td>SlidesPerGroup</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={1}
                      min={1}
                      max={20}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>

                  <Td>SpaceBetween</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={0}
                      min={0}
                      max={90}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>
                </Tr>
              </Table>
            </TableContainer>

            <TableContainer>
              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>1024 to 1439</Th><Th></Th><Th></Th>
                  </Tr>
                </Thead>
                <Tr>
                  <Td>SlidesPerView</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={2}
                      min={1}
                      max={30}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>

                  <Td>SlidesPerGroup</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={1}
                      min={1}
                      max={20}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>

                  <Td>SpaceBetween</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={0}
                      min={0}
                      max={90}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>
                </Tr>
              </Table>
            </TableContainer>

            <TableContainer>
              <Table colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Above 1440</Th><Th></Th><Th></Th>
                  </Tr>
                </Thead>
                <Tr>
                  <Td>SlidesPerView</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={2}
                      min={1}
                      max={30}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>

                  <Td>SlidesPerGroup</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={1}
                      min={1}
                      max={20}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>

                  <Td>SpaceBetween</Td>
                  <Td>
                    <NumberInput
                      size='md'
                      maxW={20}
                      defaultValue={0}
                      min={0}
                      max={90}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>
                </Tr>
              </Table>
            </TableContainer>

            <Box align='center'>
              <ButtonGroup gap="100" >
                <Button
                  w='110px'
                  leftIcon={<MdBuild />}
                  colorScheme='pink'
                  onClick={() => resetConfig}
                >
                  Reset
                </Button>
                <Button
                  w='110px'
                  leftIcon={<MdDataSaverOff />}
                  colorScheme='blue'
                  variant='outline'
                  onClick={() => saveConfig}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        )}
      </Box>
    </ASCContainer>
  )
}

export default AdminSliderController;