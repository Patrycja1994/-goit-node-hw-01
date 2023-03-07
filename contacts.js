const fs = require('fs').promises;
const path = require("path");

const contact = require("./db/contacts.json");
const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (contacts) => {
    console.table(JSON.parse(contacts));
  });
};

function getContactById(contactId)  {
  fs.readFile(contactsPath, (contacts) => {
    
    const foundId = JSON.parse(contacts).find((el) => {
      return el.id === contactId.toString();
    });
    console.table(foundId);
  });
};

function removeContact(contactId) {
  fs.readFile(contactsPath, (data) => {
    const contacts = JSON.parse(data);
    
    const filtered= contacts.filter(({ id }) => id !== contactId);
    
    fs.writeFile(contactsPath, JSON.stringify(filtered));
    console.table("Contact was deleted");
    
    listContacts();
  });

};


function addContact(id,name, email, phone) {
  const newContact = { id, name, email, phone };
  const newContactList = contact;
  newContactList.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(newContactList));
  console.table("Contact successfully added");

  listContacts();
}

module.exports = { addContact, listContacts, removeContact, getContactById };