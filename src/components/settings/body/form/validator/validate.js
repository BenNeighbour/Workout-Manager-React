const validate = values => {
    const errors = {
        updateUsername: null,
        updateEmail: null,
        updatePassword: null,
        updateConfirmPassword: null
    };
    
    if (!values.updatePassword) {
        errors.updatePassword = 'Required';
    }

    if (!values.updateConfirmPassword) {
        errors.updateConfirmPassword = 'Required';
    }

    if (values.updateConfirmPassword !== values.updatePassword) {
        errors.password = 'Passwords mismatched';
        errors.confirmPassword = 'Passwords mismatched';
    }

    return errors;
};
  
export default validate;