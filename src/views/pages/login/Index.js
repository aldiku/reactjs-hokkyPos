/*eslint-disable*/
import React, { useEffect, useState } from "react";
// reactstrap components
import { Button, Card, CardBody, Input, InputGroupAddon, InputGroupText, Container, Row, Col, Modal, ModalBody, FormFeedback, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { AvForm, AvGroup } from "availity-reactstrap-validation";
import axios from "axios";
// core components
import SweetAlert from "react-bootstrap-sweetalert";
import { encryptAES256, decryptAES256 } from "utils/AESchiper";

const items = [
	{
		src: require("assets/img/theme/das.png").default,
		caption: "Merchant Dashboard",
	},
	{
		src: require("assets/img/theme/edc.png").default,
		caption: "Payment Terminal",
	},
	{
		src: require("assets/img/theme/campur.png").default,
		caption: "Realtime Transaction Status",
	},
];

function Login() {
	let history = useHistory();
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(null);
	const [wrongEmail, setWrongEmail] = useState(null);
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(null);
	const [wrongPassword, setWrongPassword] = useState("");
	const [modal, setModal] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);
	const [alert, setAlert] = React.useState(null);
	const timestamp = Date.now();
	const [resetEmail, setResetEmail] = useState("");
	const [resetEmailError, setResetEmailError] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const containerId = "test-recaptcha";
	const [rememberMe, setRememberMe] = useState(false);
	const isEmail = localStorage.getItem("username");
	const isPassword = localStorage.getItem("isPassword");
	const cekRememberMe = localStorage.getItem("rememberMe");
	const [isSpinner, setIsSpinner] = useState(false);

	const validateForm = () => {
		let error = false;
		if (email === "") {
			setEmailError("invalid");
			error = true;
		}
		if (password === "") {
			setPasswordError("invalid");
			error = true;
		}
		return error;
	};

	const validateFormResetPassword = () => {
		let error = false;
		if (resetEmail === "") {
			setResetEmailError("invalid");
			error = true;
		}
		return error;
	};

	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const toggle = () => setModal(!modal);

	const hideAlert = () => {
		setAlert(null);
	};

	const setMsgAlert = (str) => {
		setIsSpinner(false);
		setAlert(<SweetAlert error showConfirm confirmBtnText="Ok" title={str} onCancel={hideAlert} onConfirm={hideAlert} />);
	};

	const setSuccessAlert = () => {
		setAlert(
			<SweetAlert
				success
				showConfirm
				confirmBtnText="Ok"
				title="Link reset password sudah terkirim, silahkan cek email anda."
				onCancel={hideAlert}
				onConfirm={hideAlert}
			/>
		);
	};

	const getMyProfil = () =>
		new Promise((resolve) => {
			const token = localStorage.token;
			axios
				.get(`${process.env.REACT_APP_API_BASE_URL}/info`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					const data = response.data.response.principal;
					const privilegs = response.data.response;
					const code = response.data.response;
					localStorage.setItem("userId", data.id);
					localStorage.setItem("email", data.email);
					localStorage.setItem("usercode", data.user_code);
					localStorage.setItem("username", data.username);
					localStorage.setItem("name", data.name);
					localStorage.setItem("codewarehouse",code.code)
					localStorage.setItem("authority", data.role);
					// localStorage.setItem("previllage", privilegs.privileges[0]);
					localStorage.setItem("allinfo", JSON.stringify(privilegs));

					window.location.href = "/admin/dashboard";
					resolve();
				})
				.catch(function (error) {
					setMsgAlert(error.response.data.message);
					console.log(error.response.data.message);
				});
		});

	async function Login() {
		const key = email + timestamp;
		const emailwithLenght = email.length;
		const passwordLenght = password.length;

		let passwordWithLanght;
		if (passwordLenght < 13) {
			passwordWithLanght = password + timestamp;
		} else {
			passwordWithLanght = password + timestamp + "0";
		}

		let emailwithLanght;
		if (emailwithLenght < 13) {
			emailwithLanght = email + timestamp;
		} else {
			emailwithLanght = email + timestamp + "0";
		}

		let body = {
			usernameOrEmail: email,
			password: password,
		};

		axios
			.post(`${process.env.REACT_APP_API_BASE_URL}/users/website/login`, body)
			.then(function (response) {
					window.localStorage.setItem("token", response.data.response.token);
					getMyProfil();
			})
			.catch(function (error) {
				setMsgAlert(error.response.data.message);
				console.log(error.response.data.message);
				showErrors(error.response.data.response);
			});
	}

	const showErrors = (error) => {
		setEmailError("invalid");
		setWrongEmail(error.usernameOrEmail);
		setPasswordError("invalid");
		setWrongPassword(error.password);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateForm()) {
			Login();
			setIsSpinner(true);
		}
	};

	useEffect(() => {
		getRememberMe();
		cekLoged();
	}, []);

	const cekLoged = () =>{
		const token = localStorage.token;
		if(token){
			setIsSpinner(true);
			getMyProfil();
		}
	}

	const getRememberMe = () => {
		if (cekRememberMe === "true") {
			setEmail(isEmail);
			setPassword(isPassword);
			setRememberMe(true);
		} else {
			setEmail("");
			setPassword("");
		}
	};

	function ForgotPassword() {
		setLoading(true);
		let body = {
			email: resetEmail,
		};
		axios
			.post(`${process.env.REACT_APP_API_BASE_URL}/user/forgot-password`, body)
			.then(function (response) {
				setSuccessAlert();
				setResetEmail("");
				history.push("/auth/login");
			})
			.then((json) => {
				setLoading(false);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const handleSubmitForgotPassword = (e) => {
		e.preventDefault();
		if (!validateFormResetPassword()) {
			ForgotPassword();
		}
	};

	return (
		<div>
			{isSpinner ? (
				<Container className="mt--8 pb-5 login-container">
					<Row className="justify-content-center">
						<Col lg="5" md="7">
							<div className="d-flex flex-column align-items-center">
								<img src={require("assets/img/theme/Hokky1.gif").default} alt="" style={{ height: "50rem", width: "60rem" }} />
							</div>
						</Col>
					</Row>
				</Container>
			) : (
				<>
				{alert}
					<Container className="mt--8 pb-5 login-container">
						<Row className="justify-content-center">
							<Col lg="5" md="7">
								<Card className="bg-secondary border-0 mb-0">
									<img alt="login" style={{ width: "100%" }} src={require("assets/img/theme/Hokky1.png").default} />
									<CardBody className="px-lg-5 py-lg-5">
										<p>Selamat Datang , Silakan Login dengan Akunmu.</p>
										<AvForm onSubmit={handleSubmit}>
											<AvGroup className="input-group">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="ni ni-email-83" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
												autoComplete="off"
													placeholder="Masukan Email / Username"
													value={email}
													invalid={emailError === "invalid"}
													onChange={(e) => {
														setEmail(e.target.value);
														if (e.target.value !== "") {
															setEmailError("");
														}
													}}
												/>
												<FormFeedback>{email === "" ? "Email atau Username tidak boleh kosong" : wrongEmail}</FormFeedback>
											</AvGroup>
											<AvGroup className="input-group">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="ni ni-lock-circle-open" />
													</InputGroupText>
												</InputGroupAddon>
												<Input
												autoComplete="off"
													placeholder="Masukkan Kata Sandi"
													type={passwordShown ? "text" : "password"}
													value={password}
													invalid={passwordError === "invalid"}
													onChange={(e) => {
														setPassword(e.target.value);
														if (e.target.value !== "") {
															setPasswordError("");
														}
													}}
												/>
												<InputGroupText className="pointer">
													{passwordShown !== true ? (
														<i className="fa fa-eye" aria-hidden="true" onClick={togglePasswordVisiblity} />
													) : (
														<i className="fa fa-eye-slash" aria-hidden="true" onClick={togglePasswordVisiblity} />
													)}
												</InputGroupText>
												<FormFeedback>{password === "" ? "Password tidak boleh kosong" : wrongPassword}</FormFeedback>
											</AvGroup>
											<Row>
												<Col md={6}>
													<div className="custom-control custom-control-alternative custom-checkbox">
														<input
															className="custom-control-input"
															id=" customCheckLogin"
															type="checkbox"
															checked={rememberMe}
															value={true}
															onChange={(e) => {
																setRememberMe(e.target.checked);
															}}
														/>
														<label className="custom-control-label" htmlFor=" customCheckLogin">
															<span className="text-muted">Ingat saya</span>
														</label>
													</div>
												</Col>
												<Col md={6} style={{ textAlign: "right" }} className="pointer">
													<a className="text-light" onClick={toggle}>
														<small>Lupa Kata Sandi?</small>
													</a>
												</Col>
												<Modal isOpen={modal} toggle={toggle} style={{ textAlign: "center" }}>
													<ModalBody>
														<img alt="login" style={{ width: "24%", marginBottom: "15px" }} src={require("assets/img/brand/Hokky1.png").default} />
														<h3>Lupa Kata Sandi ?</h3>
														<p>Enter email address and we will send you instructions to reset Password.</p>
														<AvGroup className="input-group">
															<InputGroupAddon addonType="prepend">
																<InputGroupText>
																	<i className="ni ni-email-83" />
																</InputGroupText>
															</InputGroupAddon>
															<Input
																placeholder="Masukan Email / Username"
																value={resetEmail}
																invalid={resetEmailError === "invalid"}
																onChange={(e) => {
																	setResetEmail(e.target.value);
																	if (e.target.value !== "") {
																		setResetEmailError("");
																	}
																}}
															/>
															<FormFeedback>Email atau Username tidak boleh kosong</FormFeedback>
														</AvGroup>
														<div classname="text-center">
															{!isLoading && (
																<Button onClick={handleSubmitForgotPassword} type="button" color="primary">
																	Send
																</Button>
															)}
															{isLoading && (
																<Button color="primary" disabled>
																	<i className="fas fa-spinner fa-spin"></i>
																	&nbsp; Loading...
																</Button>
															)}
														</div>
													</ModalBody>
												</Modal>
											</Row>
											<div id={containerId} className="g-recaptcha" />
											<div className="text-center">
												{/* <Button className="my-4" disabled={!captchaResponse} color="info" type="submit"> */}
												<Button className="my-4" color="info" type="submit">
													Masuk
												</Button>
											</div>
										</AvForm>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				</>
			)}
		</div>
	);
}

export default Login;
