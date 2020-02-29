const validate = values => {
    const errors = {
        email: null,
        password: null,
        confirmPassword: null
    };

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 14) {
        errors.password = 'New Password must be at least 14 characters';
    }

    if (!values.email) {
        errors.email = 'Required';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    }

    if (values.confirmPassword !== values.password) {
        errors.password = 'Passwords mismatched';
        errors.confirmPassword = 'Passwords mismatched';
    }

    return errors;
};
  
export default validate;