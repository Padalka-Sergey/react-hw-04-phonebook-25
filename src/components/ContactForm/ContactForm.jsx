import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  LabelName,
  LabelNumber,
  InputName,
  InputNumber,
  Form,
  Button,
} from './ContactForm.styled';

export const ContactForm = ({ contacts, submitHandler }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    const elemName = e.target.elements.name;
    e.preventDefault();
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === elemName.value.toLowerCase()
      )
    ) {
      return alert(`${elemName.value} is already in contacts`);
    }
    submitHandler({ name, number });
    resetForm();
  };

  const handleInputChange = e => {
    const { value, name } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        console.warn("Ошибка в 'handleInputChange'");
        break;
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <LabelName>
        Name
        <InputName
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-ЯёЁ]+([ \u0027\-][a-zA-Zа-яА-ЯёЁ]+)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleInputChange}
          required
        />
      </LabelName>
      <LabelNumber>
        Number
        <InputNumber
          type="tel"
          name="number"
          pattern="^\+?[0-9\-\.\(\) ]{4,20}$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleInputChange}
          required
        />
      </LabelNumber>
      <Button type="submit">Add contacts</Button>
    </Form>
  );
};

ContactForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

// export class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   handleSubmit = e => {
//     const { name } = e.target.elements;
//     e.preventDefault();
//     if (
//       this.props.contacts.some(
//         contact => contact.name.toLowerCase() === name.value.toLowerCase()
//       )
//     ) {
//       return alert(`${name.value} is already in contacts`);
//     }
//     this.props.submitHandler(this.state);
//     this.resetForm();
//   };

//   handleInputChange = e => {
//     const { value, name } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   resetForm = () => {
//     this.setState({ name: '', number: '' });
//   };
//   render() {
//     const { name, number } = this.state;
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <LabelName>
//           Name
//           <InputName
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-ЯёЁ]+([ \u0027\-][a-zA-Zа-яА-ЯёЁ]+)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             value={name}
//             onChange={this.handleInputChange}
//             required
//           />
//         </LabelName>
//         <LabelNumber>
//           Number
//           <InputNumber
//             type="tel"
//             name="number"
//             pattern="^\+?[0-9\-\.\(\) ]{4,20}$"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             value={number}
//             onChange={this.handleInputChange}
//             required
//           />
//         </LabelNumber>
//         <Button type="submit">Add contacts</Button>
//       </Form>
//     );
//   }
// }

// ContactForm.propTypes = {
//   submitHandler: PropTypes.func.isRequired,
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ),
// };
