import { getAllContacts, getContactById } from '../services/contacts.js';

async function getContacts(req, res) {
  const response = await getAllContacts();
  res.json(response);
}

async function getContact(req, res) {
  try {
    const response = await getContactById(req.params.contactId);
    res.json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export { getContacts, getContact };
