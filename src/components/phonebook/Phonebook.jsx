import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './phonebook.module.css';

class PhoneBook extends Component {
  state = {
    name: '',
    number: '',
  };

  getValue = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.createContact(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.formPhonebook} onSubmit={this.onSubmitForm}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            autoComplete="off"
            value={name}
            autoFocus="on"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.getValue}
          />
        </label>

        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            autoComplete="off"
            value={number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.getValue}
          />
        </label>

        <button className={css.btnSubmit} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}

export default PhoneBook;

PhoneBook.propTypes = {
  createContact: PropTypes.func.isRequired,
};
