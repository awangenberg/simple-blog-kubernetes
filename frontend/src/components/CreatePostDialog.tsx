import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, useContext, useState } from 'react';
import { createNewPost } from '../api/api';
import { CreatePostModel } from '../api/apiModels';
import UpdateDataContext from '../updateDataContext';



interface CreatePostDialogProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setToggleSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostDialog = ({ setOpen, setToggleSnackbar }: CreatePostDialogProps) => {

    const { shouldFetchPosts, setShouldFetchPosts } = useContext(UpdateDataContext);

    const createPost = async () => {
        const newPost: CreatePostModel = {
            heading: heading,
            body: body,
            picture: undefined
          };

        createNewPost(newPost)

        setToggleSnackbar(true)
        setShouldFetchPosts(true)
        setOpen(false)
    };

    const [heading, setHeading] = useState('');
    const [body, setbody] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleBodyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setbody(event.target.value);
    };

    const handleHeadingChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHeading(event.target.value);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
      };

    return (
        <React.Fragment>
            <Dialog open={true} onClose={() => setOpen(false)}>
                <DialogTitle>Create new blog post</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="heading"
                        label="title"
                        type="text"
                        fullWidth
                        required
                        variant="standard"
                        onChange={handleHeadingChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="body"
                        label="body"
                        multiline
                        rows={10} 
                        maxRows={100} 
                        fullWidth
                        required
                        variant="standard"
                        onChange={handleBodyChange}
                    />
                    <input
                        type="file"
                        id="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit"
                        variant="contained"
                        disabled={heading == '' || body == '' ? true : false}
                        color="success" onClick={() => createPost()}>Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


export default CreatePostDialog;