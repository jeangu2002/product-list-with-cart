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
      <div className="grid grid-cols-(--product-card-cols) w-full gap-6 flex-wrap mt-6">{renderProductList()}</div>
    </div>
  );
};
