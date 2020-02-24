const validate = values => {
    const errors = {
        username: null,
        password: null
    };
    
    if (!values.username) {
        errors.username = 'Required';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
};
  
export default validate;