import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useMatchMedia } from "../hooks/hooks";
import actionCreators from "../state/action-creators";
import { formatCurency } from "../utils/formatter";

export const ProductCard = ({ product: { name, category, price, image } }) => {
  const [thumbnail, setThumbnail] = useState(image.mobile);
  const [isSelected, setIsSelected] = useState(false);
  let nextQuantity = 0;
  const [quantity, setQuantity] = useState(0);

  const cart = useSelector((state) => state.product.cart);
  const dispatch = useDispatch();
  const ac = bindActionCreators(actionCreators, dispatch);

  const imageClasses = classNames({
    "rounded-md": true,
    relative: true,
    "border-2": isSelected,
    "border-(--cl-red)": isSelected,
  });

  useMatchMedia("(max-width: 767px)", () => {
    setThumbnail(image.mobile);
  });

  useMatchMedia("(min-width: 768px)", () => {
    setThumbnail(image.desktop);
  });

  const addToCart = () => {
    nextQuantity = quantity + 1;
    setQuantity(nextQuantity);
    ac.addToCart({ name, price, image, quantity: nextQuantity });
  };

  const decrementQuantity = (name) => {
    nextQuantity = Math.max(quantity - 1, 0);
    if (nextQuantity === 0) {
      ac.removeFromCart(name);
    } else {
      setQuantity(nextQuantity);
      ac.addToCart({ name, price, image, quantity: nextQuantity });
    }
  };
  useEffect(() => {
    if (cart) {
      if (Object.keys(cart).includes(name)) {
        setIsSelected(true);
        setQuantity(cart[name].quantity);
      } else {
        setIsSelected(false);
        setQuantity(0);
      }
    }
  }, [cart]);
  return (
    <div>
      <div className={imageClasses}>
        <img src={new URL("../" + thumbnail, import.meta.url).href} alt={name} className="object-cover w-full h-50 rounded-md" />
        {quantity > 0 ? (
          <div className="flex justify-between rounded-full absolute bg-(--cl-red) p-2 flex gap-2 min-w-[8.875rem] left-[50%] bottom-0 -translate-x-1/2 translate-y-[50%] text-white">
            <button
              className="h-6 w-6 border border-white rounded-full flex items-center justify-center"
              onClick={() => decrementQuantity(name)}
            >
              <img className="" src={new URL("../assets/images/icon-decrement-quantity.svg", import.meta.url).href} alt="decrement" />
            </button>
            <p>{quantity}</p>
            <button className="h-6 w-6 border border-white rounded-full flex items-center justify-center" onClick={() => addToCart()}>
              <img className="" src={new URL("../assets/images/icon-increment-quantity.svg", import.meta.url).href} alt="decrement" />
            </button>
          </div>
        ) : (
          <button
            className="w-max flex gap-2 absolute bottom-0 left-[50%] -translate-x-1/2 translate-y-[50%] rounded-full border border-(--cl-red) bg-white text-black py-2 px-4 cursor-pointer"
            onClick={() => addToCart()}
          >
            <img src={new URL("../assets/images/icon-add-to-cart.svg", import.meta.url).href} alt="cart" />
            <span className="whitespace-nowrap">Add to cart</span>
          </button>
        )}
      </div>
      <p className="mt-8 text-(--cl-rose-400)">{category}</p>
      <h2 className="font-bold">{name}</h2>
      <p className="text-(--cl-red) font-bold">{formatCurency(price)}</p>
    </div>
  );
};
