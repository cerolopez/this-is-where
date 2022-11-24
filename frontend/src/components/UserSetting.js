import React from "react";

const UserSetting = ({setting, _setState, _value, _type}) => {
    return (
        <div className="input-group flex-nowrap">
            <span className="input-group-text userSetting" id="addon-wrapping">
                Change {setting} 
            </span>
            <input
                type={_type}
                className="form-control userSetting"
                // placeholder={`New ${setting}`}
                aria-label={`New ${setting}`}
                aria-describedby="addon-wrapping"
                onChange={_setState}
                value={_value}
                required
            />
        </div>
    );
};

export default UserSetting;