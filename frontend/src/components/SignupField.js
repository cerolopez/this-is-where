import React from "react";

const SignupField = ({ _for, _label, _type, _name, _setState, _value }) => {
    return (
    <div className="mb-3">
        <label htmlFor={"input" + _for} className="form-label">
            {_label}
        </label>
        <input
            type={_type}
            name={_name}
            value={_value}
            className="form-control"
            id={"input" + _label}
            onChange={_setState}
            required
        />
    </div>
    );
};

export default SignupField;

//TODO: add propTypes