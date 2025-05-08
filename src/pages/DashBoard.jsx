import { useState } from "react";
import { Book, LogOut, PlusCircle, User, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import BookForm from "../components/bookForm";
import BookCardGrid from "../components/ListBooks";
import { useBooks } from "../context/BooksContext";

export default function LibraryDashboard() {
  const navigate = useNavigate();
  const { requests, approveRequest } = useBooks();
  const [activeSection, setActiveSection] = useState("books");

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleApproveRequest = async (requestId, bookId) => {
    try {
      await approveRequest(requestId, bookId);
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request. Please try again.");
    }
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
              <h2 className="font-bold">Ayush sharma</h2>
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
          {activeSection === "books" && <BookCardGrid />}
          {activeSection === "addBook" && <BookForm />}
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
                          {request.userName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {request.bookId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {request.requestDate?.toDate().toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
                            onClick={() =>
                              handleApproveRequest(request.id, request.bookId)
                            }
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
