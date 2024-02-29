import React, { useEffect, useState } from "react";
import MainSlider from "../MainSlider";
import CategorySlider from "../CategorySlider";
import img1 from "../../Assets/undraw_add_to_cart_re_wrdo.svg";
import img2 from "../../Assets/undraw_stripe_payments_re_chlm.svg";
import img3 from "../../Assets/undraw_web_shopping_re_owap.svg";
import ProductUi from "../Products/ProductUi";
import { featuredProducts, useProduct } from "../../useProduct";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import BrandSlider from "../BrandSlider";
import img4 from "../../Assets/1678303526206-cover-removebg-preview.png";
import customer1 from "../../Assets/customer-1.jpg";
import customer2 from "../../Assets/customer-2.jpg";
import customer3 from "../../Assets/customer-3.jpg";
import customer4 from "../../Assets/customer-4.jpg";
import customer5 from "../../Assets/customer-5.jpg";
import customer6 from "../../Assets/customer-6.jpg";

export default function Home() {
  const [randomItem, setRandomItem] = useState(null);

  let { data, isFetching, isError, isLoading, error } = useProduct(
    "product",
    featuredProducts
  );

  useEffect(() => {
    if (data?.length > 0) {
      const getRandomItems = () => {
        const randomIndices = [];
        while (randomIndices.length < 4) {
          const randomIndex = Math.floor(Math.random() * data.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }
        return randomIndices.map((index) => data[index]);
      };

      setRandomItem(getRandomItems());
    }
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <MainSlider></MainSlider>
      <div className="container my-4">
        <div className="d-flex  justify-content-center gap-3 home-cart">
          <div
            className="shadow mx-2 p-3 rounded-3  d-flex align-items-center justify-content-between w-100 bg-light"
            style={{ height: "130px" }}
          >
            <h5 className="fw-bold text-main">Elevate Your Style!</h5>
            <img
              src={img1}
              width={120}
              className="img-fluid"
              alt="Shop with Confidence"
            />
          </div>
          <div
            className="shadow mx-2 p-3 rounded-3  d-flex align-items-center justify-content-between w-100 bg-light"
            style={{ height: "130px" }}
          >
            <h5 className="fw-bold text-main">Shop with Confidence!</h5>
            <img
              src={img2}
              width={120}
              className="img-fluid"
              alt="Shop with Confidence"
            />
          </div>
          <div
            className="shadow mx-2 p-3 rounded-3  d-flex align-items-center justify-content-between w-100 bg-light"
            style={{ height: "130px" }}
          >
            <h5 className="fw-bold text-main">Your Ultimate Destination!</h5>
            <img
              src={img3}
              width={120}
              className="img-fluid"
              alt="Your Ultimate Destination"
            />
          </div>
        </div>
      </div>
      <div class="spikes my-5"></div>
      <div className=" bg-main-light my-5">
        <div className=" container">
          <h2 className="pt-4 pb-3  text-center text-main fw-bolder">
            Top Categories
          </h2>
          <CategorySlider></CategorySlider>
        </div>
      </div>
      <div className="container my-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="fw-bold text-main">Top Items:</h3>
          <Link to="/products" className=" text-decoration-underline">
            See All Items <i class="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div className="row gy-4">
          {randomItem?.map((item) => (
            <ProductUi key={item._id} prod={item} />
          ))}
        </div>
      </div>
      <div class="spikes my-5"></div>
      <div className="row  w-100">
        <div className="bg-dark ">
          <div className="d-flex align-items-center  justify-content-between container my-2 home-slider">
            <div>
              <h2 className=" fw-bold fs-2 text-main">
                Game On: Essential Gaming Gear
              </h2>
              <p
                className="text-light"
                style={{ maxWidth: "580px", lineHeight: "1.8" }}
              >
                Equip yourself with the ultimate gaming essentials. From
                precision mice to immersive headsets, level up your gameplay
                with our curated selection of must-have gear.
              </p>
              <button className="btn  bg-main text-white">Shopping Now</button>
              <div class="delivered-meals">
                <div class="delivered-imgs">
                  <img src={customer1} alt="customer photo" />
                  <img src={customer2} alt="customer photo" />
                  <img src={customer3} alt="customer photo" />
                  <img src={customer4} alt="customer photo" />
                  <img src={customer5} alt="customer photo" />
                  <img src={customer6} alt="customer photo" />
                </div>
                <div class="delivered-text">
                  <span>250,000+</span> items delivered last year!
                </div>
              </div>
            </div>
            <div>
              <img
                className="w-100"
                src={img4}
                height={400}
                alt="Home Slider 1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <p
          style={{
            fontSize: "18px",
            fontWeight: "700",
            textTransform: "uppercase",
            marginBottom: "0px",
            letterSpacing: "0.75px",
            textAlign: "center",
          }}
        >
          AS FEATURED IN
        </p>
        <BrandSlider></BrandSlider>
      </div>

      {/* <div className="bg-main-light my-5">
        <div className="d-flex align-items-center justify-content-between container">
          <h2>Finf Your Product Now!</h2>
          <div>
            
          </div> 
        </div>
      </div>*/}
    </>
  );
}
