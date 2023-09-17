document.addEventListener("DOMContentLoaded", function () {
  let input = document.getElementById("inputBox");
  let buttons = document.querySelectorAll("button");
  let string = "";

  //to toggle between dark and light mode
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");
  }

  //to get the value of the toggle button and call the toggleDarkMode function
  const ToggleBtn = document.getElementById("mode-toggle");
  ToggleBtn.addEventListener("click", toggleDarkMode);

  //to get the value of the input box from local storage
  if (localStorage.getItem("string")) {
    string = localStorage.getItem("string");
    input.value = string;
  }

  //to save the value of the input box in local storage
  window.addEventListener("beforeunload", function () {
    localStorage.setItem("string", string);
  });

  //to get the value of the button clicked and show it in the input box and evaluate the string
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.innerHTML;

      switch (buttonText) {
        case "=":
          try {
            string = eval(string);
            if (isNaN(string) || !isFinite(string)) {
              input.value = "Error";
            } else {
              let output = document.createElement("p");
              output.innerHTML = string;
              input.parentNode.appendChild(output);
              output.style.fontSize = "2rem";
              output.style.fontWeight = "bold";
              output.style.color = "white";
              output.style.textAlign = "right";
              output.style.marginRight = "1rem";
            }
          } catch (error) {
            input.value = "Error";
          }
          break;

        //to set the value of the toggle button to null
        case "Dark Mode":
          input.value = null;
          break;

        //to clear the input box
        case "c":
          string = "";
          input.value = string;
          let output = document.querySelector("p");
          if (output) {
            output.remove();
          }
          break;

        //to delete the last character
        case "DEL":
          string = string.slice(0, -1);
          input.value = string;
          break;

        default:
          string += buttonText;
          input.value = string;
          break;
      }
    });
  });
});
