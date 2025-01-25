import React, { useState } from "react";
import calIcon from "/assets/images/icon-calculator.svg";

const Form = ({ setResults, term, setTerm ,results ,setTotal }) => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isActiveAmount, setIsActiveAmount] = useState(false);
  const [isActiveTerm, setIsActiveTerm] = useState(false);
  const [isActiveRate, setIsActiveRate] = useState(false);
  const [isActiveType, setIsActiveType] = useState(false);
  

  const Error = "Enter a valid input";
  const ErrorEmpty = "This Feild is required";

  //Validation
  const validate = (amount, term, rate, type) => {
    const errors = {};

    if (amount.trim() === "") {
      errors.amount = ErrorEmpty;
    } else if (isNaN(amount) || amount <= 0) {
      errors.amount = Error;
    }

    if (term.trim() === "") {
      errors.term = ErrorEmpty;
    } else if (isNaN(term) || term <= 0) {
      errors.term = Error;
    }

    if (rate.trim() === "") {
      errors.rate = ErrorEmpty;
    } else if (isNaN(rate) || rate <= 0) {
      errors.rate = Error;
    }

    if (type.trim() === "") {
      errors.type = ErrorEmpty;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  function calculateRepayment(principal, annualInterestRate, termYears) {
    const monthlyRate = annualInterestRate / 12 / 100;
    const totalPayments = termYears * 12;

    const repayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return repayment.toFixed(2);
  }

  function calculateInterestOnly(principal, annualInterestRate) {
    const monthlyRate = annualInterestRate / 12 / 100;
    const interestOnly = principal * monthlyRate;
    return interestOnly.toFixed(2);
  }

  function onChangeHandle(e) {
    setType(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const isValid = validate(amount, term, rate, type);
    if (!isValid) return;

    const amountNum = parseFloat(amount);
    const rateNum = parseFloat(rate);
    const termNum = parseFloat(term);

    const totalMonths = termNum * 12; 

    
    const Total = results ? results * totalMonths -amountNum : 0;
  
    setTotal(Total)

    if (type === "repayment") {
      const monthlyRepayment =calculateRepayment(amountNum, rateNum, termNum);
      setResults(monthlyRepayment);

      const totalRepayments = monthlyRepayment * totalMonths;
      setTotal(totalRepayments);
    } else if (type === "interest"){
      const monthlyInterest= calculateInterestOnly(amountNum, rateNum);
      setResults(monthlyInterest);

      const totalInterest =monthlyInterest * totalMonths ;
      setTotal(totalInterest);
    }
  }

  function clearAll() {
    setAmount("");
    setRate("");
    setType("");
    setTerm("");
    setResults("");
    setFormErrors({});
    setIsActiveAmount(false);
    setIsActiveRate(false);
    setIsActiveTerm(false);
    setIsActiveType(false);
  }

  return (
    <section className="font-sans m-4">
      <div className="flex flex-col md:flex-row md:justify-between mb-4 ">
        <h1 className="text-2xl text-Neutral-900 font-semibold">
          Mortgage Calculator
        </h1>
        <button
          onClick={clearAll}
          className="underline underline-offset-2  text-sm text-start text-Neutral-700 font-semibold"
        >
          Clear All
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 mb-4">
          <label
            htmlFor="mortgageAmount"
            className="block text-Neutral-700 font-semibold"
          >
            Mortgage Amount
          </label>
          <div
            className={` ${
              formErrors.amount
                ? "border-Red"
                : isActiveAmount
                ? "border-Lime"
                : " border-Neutral-500 "
            }
          flex w-full border  rounded-md  `}
          >
            <span
              className={` ${
                formErrors.amount
                  ? " bg-Red text-Neutral-White"
                  : isActiveAmount
                  ? "bg-Lime text-Neutral-900"
                  : " bg-Neutral-100"
              }
               px-4 rounded-lg-md flex items-center font-semibold rounded-l-md text-Neutral-700`}
            >
              &pound;
            </span>
            <input
              type="text"
              name="mortgageAmount"
              id="mortgageAmount"
              className="mx-4 my-2 w-3/4 outline-none  font-semibold text-Neutral-900"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (e.target.value.trim() !== "") {
                  setIsActiveAmount(true);
                } else {
                  setIsActiveAmount(false);
                }
              }}
            />
          </div>
          <p className="text-sm text-Red">{formErrors.amount}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-2  justify-between">
          <div className="flex flex-col  gap-2 mb-4">
            <label
              htmlFor="mortgageTerm"
              className="block  text-Neutral-700 font-semibold "
            >
              Mortgage Term
            </label>
            <div
              className={` ${
                formErrors.term
                  ? " border-Red"
                  : isActiveTerm
                  ? "border-Lime"
                  : "border-Neutral-500"
              }
          flex w-full border relative  rounded-md`}
            >
              <input
                type="text"
                name="mortgageTerm"
                id="mortgageTerm"
                className="outline-none w-3/4 mx-4 my-2  font-semibold text-Neutral-900 "
                value={term}
                onChange={(e) => {
                  setTerm(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setIsActiveTerm(true);
                  } else {
                    setIsActiveTerm(false);
                  }
                }}
              />
              <span
                className={` ${
                  formErrors.term
                    ? " bg-Red text-Neutral-White"
                    : isActiveTerm
                    ? "bg-Lime text-Neutral-900"
                    : "bg-Neutral-100 "
                } 
                px-4 rounded-r-md  flex items-center absolute font-semibold right-0 top-0 bottom-0 text-Neutral-700`}
              >
                years
              </span>
            </div>
            <p className="text-sm text-Red">{formErrors.term}</p>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label
              htmlFor="interestRate"
              className="block text-Neutral-700 font-semibold "
            >
              Interest Rate
            </label>
            <div
              className={` ${
                formErrors.rate
                  ? " border-Red"
                  : isActiveRate
                  ? "border-Lime"
                  : "border-Neutral-500"
              } flex w-full border gap-4 relative rounded-md`}
            >
              <input
                type="text"
                name="interestRate"
                id="interestRate"
                className="outline-none w-3/4 mx-4 my-2 font-semibold text-Neutral-900 "
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                  if (e.target.value.trim() !== "") {
                    setIsActiveRate(true);
                  } else {
                    setIsActiveRate(false);
                  }
                }}
              />
              <span
                className={` ${
                  formErrors.rate
                    ? " bg-Red text-Neutral-White"
                    : isActiveRate
                    ? "bg-Lime"
                    : "bg-Neutral-100  text-Neutral-700"
                } px-4 rounded-r-md flex items-center absolute font-semibold right-0 top-0 bottom-0 `}
              >
                %
              </span>
            </div>
            <p className="text-sm text-Red">{formErrors.rate}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-Neutral-700 font-semibold">Mortgage Type</h2>
          <div
            className={`border  ${
              type === "repayment"
                ? "bg-Lime3 border-Lime"
                : "border-Neutral-500"
            }  rounded-md flex items-center gap-4 px-4 py-2 hover:border-Lime transition-colors  ease-in-out delay-100`}
          >
            <input
              type="radio"
              name="mortgageType"
              id="repayment"
              className={
                "peer border border-Neutral-900 w-4 h-4 rounded-full cursor-pointer"
              }
              value="repayment"
              checked={type === "repayment"}
              onChange={onChangeHandle}
            />
            <label
              htmlFor="repayment"
              className="text-Neutral-900 font-semibold cursor-pointer"
            >
              Repayment
            </label>
          </div>

          <div
            className={`border  ${
              type === "interest"
                ? "bg-Lime3 border-Lime"
                : "border-Neutral-500"
            }  rounded-md flex items-center gap-4 px-4 py-2 hover:border-Lime transition-colors  ease-in-out delay-100`}
          >
            <input
              type="radio"
              name="mortgageType"
              id="intrestOnly"
              className="peer border border-Neutral-900 w-4 h-4 rounded-full cursor-pointer peer-checked:border-Lime"
              value="interest"
              onChange={onChangeHandle}
              checked={type === "interest"}
            />
            <label
              htmlFor="intrestOnly"
              className="text-Neutral-900 font-semibold  cursor-pointer"
            >
              Interest Only
            </label>
          </div>
          <p className="text-sm text-Red">{formErrors.type}</p>
        </div>
        <button
          className="bg-Lime text-md text-Neutral-900 font-bold w-full md:max-w-[310px] flex gap-3 mt-8 items-center justify-center py-3 px-4 rounded-3xl 
        hover:bg-Lime2 transition-colors  ease-in-out delay-100"
        >
          <img src={calIcon} alt="calculator icon " width={20} height={20} />
          Calculate Repayments
        </button>
      </form>
    </section>
  );
};

export default Form;
