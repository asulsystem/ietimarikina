import React from "react";

function Footer() {
  return (
    <>
      <div className="footer-section">
        <p style={{ fontSize: 12, fontFamily: "sans-serif" }}>
          International Electronic and Technical Institute, Inc
          <br />
          {/* Lark Street Sta. Elena Marikina city 1800
        <br /> */}
          IETI Marikina Contact Tracing QR Code Solution &copy;
          {new Date().getFullYear()} BSIT S8C4-2021-AsuL
        </p>
      </div>
    </>
  );
}

export default Footer;
