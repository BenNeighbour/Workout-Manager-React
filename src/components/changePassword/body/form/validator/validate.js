const validate = values => {
    const errors = {
        email: null
    };

    if (!values.email) {
        errors.email = 'Required';
    }

    return errors;
};
  
export default validate;