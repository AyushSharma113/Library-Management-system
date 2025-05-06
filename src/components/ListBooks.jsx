import React from "react";
import { useBooks } from "../context/BooksContext";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

// Individual Book Card Component
const BookCard = ({ book }) => {
  const { currentUser } = useAuth();
  const { deleteBook } = useBooks();
  const Admin = currentUser?.email === "admin@gmail.com";

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(book.id);
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform duration-300 hover:shadow-xl hover:scale-105">
      <div className="relative pb-2/3 h-48 bg-gray-200">
        {book.coverImageUrl ? (
          <img
            src={book.coverImageUrl}
            alt={`Cover of ${book.title}`}
            className="absolute h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <span>No Cover Available</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center space-x-1">
          <span
            className={`flex h-3 w-3 relative ${
              book.available ? "bg-green-500" : "bg-red-500"
            } rounded-full`}
          >
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                book.available ? "bg-green-400" : "bg-red-400"
              } opacity-75`}
            ></span>
          </span>
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${
              book.available ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {book.available ? "Available" : "Checked Out"}
          </span>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(book.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm text-gray-600">
              {book.rating?.toFixed(1) || "0.0"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mb-2">
          <div>
            <span className="font-medium">Genre:</span> {book.genre}
          </div>
          <div>
            <span className="font-medium">Year:</span> {book.publishedYear}
          </div>
          <div>
            <span className="font-medium">Pages:</span> {book.pages}
          </div>
        </div>

        <div className="text-xs text-gray-600 truncate">
          <span className="font-medium">ISBN:</span> {book.isbn}
        </div>
      </div>

      <div className="px-4 pb-4 mt-auto">
        <button
          onClick={Admin ? handleDelete : undefined}
          className={`w-full py-2 px-4 rounded-md text-sm transition-colors ${
            Admin
              ? "bg-red-600 hover:bg-red-700 text-white"
              : book.available
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!Admin && !book.available}
        >
          {Admin ? "Delete" : book.available ? "Borrow" : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

// Book Card Grid Component
export default function BookCardGrid() {
  const { books } = useBooks();

  if (!books) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
