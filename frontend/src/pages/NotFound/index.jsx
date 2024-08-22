import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div className={styles.main}>
					<h1>Error 404: Music Mishap</h1>
					<p>
                        Looks like you are lost in the music. Try searching for something new.
					</p>
					<span onClick={() => navigate.push("/home")}>Go Back Home</span>
				</div>
			</div>
		</div>
	);
};

export default NotFound;