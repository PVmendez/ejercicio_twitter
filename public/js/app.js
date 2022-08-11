function displayNextRegister() {
    if (document.querySelector("#register1").style.display !== "none") {
      document.querySelector("#register1").style.display = "none";
      document.querySelector("#register2").style.display = "block";
    } else if (document.querySelector("#register2").style.display !== "none") {
      document.querySelector("#register2").style.display = "none";
      document.querySelector("#register3").style.display = "block";
    }
}

function displayLastRegister() {
  if (document.querySelector("#register3").style.display !== "none") {
    document.querySelector("#register3").style.display = "none";
    document.querySelector("#register2").style.display = "block";
  } else if (document.querySelector("#register2").style.display !== "none") {
    document.querySelector("#register2").style.display = "none";
    document.querySelector("#register1").style.display = "block";
  }
}