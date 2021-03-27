import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const TextInputGroup = ({
//passing props directing into fxn. Its still a way of destructuring
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        // className="form-control form-control-lg"

        //class 'is-invalid' adds danger border. Now, it can only occur when we have 'error'
        className={classnames('form-control form-control-lg', {
            'is-invalid': error
          })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
       
      {
        //div only shows where error exists
      error && <div className="invalid-feedback">{error}</div>
      }
    </div>
  );
};

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

TextInputGroup.defaultProps = {
  type: 'text'
};

export default TextInputGroup;
