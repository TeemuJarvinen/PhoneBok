/* 
  ------------ Possible Improvements -------------
  Switch Key <-> Value or use Objects: 
    > This version won't take duplicate names because names are being used as a key in a dictionary. 
      It would be better to use phone number as a key rather than name. Best solution would be to use objects.
  
  Formatting:
    > Spacing to phone number. This - 050 111 5555 instead of this -- 0501115555.
    > .Uppercase to first letters when adding new person. 
    > It's possible to add for example person named M1k3 which is not good.

*/

"use strict";

let answerField = document.getElementById("answerField");
let table = document.getElementById("phoneTable");

let phoneBook = {
  "Eric Example": "000 111 2222",
  "James Smith": "050 111 2222",
  "Michael Smith": "0400 012 1774",
  "Maria Garcia": "0400 320 7234",
  "David Garcia": "040 150 6587",
  "Maria Rodriguez": "050 269 1654",
  "Mary Smit": "050 354 8749",
  "Jim Hernandez": "0400 650 1224",
  "Maria Hernandez": "0400 187 0023",
  "Mike Johnson": "040 998 4521",
  "Mary Johnson": "050 715 6894",
  "Alice Williams": "050 548 6548",
  "Judy Williams": "050 154 5687",
  "Robert Williams": "050 656 7874",
  "Robert Smith": "030 333 3333",
  "Pete Brown": "030 987 1234",
  "Mike Jones": "022 112 1398",
  "Julia Jones": "400 110 9234",
  "Andy Davis": "400 790 8534",
};

// Loops throught the phonebook at the start so we get example entries into the table
for (const [key, value] of Object.entries(phoneBook)) {
  addToTable(key, value);
}

function searchPhoneNumber() {
  let searchName = document.getElementById("searchInput").value;

  if (phoneBook[searchName] == undefined || phoneBook[searchName] == null) {
    answerField.innerHTML = "No search result, try again";
  } else {
    answerField.innerHTML = searchName + " : " + phoneBook[searchName];
  }
}

function addPhoneNumber() {
  let addNameInput = document.getElementById("nameInput");
  let addPhoneNumberInput = document.getElementById("phoneInput");

  // Checks if fields are empty | Checks if already in phoneBook | Informs about duplicate
  if (addNameInput.value.length == 0 || addPhoneNumberInput.value.length == 0) {
    answerField.innerHTML = "Fields can't be empty";
  } else if (
    checkIfAlreadyInPhoneBook(addNameInput.value, addPhoneNumberInput.value)
  ) {
    phoneBook[addNameInput.value] = addPhoneNumberInput.value;

    addToTable(addNameInput.value, addPhoneNumberInput.value);

    answerField.innerHTML =
      "Added - " + addNameInput.value + " : " + addPhoneNumberInput.value;
  } else {
    answerField.innerHTML = "Duplicate found in the list";
  }
}

function checkIfAlreadyInPhoneBook(name, phone) {
  // Returns true if (name:phone combination) not in phonebook

  if (!(name in phoneBook)) {
    return true;
  }
}

function addToTable(name, phone) {
  let index = -1;

  let row = table.insertRow(index);

  let nameCell = row.insertCell(0);
  let phoneCell = row.insertCell(1);

  nameCell.innerHTML = name;
  phoneCell.innerHTML = phone;

  index++;
}

function deleteFromTable(name) {
  let i = 1;

  for (const [key] of Object.entries(phoneBook)) {
    if (key == name) {
      table.deleteRow(i);
    }
    i++;
  }
}

function deleteUserInPhoneBook() {
  let deleteNameInput = document.getElementById("nameInput");
  let deleteNumberInput = document.getElementById("phoneInput");

  // Checks if fields are empty | Checks if user in phoneBook and removes it | Informs if something went wrong
  if (
    deleteNameInput.value.length == 0 ||
    deleteNumberInput.value.length == 0
  ) {
    answerField.innerHTML = "Fields can't be empty";
  }
  if (findRemovableUser(deleteNameInput.value, deleteNumberInput.value)) {
    answerField.innerHTML = "Delete successful";
    deleteFromTable(deleteNameInput.value);
    delete phoneBook[deleteNameInput.value];
  } else {
    answerField.innerHTML = "Delete unsuccessful";
  }
}

function findRemovableUser(name, phone) {
  for (const [key, value] of Object.entries(phoneBook)) {
    if (key == name && value == phone) {
      return true;
    }
  }
  return false;
}
