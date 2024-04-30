import React from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { createProduct } from '../api/ProductApi';


const AddProductModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(e.target)
            .then((result)=>{
                    alert(result);
                    props.setUpdated(true);
                },
                (error)=>{
                    alert("Failed to Add Product");
                })
    }

    return(
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Fill In Product Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" required placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="brand">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control type="text" name="brand" required placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select name="category" required>
                                        <option value="" disabled>Select a Category</option>
                                        <option value="Muebles">Muebles</option>
                                        <option value="Celulares">Celulares</option>
                                        <option value="Electrodomesticos">Electrodomesticos</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="price" required placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="stock">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="number" name="stock" required placeholder="" />
                                </Form.Group>
                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddProductModal;