// import React, { useState } from 'react';
// import './Ingredients.css';
// import dotenv from 'dotenv';

// dotenv.config();

// const Ingredients = () => {

//   const url = process.env.url;

//   const [dishes, setDishes] = useState([]);
//   const [dish, setDish] = useState('');



//   useEffect(() => {
//     const fetchDishes = async () => {
//       try {
//         const response = await fetch(`${url}/dishes`);
//         const data = await response.json();
//         setDishes(data);
//       } catch (error) {
//         console.error('Error fetching dishes:', error);
//       }
//     };

//     fetchDishes();
//   }, [])
  
//   const [ingredients, setIngredients] = useState([
//     { name: '', quantity: '' }
//   ]);

//   const handleDishChange = (e) => {
//     setDish(e.target.value);
//   };

//   const handleIngredientChange = (index, e) => {
//     const newIngredients = [...ingredients];
//     newIngredients[index].name = e.target.value;
//     setIngredients(newIngredients);
//   };

//   const handleQuantityChange = (index, value) => {
//     const newIngredients = [...ingredients];
//     newIngredients[index].quantity = Math.max(0, newIngredients[index].quantity + value);
//     setIngredients(newIngredients);
//   };

//   const addMoreIngredients = () => {
//     setIngredients([...ingredients, { name: '', quantity: 50 }]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ dish, ingredients });
//     // Handle form submission here
//   };

//   return (
    
//     <div className="order-details-container">
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Select Dish</label>
//           {/* <input
//             type="text"
//             placeholder="Eg: Paneer Butter Masala"
//             value={dish}
//             onChange={handleDishChange}
//             className="form-input"
//           /> */}
//           <select className='dish-select'>
//             {dishes.map((dish, index) => (
//               <option key={index} value={dish.name}>
//                 {dish.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label>Select Ingredients</label>
//           {ingredients.map((ingredient, index) => (
//             <div key={index} className="ingredient-row">
//               <select
//                 value={ingredient.name}
//                 onChange={(e) => handleIngredientChange(index, e)}
//                 className="ingredient-select"
//               >
//                 <option value="">Eg: Paneer </option>
//                 <option value="Paneer">Paneer</option>
//                 <option value="Tomato">Tomato</option>
//                 <option value="Onion">Onion</option>
//                 <option value="Spices">Spices</option>
//               </select>

//               {/* <div className="quantity-section"> */}
//                 <input className="quantity-section" placeholder='Quantity Eg: 50g'/>
//                 <div className="quantity-buttons">
//                   {/* <button 
//                     type="button" 
//                     onClick={() => handleQuantityChange(index, -10)}
//                     className="quantity-btn"
//                   >
//                     -
//                   </button>
//                   <button 
//                     type="button" 
//                     onClick={() => handleQuantityChange(index, 10)}
//                     className="quantity-btn"
//                   >
//                     +
//                   </button> */}
//                 </div>
//               </div>
//             // </div>
//           ))}
//         </div>

//         <div className="button-row">
//           <button 
//             type="button" 
//             onClick={addMoreIngredients}
//             className="add-more-btn"
//           >
//             Add More
//           </button>

//           <button type="submit" className="submit-btn">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Ingredients;



import React, { useState, useEffect } from 'react';
import './Ingredients.css';

const Ingredients = () => {
  const url = "http://localhost:3000";

  const [dishes, setDishes] = useState([]);
  const [dish, setDish] = useState('');

  const [ingredients, setIngredients] = useState([
    { name: '', quantity: 50 }
  ]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${url}/api/menu`);
        const data = await response.json();
        console.log(data);
        setDishes(data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, [url]);

  const handleDishChange = (e) => {
    setDish(e.target.value);
  };

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index].name = e.target.value;
    setIngredients(newIngredients);
  };

  const handleQuantityChange = (index, value) => {
    const newIngredients = [...ingredients];
    const newQuantity = newIngredients[index].quantity + value;
    newIngredients[index].quantity = Math.max(0, newQuantity);
    setIngredients(newIngredients);
  };

  const handleManualQuantityChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = parseInt(e.target.value) || 0;
    setIngredients(newIngredients);
  };

  const addMoreIngredients = () => {
    setIngredients([...ingredients, { name: '', quantity: 50 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ dish, ingredients });
    // Handle form submission here (e.g., send to backend)
  };

  const demoDish = [
    {
      name: "Paneer Butter Masala",
    },
    {
      name: "Paneer Tikka",
    },
    {
      name: "Paneer Bhurji",
    },
    {
      name: "Paneer Lababdar",
    },
    {
      name: "Paneer Pasanda",
    },
    {
      name: "Paneer Tikka Masala",
    },
    {
      name: "Paneer Methi Malai",
    }
  ]

  return (
    <div className="order-details-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Dish</label>
          <select className="dish-select" value={dish} onChange={handleDishChange}>
            <option value="">-- Select a Dish --</option>
            {demoDish.map((dish, index) => (
              <option key={index} value={dish.name}>
                {dish.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <select
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                className="ingredient-select"
              >
                <option value="">-- Select Ingredient --</option>
                <option value="Paneer">Paneer</option>
                <option value="Tomato">Tomato</option>
                <option value="Onion">Onion</option>
                <option value="Spices">Spices</option>
              </select>

              <input
                type="number"
                className="quantity-section"
                placeholder="Quantity (Eg: 50g)"
                value={ingredient.quantity}
                onChange={(e) => handleManualQuantityChange(index, e)}
              />

              <div className="quantity-buttons">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(index, -10)}
                  className="quantity-btn"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(index, 10)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="button-row">
          <button
            type="button"
            onClick={addMoreIngredients}
            className="add-more-btn"
          >
            Add More
          </button>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Ingredients;
