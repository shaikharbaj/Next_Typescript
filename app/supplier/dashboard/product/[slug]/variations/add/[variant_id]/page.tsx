import React from 'react'

const page = () => {
  return (
    <>
         <div className="container mt-5">
        <div className="product-header">
            <h5>Mobile Cover-Redmi Note 8 Pro (Material: Fiber, Style: Hybrid, Color: Red)</h5>
            <div>
                <button className="btn btn-dark me-2">&larr; BACK</button>
                <button className="btn btn-save">SAVE &rarr;</button>
            </div>
        </div>

        <div className="inventory-section">
            <h6>Inventory:</h6>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Location name</th>
                        <th>Available</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Location name</td>
                        <td>Available</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="mb-3">
            <label htmlFor="purchaseMinQty" className="form-label">Purchase Min qty:</label>
            <input type="number" className="form-control" id="purchaseMinQty" value="11"/>
        </div>
        
        <div className="row mb-3">
            <div className="col-md-4">
                <label htmlFor="sellingPrice" className="form-label">Selling Price :</label>
                <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input type="number" className="form-control" id="sellingPrice" value="350.00"/>
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="mrp" className="form-label">MRP :</label>
                <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input type="number" className="form-control" id="mrp" value="500.00"/>
                </div>
            </div>
        </div>
        
        <div className="mb-3">
            <label htmlFor="costPerItem" className="form-label">Cost Per Item :</label>
            <div className="input-group">
                <span className="input-group-text">₹</span>
                <input type="number" className="form-control" id="costPerItem" value="300.00"/>
            </div>
            <small className="form-text text-muted">*Customers won’t see this</small>
        </div>
    </div>
    </>
  )
}

export default page