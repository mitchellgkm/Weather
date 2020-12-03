function toProperCase(string) {
  var firstChar = string[0].toUpperCase();
  var otherChars = "";
  for (i = 1; i < string.length; i++) {
    if (string[i - 1] === " ") {
      otherChars += string[i].toUpperCase();
    } else {
      otherChars += string[i].toLowerCase();
    }
  }
  return firstChar + otherChars;
}

document.getElementById("submit").addEventListener("click", () => {
  callEndpoint();
});

document.getElementById("searchUser").addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    callEndpoint();
  }
});

function callEndpoint() {
  const endpoint = "https://api.openweathermap.org/data/2.5/weather";
  var city = toProperCase(document.getElementById("searchUser").value);
  const key = "972f20535865310db4738128b621c170";
  const url = endpoint + "?q=" + city + "&appid=" + key + "&units=metric";
  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("city").innerHTML = `<strong>${city}</strong>`;
      document.getElementById(
        "highslows"
      ).innerText = `Highs of ${data.main["temp_max"]}° and lows of ${data.main["temp_min"]}°`;
      document.getElementById("conditions").innerText =
        `Conditions in ${city} are looking like ` +
        data.weather[0]["main"].toLowerCase();
    })
    .catch((err) => {
      console.log(err);
    });
}
