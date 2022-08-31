import "./products.css"
import { useEffect, useState } from "react"

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [productTypes, setTypes] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [highCostProducts, setHighCost] = useState(false)


    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
                .then(response => response.json())
                .then((typeArray) => {
                    setTypes(typeArray)
                })
        },
        []
    )
    useEffect(
        () => {
            const sortedArray = products.sort((a, b) => (a.name > b.name) ? 1 : -1)
            setFiltered(sortedArray)
        },
        [products]
    )

    useEffect(
        () => {
            if (highCostProducts) {
                const highPrices = products.filter(product => product.unitPrice >= 2)
                // * sort highPrices here
                setFiltered(highPrices)
            } else {
                setFiltered(products)
            }
        },
        [highCostProducts]
    )
    return <>
        <button onClick={() => {
            setHighCost(!highCostProducts)
        }}>{
                highCostProducts
                    ? "All Dandy Candy"
                    : "Expensive Candy"
            }
        </button>
        <h2>List of products</h2>
        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        const foundProductType = productTypes.find(productType => productType.id === product.typeID)
                        return <section className="product" key={`product--${product.id}`}>
                            <header><b>{product.name}</b></header>
                            <footer className="price" >Price: ${product.unitPrice}
                                <div className="type">Type: {foundProductType.name}</div></footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}