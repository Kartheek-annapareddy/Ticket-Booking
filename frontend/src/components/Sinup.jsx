import React, { useState } from 'react'
import axios from "axios";

const Signup = () => {
const [data, setData] = useState({
firstname: '',
lastname: '',
username: '',
Phonenumber:'',
email: '',
password: '',
confirmpwd: ''
})

const { firstname, lastname, username,Phonenumber, email, password, confirmpwd } = data;


const changeHandler = (e) => {
setData({ ...data, [e.target.name]: e.target.value })
}

const handleSubmit = (e) => {
console.log(data);
e.preventDefault()
const response = axios.post('http://localhost:5009/register', data).then((req)=>{console.log(req)}).catch((err)=>{console.log(err)})

}
return (
< form onSubmit={handleSubmit}>
< div>
< label>First Name:</label>
< input type='text' name='firstname' value={firstname} placeholder='Enter First Name' onChange={changeHandler}/>< br/>

< label>Last Name:</label>
< input type='text' name='lastname' value={lastname} placeholder='Enter Last Name' onChange={changeHandler}/>< br/>

< label>Username:</label>
< input type='text' name='username' value={username} placeholder='Enter Username' onChange={changeHandler}/>< br/>

< label>Phone Number:</label>
< input type='tele' name='Phonenumber' value={Phonenumber} placeholder='Enter mobile Number' onChange={changeHandler}/>< br/>

< label>Email:</label>
< input type='email' name='email' value={email} placeholder='Enter Email' onChange={changeHandler}/>< br/>

< label>Password:</label>
< input type='password' name='password' value={password} placeholder='Enter Password' onChange={changeHandler}/>< br/>

< label>Confirm Password:</label>
< input type='password' name='confirmpwd' value={confirmpwd} placeholder='Confirm Password' onChange={changeHandler}/>< br/>

< input type="submit" value="Submit"/>
</div>
</form>


)
}

export default Signup
