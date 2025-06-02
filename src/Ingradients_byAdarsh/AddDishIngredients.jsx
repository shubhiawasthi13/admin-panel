// import React, { useState } from "react";

// const availableDishes = ["Paneer Butter Masala", "Dal Tadka", "Veg Biryani"];
// const availableIngredients = ["Paneer", "Jeera", "Onion", "Tomato", "Butter", "Oil"];

// export default function AddDishIngredients() {
//   const [selectedDish, setSelectedDish] = useState("");
//   const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);

//   const handleIngredientChange = (index, field, value) => {
//     const updated = [...ingredients];
//     updated[index][field] = value;
//     setIngredients(updated);
//   };

//   const addMoreIngredients = () => {
//     setIngredients([...ingredients, { name: "", quantity: "" }]);
//   };

//   const handleSubmit = () => {
//     const data = {
//       dish: selectedDish,
//       ingredients: ingredients.filter(i => i.name && i.quantity),
//     };
//     console.log("Submitted Data:", data);
//     // Submit logic here (e.g., API call)
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto border rounded-lg shadow-lg space-y-4">
//       <h2 className="text-xl font-semibold">Select Dish</h2>
//       <select
//         className="w-full p-2 border rounded"
//         value={selectedDish}
//         onChange={(e) => setSelectedDish(e.target.value)}
//       >
//         <option value="">-- Choose a Dish --</option>
//         {availableDishes.map((dish, index) => (
//           <option key={index} value={dish}>{dish}</option>
//         ))}
//       </select>

//       <h2 className="text-xl font-semibold mt-4">Select Ingredients</h2>
//       {ingredients.map((ingredient, index) => (
//         <div key={index} className="flex space-x-2 items-center mb-2">
//           <select
//             className="w-1/2 p-2 border rounded"
//             value={ingredient.name}
//             onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
//           >
//             <option value="">-- Ingredient --</option>
//             {availableIngredients.map((item, i) => (
//               <option key={i} value={item}>{item}</option>
//             ))}
//           </select>
//           <input
//             type="number"
//             placeholder="Quantity (e.g. grams)"
//             className="w-1/2 p-2 border rounded"
//             value={ingredient.quantity}
//             onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
//           />
//         </div>
//       ))}
//       <button
//         onClick={addMoreIngredients}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Add More
//       </button>

//       <div className="pt-4">
//         <button
//           onClick={handleSubmit}
//           className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "./AddDishIngredients.css";

const availableDishes = ["Paneer Butter Masala", "Dal Tadka", "Veg Biryani"];
const availableIngredients = ["Paneer", "Jeera", "Onion", "Tomato", "Butter", "Oil"];

export default function AddDishIngredients() {
  const [selectedDish, setSelectedDish] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addMoreIngredients = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const handleSubmit = () => {
    const data = {
      dish: selectedDish,
      ingredients: ingredients.filter(i => i.name && i.quantity),
    };
    console.log("Submitted Data:", data);
    // Submit logic here (e.g., API call)
  };

  return (
    <div className="dish-container">
      <h2 className="heading">Select Dish</h2>
      <select
        className="dropdown"
        value={selectedDish}
        onChange={(e) => setSelectedDish(e.target.value)}
      >
        <option value="">-- Choose a Dish --</option>
        {availableDishes.map((dish, index) => (
          <option key={index} value={dish}>{dish}</option>
        ))}
      </select>

      <h2 className="heading">Select Ingredients</h2>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="ingredient-row">
          <select
            className="dropdown half"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
          >
            <option value="">-- Ingredient --</option>
            {availableIngredients.map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity (e.g. grams)"
            className="input half"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={addMoreIngredients}
        className="add-more-btn"
      >
        Add More
      </button>

      <div className="submit-container">
        <button
          onClick={handleSubmit}
          className="submit-btn"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
// export default AddDishIngredients;
