import { useState } from "react";
import { LogOut, Book, History, User, Home, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import BookCardGrid from "../components/ListBooks";
import { useBooks } from "../context/BooksContext";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { borrowedBooks } = useBooks();
  const { currentUser } = useAuth();

  // Filter borrowed books for current user
  const userBorrowedBooks = borrowedBooks.filter(
    (book) => book.userId === currentUser?.uid
  );

  // Filter books based on search query
  const filteredBorrowedBooks = userBorrowedBooks.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Calculate due date (2 weeks from borrow date)
  const getDueDate = (borrowDate) => {
    if (!borrowDate) return "N/A";
    const date = borrowDate.toDate();
    date.setDate(date.getDate() + 14); // Add 14 days
    return date.toLocaleDateString();
  };

  return (
    <div className="flex fixed top-0 left-0 right-0 bottom-0 h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center mb-2">
            <User size={40} />
          </div>
          <h2 className="text-xl font-semibold">{currentUser?.email}</h2>
          <p className="text-indigo-300 text-sm">Student</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("home")}
                className={`flex items-center w-full p-3 rounded-lg hover:bg-indigo-700 ${
                  activeTab === "home" ? "bg-indigo-700" : ""
                }`}
              >
                <Home size={18} className="mr-3" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("books")}
                className={`flex items-center w-full p-3 rounded-lg hover:bg-indigo-700 ${
                  activeTab === "books" ? "bg-indigo-700" : ""
                }`}
              >
                <Book size={18} className="mr-3" />
                <span>Current Books</span>
                {userBorrowedBooks.length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {userBorrowedBooks.length}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center w-full p-3 rounded-lg hover:bg-indigo-700 ${
                  activeTab === "history" ? "bg-indigo-700" : ""
                }`}
              >
                <History size={18} className="mr-3" />
                <span>History</span>
              </button>
            </li>
          </ul>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center p-3 rounded-lg hover:bg-indigo-700"
        >
          <LogOut size={18} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white text-black shadow p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeTab === "home" && "Dashboard"}
              {activeTab === "books" && "Current Books"}
              {activeTab === "history" && "Borrowing History"}
            </h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === "home" && <BookCardGrid />}

          {activeTab === "books" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Currently Borrowed Books
                </h2>
                <p className="text-gray-600 mb-4">
                  You currently have {filteredBorrowedBooks.length} books
                  checked out.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Borrow Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Genre
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBorrowedBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-6 text-black py-4">{book.title}</td>
                        <td className="px-6 py-4 text-gray-500">
                          {book.author}
                        </td>
                        <td className="px-6 text-black py-4">
                          {book.approvedDate?.toDate().toLocaleDateString()}
                        </td>
                        <td className="px-6 text-black py-4">
                          {getDueDate(book.approvedDate)}
                        </td>
                        <td className="px-6 text-black py-4">{book.genre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Borrowing History
                </h2>
                <p className="text-gray-600 mb-4">
                  You have borrowed {filteredBorrowedBooks.length} books in
                  total.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Borrow Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Return Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Genre
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBorrowedBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-6 text-black py-4">{book.title}</td>
                        <td className="px-6 py-4 text-gray-500">
                          {book.author}
                        </td>
                        <td className="px-6 text-black py-4">
                          {book.approvedDate?.toDate().toLocaleDateString()}
                        </td>
                        <td className="px-6 text-black py-4">
                          {getDueDate(book.approvedDate)}
                        </td>
                        <td className="px-6 text-black py-4">{book.genre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
