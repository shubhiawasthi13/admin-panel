// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import axios from "axios";

// const App = () => {
//   const [dishName, setDishName] = useState("");
//   const [dishDescription, setDishDescription] = useState("");
//   const [dishCost, setDishCost] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [image, setImage] = useState(null);

//   const [imageId, setImageId] = useState(""); // Input for fetching image by ID
//   const [imageUrl, setImageUrl] = useState(""); // URL of the fetched image
//   const [error, setError] = useState(null); // Error handling

//   // Hardcoded JWT Token
//   const jwtToken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50SWQiOjE3LCJlbWFpbCI6InJAZy5pbiIsImlhdCI6MTczMzUwMTQ4MCwiZXhwIjoxNzMzNTE5NDgwfQ.qbPUFgnPkY1rx4IF4FyPOezVFUQmByw2YGMIk9dN-1A";

//   // Upload a new dish
//   const handleAddDish = async () => {
//     if (!dishName || !dishCost) {
//       alert("Dish name and cost are required!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("dish_name", dishName);
//     formData.append("dish_description", dishDescription);
//     formData.append("dish_cost", dishCost);
//     formData.append("category_id", categoryId);
//     if (image) {
//       formData.append("image", image);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/add-dish",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );

//       alert("Dish added successfully!");
//       console.log(response.data);
//     } catch (error) {
//       console.error(
//         "Error adding dish:",
//         error.response?.data || error.message
//       );
//       alert("Failed to add the dish.");
//     }
//   };

//   // Fetch an image by ID
//   const fetchImage = async () => {
//     setError(null); // Reset error
//     if (!imageId) {
//       setError("Please provide an image ID.");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/image/${imageId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//           responseType: "blob", // Expect binary data
//         }
//       );

//       // Create a temporary URL for the image
//       const imageBlob = new Blob([response.data], { type: "image/jpeg" });
//       const url = URL.createObjectURL(imageBlob);
//       setImageUrl(url);
//     } catch (err) {
//       setError("Failed to fetch the image. Please try again.");
//       console.error(err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>Dish Management</h1>

//       {/* Upload Section */}
//       <div style={{ marginBottom: "30px" }}>
//         <h2>Add New Dish</h2>
//         <label>
//           Dish Name:
//           <input
//             type="text"
//             value={dishName}
//             onChange={(e) => setDishName(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <textarea
//             value={dishDescription}
//             onChange={(e) => setDishDescription(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Cost:
//           <input
//             type="number"
//             value={dishCost}
//             onChange={(e) => setDishCost(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Category ID:
//           <input
//             type="text"
//             value={categoryId}
//             onChange={(e) => setCategoryId(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Dish Image:
//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//         </label>
//         <br />
//         <button onClick={handleAddDish} style={{ padding: "5px 10px" }}>
//           Add Dish
//         </button>
//       </div>

//       {/* Fetch Image Section */}
//       <div style={{ marginBottom: "30px" }}>
//         <h2>Fetch Dish Image</h2>
//         <label>
//           Enter Image ID:
//           <input
//             type="text"
//             value={imageId}
//             onChange={(e) => setImageId(e.target.value)}
//             style={{ marginRight: "10px", padding: "5px" }}
//           />
//         </label>
//         <button onClick={fetchImage} style={{ padding: "5px 10px" }}>
//           Fetch Image
//         </button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {imageUrl ? (
//           <div>
//             <h3>Fetched Image:</h3>
//             <img
//               src={imageUrl}
//               alt="Fetched"
//               style={{
//                 maxWidth: "100%",
//                 height: "auto",
//                 border: "1px solid #ccc",
//               }}
//             />
//           </div>
//         ) : (
//           <p>No image fetched yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById("root"));


import React, { useState } from 'react';
import ReactDOM from "react-dom";
import './add-dish.css';
import uploadimg from '../assets/upload_icon.jpg';

function AddDish() {
  const [dishCategory, setDishCategory] = useState('');
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [customization, setCustomization] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, including image upload
    console.log({
      dishCategory,
      dishName,
      price,
      discountPrice,
      shortDescription,
      customization,
      selectedImage,
    });
  };

  return (
    <div  className='add-menu-container'>
      <h2>Add New Dish to Menu</h2>
      <form onSubmit={handleSubmit} enctype='multipart/form-data'>
      <div className="upload-image-container">
        <p style={{padding:"10px 0", fontSize:"18px"}}>Upload Image <span style={{color:"red"}}>*</span></p>
        <label htmlFor="image-upload" >
          <div className="image-preview">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected Dish" style={{width:"100%", height:"100%",objectFit:"cover"}}/>
            ) : (
              <>
                <img src={uploadimg} style={{width:"5%",marginTop:"60px",marginLeft:"140px", opacity:"0.7"}}/>
                <p style={{textAlign:"center"}}>Drop a file or Click to upload</p>
                <p style={{textAlign:"center", color:"grey"}}>Recommended size: 300 x 200px</p>
              </>
            )}
          </div>
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>

        <div className='data-upload-container'>
        <div>
          <label htmlFor="dishCategory">Dish Category<span style={{color:"red"}}>*</span></label><br/>
          <select id="dishCategory" value={dishCategory} onChange={(e) => setDishCategory(e.target.value)} style={{width:"100%",padding:"7px"}}>
            {/* Add options for dish categories */}
            <option value=""></option>
            <option value="starter">Starter</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div>
          <label htmlFor="dishName">Name of Dish<span style={{color:"red"}}>*</span></label><br/>
          <input type="text" id="dishName" value={dishName} onChange={(e) => setDishName(e.target.value)} required style={{width:"100%",padding:"7px"}} />
        </div>
        <div className='price-input'>
        <div>
          <label htmlFor="price">Price (INR)<span style={{color:"red"}}>*</span></label><br/>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="discountPrice">Discount price <span style={{color:"grey"}}>(If Applicable)</span></label><br/>
          <input type="number" id="discountPrice" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} />
        </div>

        </div>
       
        <div>
          <label htmlFor="shortDescription">Short Description<span style={{color:"red"}}>*</span></label><br/>
          <textarea id="shortDescription" rows={5} value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required style={{backgroundColor:" rgb(239, 248, 248)",width:"100%"}}/>
        </div>
        <div>
          <label htmlFor="customization">Customaizations</label><br/>
          <input type="text" id="customization" value={customization} onChange={(e) => setCustomization(e.target.value)} style={{width:"100%",padding:"7px"}}/>
        </div>
        <br/><br/>
        <div style={{float:"right", marginRight:"120px"}}>
           <input type="reset" value="Delete" style={{color:"grey", padding:"10px 30px", marginRight:"30px", border:"none"}}/>
          <button type="submit" style={{backgroundColor:"#DEBF00", fontSize:"16px", padding:"12px 50px", border:"none", borderRadius:"7px", color:"white"}}>Add Dish</button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default AddDish