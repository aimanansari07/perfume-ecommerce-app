import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddPerfume() {
    // State for the form
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null); // State for the new image file

    // State for the list of perfumes
    const [perfumes, setPerfumes] = useState([]);
    const [message, setMessage] = useState('');

    // State for editing
    const [isEditing, setIsEditing] = useState(false);
    const [currentPerfumeId, setCurrentPerfumeId] = useState(null);

    // Fetch all perfumes
    const fetchPerfumes = () => {
        axios.get('http://localhost:5000/api/perfumes/')
            .then(response => setPerfumes(response.data))
            .catch(error => console.error('Error fetching perfumes', error));
    };

    useEffect(() => {
        fetchPerfumes();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('description', description);
        formData.append('price', price);
        if (image) { // Append image only if a new one is selected
            formData.append('image', image);
        }

        const url = isEditing 
            ? `http://localhost:5000/api/perfumes/update/${currentPerfumeId}` 
            : 'http://localhost:5000/api/perfumes/add';

        const method = isEditing ? 'put' : 'post';

        axios({ method, url, data: formData })
            .then(res => {
                setMessage(`✅ Perfume ${isEditing ? 'updated' : 'added'} successfully!`);
                fetchPerfumes(); // Refresh the list
            })
            .catch(err => {
                setMessage(`❌ Error ${isEditing ? 'updating' : 'adding'} perfume.`);
                console.error(err);
            });

        // Reset form and editing state
        setName('');
        setBrand('');
        setDescription('');
        setPrice('');
        setImage(null);
        setIsEditing(false);
        setCurrentPerfumeId(null);
        e.target.reset();
    };

    // Handle the "Edit" button click
    const handleEdit = (perfume) => {
        setIsEditing(true);
        setCurrentPerfumeId(perfume._id);
        setName(perfume.name);
        setBrand(perfume.brand);
        setDescription(perfume.description);
        setPrice(perfume.price);
        window.scrollTo(0, 0); // Scroll to the top to see the form
    };

    // Handle the "Delete" button click
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/perfumes/${id}`)
            .then(res => {
                setMessage('✅ Perfume deleted successfully!');
                fetchPerfumes(); // Refresh the list
            })
            .catch(err => setMessage('❌ Error deleting perfume.'));
    };

    return (
        <div className="admin-container">
            {/* Form Section */}
            <div className="admin-panel">
                <h2>{isEditing ? 'Edit Perfume' : 'Add New Perfume'}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Form fields */}
                    <div className="form-group">
                        <label>Perfume Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Brand:</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Price ₹:</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    
                    {/* Image input is now always visible */}
                    <div className="form-group">
                        <label>Image (optional for updates):</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} required={!isEditing} />
                    </div>

                    <button type="submit">{isEditing ? 'Update Perfume' : 'Add Perfume'}</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>

            {/* Product List Section */}
            <div className="product-list">
                <h2>Manage Products</h2>
                {perfumes.map(perfume => (
                    <div key={perfume._id} className="product-item">
                        <span>{perfume.name} - {perfume.brand}</span>
                        <div className="product-actions">
                            <button onClick={() => handleEdit(perfume)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(perfume._id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddPerfume;