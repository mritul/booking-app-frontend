import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./Checkout.css";
import axios from "axios";

const Checkout = () => {
  const experienceId = useParams().experienceId;
  const variantId = useParams().variantId;
  const [searchParams, setSearchParams] = useSearchParams();
  let ticketDate = searchParams.get("date"); // This is modified to display in the card
  const date = searchParams.get("date"); // This is to push to backend.
  const ticketTime = searchParams.get("time");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const infants = searchParams.get("infants");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [experience, setExperience] = useState(null);
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/experience/${experienceId}`,
    })
      .then((res) => {
        setExperience(res.data[0]);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}/api/variant/${variantId}`,
    })
      .then((res) => {
        setVariant(res.data[0]);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const navigate = useNavigate();

  // ticketDate currently carries time and date so some filtering is done to get just the date
  const arr = ticketDate.split(" ");
  ticketDate = "";
  for (let i = 0; i < 4; i++) {
    ticketDate += arr[i];
    ticketDate += " ";
  }
  // Now ticketDate contains only the date

  //Razorpay

  const initPayment = (paymentData) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: paymentData.amount,
      currency: paymentData.currency,
      orderId: paymentData.id,
      user: {
        fullName: fullName,
        email: email,
        phone: phone,
      },
      pax: {
        adults: adults,
        children: children,
        infants: infants,
      },
      details: {
        date: date,
        time: ticketTime,
        experienceId: experienceId,
        variantId: variantId,
      },
      handler: async (res) => {
        try {
          const response = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}/payment-verify`,
            data: {
              res: res,
              bookingInformation: {
                user: {
                  fullName: fullName,
                  email: email,
                  phone: phone,
                },
                pax: {
                  adults: adults,
                  children: children,
                  infants: infants,
                },
                details: {
                  date: date,
                  time: ticketTime,
                  experienceId: experienceId,
                  variantId: variantId,
                },
                amount: paymentData.amount / 100,
              },
            },
          });
          const data = await response.data;
          console.log(data);
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    //TODO: The amount field should be fetched from backend using productId for security
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}/payment-orders`,
        data: {
          amount:
            adults * variant.price.adult +
            children * variant.price.children +
            infants * variant.price.infants,
        },
      });
      const data = await response.data;
      console.log(data);
      initPayment(data.data);
      setEmail("");
      setPhone("");
      setFullName("");
    } catch (err) {
      console.log(err);
    }
  };
  //Input fields
  return (
    <div className="Checkout">
      <div className="summary-card">
        {/* <div className="message">
          <p>You can cancel for free until 8:00 AM on 15 September 2022.</p>
        </div> */}
        <div className="booking-summary">
          <section>
            <div className="header">
              <h1>{experience && experience.displayName}</h1>
              <img src="https://picsum.photos/150/100/" alt="Touring spot" />
            </div>
            <div className="body">
              <div className="panel">
                <p>
                  <i className="fa-solid fa-calendar"></i>
                  {`${ticketDate}, ${ticketTime}`}
                </p>
                <button
                  className="edit-btn"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  EDIT
                </button>
              </div>
              <div className="panel">
                <p>
                  <i className="fa-solid fa-ticket"></i>
                  {variant && variant.displayName}
                </p>
                <button
                  className="edit-btn"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  EDIT
                </button>
              </div>
            </div>
          </section>
          <section>
            {adults != 0 ? (
              <div className="panel">
                <p>Adults : {adults}</p>
                <p>
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {variant && adults * variant.price.adult}
                </p>
              </div>
            ) : (
              <></>
            )}
            {children != 0 ? (
              <div className="panel">
                <p>Children : {children}</p>
                <p>
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {variant && children * variant.price.children}
                </p>
              </div>
            ) : (
              <></>
            )}
            {infants != 0 ? (
              <div className="panel">
                <p>Infants : {infants}</p>
                <p>
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  {variant && infants * variant.price.infants}
                </p>
              </div>
            ) : (
              <></>
            )}
          </section>
          <section>
            <div className="panel">
              <p className="total-payable-text">Total Payable</p>
              <p className="total-payable-amount">
                <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                {variant &&
                  adults * variant.price.adult +
                    children * variant.price.children +
                    infants * variant.price.infants}
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className="details-form">
        <h1 className="title">Enter your details</h1>
        <form className="user-details" onSubmit={handlePayment}>
          <div className="form-group">
            <label>
              <h1>Full Name</h1>
              <p>Same as on your ID</p>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
          <div className="email-phone-group">
            <div className="form-group">
              <label>
                <h1>Mobile Number</h1>
                <p>
                  We may reach out for booking updates here over SMS/Whatsapp
                </p>
              </label>
              <PhoneInput
                defaultCountry="IN"
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
                maxLength={11}
                className="phone-input"
                required
              />
            </div>
            <div className="form-group">
              <label>
                <h1>Email</h1>
                <p>We'll send your tickets here</p>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <button className="checkout-btn">Proceed to pay</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
