import { useTranslation } from '../../stores/LocalizationContext';
import styles from './styles.module.scss';
import Button from '../../components/micro/Button/Button';
import FormLayout from '../../components/macro/layout/FormLayout';
import { useEffect, useState } from 'react';
import { useAuth } from '../../stores/AuthContext';
import { RegisterRequest } from '../../models/user';
import { registering } from '../../service';
import { useAlert } from '../../stores/AlertContext';
import { AlertTypes } from '../../components/micro/AlertPopup/AlertPopup';
import useLocalStorage from '../../hooks/useLocalStorage';
import { localStorageKeys } from '../../utils/localStorageKeys';
import { useNavigate } from 'react-router-dom';

export function Register(): JSX.Element {
	const { setIsLoading } = useAuth();
	const { setAlert } = useAlert();
	const navigate = useNavigate();
	const lang = useTranslation('register');
	const [_, setJWT] = useLocalStorage<string | null>(localStorageKeys.token, null);

	const [registerCredentials, setRegisterCredentials] = useState<RegisterRequest>({
		email: '',
		password: '',
		repeatedPassword: '',
		name: '',
		lastName: '',
		specialDiet: []
	});

	const [specialDietOptions, setspecialDietOptions] = useState({
		isVegan: false,
		isVegetarian: false,
		isHypertensive: false,
		isCeliac: false
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterCredentials({
			...registerCredentials,
			[e.target.id]: e.target.value
		});
	};

	const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setspecialDietOptions({
			...specialDietOptions,
			[e.target.id]: e.target.checked
		});
	};

	const checkSpecialDiet = (): string[] => {
		let speDiet = [];
		specialDietOptions.isVegan && speDiet.push('vegan');
		specialDietOptions.isVegetarian && speDiet.push('vegetarian');
		specialDietOptions.isHypertensive && speDiet.push('hypertensive');
		specialDietOptions.isCeliac && speDiet.push('celiac');

		return speDiet;
	};

	useEffect(() => {
		setRegisterCredentials({
			...registerCredentials,
			specialDiet: checkSpecialDiet()
		});
	}, [specialDietOptions]);

	function handleRegister(e: React.FormEvent<HTMLButtonElement>): void {
		e.preventDefault();
		setIsLoading(true);

		console.log(registerCredentials);

		registering({
			email: registerCredentials.email,
			password: registerCredentials.password,
			name: registerCredentials.name,
			lastName: registerCredentials.lastName,
			specialDiet: registerCredentials.specialDiet
		})
			.then(res => {
				setJWT(res.jwt);
				setAlert(`${lang.successMsg}!`, AlertTypes.SUCCESS);
				navigate('/login');
			})
			.catch(e => setAlert(`${lang.failureMsg}`, AlertTypes.ERROR))
			.finally(() => setIsLoading(false));
	}

	return (
		//TODO: meter todos los inputs y label adentro de un contenedor para manipular mejor el ancho y luego aplicar grid en desk
		<FormLayout onSubmit={e => handleRegister(e)}>
			<div className={styles.closeBtn}></div>
			<label className={styles.title}>{lang.registerTitle}</label>
			<div className={styles.inputSection}>
				<section className={styles.firstColumn}>
					<label htmlFor="name" className={styles.registerLabel}>
						{lang.name}
					</label>
					<input
						id="name"
						className={styles.registerInput}
						placeholder={lang.name}
						type="text"
						onChange={handleChange}
						value={registerCredentials.name}
					/>
					<label htmlFor="lastName" className={styles.registerLabel}>
						{lang.lastName}
					</label>
					<input
						id="lastName"
						className={styles.registerInput}
						placeholder={lang.lastName}
						type="text"
						onChange={handleChange}
						value={registerCredentials.lastName}
					/>
					<label htmlFor="email" className={styles.registerLabel}>
						{lang.email}
					</label>
					<input
						id="email"
						className={styles.registerInput}
						placeholder={lang.emailPlaceholder}
						type="text"
						onChange={handleChange}
						value={registerCredentials.email}
					/>
					<span className={styles.inputDescription}>{lang.emailDescription}</span>
				</section>
				<section className={styles.secondColumn}>
					<label htmlFor="password" className={styles.registerLabel}>
						{lang.password}
					</label>
					<input
						id="password"
						className={styles.registerInput}
						placeholder={lang.password}
						type="password"
						onChange={handleChange}
						value={registerCredentials.password}
					/>
					<span className={styles.inputDescription}>{lang.passwordDescription}</span>
					<label htmlFor="repeatedPassword" className={styles.registerLabel}>
						{lang.confirmPassword}
					</label>
					<input
						id="repeatedPassword"
						className={styles.registerInput}
						placeholder={lang.password}
						type="password"
						onChange={handleChange}
						value={registerCredentials.repeatedPassword}
					/>
					<section className={styles.checkboxesContainer}>
						<div className={styles.internalTitle}>
							<label className={styles.title}>{lang.specialDiet}</label>
							<span className={styles.extraDescription}>{lang.specialDietOptional}</span>
						</div>
						<label className={styles.registerLabel}>
							<input
								id="isVegan"
								type="checkbox"
								className={styles.checkbox}
								checked={specialDietOptions.isVegan}
								onChange={handleCheckbox}
							/>
							{lang.veganDiet}
						</label>

						<label className={styles.registerLabel}>
							<input
								id="isVegetarian"
								type="checkbox"
								className={styles.checkbox}
								checked={specialDietOptions.isVegetarian}
								onChange={handleCheckbox}
							/>
							{lang.vegetarianDiet}
						</label>

						<label className={styles.registerLabel}>
							<input
								id="isHypertensive"
								type="checkbox"
								className={styles.checkbox}
								checked={specialDietOptions.isHypertensive}
								onChange={handleCheckbox}
							/>
							{lang.hypertensiveDiet}
						</label>
						<label className={styles.registerLabel}>
							<input
								id="isCeliac"
								type="checkbox"
								className={styles.checkbox}
								checked={specialDietOptions.isCeliac}
								onChange={handleCheckbox}
							/>
							{lang.celiacDiet}
						</label>
					</section>
				</section>
				<section className={styles.buttonContainer}>
					<Button kind="primary" size="large" id="registerBtn" type="submit">
						{lang.registerBtn}
					</Button>
				</section>
			</div>
		</FormLayout>
	);
}
