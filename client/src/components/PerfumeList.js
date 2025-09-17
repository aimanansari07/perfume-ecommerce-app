import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PerfumeList() {
    const [perfumes, setPerfumes] = useState([]);
    // ... (loading/error state can be added back if needed)

    useEffect(() => {
        axios.get('http://localhost:5000/api/perfumes/')
            .then(response => {
                setPerfumes(response.data);
            })
            .catch(error => console.error('Error fetching perfumes', error));
    }, []);

  // client/src/components/PerfumeList.js

// ... (imports and other code remain the same)

return (
    <section id="products" className="perfume-section">
        <h2>Our Perfumes</h2>
        <p className="subtitle">Elegantly crafted for every personality and occasion.</p>
        <div className="perfume-gallery">
            {perfumes.map(perfume => (
                <div key={perfume._id} className="perfume-card">
                    <div className="card-image-container">
                        <img src={`http://localhost:5000/${perfume.imageUrl}`} alt={perfume.name} />
                    </div>
                    <div className="card-info">
                        <h3>{perfume.name}</h3>
                        <p className="perfume-brand">{perfume.brand}</p>
                        <p className="perfume-description">{perfume.description}</p>
                        <p className="perfume-price">₹ {perfume.price.toFixed(2)}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);
}

export default PerfumeList;