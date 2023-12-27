import * as React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Alert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import CreateIcon from '@mui/icons-material/Create';
import CreatePostDialog from "./CreatePostDialog";
import { useContext, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import UpdateDataContext from "../updateDataContext";

export default function Header() {

    const [isOpen, setOpen] = React.useState(false);
    const [toggleSnackbar, setToggleSnackbar] = React.useState(false);
    const location = useLocation();

    const renderButtonBasedOnPage = () => {
        const pageIdPattern = /^\/posts\/\d+$/;
        console.log("pathname:" + location.pathname)
        if (pageIdPattern.test(location.pathname)) {
            return (
                <>
                <IconButton component={Link} to="/" color="inherit">
                    <ArrowBackIcon></ArrowBackIcon>
                </IconButton>
                </>
            );
        }
        else{
            return <CreateIcon sx={{ marginRight: 1 }} />;
        }
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {renderButtonBasedOnPage()}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    Simple Blog
                </Typography>
                <Button color="inherit"
                    onClick={() => setOpen(true)}>Create new post
                </Button>
                {isOpen && (
                    <CreatePostDialog
                        setOpen={setOpen}
                        setToggleSnackbar={setToggleSnackbar}
                    />
                )}
                {toggleSnackbar && (
                    <Snackbar
                        open={toggleSnackbar}
                        autoHideDuration={3000}
                        onClose={() => setToggleSnackbar(false)}
                    >
                        <Alert severity="success" sx={{ width: "100%" }}>
                            Successfully created new blog post!
                        </Alert>
                    </Snackbar>
                )}
            </Toolbar>
        </AppBar>
    );
}