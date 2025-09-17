import React from 'react';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';

function Footer() {
    return (
        <footer id="contact" className="site-footer">
            <div className="footer-grid">
                <div className="footer-column">
                    <h4>Aroma</h4>
                    <p>Crafting memories, one scent at a time.</p>
                </div>
                <div className="footer-column">
                    <h4>Contact Us</h4>
                    <p>contact@aroma.com</p>
                    <p>123 Perfume Lane, Fragrance City</p>
                </div>
                <div className="footer-column">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="https://x.com/" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#facebook" aria-label="Facebook"><FaFacebookF /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 Aroma. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;