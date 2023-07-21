import LoginForm from "./LoginForm";

const Login = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Login screen</h2>
      <LoginForm setToken={props.setToken} />
    </div>
  );
};

export default Login;
