import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';

async function getContacts(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const userId = req.user._id;
  const response = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
  });
  res.json(response);
}

async function getContact(req, res) {
  try {
    const userId = req.user._id;
    const response = await getContactById(req.params.contactId, userId);
    res.json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function createContactController(req, res) {
  const { name, email, phone } = req.body;
  const userId = req.user._id;

  const contact = await createContact({ name, email, phone, userId });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
}

async function deleteContactController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
}

async function upsertContactController(req, res, next) {
  const { contactId } = req.params;
  const userId = req.user._id;
  const result = await updateContact(contactId, userId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
}

async function patchContactController(req, res, next) {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
}

export {
  getContacts,
  getContact,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
};
