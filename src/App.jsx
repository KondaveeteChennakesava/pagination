import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  const [productsPerPage, setProductsPerPage] = useState(10);
  const handleChange = (event) => {
    setProductsPerPage(event.target.value);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(products.length / productsPerPage) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    setPage(1); // Reset to the first page whenever productsPerPage changes
  }, [productsPerPage]);

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products
            .slice(
              page * productsPerPage - productsPerPage,
              page * productsPerPage
            )
            .map((prod) => {
              return (
                <span className="products__single" key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                </span>
              );
            })}
        </div>
      )}

      {products.length > 0 && (
        <div className="cls">
          <div className="pagination">
            <span
              onClick={() => selectPageHandler(page - 1)}
              className={page > 1 ? "" : "pagination__disable"}
            >
              ◀️
            </span>
            {[...Array(Math.ceil(products.length / productsPerPage))].map(
              (_, i) => {
                return (
                  <span
                    key={i}
                    className={page === i + 1 ? "pagination__selected" : ""}
                    onClick={() => selectPageHandler(i + 1)}
                  >
                    {i + 1}
                  </span>
                );
              }
            )}
            <span
              onClick={() => selectPageHandler(page + 1)}
              className={
                page < Math.ceil(products.length / productsPerPage)
                  ? ""
                  : "pagination__disable"
              }
            >
              ▶️
            </span>
          </div>
          <span className="label">
            <label htmlFor="productsPerPage">
              Number of products per page:
            </label>
            <select
              id="productsPerPage"
              value={productsPerPage}
              onChange={handleChange}
              className="inputfield"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
