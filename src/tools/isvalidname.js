function Isvalidname(username) {
  var err = "";
  function isUsername(username) {
    const re = /^[a-zA-Z0-9]{1,12}$/;
    return re.test(String(username));
  }

  if (username && !isUsername(username) && username.length < 12) {
    err = "Input may only contain alpha-numeric characters";
  } else if (username.length > 12) {
    err = "Name should be under 12 alpha-numeric characters";
  }
  return err;
}

export default Isvalidname;
