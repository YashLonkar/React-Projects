import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {uuid} from 'uuidv4';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const[contacts, setContacts] =useState([]);  // Always use setContacts to update the contacts u neverdirectly use contacts to update the state 

  const addContactHandler = (contact) => {
    console.log(contact); 
    setContacts([...contacts,{ id:uuid(), ...contact}])
  }

  const removeContactHandler = (id) =>{
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);

  };

  //WHY THIS BELOW CODE NOT WORKED IM NOT GETTING 
  // useEffect(()=> {
  //   const retrieveContacts= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); //we have to parse it as a string so to retrieve it when needed 
  //   if(retrieveContacts){setContacts(retrieveContacts);};
  // }, []);

  useEffect(() => {
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrieveContacts && retrieveContacts.length > 0) {
      setContacts(retrieveContacts);
    }
  }, []);

  
  //Whenever the value changes it helps us to render the component again
  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts)) //We have to add a key in setItem
  }, [contacts]); // Added contact as a dependecny
  return (
    <div className="ui container">
      <Router>
      <Header/>
      <Routes>
      <Route exact path="/" element={<ContactList contacts= {contacts} getContactId= {removeContactHandler}/> } />
      <Route exact path="/add" element={ <AddContact addContactHandler = {addContactHandler}/> } />
      <Route exact path="/contact/:id" element={<ContactDetail contacts={contacts}/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
