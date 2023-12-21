import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Divider, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { getAllPosts, deletePost } from '../api/api';


const PostDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    await deletePost(id);
    navigate('/')
    setDialogOpen(false);
  };

  const { id, heading, body, createdOn, picture } = state;

  if (!state) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div style={{ marginLeft: '45px', marginTop: '25px', maxWidth: 'calc(100% - 45px)' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" component="h4">
          {heading}
        </Typography>
        <IconButton style={{ marginLeft: '10px' }} onClick={handleDeleteClick}>
          <DeleteForeverIcon />
        </IconButton>
      </div>
        <Typography component="h4">
          {createdOn}
        </Typography>
        <Divider sx={{ borderBottomWidth: 3 }} />
        <Typography style={{ marginTop: '25px' }}>
          {body}
        </Typography>

        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  );
}
export default PostDetails;