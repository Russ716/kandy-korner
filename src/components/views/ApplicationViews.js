import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locationList"
import { ProductList } from "../products/productList"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Rhys's Candy Shop</h1>
					<div>Your one-stop-shop to get your sugar fix.</div>

					<Outlet />
				</>
			}>

				<Route path="locations" element={<LocationList />} />
				<Route path="products" element={<ProductList />} />
			</Route>
		</Routes>
	)
}