const Logout = () => {
  const handleLogout = () => {
    document.cookie = "auth=;  path=/;";
    window.location.href = "/login";
  };
  return <a class="logout-button" onClick={() => handleLogout()}>Logout</a>;
};

export default Logout;
