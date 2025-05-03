import { useState } from "react";

const FAQ = () => {
  // React hook that follows currently opened FAQ ID
  const [idOpen, stateChangeOfId] = useState(null);

  // Array of objects
  const faqs = [
    {
      id: 1,
      question: "What types of guitars do you sell?",
      answer:
        "We offer a wide range of guitars, including electric, acoustic, bass, and classical guitars. Whether you're a beginner or a professional, we have options to suit all playing styles and preferences.",
    },
    {
      id: 2,
      question: "Do you offer guitar repairs?",
      answer:
        "Yes, we provide professional guitar repair services including string changes, neck adjustments, fretwork, and electronics troubleshooting.",
    },
    {
      id: 3,
      question: "Can I try the guitars before purchasing?",
      answer:
        "Absolutely! We encourage you to come in and test any guitar you’re interested in. Our store is equipped with plenty of space for you to try out the guitars.",
    },
    {
      id: 4,
      question: "What is your return policy for guitars?",
      answer:
        "We offer a 30-day return policy for most guitars. If you're not satisfied with your purchase, you can return it within 30 days for an exchange or store credit, provided the guitar is in new condition.",
    },
    {
      id: 5,
      question: "Can I try the guitars before purchasing?",
      answer:
        "Absolutely! We encourage you to come in and test any guitar you’re interested in. Our store is equipped with plenty of space for you to try out the guitars.",
    },
    {
      id: 6,
      question: "What is your return policy for guitars?",
      answer:
        "We offer a 30-day return policy for most guitars. If you're not satisfied with your purchase, you can return it within 30 days for an exchange or store credit, provided the guitar is in new condition.",
    },
  ];

  // Open or close answer window
  const toggle = (id) => {
    stateChangeOfId(idOpen === id ? null : id);
  };

  return (
    <section id="faq" className="faq">
      <div className="c-container">
        <h2 className="faq__title">FREQUENTLY ASKED QUESTIONS</h2>
        <div className="faq__content">
          {faqs.map(({ id, question, answer }) => (
            <div className="faq__item" key={id}>
              <button className="faq__question" onClick={() => toggle(id)}>
                <span>{question}</span>
                <span className="faq__icon">{idOpen === id ? "−" : "+"}</span>
              </button>

              <div
                className={`faq__answer ${
                  idOpen === id ? "faq__answer--open" : ""
                }`}
              >
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
