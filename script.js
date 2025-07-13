
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");


for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option"); 
    newOption.innerText = currCode; 
    newOption.value = currCode; 

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption); 
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input"); // Select the input for amount
  let amtVal = amount.value; // Get the value of the amount input

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL); // Fetch the exchange rate data
  let data = await response.json(); // Convert the response to JSON
  let rate = data[toCurr.value.toLowerCase()]; // Get the exchange rate

  // Calculate the final converted amount
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; // Display the result
};

// Function to update the flag image based on the selected currency
const updateFlag = (element) => {
  let currCode = element.value; // Get the selected currency code
  let countryCode = countryList[currCode]; // Get the corresponding country code
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // Construct the flag image URL
  let img = element.parentElement.querySelector("img"); // Find the image element within the same parent
  img.src = newSrc; // Update the image source to the new flag URL
};


btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // Prevent the default form submission behavior
  updateExchangeRate(); // Call the function to update the exchange rate
});


window.addEventListener("load", () => {
  updateExchangeRate();
});