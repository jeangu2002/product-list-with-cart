import { useSelector } from "react-redux";
import { formatCurency } from "../utils/formatter";

const ConfirmationModal = ({ onNewOrder }) => {
  const cart = useSelector((state) => state.product.cart);

  const getImageUrl = (path) => {
    console.log(path);
    return import(`./../${path}.jpg`);
  };

  return (
    <>
      <div className="fixed h-screen w-screen bg-black/50 inset-0"></div>

      <div
        role="dialog"
        className="p-6 grid gap-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md min-w-[min(35rem,100%)] sm:max-w-[35rem] max-h-screen overflow-y-auto w-full lg:w-auto"
      >
        <img src={"../assets/images/icon-order-confirmed.svg"} alt="" />
        <div>
          <h1 className="font-bold text-6xl lg:text-3xl capitalize">Order confirmed</h1>
          <p className="text-(--cl-rose-400) mt-2">We hope you enjoy your food!</p>
        </div>
        <div className="p-4 rounded-md grid gap-2 bg-(--cl-rose-100) divide-y">
          {Object.entries(cart).map(([key, value]) => {
            return (
              <div
                key={key}
                className="grid grid-cols-[max-content_max-content_1fr] justify-between gap-4 items-center  border-(--cl-divider) p-4"
              >
                <img className="h-22 aspect-square object-cover" src={value.image.mobile} alt={key} />
                <div>
                  <div className="font-bold text-(--cl-rose-500)">{key}</div>
                  <div>
                    <span className="text-(--cl-red) font-bold">{value.quantity}x</span>
                    <span className="text-(--cl-rose-400)"> &nbsp; &nbsp;@ {formatCurency(value.price)}</span>
                  </div>
                </div>
                <p className="font-semibold justify-self-end text-(--cl-rose-900)">{formatCurency(value.price * value.quantity)}</p>
              </div>
            );
          })}
          <div className="flex justify-between items-center">
            <span className="capitalize font-semibold">Order total</span>
            <span className="font-bold text-2xl">{formatCurency(Object.values(cart).reduce((a, b) => a + b.price * b.quantity, 0))}</span>
          </div>
        </div>
        <button className="bg-(--cl-red) text-white p-2 py-3 w-full rounded-full capitalize" onClick={onNewOrder}>
          Start a new order
        </button>
      </div>
    </>
  );
};

export { ConfirmationModal };
