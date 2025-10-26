import Button from "@/components/home_components/Button";
import { useRouter } from "next/router";
import { TbXboxX } from "react-icons/tb";

const Cancel = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="cancelPayment">
      <div className="cancelPayment__card">
        <div className="cancelPayment__icon">
          <TbXboxX className="cancelPayment__icon--check" size={64} />
        </div>
        <h1 className="cancelPayment__title">Payment ERROR!</h1>
        <p className="cancelPayment__message">
          Unfortunately, your payment could not be processed. Please check your
          payment details and try again.
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

export default Cancel;
