import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return {
    status: 'success',
    message: 'Successfully found contacts!',
    data: contacts,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  if (!contact) {
    throw new Error('Contact not found');
  }
  return {
    status: 'success',
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  };
};
