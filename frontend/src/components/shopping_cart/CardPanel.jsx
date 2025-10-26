import { CgClose } from "react-icons/cg";
import Button from "@/components/home_components/Button";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51S7oJE4fQgIFvR9WTnV0u0BuuKkuPmU40kZzANg8JZsJGlGbV3Sc33O28w8xqYyQRhhokGGzScJhzAUzjUKd0DT2000SQ1LBMq"
);

const CardPanel = ({ cart, removeFromCart, setPanelOpen, isPanelOpen }) => {
  // Stripe payment
  const stripePayment = async () => {
    // filtriraj stavke koje su dostupne
    const validCart = cart.filter(
      (item) => item.quantity > 0 && item.quantity <= item.amount
    );

    // napravi listu upozorenja za nedostupne proizvode
    const warnings = cart
      .filter((item) => item.quantity > item.amount)
      .map((item) => `${item.brand} ${item.model} is not available currently!`);

    if (warnings.length > 0) {
      alert("We are sorry, but: " + warnings.join(", "));

      cart
        .filter((item) => item.quantity > item.amount)
        .forEach((item) => removeFromCart(item.id));
    }

    if (validCart.length === 0) {
      return; // prekini ako nema validnih proizvoda
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/stripe/create-checkout-session",
        validCart
      );

      const { url } = response.data;
      window.location.href = url;
    } catch (error) {
      console.error("Error while creating checkout session:", error);
      alert("Oooops, something is wrong with payment!");
    }
  };

  return (
    <div className={`cardPanel ${isPanelOpen ? "open" : ""}`}>
      <div className="cardPanel__head">
        <CgClose
          className="cardPanel__close"
          onClick={() => setPanelOpen(false)}
        />
      </div>
      <div className="cardPanel__headTitle">
        <h3 className="cardPanel__title">YOUR SHOPPING CART</h3>
      </div>

      <div className="cardPanel__products">
        {/* Sada ide javascript logika - Jedna vrsta uslova true/false */}
        {cart.length === 0 ? (
          <p className="cardPanel__p">CART IS EMPTY!</p>
        ) : (
          <>
            <ol className="cardPanel__list">
              {cart.map((item, index) => (
                <li className="cardPanel__liList" key={index}>
                  {item.brand} - {item.model} - ( {item.quantity} ) ={" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumIntegerDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(parseFloat(item.price))}
                  <CgClose
                    className="cardPanel__deleteProduct"
                    onClick={() => removeFromCart(item.id)}
                  />
                </li>
              ))}
            </ol>
            <div className="cardPanel__total">
              TOTAL PRICE :{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                cart.reduce(
                  (acc, item) => acc + parseFloat(item.price) * item.quantity,
                  0
                )
              )}
            </div>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <Button
          label="Proceed to payment"
          type="button"
          modifier="buyProductStripe"
          onClick={stripePayment}
        />
      )}
    </div>
  );
};

export default CardPanel;
