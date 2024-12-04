import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MovieIcon from '@mui/icons-material/Movie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/Lock';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// import {
//     styled,
//     useTheme,
//     Box,
//     CssBaseline,
//     Typography,
//     IconButton,
//     Toolbar,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemIcon,
//     ListItemText
//   } from '@mui/material';
//   import {
//     Menu as MenuIcon,
//     ChevronLeft as ChevronLeftIcon,
//     ChevronRight as ChevronRightIcon,
//     AccountCircle as AccountCircleIcon,
//     Movie as MovieIcon,
//     Favorite as FavoriteIcon,
//     Lock as LockIcon,
//     HelpCenter as HelpCenterIcon,
//     Settings as SettingsIcon,
//     Logout as LogoutIcon
//   } from '@mui/icons-material';

import "./Dummy.css";
import { Button, Stack } from '@mui/material';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

const items = [
    { text: 'My Profile', icon: <AccountCircleIcon /> },
    { text: 'My Bookings', icon: <MovieIcon /> },
    { text: 'Favourites', icon: <FavoriteIcon /> },
    { text: 'Change Password', icon: <LockIcon /> },
    { text: "Help & Support", icon: <HelpCenterIcon /> },
    { text: "Account & Settings", icon: <SettingsIcon /> },
    { text: "Logout", icon: <LogoutIcon /> }
];



function Dummy() {

    const userId = Cookies.get("userid");
    //console.log(userid)
    const navigate = useNavigate();

    const [accountDetails, setAccountDetails] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        userId: userId,
        age: "",
        gender: "",
        address: ""
    });
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([])
    const genres = ["Drama", "Action", "Adventure", "Comedy", "Thriller", "Animation", "Romantic", "Family", "Period", "Suspense", "Crime",
        "Fantasy", "Historical", "Horror", "Mystery", "Sci-Fi"];


    // fetching user details by userId
    useEffect(() => {

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/profile/${userId}`);
                if (response.status === 200) {
                    // console.log(response)
                    setAccountDetails(response.data.user)
                    setSelectedGender(response.data.user.gender)  
                    fetchUserGenres(response.data.genres.genres)                  
                }
            }
            catch (error) {
                console.log("Error fetching user details", error);
            }
        };

        if (userId) {
            fetchUserDetails();
        }
    }, [userId]);

    // converting user favourite genres (string) into array
    const fetchUserGenres = (genres)=> {
        const FavoriteGenres = genres.split(",")
        setSelectedGenres(FavoriteGenres)
    };

    // handling user gender
    const handleGenderChange = (gender) => {
        setSelectedGender(gender)
        setAccountDetails({ ...accountDetails, gender: gender })
    };

    // handling user favourite genres 
    const handleGenreChange = (genre)=> {
        if(selectedGenres.includes(genre)){
            setSelectedGenres(selectedGenres.filter(item => item !== genre));
        }
        else{
            setSelectedGenres([...selectedGenres, genre]);
        }
    }; 

    // handling user details
    const handleAccountDetails = (event) => {
        const { name, value } = event.target;

        setAccountDetails({
            ...accountDetails, [name]: value
        })
    };

    // PUT API for User Profile
    const handleUserDetails = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.put("http://localhost:4000/edituserdetails", {accountDetails, selectedGenres})
            if (response.status === 200) {
                console.log(response.data.message)
                toast.success('User Details updated successfully!', {
                    theme: 'colored'
                })
            }
        }
        catch (error) {
            if (error.status === 404) {
                console.log(error)
                toast.error('User not found', {
                    theme: 'colored'
                })
            }
            else {
                console.log(error)
            }
        }
    };

    const handleDetailsCancel = ()=> {
        navigate('/')
    }


    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <div className='container-fluid'>
            {/* <Header /> */}
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    marginRight: 5,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Welcome
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>

                    <List>
                        {items.map(({ text, icon }, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            },
                                            open
                                                ? {
                                                    mr: 3,
                                                }
                                                : {
                                                    mr: 'auto',
                                                },
                                        ]}
                                    >
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={[
                                            open
                                                ? {
                                                    opacity: 1,
                                                }
                                                : {
                                                    opacity: 0,
                                                },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <form >
                        <Typography sx={{ marginBottom: 2 }}>
                            <div className='account_details_cont'>
                                <h4>Account Details</h4>
                                <div className='mt-4'>
                                    <div className='row'>
                                        <div className='col-2'>
                                            <label className='form-label'>Full Name:</label>
                                        </div>
                                        <div className='col-6'>
                                            <input className='form-control' name="fullName" value={accountDetails.fullName}
                                                onChange={handleAccountDetails} />
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-2'>
                                            <label className='form-label'>Email Address:</label>
                                        </div>
                                        <div className='col-6'>
                                            <input className='form-control' name="email" value={accountDetails.email}
                                                onChange={handleAccountDetails} />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-2'>
                                            <label className='form-label'>Mobile Number:</label>
                                        </div>
                                        <div className='col-6'>
                                            <input className='form-control' name="mobileNumber" value={accountDetails.mobileNumber}
                                                onChange={handleAccountDetails} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Typography>
                        <Typography sx={{ marginBottom: 2 }}>
                            <div className='personal_details_cont'>
                                <h4>Personal Details</h4>
                                <div className='mt-4'>
                                    <div className='row'>
                                        <div className='col-2'>
                                            <label className='form-label'>Age:</label>
                                        </div>
                                        <div className='col-6'>
                                            <input className='form-control' name="age" value={accountDetails.age}
                                                onChange={handleAccountDetails} />
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className='col-2'>
                                            <label className='form-label'>Gender:</label>
                                        </div>
                                        <div className='col-6'>
                                            <Stack direction="row" spacing={2}>
                                                <Button color="error" variant={selectedGender === 'Male' ? "contained" : "outlined"}
                                                    onClick={() => handleGenderChange('Male')} value={accountDetails.gender} >
                                                    Male
                                                </Button>
                                                <Button color='error' variant={selectedGender === 'Female' ? "contained" : "outlined"}
                                                    onClick={() => handleGenderChange('Female')} value={accountDetails.gender} >
                                                    Female
                                                </Button>
                                                <Button color='error' variant={selectedGender === 'Others' ? "contained" : "outlined"}
                                                    onClick={() => handleGenderChange('Others')} value={accountDetails.gender} >
                                                    Others
                                                </Button>
                                            </Stack>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-2'>
                                            <label className='form-label'>Physical Address:</label>
                                        </div>
                                        <div className='col-6'>
                                            <textarea cols='65' rows='3' className='form-control' name="address"
                                                value={accountDetails.address} onChange={handleAccountDetails}>

                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Typography>
                        <Typography>
                            <div className='address_cont'>
                                <h4 className='mb-4'>Favourite Genres</h4>
                                <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap' }} spacing={3}>
                                    {genres.map((genre) => (
                                        <Button variant={selectedGenres.includes(genre) ? "contained" : "outlined"} color="error" 
                                            onClick={()=> handleGenreChange(genre)}>
                                            {genre}
                                        </Button>
                                    ))}
                                </Stack>
                            </div>
                        </Typography>
                        <Typography>
                            <div className='text-center my-4'>
                                <button className='btn btn-danger mx-3' onClick={handleDetailsCancel}>Cancel</button>
                                <button className='btn btn-success mx-3' onClick={handleUserDetails}>Save Changes</button>
                            </div>
                            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />

                        </Typography>
                    </form>
                </Box>
            </Box>
        </div >
    );
}

export default Dummy;