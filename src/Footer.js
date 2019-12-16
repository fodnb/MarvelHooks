import React from 'react';
const thisYear = new Date();

const Footer = () => (
    <footer className="footer">
        <div className="footerContent">
            <p>&#x00A9; Daniel McGhee {thisYear.getFullYear()}</p>
        </div>
    </footer>
);

export default Footer;