fetch("/api/tst", {
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
