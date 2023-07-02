import React, { Component } from 'react';
import { nanoid } from 'nanoid';
// import { Formik } from 'formik';
// import * as yup from 'yup';

import Contacts from './contacts';
import PhoneBook from './phonebook';
import Filter from './filter';
import { save, load } from '../helpers/locale_storage';
import css from './app.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const getContact = load('newContact') || [];
    if (getContact.length === 0) {
      return;
    } else {
      this.setState({ contacts: getContact });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      save('newContact', this.state.contacts);
    }
  }

  filterByName = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = dataContact => {
    const findName = this.state.contacts.find(
      contact => contact.name === dataContact.name
    );
    if (findName !== undefined) {
      alert(`${findName.name} is already in contacts`);
      return;
    } else {
      const { name, number } = dataContact;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );

    return (
      <div>
        <h2 className={css.phoneBook}>Phonebook</h2>
        <PhoneBook createContact={this.addContact} />
        <h2 className={css.contacts}>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.filterByName} />
        {contacts.length !== 0 && (
          <Contacts
            contacts={filterContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
