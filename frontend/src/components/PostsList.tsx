import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PostCard from './PostCard';
import { PostModel } from '../api/apiModels';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface PostListProps {
  posts: PostModel[]
};

const PostsList = ({
  posts
}: PostListProps) => {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {posts.map((post, index) => (
          <Grid item xs={12} key={index}>
            <PostCard
              post={post}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default PostsList;