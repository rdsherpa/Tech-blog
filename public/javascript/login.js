const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username").Value.trim();
  const password = document.querySelector("#password").Value.trim();

  console.log(username, password);

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: { "Content-Type": "application/json" },
  });

  console.log(response);

  if (response.ok) {
    document.location.replace("/"); // eventually ('/ dashboard)
  } else {
    const message = await response.json();
    alert(message);
  }
};
document.querySelector("form").addEventListener("submit", loginFormHandler);
