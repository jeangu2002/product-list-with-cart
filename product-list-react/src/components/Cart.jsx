import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import actionCreators from "../state/action-creators";
import { formatCurency } from "../utils/formatter";

export const Cart = ({ onComfirmOrder }) => {
  const products = useSelector((state) => state.product.cart);
  const dispatch = useDispatch();
  const ac = bindActionCreators(actionCreators, dispatch);
  const remove = (name) => {
    ac.removeFromCart(name);
  };
  return (
    <div className="bg-white rounded-2xl p-6 sel-start w-full">
      <h2 className="text-(--cl-red) font-bold text-xl">{`Your cart (${
        Object.values(products)
          .map((product) => product.quantity)
          .reduce((a, b) => a + b, 0) ?? 0
      })`}</h2>
      <div className="grid gap-4 mt-4">
        {!products || Object.keys(products).length === 0 ? (
          <>
            <img className="justify-self-center" src={"../assets/images/illustration-empty-cart.svg"} alt="empty cart" />
            <p className="text-(--cl-rose-400) text-center">Your added items will appear here</p>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 divide-y">
              {Object.keys(products).map((productName) => {
                return (
                  <div key={productName} className="flex justify-between items-center py-4 border-(--cl-divider)">
                    <div>
                      <div className="font-bold">{productName}</div>
                      <div className="flex gap-2">
                        <span className="font-bold text-(--cl-red)">{products[productName].quantity}x</span>
                        <span className="text-(--cl-rose-300)">@ {formatCurency(products[productName].price)} </span>
                        <span className="font-bold text-(--cl-rose-400)">
                          {formatCurency(products[productName].price * products[productName].quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      className="border border-[#CAAFA7] rounded-full aspect-square h-4 flex items-center justify-center cursor-pointer"
                      onClick={() => remove(productName)}
                    >
                      <img src={"/assets/images/icon-remove-item.svg"} alt="delete" />
                    </button>
                  </div>
                );
              })}
              <div className="flex justify-between items-center py-4">
                <span className="capitalize">order total</span>
                <span className="font-bold text-2xl">
                  {formatCurency(Object.values(products).reduce((a, b) => a + b.price * b.quantity, 0))}
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-1 text-sm p-2 bg-(--cl-rose-100) rounded-md">
              <img src={"/assets/images/icon-carbon-neutral.svg"} lt="" />
              <p>
                this is a <span className="font-bold">carbon-neutral</span> delivery
              </p>
            </div>
            <button className="bg-(--cl-red) text-white rounded-full py-3 w-full" onClick={onComfirmOrder}>
              Confirm order
            </button>
          </>
        )}
      </div>
    </div>
  );
};
