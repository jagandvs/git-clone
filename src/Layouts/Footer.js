import React from "react";
import { Container } from "reactstrap";

const Footer = () => {
  return (
    <Container
      fluid
      tag="footer"
      className="text-center bg-dark text-uppercase text-white fixed-bottom m-10 p-3"
    >
      Github search app with firebase user authentication
    </Container>
  );
};

export default Footer;
