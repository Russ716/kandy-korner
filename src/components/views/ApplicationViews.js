import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locationList"
import { ProductList } from "../products/productList"
import { ProductForm } from "../products/productForm"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Rhys's Pieces of Candy</h1>
					<div>More than candy-coated oblate spheroids.</div>

					<Outlet />
				</>
			}>

				<Route path="locations" element={<LocationList />} />
				<Route path="products" element={<ProductList />} />
				<Route path="productForm" element={<ProductForm />} />
			</Route>
		</Routes>
	)
}