const { program } = require('commander');

const contacts = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        const listContacts = await contacts.listContacts();
        console.log(listContacts);
        break;

      case 'get':
        const contact = await contacts.getContactById(id);
        console.log(contact);
        break;

      case 'add':
        const newContact = await contacts.addContact({ name, email, phone });
        console.log(newContact);
        break;

      case 'remove':
        const deleteContact = await contacts.removeContact(id);
        console.log(deleteContact);
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.error('Err', error);
  }
}

// invokeAction({ action: 'list' });

// invokeAction({ action: 'get', id: 'qdggE76Jtbfd9eWJHrssH' });
// invokeAction({ action: 'remove', id: 'qdggE76Jtbfd9eWJHrssH' });
// invokeAction({ action: 'add', name: 'Anb', email: 'aaa@', phone: '131313' });
