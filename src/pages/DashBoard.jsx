import { useState } from "react";
import { Book, LogOut, PlusCircle, User, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function LibraryDashboard() {
  const navigate = useNavigate();
  // State for managing book data
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "/api/placeholder/200/300",
      year: 1960,
      genre: "Classic",
      available: true,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      cover: "/api/placeholder/200/300",
      year: 1949,
      genre: "Dystopian",
      available: false,
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "/api/placeholder/200/300",
      year: 1925,
      genre: "Classic",
      available: true,
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "/api/placeholder/200/300",
      year: 1813,
      genre: "Romance",
      available: true,
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      cover: "/api/placeholder/200/300",
      year: 1937,
      genre: "Fantasy",
      available: false,
    },
    {
      id: 6,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      cover: "/api/placeholder/200/300",
      year: 1997,
      genre: "Fantasy",
      available: true,
    },
  ]);

  // State for managing borrow requests
  const [requests, setRequests] = useState([
    {
      id: 101,
      user: "Emma Thompson",
      bookId: 2,
      bookTitle: "1984",
      date: "May 5, 2025",
      status: "pending",
    },
    {
      id: 102,
      user: "Marcus Johnson",
      bookId: 5,
      bookTitle: "The Hobbit",
      date: "May 4, 2025",
      status: "pending",
    },
  ]);

  // Form state for adding new book
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    year: "",
    genre: "",
  });

  // State for active sidebar section
  const [activeSection, setActiveSection] = useState("books");

  // Handle approve request
  const handleApproveRequest = (requestId) => {
    setRequests(
      requests.map((request) =>
        request.id === requestId ? { ...request, status: "approved" } : request
      )
    );
  };

  // Handle input change for new book form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  // Handle add book submission
  const handleAddBook = () => {
    const bookToAdd = {
      id: books.length + 1,
      title: newBook.title,
      author: newBook.author,
      year: parseInt(newBook.year),
      genre: newBook.genre,
      cover: "/api/placeholder/200/300",
      available: true,
    };

    setBooks([...books, bookToAdd]);
    setNewBook({ title: "", author: "", year: "", genre: "" });
    setActiveSection("books");
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex fixed top-0 left-0 right-0 bottom-0 h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col">
        {/* User info section */}
        <div className="p-4 border-b border-blue-700">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 rounded-full p-2">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-bold">John Librarian</h2>
              <p className="text-sm text-blue-200">Library Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 pt-4">
          <button
            onClick={() => setActiveSection("books")}
            className={`flex items-center w-full px-4 py-3 ${
              activeSection === "books" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            <Book className="h-5 w-5 mr-3" />
            <span>Books</span>
          </button>

          <button
            onClick={() => setActiveSection("addBook")}
            className={`flex items-center w-full px-4 py-3 ${
              activeSection === "addBook" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            <PlusCircle className="h-5 w-5 mr-3" />
            <span>Add Book</span>
          </button>

          <button
            onClick={() => setActiveSection("requests")}
            className={`flex items-center w-full px-4 py-3 ${
              activeSection === "requests" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            <Clock className="h-5 w-5 mr-3" />
            <span>Borrow Requests</span>
            {requests.filter((r) => r.status === "pending").length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {requests.filter((r) => r.status === "pending").length}
              </span>
            )}
          </button>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="flex items-center text-white hover:text-blue-200"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeSection === "books" && "Book Collection"}
            {activeSection === "addBook" && "Add New Book"}
            {activeSection === "requests" && "Borrow Requests"}
          </h1>
        </header>

        {/* Content based on active section */}
        <main className="p-6">
          {activeSection === "books" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-48 object-cover"
                    />
                    <div
                      className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white rounded ${
                        book.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {book.available ? "Available" : "Borrowed"}
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                    <p className="text-gray-600 mb-2">by {book.author}</p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Year: {book.year}</p>
                      <p>Genre: {book.genre}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 border-t flex justify-between">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit details
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      {book.available ? "Mark as borrowed" : "Mark as returned"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "addBook" && (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={newBook.title}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Book title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={newBook.author}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Author name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Publication Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={newBook.year}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      placeholder="Year"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Genre
                    </label>
                    <select
                      name="genre"
                      value={newBook.genre}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">Select a genre</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-Fiction">Non-Fiction</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Romance">Romance</option>
                      <option value="Biography">Biography</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Book Cover
                    </label>
                    <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                            <span>Upload a file</span>
                            <input type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
                      placeholder="Brief description of the book"
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveSection("books")}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddBook}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Add Book
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "requests" && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {request.user}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {request.bookTitle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {request.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            request.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {request.status === "approved"
                            ? "Approved"
                            : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {request.status === "pending" ? (
                          <button
                            onClick={() => handleApproveRequest(request.id)}
                            className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md"
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="text-gray-500">Approved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
