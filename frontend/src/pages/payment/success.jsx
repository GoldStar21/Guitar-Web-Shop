import Button from "@/components/home_components/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CiCircleCheck } from "react-icons/ci";

const Success = () => {
  useEffect(() => {
    const decreaseQuantity = async () => {
      const productId = localStorage.getItem("productId");
      const token = localStorage.getItem("token"); // <-- dodano
      if (!productId || !token) return;

      try {
        await fetch(
          `http://localhost:8080/api/quantity/${productId}/decrease`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Nakon uspješnog smanjenja količine
        localStorage.removeItem("productId");
      } catch (err) {
        console.error("Error updating quantity:", err);
      }
    };

    decreaseQuantity();
  }, []);

  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="payment">
      <div className="payment__card">
        <div className="payment__icon">
          <CiCircleCheck className="payment__icon--check" size={64} />
        </div>
        <h1 className="payment__title">Payment Successful!</h1>
        <p className="payment__message">
          Thank you for your payment. Your order has been confirmed and will be
          processed shortly.
        </p>
        <Button
          label="Home page"
          type="button"
          modifier="buyProductStripe"
          onClick={goHome}
        />
      </div>
    </div>
  );
};

export default Success;
