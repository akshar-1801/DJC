import React from "react";
import styles from "./Footer.module.css"; // Import CSS module
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.col}>
                    <div className={styles.title}>About</div>
                    <div className={styles.text}>
                        Voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo eaque
                        ipsa quae ab illo.
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.title}>Contact</div>
                    <div className={styles.cItem}>
                        <FaLocationArrow />
                        <div className={styles.text}>
                            Kayaloram Rd, Punnamada, Kottankulangara, Alappuzha,
                            Kerala, 688006
                        </div>
                    </div>
                    <div className={styles.cItem}>
                        <FaMobileAlt />
                        <div className={styles.text}>Phone: 0471 272 0261</div>
                    </div>
                    <div className={styles.cItem}>
                        <FaEnvelope />
                        <div className={styles.text}>Email: store@jsdev.com</div>
                    </div>
                </div>
                <div className={styles.col}>
                    <div className={styles.title}>Categories</div>
                    <span className={styles.text}>Headphones</span>
                    <span className={styles.text}>Smart Watches</span>
                    <span className={styles.text}>Bluetooth Speakers</span>
                    <span className={styles.text}>Wireless Earbuds</span>
                    <span className={styles.text}>Home Theatre</span>
                    <span className={styles.text}>Projectors</span>
                </div>
                <div className={styles.col}>
                    <div className={styles.title}>Pages</div>
                    <span className={styles.text}>Home</span>
                    <span className={styles.text}>About</span>
                    <span className={styles.text}>Privacy Policy</span>
                    <span className={styles.text}>Returns</span>
                    <span className={styles.text}>Terms & Conditions</span>
                    <span className={styles.text}>Contact Us</span>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <div className={styles.bottomBarContent}>
                    <span className={styles.text}>
                        JSDEVSTORE 2022 CREATED BY JS DEV. PREMIUM E-COMMERCE
                        SOLUTIONS.
                    </span>
                    <img src={Payment} alt="Payment methods" />
                </div>
            </div>
        </div>
    );
};

export default Footer;
