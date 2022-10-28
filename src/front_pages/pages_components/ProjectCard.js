import * as React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';



const ProjectCard = ({
  title,
  use,
  coverCaption,
  coverImage,
  description,
  handleModelOpen
}) => {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={title}
        subheader={use}
      />
      <CardMedia
        component="img"
        height="360"
        image={coverImage}
        alt={coverCaption}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button onClick={handleModelOpen} size="small" color="primary">
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProjectCard;