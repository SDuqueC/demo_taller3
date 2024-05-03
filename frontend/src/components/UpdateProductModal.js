import React,{Component} from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { updateProduct } from '../api/ProductApi';



const UpdateProductModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(props.product.id, e.target)
            .then((result)=>{
                    alert(result);
                    props.setUpdated(true);
                },
                (error)=>{
                    alert("Failed to Update Product");
                })
    };

    return(
        <div className="container">

            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Product Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={12}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" required defaultValue={props.product.name} placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="brand">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control type="text" name="brand" required defaultValue={props.product.brand} placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select name="category" required defaultValue={props.product.category}>
                                        <option value="" disabled>Select a Category</option>
                                        <option value="Muebles">Muebles</option>
                                        <option value="Celulares">Celulares</option>
                                        <option value="Electrodomesticos">Electrodomesticos</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="price" required defaultValue={props.product.price} placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="stock">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control type="number" name="stock" required defaultValue={props.product.stock} placeholder="" />
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


export default UpdateProductModal;

