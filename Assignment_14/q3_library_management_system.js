/**
 * Assignment 14 - Q3: Library Management System
 * Classes + Objects for library book management
 */

"use strict";

console.log("=== Q3: Library Management System ===");

// Book class definition
class Book {
    constructor(title, author, isbn, isIssued = false) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isIssued = isIssued;
        this.issueDate = null;
        this.returnDate = null;
        this.issuedTo = null;
    }

    /**
     * Issue the book to a user
     * @param {string} userName - Name of the user issuing the book
     * @returns {boolean} - True if successfully issued, false if already issued
     */
    issueBook(userName) {
        if (this.isIssued) {
            console.log(`❌ Book "${this.title}" is already issued to ${this.issuedTo}`);
            return false;
        }
        
        this.isIssued = true;
        this.issuedTo = userName;
        this.issueDate = new Date();
        this.returnDate = null;
        
        console.log(`✅ Book "${this.title}" issued to ${userName} on ${this.issueDate.toLocaleDateString()}`);
        return true;
    }

    /**
     * Return the book
     * @returns {boolean} - True if successfully returned, false if not issued
     */
    returnBook() {
        if (!this.isIssued) {
            console.log(`❌ Book "${this.title}" is not currently issued`);
            return false;
        }
        
        const previousUser = this.issuedTo;
        this.isIssued = false;
        this.returnDate = new Date();
        const tempIssueDate = this.issueDate;
        
        // Calculate days issued
        const daysIssued = Math.ceil((this.returnDate - this.issueDate) / (1000 * 60 * 60 * 24));
        
        // Reset issue information
        this.issuedTo = null;
        this.issueDate = null;
        
        console.log(`✅ Book "${this.title}" returned by ${previousUser} after ${daysIssued} days`);
        return true;
    }

    /**
     * Get book details as formatted string
     * @returns {string} - Formatted book information
     */
    getBookDetails() {
        const status = this.isIssued ? `📚 Issued to: ${this.issuedTo}` : '📖 Available';
        return `
📖 "${this.title}"
   Author: ${this.author}
   ISBN: ${this.isbn}
   Status: ${status}
`;
    }

    /**
     * Get book summary for listings
     * @returns {string} - Short book summary
     */
    getBookSummary() {
        const statusIcon = this.isIssued ? '🔴' : '🟢';
        return `${statusIcon} "${this.title}" by ${this.author} (ISBN: ${this.isbn})`;
    }
}

// Library Management System
class LibraryManager {
    constructor() {
        this.books = [];
    }

    /**
     * Add a book to the library
     * @param {Book} book - Book object to add
     */
    addBook(book) {
        this.books.push(book);
        console.log(`📚 Added "${book.title}" to library`);
    }

    /**
     * Find book by ISBN
     * @param {string} isbn - ISBN to search for
     * @returns {Book|null} - Found book or null
     */
    findBookByISBN(isbn) {
        return this.books.find(book => book.isbn === isbn) || null;
    }

    /**
     * Display all available books (not issued)
     */
    displayAvailableBooks() {
        const availableBooks = this.books.filter(book => !book.isIssued);
        
        console.log("\n🟢 === Available Books ===");
        if (availableBooks.length === 0) {
            console.log("No books available currently.");
        } else {
            availableBooks.forEach(book => {
                console.log(book.getBookSummary());
            });
            console.log(`\nTotal available: ${availableBooks.length} books`);
        }
    }

    /**
     * Display all issued books
     */
    displayIssuedBooks() {
        const issuedBooks = this.books.filter(book => book.isIssued);
        
        console.log("\n🔴 === Issued Books ===");
        if (issuedBooks.length === 0) {
            console.log("No books are currently issued.");
        } else {
            issuedBooks.forEach(book => {
                console.log(`📚 "${book.title}" → ${book.issuedTo} (since ${book.issueDate.toLocaleDateString()})`);
            });
            console.log(`\nTotal issued: ${issuedBooks.length} books`);
        }
    }

    /**
     * Issue a book by ISBN
     * @param {string} isbn - ISBN of book to issue
     * @param {string} userName - Name of user
     * @returns {boolean} - Success status
     */
    issueBookByISBN(isbn, userName) {
        const book = this.findBookByISBN(isbn);
        if (!book) {
            console.log(`❌ Book with ISBN ${isbn} not found in library`);
            return false;
        }
        return book.issueBook(userName);
    }

    /**
     * Return a book by ISBN
     * @param {string} isbn - ISBN of book to return
     * @returns {boolean} - Success status
     */
    returnBookByISBN(isbn) {
        const book = this.findBookByISBN(isbn);
        if (!book) {
            console.log(`❌ Book with ISBN ${isbn} not found in library`);
            return false;
        }
        return book.returnBook();
    }

    /**
     * Get library statistics
     */
    getLibraryStats() {
        const total = this.books.length;
        const available = this.books.filter(book => !book.isIssued).length;
        const issued = this.books.filter(book => book.isIssued).length;
        
        console.log("\n📊 === Library Statistics ===");
        console.log(`Total books: ${total}`);
        console.log(`Available: ${available}`);
        console.log(`Issued: ${issued}`);
    }
}

// Create library instance
const library = new LibraryManager();

// Create book objects and add to library
const books = [
    new Book("The JavaScript Bible", "John Smith", "978-1-234-56789-0"),
    new Book("React Fundamentals", "Jane Doe", "978-1-234-56789-1"),
    new Book("Node.js in Action", "Mike Johnson", "978-1-234-56789-2"),
    new Book("CSS Mastery", "Sarah Wilson", "978-1-234-56789-3"),
    new Book("Python for Beginners", "David Brown", "978-1-234-56789-4"),
    new Book("Database Design", "Lisa Garcia", "978-1-234-56789-5"),
    new Book("Web Security", "Tom Anderson", "978-1-234-56789-6")
];

// Add books to library
console.log("\n--- Adding Books to Library ---");
books.forEach(book => library.addBook(book));

// Display all available books
library.displayAvailableBooks();
library.getLibraryStats();

// Simulate book issuing
console.log("\n--- Book Issuing Simulation ---");
library.issueBookByISBN("978-1-234-56789-0", "Alice Kumar");
library.issueBookByISBN("978-1-234-56789-2", "Bob Patel");
library.issueBookByISBN("978-1-234-56789-4", "Charlie Singh");

// Try to issue already issued book
library.issueBookByISBN("978-1-234-56789-0", "David Sharma");

// Display current status
library.displayAvailableBooks();
library.displayIssuedBooks();
library.getLibraryStats();

// Simulate book returning
console.log("\n--- Book Returning Simulation ---");
library.returnBookByISBN("978-1-234-56789-0"); // Alice returns JavaScript book
library.returnBookByISBN("978-1-234-56789-3"); // Try returning non-issued book

// Final status
library.displayAvailableBooks();
library.displayIssuedBooks();
library.getLibraryStats();

// Search functionality demo
console.log("\n--- Search Functionality ---");
const searchISBN = "978-1-234-56789-1";
const foundBook = library.findBookByISBN(searchISBN);
if (foundBook) {
    console.log(`Found book: ${foundBook.getBookDetails()}`);
} else {
    console.log(`Book with ISBN ${searchISBN} not found`);
}