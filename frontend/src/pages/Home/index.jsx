import React from "react";
import { Link } from "react-router-dom";
import CopyrightIcon from "@mui/icons-material/Copyright";
import styles from "./styles.module.scss";

const companyLInks = ["About"];

const usefulLInks = ["Support", "Web Player"];

const footerLinks = [
	"legal",
	"privacy center",
	"privacy policy",
];

const Home = () => {
	return (
		<div className={styles.container}>
			<nav className={styles.navbar_container}>
				<Link to="/" className={styles.nav_logo}>
					<img src="./images/logo_black.png" alt="logo" />
				</Link>
			</nav>
			<main className={styles.main_container}>
				<div className={styles.main}>
					<h1>Listening is everything</h1>
					<p>Millions of songs and playlists. No credit card needed.</p>
					<Link to="/sign-up">
						<button className={styles.btn}>Get MuziQi free</button>
					</Link>
				</div>
			</main>
			<footer className={styles.footer_container}>
				<div className={styles.footer_1}>
					<Link to="/" className={styles.footer_logo}>
						<img src="./images/logo_black.png" alt="logo"/>
					</Link>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Company</div>
						{companyLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.footer_1_links}>
						<div className={styles.footer_heading}>Useful links</div>
						{usefulLInks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
				</div>
				<div className={styles.footer_2}>
					<div className={styles.footer_2_links}>
						{footerLinks.map((link, index) => (
							<div className={styles.links} key={index}>
								{link}
							</div>
						))}
					</div>
					<div className={styles.copy_right}>
						<CopyrightIcon />
						<span>2024 MuziQi</span>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Home;