import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  function loginHandler(event) {
    event.preventDefault();

    const checkLogin = true;
    if (checkLogin) {
      // redirect
      navigate('/dashboard');
    }
  }

  return (
    <form onSubmit={loginHandler}>
      <input name="username"></input>
      <input type="password" name="password"></input>
      <button>Login</button>
    </form>
  );
}
