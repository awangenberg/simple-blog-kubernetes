import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PostCard from './PostCard';
import { useEffect } from 'react';
import { getAllPosts, getHealthCheck } from '../api/api';
import { PostModel } from '../api/apiModels';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function PostList() {

  const [posts, setPosts] = React.useState<PostModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllPosts()

      result.sort(function(a,b){
        return new Date(b.created).valueOf() - new Date(a.created).valueOf();
      });

      console.log(result);
      setPosts(result);
    };

    fetchData();
  }, []);

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