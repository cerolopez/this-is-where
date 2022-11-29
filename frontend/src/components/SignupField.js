import React from "react";
import PropTypes from "prop-types";

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

SignupField.propTypes = {
    _for: PropTypes.string.isRequired,
    _label: PropTypes.string.isRequired,
    _type: PropTypes.string.isRequired,
    _name: PropTypes.string.isRequired,
    _setState: PropTypes.func.isRequired,
    _value: PropTypes.string.isRequired,
};

export default SignupField;
