import React from 'react';
import { Link as ReachLink } from "react-router-dom";
import {
  AspectRatio,
  Box,
  Image,
  ModalHeader, ModalBody,
  ModalCloseButton,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
//import Loading from "../../../admin/admin_components/Loading";

const ProjectModel = ({ singleData }) => {

  const youtubeLoading = () => {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ModalHeader align="center">{singleData.title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>
          <Box align="center">
            <AspectRatio maxW='460px' ratio={1}>
              <iframe
                onLoad={youtubeLoading}
                title={singleData.title}
                src='https://www.youtube.com/embed/QhBnZ6NPOY0'
                allowFullScreen
                loading="lazy"
              />
            </AspectRatio>
          </Box>
          <Stack m="10px">
            <Text>{singleData.use}</Text>
            <Text>{singleData.description}</Text>
            <Link as={ReachLink} to={singleData.websiteUrl}>
              Website Link <ExternalLinkIcon mx='1px' />
            </Link>
            <Link as={ReachLink} to={singleData.gitUrl}>
              Git Link <ExternalLinkIcon mx='1px' />
            </Link>
            <Link as={ReachLink} to={singleData.uiuxUrl}>
              UI / UX Link <ExternalLinkIcon mx='1px' />
            </Link>
            {singleData.items.map((item, index) => {
              return (
                <Stack key={item.itemId}>
                  <Box>{item.caption}</Box>
                  <Box>{item.text}</Box>
                  {
                    item.images.map((imageData, index) => {
                      return (
                        <Box key={imageData.imageId}>

                          <Image
                            m="auto" boxSize='300px'
                            src={imageData.imagePath}
                            alt={imageData.imageName}
                            fallbackSrc='https://via.placeholder.com/300'
                          />

                        </Box>
                      )
                    })
                  }
                </Stack>
              )
            })}
          </Stack>
        </Box>
      </ModalBody>
    </>
  )
}

export default ProjectModel
