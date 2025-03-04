import { useSelector } from "react-redux";
import { ProductCard } from "./ProductCard";
export const ProductList = () => {
  const productList = useSelector((state) => state.product.products);
  const renderProductList = () => {
    return productList.map((product) => {
      return <ProductCard key={product.name} product={product} />;
    });
  };
  return (
    <div className="w-full">
      <h1 className="text-5xl font-bold">Desserts</h1>
      <div className="p-2 grid grid-cols-(--product-card-cols) lg:grid-cols-(--product-card-cols-lg) w-full gap-6 mt-6">
        {renderProductList()}
      </div>
    </div>
  );
};
