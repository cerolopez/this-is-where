import React from "react";
import PropTypes from "prop-types";

const LoginField = ({ _for, _label, _type, _name }) => {
    return (
        <div className="mb-3 text-start">
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

LoginField.propTypes = {
    _for: PropTypes.string.isRequired,
    _label: PropTypes.string.isRequired,
    _type: PropTypes.string.isRequired,
    _name: PropTypes.string.isRequired,
};

export default LoginField;
