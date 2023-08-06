import { Text, Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const validationSchema = yup.object().shape({
  login: yup
    .string()
    .min(1, 'Login must be greater or equal to 1')
    .required('Login is required'),
  password: yup
    .string()
    .min(1, 'Password must be greater or equal to 0.5')
    .required('Password is required'),
});

const initialValues = {
  login: '',
  password: '',
};

// const SignInForm = ({ onSubmit }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.fieldContainer}>
//         <FormikTextInput name="login" placeholder="Login" />
//       </View>
//       <View style={styles.fieldContainer}>
//         <FormikTextInput
//           name="password"
//           placeholder="Password"
//           secureTextEntry
//         />
//       </View>
//       <Button onPress={onSubmit}>Sign in</Button>
//     </View>
//   );
// };

const SignIn = () => {

    const onSubmit = (values) => {
        console.log(values.login, values.password);
    };
    
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => (
                <View style={styles.container}>
                    <View style={styles.fieldContainer}>
                        <FormikTextInput name="login" placeholder="Login" />
                    </View>
                    <View style={styles.fieldContainer}>
                        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
                    </View>

                    <Pressable onPress={handleSubmit}>
                        <Text>Login</Text>
                    </Pressable>
                </View>
            )}
            
        </Formik>
    );
};

export default SignIn;