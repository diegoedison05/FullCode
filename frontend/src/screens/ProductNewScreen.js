import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
//import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_REQUEST':
            return { ...state, loadingCreate: true };
        case 'CREATE_SUCCESS':
            return {
                ...state,
                loadingCreate: false,
            };
        case 'CREATE_FAIL':
            return { ...state, loadingCreate: false };
        default:
            return state;
    }
};
export default function ProductNewScreen() {
    const navigate = useNavigate();
    const params = useParams(); // /product/:id
    const { id: productId } = params;

    const { state } = useContext(Store);
    const { userInfo } = state;

    const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const [name, setName] = useState('');
    const [refnum, setRefNum] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');

    /*useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/products/${productId}`);
                setName(data.name);
                setRefNum(data.refnum);
                setPrice(data.price);
                setImage(data.image);
                setDescription(data.description);
                setCountInStock(data.countInStock);
                dispatch({ type: 'FETCH_SUCCESS' });
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    //payload: getError(err),
                });
            }
        };
        fetchData();
    }, [productId]);*/

    //Crear nuevo producto
    const createHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'UPDATE_REQUEST' });
            await axios.post(
                `/api/products`,
                {
                    name,
                    refnum,
                    price,
                    image,
                    countInStock,
                    description,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            //toast.success('Product updated successfully');
            navigate('/admin/productlist');
        } catch (err) {
            //toast.error(getError(err));
            dispatch({ type: 'UPDATE_FAIL' });
        }
    };

    /*const createHandler2 = async () => {
        if (window.confirm('¿Quieres crear un producto?')) {
            try {
                dispatch({ type: 'CREATE_REQUEST' });
                const { data } = await axios.post(
                    '/api/products',
                    {},
                    {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    }
                );
                //toast.success('product created successfully');
                dispatch({ type: 'CREATE_SUCCESS' });
                navigate(`/admin/product`);
            } catch (err) {
                //toast.error(getError(error));
                dispatch({
                    type: 'CREATE_FAIL',
                });
            }
        }
    };*/

    return (
        <Container className="small-container">
            <h1>Nuevo Producto </h1>

            <Form onSubmit={createHandler}>
                <Form.Group className="mb-3" controlId="refnum">
                    <Form.Label>Número de referencia</Form.Label>
                    <div className="short-div-refnum">
                        <Form.Control
                            value={refnum}
                            onChange={(e) => setRefNum(e.target.value)}
                            required
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="countInStock">
                    <Form.Label>Stock</Form.Label>
                    <div className="short-div">
                        <Form.Control
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            required
                        />
                    </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <div className="short-div-price">
                        <Form.Control
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                </Form.Group>

                <div className="mb-3">
                    <Button type="button" onClick={createHandler}>
                        Guardar
                    </Button>
                </div>
            </Form>
        </Container>
    );
}
