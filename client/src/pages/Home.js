import React from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="container" disableGutters={true}>
      <ProductList />
    </div>
  );
};

export default Home;
