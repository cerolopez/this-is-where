import React from "react";
import PropTypes from "prop-types";

const UserSetting = ({ _setting, _setState, _value, _type }) => {
    return (
        <div className="input-group flex-nowrap">
            <span className="input-group-text userSetting settingLabel">
                Edit your {_setting}:
            </span>
            <input
                type={_type}
                className="form-control userSetting"
                aria-label={`New ${_setting}`}
                aria-describedby="addon-wrapping"
                onChange={_setState}
                value={_value}
                required
            />
        </div>
    );
};

UserSetting.propTypes = {
    _setting: PropTypes.string.isRequired,
    _setState: PropTypes.func.isRequired,
    _value: PropTypes.string.isRequired,
    _type: PropTypes.string.isRequired,
};

export default UserSetting;
