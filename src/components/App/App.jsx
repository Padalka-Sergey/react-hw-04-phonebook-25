import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { contactsData } from 'data/contactsData.js';
import { AppContainer, Title, SubTitle } from './App.styled.jsx';
import { ContactForm } from 'components/ContactForm/ContactForm.jsx';
import { Filter } from 'components/Filter/Filter.jsx';
import { ContactList } from 'components/ContactList/ContactList.jsx';

const LS_KEY = 'contacts';

export const App = () => {
  const savedContacts = localStorage.getItem(LS_KEY);
  const parsedContacts = JSON.parse(savedContacts);

  const [contacts, setContacts] = useState(parsedContacts ?? contactsData);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = data => {
    setContacts(contacts => {
      return [
        ...contacts,
        { id: nanoid(), name: data.name, number: data.number },
      ];
    });
  };

  const handleInputChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const deleteContact = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const filterNames = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <ContactForm contacts={contacts} submitHandler={formSubmitHandler} />
      <SubTitle>Contacts</SubTitle>
      <Filter filter={filter} changeHandler={handleInputChange} />
      <ContactList
        contacts={contacts}
        filterNames={filterNames}
        deleteContact={deleteContact}
      />
    </AppContainer>
  );
};

// export class App extends Component {
//   state = {
//     contacts: contactsData,
//     filter: '',
//   };

//   formSubmitHandler = data => {
//     this.setState(prevState => ({
//       contacts: [
//         ...prevState.contacts,
//         { id: nanoid(), name: data.name, number: data.number },
//       ],
//     }));
//   };

//   handleInputChange = e => {
//     const { value, name } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   deleteContact = id => {
//     const newContacts = this.state.contacts.filter(
//       contact => contact.id !== id
//     );
//     this.setState({ contacts: newContacts });
//   };

//   componentDidMount() {
//     const savedContacts = localStorage.getItem(LS_KEY);
//     const parsedContacts = JSON.parse(savedContacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { contacts, filter } = this.state;
//     const filterNames = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//     return (
//       <AppContainer>
//         <Title>Phonebook</Title>
//         <ContactForm
//           contacts={contacts}
//           submitHandler={this.formSubmitHandler}
//         />
//         <SubTitle>Contacts</SubTitle>
//         <Filter filter={filter} changeHandler={this.handleInputChange} />
//         <ContactList
//           contacts={contacts}
//           filterNames={filterNames}
//           deleteContact={this.deleteContact}
//         />
//       </AppContainer>
//     );
//   }
// }
