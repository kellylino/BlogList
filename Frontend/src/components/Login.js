const Login = (pros) => {
  return (
    <div>
      <form onSubmit={pros.handleLogin}>
        <div>
          username
          <input
            id='username'
            type="text"
            value={pros.username}
            name="username"
            onChange={({ target }) => pros.setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="text"
            value={pros.password}
            name="password"
            onChange={({ target }) => pros.setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default Login