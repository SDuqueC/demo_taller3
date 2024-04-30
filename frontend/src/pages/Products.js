import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {getAllProducts} from "../api/ProductApi";
import "../App.css";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let mounted = true;
        getAllProducts()
            .then(data => {
                if (mounted) {
                    setProducts(data)
                }
            })
        return () => mounted = false;
    }, [])

    return (
        <div className="container-fluid side-container">
            <div className="row side-row">
                <p id="before-table"></p>
                <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                        </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Products;