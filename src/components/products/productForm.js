import { useNavigate } from "react-router"
import React, { useState, useEffect } from "react"
export const ProductForm = () => {
    const [product, update] = useState({
        name: "",
        price: "",
        typeId: (0)
    })
    const [productTypes, updateTypes] = useState([])
    useEffect(
        () => {
            fetch('http://localhost:8088/productTypes')
                .then(response => response.json())
                .then((productTypesArray) => {
                    updateTypes(productTypesArray)
                })
        },
        []
    )
    const navigate = useNavigate()

    const justSendIt = (event) => {
        event.preventDefault()
        const productToSendToAPI = {
            typeId: product.typeId,
            name: product.name,
            price: product.price,
        }
        return fetch('http://localhost:8088/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")

            })
    }
    return (
        <form className="productForm">
            <h2 className="productForm_title">Create Candy</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Candy Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name that new candy..."
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productPrice">Candy Cost:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Price that new candy..."
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.price = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="typeList">
                <label htmlFor="type">Type:</label>
                {productTypes.map(
                    (productType) => {
                        return <div className="form-group">
                            <input
                                onChange={
                                    (evt) => {
                                        const copy = { ...product }
                                        copy.typeId = evt.target.value
                                        update(copy)
                                    }
                                } type="checkbox" value={productType.id} name="type" />{productType.name}
                        </div>
                    }
                )}
            </fieldset>
            <button
                onClick={(clickEvent) => justSendIt(clickEvent)}
                className="form-button">
                Send Candy
            </button>
        </form>
    )
}