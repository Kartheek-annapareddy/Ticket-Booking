import React, { useEffect, useState } from 'react';
import './Editprofile.css';
import Navbar from '../components/Homepgae/Navbar';
import Searchicons from '../components/Homepgae/Searchicons';
import axios from 'axios';
import { Button, Stack, Snackbar, Alert, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Editprofile() {
    const [selectedGender, setSelectedGender] = useState('');
    const [buttonDisplay, setButtonDisplay] = useState(false);
    const [userdata, setUserdata] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([])
    const [savedresponse, setsavedresponse] = useState('')
    const [userinfo, setUserinfo] = useState({
        Fullname: "",
        Email: "",
        Phonenumber: "",
        Age: " ",
        Gender: '',
        Physicaladress: ''
    });

    var Navigate=useNavigate();

    const fetchdata = () => {
        const User_id = localStorage.getItem('User_id');
        axios.get(`http://localhost:5009/userprofile/${User_id}`)
            .then((res) => {
                setUserdata(res.data.message.userdata);
                console.log(res.data.message)
                fetchUserGenres(res.data.message.gener)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Fetch user profile on component mount
    useEffect(() => {
        fetchdata()
    }, []);

    // converting user favourite genres (string) into array
    const fetchUserGenres = (genres) => {
        const FavorateGenres = genres[0].Favourategener.split(",")
        console.log(FavorateGenres)
        setSelectedGenres(FavorateGenres)
    };

    const genres = ["Drama", "Action", "Adventure", "Comedy", "Thriller", "Animation", "Romantic", "Family", "Period", "Suspense", "Crime",
        "Fantasy", "Historical", "Horror", "Mystery", "Sci-Fi"];


    useEffect(() => {
        if (userdata) {
            setUserinfo({
                ...userdata,
                User_id: localStorage.getItem('User_id')
            });
        
            setSelectedGender(userdata.Gender);
        }
    }, [userdata]);


    const handleGenderChange = (gender, e) => {
        setSelectedGender(gender);
        handleEditProfileChange(e);
    };

    const handleEditProfileChange = (e) => {
        setButtonDisplay(true);
        setUserinfo({
            ...userinfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveChanges = () => {
        axios.post('http://localhost:5009/editprofile', {userinfo:userinfo,selectedGeners:selectedGenres})
            .then((res) => {
                console.log(res.data);
                setsavedresponse(res.data);
                setButtonDisplay(false);
                fetchdata();
            })
            .catch((err) => {
                console.log(err);
            });
        handleClick()

    };
    const handlecancle=()=>{
        Navigate('/')
    }

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }

    function handleGenreChange(genre){
        setButtonDisplay(true);
        if(selectedGenres.includes(genre)){
            setSelectedGenres(selectedGenres.filter(item => item !== genre));
        }
        else{
            setSelectedGenres([...selectedGenres, genre]);
        }
      }

    return (
        <>
            <Navbar />
            <Searchicons />
            <div className='container'>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-11'>
                        {/* Account Details Section */}
                        <div className='container account-details'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='row account-details-block'>
                                        <div className='col-12'>
                                            <p style={{ fontWeight: 'bold' }}>Account Details</p>
                                        </div>
                                    </div>

                                    <div className='row account-details-block'>
                                        <div className='col-1'></div>
                                        <div className='col-3'><p style={{ fontSize: '23px' }}>Full Name</p></div>
                                        <div className='col-8'>
                                            <input
                                                type='text'
                                                name='Fullname'
                                                value={userinfo.Fullname}
                                                onChange={handleEditProfileChange}
                                            />
                                        </div>
                                    </div>

                                    <div className='row account-details-block'>
                                        <div className='col-1'></div>
                                        <div className='col-3'><p style={{ fontSize: '23px' }}>Email</p></div>
                                        <div className='col-8'>
                                            <input
                                                type='email'
                                                name='Email'
                                                value={userinfo.Email}
                                                onChange={handleEditProfileChange}
                                            />
                                        </div>
                                    </div>

                                    <div className='row account-details-block'>
                                        <div className='col-1'></div>
                                        <div className='col-3'><p style={{ fontSize: '23px' }}>Phone Number</p></div>
                                        <div className='col-8'>
                                            <input
                                                type='number'
                                                name='Phonenumber'
                                                value={userinfo.Phonenumber}
                                                onChange={handleEditProfileChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Details Section */}
                        <div className='container account-details'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='row account-details-block'>
                                        <div className='col-12'>
                                            <p style={{ fontWeight: 'bold' }}>Personal Details</p>
                                        </div>
                                    </div>

                                    <div className='row account-details-block'>
                                        <div className='col-1'></div>
                                        <div className='col-3'><p style={{ fontSize: '23px' }}>Age</p></div>
                                        <div className='col-8'>
                                            <input
                                                type='number'
                                                name='Age'
                                                maxLength={3}
                                                value={userinfo.Age}
                                                onChange={handleEditProfileChange}/>
                                        </div>
                                    </div>

                                    <div className='row account-details-block'>
                                        <div className='col-1'></div>
                                        <div className='col-3'><p style={{ fontSize: '23px' }}>Gender</p></div>
                                        <div className='col-8'>
                                            <Stack direction="row" spacing={2}>
                                                {['Male', 'Female', 'Others'].map((gender) => (
                                                    <Button
                                                        key={gender}
                                                        variant={selectedGender === gender ? 'contained' : 'outlined'}
                                                        color="success"
                                                        name='Gender'
                                                        value={gender}
                                                        onClick={(e) => handleGenderChange(gender, e)}
                                                    >
                                                        {gender}
                                                    </Button>
                                                ))}
                                            </Stack>
                                        </div>
                                    </div>
                                    

                                    <div className='row account-details-block'>
                                        <div className='col-1'></div>
                                        <div className='col-3'><p style={{ fontSize: '23px' }}>Physical Address</p></div>
                                        <div className='col-8'>
                                            <textarea
                                                name='Physicaladress'
                                                value={userinfo.Physicaladress}
                                                onChange={handleEditProfileChange}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row gener-details '>
                            <div className='col-1'></div>
                            <div className='col-11'>
                            <Typography>
                            <div className='address_cont'>
                                <p className='mb-4' style={{fontWeight:'bold',fontSize:'25px'}}>Favourite Genres</p>
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
                            </div>
                        </div>

                    </div>
                </div>

                
                {/* Save Changes Button */}
                {buttonDisplay && (
                    <div className='display-button'>
                        <button className='btn btn-secondary' onClick={handleSaveChanges}>Save Changes</button>
                        <button className='btn btn-danger' onClick={handlecancle}>Cancle</button>
                    </div>
                )}
            </div>
            <div>
                {savedresponse ?
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={savedresponse.status === 'true' ? 'success' : 'error'}
                            variant="filled"
                            sx={{ width: '100%' }} >
                            {
                                savedresponse.message
                            }
                        </Alert>
                    </Snackbar> : null}
            </div>
        
        </>
    );
}

export default Editprofile;
