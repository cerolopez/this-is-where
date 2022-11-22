import React from "react";

const LoginField = ({ _for, _label, _type, _name}) => {
    return (
    <div className="mb-3">
        <label htmlFor={"input" + _for} className="form-label">
            {_label}
        </label>
        <input
            type={_type}
            name={_name}
            className="form-control"
            id={"input" + _label}
            required
        />
    </div>
    );
};

export default LoginField;