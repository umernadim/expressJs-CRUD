import Contact from "../models/contacts.models.js";
import mongoosh from "mongoose";

export const getContacts = async (req, res) => {
    res.render("home", { contacts });
    
    try {
        const contacts = await Contact.find();
        res.render("home", { contacts });
    } catch (error) {
        res.render('500', { message: error });
    }

};

export const getContact = async (req, res) => {
    let paramId = mongoosh.Types.ObjectId.isValid(req.params.id);
    if (!paramId) {
        res.render('404', { message: "Invalid Contact ID" });
    }
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.render('404', { message: "Contact not found" });
            return;
        }
        res.render("show-contact", { contact });
    } catch (error) {
        res.render('500', { message: error });
    }
};

export const addContactPage = (req, res) => {
    res.render("add-contact");
};

export const addContact = async (req, res) => {
    try {
        const contact = await Contact.insertOne({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
        })
        res.render("/");
    } catch (error) {
        res.render('500', { message: error });
    }


    res.redirect('/');
};

export const updateContactPage = async (req, res) => {
    let paramId = mongoosh.Types.ObjectId.isValid(req.params.id);
    if (!paramId) {
        res.render('404', { message: "Invalid Contact ID" });
    }
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.render('404', { message: "Contact not found" });
        }
        res.render("update-contact", { contact });
    } catch (error) {
        res.render('500', { message: error });
    }

};

export const updateContact = async (req, res) => {
    let paramId = mongoosh.Types.ObjectId.isValid(req.params.id);
    if (!paramId) {
        res.render('404', { message: "Invalid Contact ID" });
    }
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body)
        if (!contact) {
            res.render('404', { message: "Contact not found" });
        }
        res.redirect('/');
    } catch (error) {
        res.render('500', { message: error });
    }

};

export const deleteContact = async (req, res) => {
    let paramId = mongoosh.Types.ObjectId.isValid(req.params.id);
    if (!paramId) {
        res.render('404', { message: "Invalid Contact ID" });
    }
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            res.render('404', { message: "Contact not found" });
        }
        res.redirect('/');
    } catch (error) {
        res.render('500', { message: error });
    }
};