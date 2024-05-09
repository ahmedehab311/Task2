import React, { useState, useRef, useEffect, useMemo } from "react";
import { useAuth } from "./auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./index.css";
import Select from "react-select";
import countryList from "react-select-country-list";

function Home() {
  const auth = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    ConfirmPassword: "",
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    birth: "",
  });

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (value) => {
    setValue(value);
  };

  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validate(user);
  };

  const handleSubmit = (e) => {
    // e.preventDefault()
    setFormError(validate(user));
    setIsSubmit(true);
    const usernameRegex = /^[A-Za-z0-9].{2,20}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (user.username === "") {
      alert("username field is required");
      return;
    }
    if (!usernameRegex.test(user.username)) {
      alert("Please comply with the specified requirements for username field");
      return;
    }
    if (user.password === "") {
      alert("Password field is required");
      return;
    }
    if (!passwordRegex.test(user.password)) {
      alert(
        "Please make sure to fulfill all requirements for the password field"
      );
      return;
    }

    if (user.ConfirmPassword === "") {
      alert("Confirm Password field is required");
      return;
    }
    if (user.password !== user.ConfirmPassword) {
      alert("confirm Password not match with Password field");
      return;
    }
    if (user.fullName === "") {
      alert("FullName field cant be empty");
      return;
    }

    if (user.phone === "") {
      alert("phone field is required");
      return;
    }
    if (user.address === "") {
      alert("Please select your country");
      return;
    }
    if (user.birth === "") {
      alert("Date field is required");
      return;
    }

    if (user.gender === "") {
      alert("Please select a gender");
      return;
    }
    if (user.password !== user.ConfirmPassword) {
      alert("Password is not match with confirm Password field");
      return;
    }

    auth.login(user);
    setShowUserInfo(true);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/profile");
  };

  const [showUserInfo, setShowUserInfo] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (handleSubmit() && validate) {
      auth.login(user);
      setShowUserInfo(true);
      // localStorage.setItem("user", JSON.stringify(user));
      navigate("/profile");
    } else {
    }
  };

  useEffect(() => {
    setFormError(validate(user));

    if (Object.keys(formError).length === 0 && isSubmit) {
    }
  }, [user]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "username is requird";
    }
    if (!values.password) {
      errors.password = "password is requird";
    }
    if (!values.ConfirmPassword) {
      errors.ConfirmPassword = "ConfirmPassword is requird";
    }
    if (!values.fullName) {
      errors.fullName = "fullName is requird";
    }
    if (!values.phone) {
      errors.phone = "phone is requird";
    }
    if (!values.address) {
      errors.address = "address is requird";
    }

    return errors;
  };

  const formRef = useRef(null);

  const combinedChangeHandler = (selectedOption) => {
    changeHandler(selectedOption);
    setUser({ ...user, address: selectedOption.label });
  };

  return (
    <div className="container">
      <h4>Please validate all form fields before submit.</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label className="label">Username</label>
          <input
            type="text"
            pattern="^[A-Za-z0-9].{2,16}"
            name="username"
            placeholder="username"
            value={user.username}
            onChange={handleChange}
          />

          <span>Username must be At least 3 characters </span>
        </div>

        <div className="input-field">
          <label className="label">Password</label>
          <input
            type="text"
            name="password"
            id="Password"
            value={user.password}
            placeholder="Password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            onChange={handleChange}
            title="Password must contain at least 8 characters and include at least 1 uppercase letter and 1 special character (@, !, #, or &)."
          />
          <span>
            password must have 8-16 charactes and include atleast 1 uppercase,1
            digitand and 1 special character(@,!,#,&)
          </span>
        </div>

        <div className="input-field">
          <label className="label">Confirm Password</label>
          <input
            type="text"
            name="ConfirmPassword"
            id="ConfirmPassword"
            placeholder="Enter Confirm Password"
            pattern={user.password}
            value={user.ConfirmPassword}
            onChange={handleChange}
          />

          <span>Password is not match</span>
        </div>

        <div className="input-field">
          <label className="label"> Full Name</label>{" "}
          <input
            type="text"
            name="fullName"
            placeholder="FullName"
            value={user.fullName}
            onChange={handleChange}
          />{" "}
          <span>{formError.fullName}</span>{" "}
        </div>

        <div className="input-field">
          <label className="label"> Mobil Number</label>

          <input
            type="number"
            name="phone"
            pattern="^[0-9].{2,}"
            placeholder="Phone"
            value={user.phone}
            onChange={handleChange}
          />
          <span>phone number should be atleast 10</span>
        </div>

        <div className="input-field">
          <label className="label">Address</label>
          <Select
            options={options}
            value={value}
            onChange={combinedChangeHandler}
            placeholder="Address"
          />
        </div>

        <div className="input-field">
          <label className="label"> Birth Date </label>

          <input type="date" name="birth" onChange={handleChange} />
        </div>

        <div className="gender-check  ">
          <h3 className="label">Gender</h3>
          <div className="option">
            <div className="gender">
              <input
                required
                type="radio"
                id="check-male"
                name="gender"
                value="male"
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              />
              <label htmlFor="check">Male</label>
            </div>

            <div className="gender">
              <input
                required
                type="radio"
                id="check-famle"
                name="gender"
                value="female"
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              />
              <label htmlFor="check">Female</label>
            </div>
          </div>
        </div>
        <button type="button" onClick={handleLogin}>
          Submit
        </button>
      </form>

      {showUserInfo && (
        <div>
          <h2>User: {auth.user && auth.user.username}</h2>
          <h2>pass: {auth.user && auth.user.password}</h2>
          <h2>Fullname: {auth.user && auth.user.fullName}</h2>
          <h2>Phone: {auth.user && auth.user.phone}</h2>
          <h2>{value ? value.label : "None"}</h2>
          <h2>address: {auth.user && auth.user.birth}</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
