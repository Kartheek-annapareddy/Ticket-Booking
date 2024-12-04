const express = require('express')
const mysql = require("mysql")
const cors = require("cors")

const port = 4000 || process.env.PORT;
const app = express()

app.use(cors())  // middleware to allow cross-origin requests
app.use(express.json())  // middleware to parse JSON data

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ticketBooking'
});

db.connect((error) => {
    if (error) {
        console.error("Database connection failed", error)
    } else {
        console.log("Connected to MySQL database")
    }
});

// user registration API
app.post("/register", (request, response) => {
    try {
        const { fullName, email, mobileNumber, password } = request.body;

        // Input validation
        if (!fullName || !email || !mobileNumber || !password) {
            return response.status(400).json({ message: "All fields are required" });
        }

        const isUserFoundQuery = "SELECT * FROM usersdata WHERE email = ?";
        const newUserQuery = "INSERT INTO usersdata (fullName,email,mobileNumber,password) VALUES (?,?,?,?)";

        // hashed password
        // const hashedPassword = await bcrypt.hash(password, 10);

        db.query(isUserFoundQuery, [email], (error, result) => {
            if (error) {
                console.log("Error checking existing user:", error);
                return response.status(500).json({ message: 'Internal server error' });
            }
            else if (result.length > 0) {
                return response.status(400).json({ message: "User already exists!" })
            }
            else {
                db.query(newUserQuery, [fullName, email, mobileNumber, password], (err, result) => {
                    if (err) {
                        console.log("Error creating new user", err);
                        return response.status(500).json({ message: "Internal server error" });
                    }
                    else {
                        return response.status(201).json({ message: "Registration successful!" });
                    }
                })
            }
        })
    }
    catch (error) {
        console.log("Register API error:", error);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

// user login/signin API
app.post("/login", (request, response) => {
    try {
        const { email, password } = request.body;

        const isUserFoundQuery = "SELECT * FROM usersdata WHERE email = ? AND password = ?";
        const isEmailFoundQuery = "SELECT * FROM usersdata WHERE email = ?";

        db.query(isUserFoundQuery, [email, password], (err, results) => {
            if (err) {
                return response.status(500).json({ message: "Internal server error at user details in Login API" })
            }
            else if (results.length > 0) {
                const userid = results[0].userId;
                return response.status(200).json({ userid, message: "Login Successful!" })
            }
            else {
                db.query(isEmailFoundQuery, [email], (error, result) => {
                    if (error) {
                        return response.status(500).json({ message: "Internal server error at User Email found in Login API" })
                    }
                    else if (result.length > 0) {
                        return response.status(400).json({ message: "Incorrect password!" })
                    }
                    else {
                        return response.status(401).json({ message: "Invalid email, please register!" })
                    }
                })
            }
        })
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal server error at Login API' })
    }
});

// user profile API
app.get("/profile/:userid", (request, response) => {
    try {
        const { userid } = request.params;

        //input validation
        if (!userid) {
            return response.status(400).json({ message: "User ID is required" })
        }
        const isUserQuery = `SELECT * FROM usersdata WHERE userId = ?`;
        const isUserGenresQuery = `SELECT * FROM user_genres WHERE user_id = ?`;

        db.query(isUserQuery, [userid], (err, res) => {
            if (err) {
                console.error("Error fetching user profile", err);
                return response.status(500).json({ message: "Internal server error at User Profile" })
            }
            else if (res.length > 0) {
                const userProfile = res[0];
                db.query(isUserGenresQuery, [userid], (genreError, genreResult)=> {
                    if(genreError){
                        return response.status(500).json({message: "Internal server error at User Genres"})
                    }
                    else if(genreResult.length > 0){
                        const genre = genreResult[0];
                        return response.status(200).json({ message: "Successfully fetched user details", user: userProfile, genres: genre })
                    }
                })
            }
            else {
                return response.status(404).json({ message: "User not found" })
            }
        })
    }
    catch (error) {
        console.error("Profile API error", error);
        return response.status(500).json({ message: "Internal server error at User Profile API" })
    }
});

// updating user details
app.put("/edituserdetails", (request, response) => {
    try {

        // console.log(request.body);
        const { accountDetails, selectedGenres } = request.body;
        const { userId, fullName, email, mobileNumber, password, age, gender, address } = accountDetails;

        //const { fullName, email, mobileNumber, userId, age, gender, address, selectedGenres } = request.body;

        const updateQuery = `
            UPDATE usersdata 
            SET fullName = ?, email = ?, mobileNumber = ?, age = ?, gender = ?, address = ?
            WHERE userId = ?
        `;


        db.query(updateQuery, [fullName, email, mobileNumber, age, gender, address, userId], (error, result) => {
            if (error) {
                console.error('Database Error:', error);
                return response.status(500).json({ message: 'Internal server error' });
            }
            if (result.affectedRows === 0) {
                // console.log(result)
                return response.status(404).json({ message: 'User not found' });
            }

            // handle selectedGenres update
            const deleteGenresQuery = `DELETE FROM user_genres WHERE user_id = ?`;
            db.query(deleteGenresQuery, [userId], (deleteError) => {
                if (deleteError) {
                    console.error("Error deleting genres:", deleteError)
                    return response.status(500).json({ message: "Failed to update genres" })
                }
            });

            // insert new genres
            const insertGenresQuery = `INSERT INTO user_genres (user_id,genres) VALUES (?,?)`
            const genreValues = selectedGenres.toString();//converting the array into the string
            // console.log(genreValues)
            db.query(insertGenresQuery, [userId,genreValues], (insertError) => {
                if (insertError) {
                    console.error("Error inserting genres:", insertError)
                    return response.status(500).json({ message: "Failed to update genres" })
                }
            })
            response.status(200).json({ message: 'User details updated successfully' });
        });
    } catch (error) {
        console.error('Error:', error.message);
        return response.status(500).json({ message: 'Internal server error at PUT API' });
    }
});


app.listen(port, () => {
    console.log(`Server running on ${port}`)
});