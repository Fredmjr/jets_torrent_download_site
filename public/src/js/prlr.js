//auto tkn fetch and cookie setup
(async () => {
  //get tkn & setup cookie
  const ftch_tkn = () => {
    fetch("/usr/crtusr", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.usr_id_tkn) {
          //cookie no expry voz it just a simple and quick setup
          console.log("fetched: ", data.usr_id_tkn);
          document.cookie =
            `usr_id_tkn=${encodeURIComponent(data.usr_id_tkn)};` +
            `Secure; SameSite=Strict; path=/`;
        }
      })
      .catch((error) => console.error(error));
  };

  //get cookie tkn
  c = (elem) => {
    let ckies = document.cookie.split("; ");
    for (let i = 0; i < ckies.length; i++) {
      let cookie = ckies[i];
      let [name, value] = cookie.split("=");
      if (name === elem) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  //check cookie tkn
  const usr_id_tkn = c("usr_id_tkn");
  console.log("stored: ", usr_id_tkn);

  if (!usr_id_tkn) {
    ftch_tkn();
  }
})();
