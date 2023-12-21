import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@material-ui/core';

const styles = {
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  }
}

interface PostCardProps {
  heading: string;
  body: string;
  date: string;
  picture?: string | undefined;
};

const PostCard = ({
  heading,
  body,
  date,
  picture,
}: PostCardProps) => {

  const truncatedBody = body?.length > 650 ? body.substring(0, 650) + '...' : body;
  const formattedDate = date.replace('GMT', '')
  
  return (
    <>
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea>
      <CardContent>
        <Typography variant="h5" component="div">
          {heading}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {formattedDate}
        </Typography>
        <Typography variant="body2">
          {truncatedBody}
        </Typography>
      </CardContent>
    </CardActionArea>
    </Card>
    </>
  );
}

export default PostCard;