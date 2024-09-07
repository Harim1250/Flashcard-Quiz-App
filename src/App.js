import { useEffect, useState } from 'react';
import './App.css';
import FlashcardList from './Components/FlashcardList';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Single category selection
  const [amount, setAmount] = useState(10); // Number of questions

  // Fetch available categories from OpenTDB API
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php")
      .then((res) => {
        setCategories(res.data.trivia_categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch quiz data based on selected category and amount
  const fetchQuizData = () => {
    if (selectedCategory) {
      axios
        .get(
          `https://opentdb.com/api.php?amount=${amount}&category=${selectedCategory}`
        )
        .then((res) => {
          // Transform the response data into the format you need
          const transformedData = res.data.results.map((item, index) => ({
            id: index + 1,
            question: item.question,
            answer: item.correct_answer,
            options: [...item.incorrect_answers, item.correct_answer], // Combine correct and incorrect answers
          }));
          setFlashcards(transformedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      alert("Please select a category!");
    }
  };

  return (
    <div className="container1">
      <h1>Flashcard Quiz App</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <h3>Select a Category</h3>

        {/* Dropdown for categories */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">--Select Category--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Amount of questions selection */}
        <label>
          Number of Questions:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            max="50"
          />
        </label>

        
        <button onClick={fetchQuizData}>Generate Quiz</button>
      </div>

     
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

export default App;
