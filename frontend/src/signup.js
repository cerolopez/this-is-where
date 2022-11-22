import React, {useState} from "react";
import PageFooter from "./pages/parts/PageFooter.js";
import InputField from "./components/InputField.js";
import Alert from "./components/Alert.js";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [alertVisibility, setAlertVisibility] = useState("none");

    // const successMsg = "Successfully created a new account! Redirecting to login...";
    // const failureMsg = "That username is unavailable. Try another one.";


    async function onSubmit(evt) {
        evt.preventDefault();
        const registrationInfo = {
            firstName,
            lastName,
            email,
            username,
            password
        };
        const res = await fetch("/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(registrationInfo)
        });
        const resJson = await res.json();
        if (!resJson.success) {
            setAlertMsg(resJson.msg);
            setAlertVisibility("block");
        } else {
            setAlertMsg(resJson.msg);
            setAlertVisibility("block");
            setTimeout(() => {
            window.location.replace("login");
        }, 2000);
        }

    }


    return (
        <div>
            <div className="container text-center">
                <div className="row d-flex justify-content-center header-row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h1>Sign Up</h1>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                    <Alert display={alertVisibility}>{alertMsg}</Alert>
                        <form onSubmit={onSubmit}>
                            <InputField
                                _for="FirstName"
                                _label="First Name"
                                _type="text"
                                _name="first_name"
                                _value={firstName}
                                _setState={(evt) => setFirstName(evt.target.value)}
                            >
                                {" "}
                            </InputField>
                            <InputField
                                _for="LastName"
                                _label="Last Name"
                                _type="text"
                                _name="last_name"
                                _value={lastName}
                                _setState={(evt) => setLastName(evt.target.value)}
                            >
                                {" "}
                            </InputField>
                            <InputField
                                _for="Email"
                                _label="Email address"
                                _type="email"
                                _name="email"
                                _value={email}
                                _setState={(evt) => setEmail(evt.target.value)}
                            >
                                {" "}
                            </InputField>
                            <InputField
                                _for="Username"
                                _label="Username"
                                _type="text"
                                _name="username"
                                _value={username}
                                _setState={(evt) => setUsername(evt.target.value)}
                            >
                                {" "}
                            </InputField>

                            <InputField
                                _for="Password"
                                _label="Password"
                                _type="password"
                                _name="password"
                                _value={password}
                                _setState={(evt) => setPassword(evt.target.value)}
                            >
                                {" "}
                            </InputField>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
            <PageFooter></PageFooter>
        </div>
    );
};

export default SignUp;
