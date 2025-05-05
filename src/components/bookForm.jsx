import React from "react";
import BookCardGrid from "./components/ListBooks";
import Books from "./components/Books";
// import { TextField, Button, Stack, Paper, Container } from "@mui/material";
import { auth, db } from "./firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const bookForm = () => {
  const [book, setBook] = useState({
    id: "",
    title: "",
    author: "",
    publishedYear: 2025,
    genre: "",
    pages: 250,
    quantity: 0,
    isbn: "",
    coverImageUrl: "",
    available: true,
    rating: 4.3,
  });
  const [booksData, setBooksData] = useState([]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // const addBook = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "books"), {
  //       title,
  //       author,
  //       quantity: Number(quantity),
  //       coverImageUrl: coverUrl,
  //       createdAt: serverTimestamp(),
  //     });
  //     console.log("📚 Book added with ID:", docRef.id);

  //     setTitle("");
  //     setAuthor("");
  //     setQuantity("");
  //   } catch (err) {
  //     console.error("❌ Failed to add book:", err);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "publishedYear" || name === "pages" || name === "rating"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!book.title.trim()) newErrors.title = "Title is required";
    if (!book.author.trim()) newErrors.author = "Author is required";
    if (!book.publishedYear)
      newErrors.publishedYear = "Published year is required";
    else if (
      book.publishedYear < 1000 ||
      book.publishedYear > new Date().getFullYear()
    )
      newErrors.publishedYear = "Please enter a valid year";

    if (!book.pages) newErrors.pages = "Number of pages is required";
    else if (book.pages <= 0) newErrors.pages = "Pages must be greater than 0";

    if (!book.isbn.trim()) newErrors.isbn = "ISBN is required";

    if (book.rating < 0 || book.rating > 5)
      newErrors.rating = "Rating must be between 0 and 5";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // 1️⃣ Write the book to Firestore (auto-generated ID)
      const docRef = await addDoc(collection(db, "books"), {
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genre: book.genre,
        pages: book.pages,
        quantity: book.quantity,
        isbn: book.isbn,
        coverImageUrl: book.coverImageUrl,
        available: book.available,
        rating: book.rating,
        createdAt: serverTimestamp(),
      });

      console.log("✔ Book saved with ID:", docRef.id);

      // 2️⃣ Mark success & clear the form
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);

      setBook({
        id: "",
        title: "",
        author: "",
        publishedYear: new Date().getFullYear(),
        genre: "",
        pages: 0,
        quantity: 0,
        isbn: "",
        coverImageUrl: "",
        available: true,
        rating: 0,
      });
      setErrors({});
    } catch (err) {
      console.error("❌ Error saving book:", err);
      // You could also set an error state here to show to the user
    }
  };

  return (
    <>
      <div className="w-full text-zinc-950 max-w-2xl  mx-auto p-10 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Book Information
        </h2>

        {submitted && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            Book information saved successfully!
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title*
              </label>
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Author */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author*
              </label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.author ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-500">{errors.author}</p>
              )}
            </div>

            {/* Published Year */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Published Year*
              </label>
              <input
                type="number"
                name="publishedYear"
                value={book.publishedYear}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.publishedYear ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.publishedYear && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.publishedYear}
                </p>
              )}
            </div>

            {/* Genre */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <select
                name="genre"
                value={book.genre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Pages */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pages*
              </label>
              <input
                type="number"
                name="pages"
                value={book.pages}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.pages ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.pages && (
                <p className="mt-1 text-sm text-red-500">{errors.pages}</p>
              )}
            </div>
            {/* quantity */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity*
              </label>
              <input
                type="number"
                name="quantity"
                value={book.quantity}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.pages ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.pages && (
                <p className="mt-1 text-sm text-red-500">{errors.pages}</p>
              )}
            </div>

            {/* ISBN */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ISBN*
              </label>
              <input
                type="text"
                name="isbn"
                value={book.isbn}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.isbn ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.isbn && (
                <p className="mt-1 text-sm text-red-500">{errors.isbn}</p>
              )}
            </div>

            {/* Cover Image URL */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                name="coverImageUrl"
                value={book.coverImageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Rating */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating (0-5)
              </label>
              <input
                type="number"
                name="rating"
                value={book.rating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="5"
                className={`w-full px-3 py-2 border ${
                  errors.rating ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-500">{errors.rating}</p>
              )}
            </div>

            {/* Availability */}
            <div className="col-span-1 flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="available"
                  checked={book.available}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Available for checkout
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Book Information
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default bookForm;
