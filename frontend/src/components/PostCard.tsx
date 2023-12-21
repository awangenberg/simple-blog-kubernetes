import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { PostModel } from '../api/apiModels';


const styles = {
  cardAction: {
    display: 'block',
    textAlign: 'initial'
  }
}

interface PostCardProps {
  post: PostModel
};

const PostCard = ({
  post
}: PostCardProps) => {

  const truncatedBody = post.body?.length > 650 ? post.body.substring(0, 650) + '...' : post.body;
  const parts = post.created.split(":"); // we want to remove seconds and timezone from date
  const trimmedDateString = parts[0] + ":" + parts[1];
  
  const navigate = useNavigate();

  const handleClick = () => {
    const postData = {
      id: post.id,
      heading: post.heading,
      body: post.body,
      createdOn: trimmedDateString,
      picture: post.picture
    }
      
    navigate(`/posts/${post.id}`, { state: postData });
  };

  return (
    <>
    <Card sx={{ minWidth: 275 }}>
      <CardActionArea onClick={handleClick}>
      <CardContent>
        <Typography variant="h5" component="div">
          {post.heading}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {trimmedDateString}
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