const loginBtn = document.getElementById("login-btn");

const isValidEmail = (email) => {
  // Regular expression for email pattern validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const isValidPassword = (password) => {
  const minLength = 8;
  return password.length >= minLength;
};

const handleLogin = (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  emailError.textContent = ""; // Clear previous error messages
  passwordError.textContent = "";

  if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email";
    return;
  }

  if (!isValidPassword(password)) {
    passwordError.textContent = "Password should be at least 8 characters long";
    return;
  }

  fetch("https://api.jsonbin.io/v3/b/68547a008960c979a5ad140e", {
    headers: {
      "X-Master-Key":
        "$2a$10$fHlVtdS4NQvjdgfxC4Qff.8Q2tzrTB8Ba.2RRBd7EH3ijDIRl0LC2",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const user = data.record.accounts.find((user) => user.email === email);
      if (user) {
        if (user.password === password) {
          // Display success message
          document.getElementById("login-message").textContent =
            "Login successful";
          setTimeout(() => {
            window.location.href = "post.html";
          }, 2000);
        } else {
          passwordError.textContent = "Invalid password";
        }
      } else {
        emailError.textContent = "User not found";
      }
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      // Display error message
      document.getElementById("login-message").textContent = "Error logging in";
    });
};

loginBtn.addEventListener("click", handleLogin);

