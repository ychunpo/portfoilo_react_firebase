import React from 'react';
import { Box, Grid, GridItem, Image, Text, VStack } from '@chakra-ui/react';
//import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import moment from 'moment';
import DeleteIconButton from './DeleteIconButton';
import useFireStore from '../../firebase-tool/useFireStore';

export default function ImagesList() {
  const { documents } = useFireStore();

  return (
    <div>
      <div>
        <VStack >
          <Grid gridTemplateColumns={'400px 400px'} gap={3}>
            {documents.map((item, index) => (
              <GridItem
                key={item?.id}
                sx={{
                  opacity: '0.7',
                  transition: 'opacity 0.3s linear',
                  '&:hover': { opacity: 1 },
                }}
              >
                <DeleteIconButton imageId={item.id} />
                <Image
                  src={item?.data?.imageURL}
                  alt={item?.data?.imageFilename}
                  loading="lazy"
                />
                <Box
                  sx={{
                    position: 'relative',
                    color: 'white',
                    background: 'rgba(0,0,0,0.3)',
                    p: '5px',
                    zIndex: 1,
                  }}
                >
                  <Text>
                    {moment(item?.data?.timestamp?.toDate()).fromNow()}
                  </Text>
                  <Text>
                    {item?.data?.folderName}
                  </Text>
                  <Text>
                    {item?.data?.imageFilename}
                  </Text>
                  <Text>
                    {item?.data?.imageURL}
                  </Text>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </div>
    </div >
  )
}