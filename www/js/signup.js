const signUpBtn = document.getElementById("signup-btn");

const isValidEmail = (email) => {
    // Regular expression for email pattern validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  
  const isValidPassword = (password) => {
    const minLength = 8;
    return password.length >= minLength;
  };

  const isNameRequired = (names) => {
    const minLength = 5
      return names.length > minLength
  };

  const statusDiv = document.getElementById("status");
  
const handleSignUp = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const fullName = document.getElementById("fullName").value;

  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const nameError = document.getElementById("name-error")

  emailError.textContent = "";
  passwordError.textContent = "";
  nameError.textContent = "";

  if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email";
    return;
  }

  if (!isValidPassword(password)) {
    passwordError.textContent = "Password should be at least 8 characters long";
    return;
  }

  if (!isNameRequired(fullName)) {
    nameError.textContent = "Full name is required";
    return;
}

 try {
  const res = await fetch(
    "https://api.jsonbin.io/v3/b/68547a008960c979a5ad140e/latest",
    {
      method: "GET",
      headers: {
        "X-Master-Key":
          "$2a$10$fHlVtdS4NQvjdgfxC4Qff.8Q2tzrTB8Ba.2RRBd7EH3ijDIRl0LC2",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch record data");
  }

  const recordAcc = await res.json();
  const newUser = {
    email: email,
    fullName: fullName,
    password: password
  }

  const addNewUser = [...recordAcc.record.accounts, newUser];
  const updateAcc = {
    ...recordAcc.record,
    accounts: addNewUser
  }
  const updateResponse = await fetch(
    "https://api.jsonbin.io/v3/b/68547a008960c979a5ad140e",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key":
          "$2a$10$fHlVtdS4NQvjdgfxC4Qff.8Q2tzrTB8Ba.2RRBd7EH3ijDIRl0LC2",
      },
      body: JSON.stringify(updateAcc),
    }
  );

  if (!updateResponse.ok) {
    throw new Error("Failed to create new account");
  }

  const updatedData = await updateResponse.json();
  console.log("New account created:", updatedData);
  statusDiv.textContent = "Your account has been created Successfully";

  setTimeout(() => {
    window.location.href = "/www";
  }, 1000);
} catch (error) {
  console.error("Error creating new incident:", error.message);
  statusDiv.textContent = "Error creating account";
}

};

signUpBtn.addEventListener("click", handleSignUp);
