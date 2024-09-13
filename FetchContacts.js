const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const { Parser } = require('json2csv');

const token = '7509726673:AAE_XuqtWrCnt2NJk_3sX6XlpghyBRO3QFU';
const bot = new TelegramBot(token, { polling: true });

// Function to fetch contacts
async function fetchContacts() {
    try {
        const response = await bot.getContacts();
        const contacts = response.map(contact => ({
            firstName: contact.first_name,
            lastName: contact.last_name,
            phoneNumber: contact.phone_number
        }));
        return contacts;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
}

// Function to save contacts to a file
async function saveContactsToFile() {
    const contacts = await fetchContacts();
    if (contacts.length > 0) {
        fs.writeFileSync('contacts.json', JSON.stringify(contacts, null, 2));
        console.log('Contacts saved to contacts.json');
        convertToCSV();
    } else {
        console.log('No contacts found');
    }
}

// Function to convert JSON contacts to CSV
function convertToCSV() {
    const contacts = require('./contacts.json');
    const fields = ['firstName', 'lastName', 'phoneNumber'];
    const opts = { fields };

    try {
        const parser = new Parser(opts);
        const csv = parser.parse(contacts);
        fs.writeFileSync('contacts.csv', csv);
        console.log('Contacts converted to CSV and saved to contacts.csv');
    } catch (err) {
        console.error('Error converting contacts to CSV:', err);
    }
}

// Fetch and save contacts
saveContactsToFile();