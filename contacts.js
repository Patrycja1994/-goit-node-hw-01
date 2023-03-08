const fs = require('fs');
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (error, contacts) => {
    if (error) throw error;

    console.table(JSON.parse(contacts));
  });
}

function getContactById(contactId)  {
   fs.readFile(contactsPath, (error, contacts) => {
    if (error) throw error;
    const foundId = JSON.parse(contacts).find(
      ({ id }) => id === contactId.toString()
    );
    console.table(foundId);
  });
};

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    
    const filtered = contacts.filter(({ id }) => id !== contactId);
    
    fs.writeFile(contactsPath, JSON.stringify(filtered), (error) => {
      if (error) throw error;
      listContacts();
    });

  });

};


function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;
    const contacts = JSON.parse(data);
    const idAddedContact = Number(contacts[contacts.length - 1].id) + 1;

    const newContacts = { id: `${idAddedContact}`, name, email, phone };
    fs.writeFile(contactsPath, JSON.stringify([...contacts, newContacts]), (error) => {
      if (error) throw error;
      console.table("Contact successfully added");
      listContacts();
    });
  });
}

module.exports = { addContact, listContacts, removeContact, getContactById };