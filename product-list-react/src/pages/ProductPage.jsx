import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Cart } from "../components/Cart";
import { ConfirmationModal } from "../components/ComfirmationModal";
import { ProductList } from "../components/ProductList";
import actionCreators from "../state/action-creators";

export const ProductPage = () => {
  const dispatch = useDispatch();
  const ac = bindActionCreators(actionCreators, dispatch);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const handleOrderConfirm = () => {
    setConfirmOrder(true);
  };

  const handleStartNewOrder = () => {
    setConfirmOrder(false);
    ac.emptyCart();
  };

  const fetchData = async () => {
    const data = await fetch("data/data.json").then((res) => res.json());
    ac.loadProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-[72.5rem] mx-auto gap-6 flex flex-col lg:flex-row mt-20">
      <ProductList />
      <div className="selft-start min-w-[min(20rem,100%)]">
        <Cart onComfirmOrder={handleOrderConfirm} />
      </div>
      {confirmOrder && <ConfirmationModal onNewOrder={handleStartNewOrder} />}
    </div>
  );
};
