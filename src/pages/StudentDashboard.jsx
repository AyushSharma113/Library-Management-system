import { useState } from "react";
import {
  LogOut,
  Book,
  History,
  User,
  Home,
  Search,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Mock student data
  const studentName = "Alex Johnson";
  const studentInfo = {
    id: "STU2024135",
    program: "Computer Science",
    year: "3rd Year",
  };

  // Mock books data
  const rentedBooks = [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      author: "Robert Smith",
      dueDate: "May 15, 2025",
      renewals: 1,
    },
    {
      id: 2,
      title: "Introduction to Artificial Intelligence",
      author: "Maria Chen",
      dueDate: "May 20, 2025",
      renewals: 0,
    },
    {
      id: 3,
      title: "Modern Web Development",
      author: "Jason Taylor",
      dueDate: "May 12, 2025",
      renewals: 2,
    },
  ];

  // Mock history data
  const bookHistory = [
    {
      id: 101,
      title: "Python Programming",
      author: "David Miller",
      returnDate: "Apr 10, 2025",
      onTime: true,
    },
    {
      id: 102,
      title: "Database Management Systems",
      author: "Sarah Wilson",
      returnDate: "Mar 25, 2025",
      onTime: true,
    },
    {
      id: 103,
      title: "Computer Networks",
      author: "Michael Brown",
      returnDate: "Feb 15, 2025",
      onTime: false,
    },
    {
      id: 104,
      title: "Software Engineering Principles",
      author: "Jennifer Lee",
      returnDate: "Jan 30, 2025",
      onTime: true,
    },
    {
      id: 105,
      title: "Cloud Computing Fundamentals",
      author: "Robert Jones",
      returnDate: "Dec 20, 2024",
      onTime: true,
    },
  ];

  // Filter books based on search query
  const filteredBooks = rentedBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHistory = bookHistory.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex fixed top-0 left-0 right-0 bottom-0 h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center mb-2">
            <User size={40} />
          </div>
          <h2 className="text-xl font-semibold">{studentName}</h2>
          <p className="text-indigo-300 text-sm">{studentInfo.id}</p>
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
        <header className="bg-white shadow p-4">
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
          {activeTab === "home" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Current Books
                  </h2>
                  <button
                    onClick={() => setActiveTab("books")}
                    className=" hover:text-indigo-800 flex items-center"
                  >
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  {rentedBooks.slice(0, 2).map((book) => (
                    <div
                      key={book.id}
                      className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium text-indigo-600">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-500">{book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Due: {book.dueDate}
                        </p>
                        <p className="text-xs text-gray-500">
                          Renewals: {book.renewals}/3
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Recent History
                  </h2>
                  <button
                    onClick={() => setActiveTab("history")}
                    className=" hover:text-indigo-800 flex items-center"
                  >
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  {bookHistory.slice(0, 2).map((book) => (
                    <div
                      key={book.id}
                      className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{book.title}</h3>
                        <p className="text-sm text-gray-500">{book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Returned: {book.returnDate}
                        </p>
                        <p
                          className={`text-xs ${
                            book.onTime ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {book.onTime ? "On time" : "Late"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Borrowing Summary
                </h2>
                <div className="flex justify-between items-center">
                  <div className="text-center p-4 bg-indigo-50 rounded-lg">
                    <p className="text-3xl font-bold text-indigo-700">
                      {rentedBooks.length}
                    </p>
                    <p className="text-gray-600">Current Books</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-700">
                      {bookHistory.filter((b) => b.onTime).length}
                    </p>
                    <p className="text-gray-600">On-time Returns</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-3xl font-bold text-red-700">
                      {bookHistory.filter((b) => !b.onTime).length}
                    </p>
                    <p className="text-gray-600">Late Returns</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-700">
                      {bookHistory.length + rentedBooks.length}
                    </p>
                    <p className="text-gray-600">Total Books</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "books" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Currently Borrowed Books
                </h2>
                <p className="text-gray-600 mb-4">
                  You currently have {filteredBooks.length} books checked out.
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
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Renewals
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{book.title}</td>
                        <td className="px-6 py-4 text-gray-500">
                          {book.author}
                        </td>
                        <td className="px-6 py-4">{book.dueDate}</td>
                        <td className="px-6 py-4">{book.renewals}/3</td>
                        <td className="px-6 py-4">
                          <button
                            disabled={book.renewals >= 3}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              book.renewals >= 3
                                ? "bg-gray-100 text-gray-400"
                                : "bg-indigo-100 hover:bg-indigo-200"
                            }`}
                          >
                            Renew
                          </button>
                        </td>
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
                  You have borrowed {filteredHistory.length} books in total.
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
                        Return Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredHistory.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{book.title}</td>
                        <td className="px-6 py-4 text-gray-500">
                          {book.author}
                        </td>
                        <td className="px-6 py-4">{book.returnDate}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              book.onTime
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {book.onTime ? "On time" : "Late"}
                          </span>
                        </td>
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
