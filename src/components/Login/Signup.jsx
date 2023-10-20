import React, { useState } from 'react';
import userIcon from './Assets/person.png';
import emailIcon from './Assets/Email.png';
import passwordIcon from './Assets/password.png';
// import { GoogleLogin } from 'react-google-login';



const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user already exists in local storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.find(user => user.email === formData.email);

    if (userExists) {
      setError('User already exists');
      alert("User already exists");
    } else {
      // Store the new user in local storage
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Clear the form and reset the error
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      // setError('User registered successfully!');
      alert('User registered successfully!')

    }
  };
  const responseGoogle = (response) => {
    // Handle Google login response here
    console.log(response);
  };

  return (
   <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="input-group">
            <img src={userIcon} alt="User" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <div className="input-group">
            <img src={emailIcon} alt="Email" />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <div className="input-group">
            <img src={passwordIcon} alt="Password" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;
