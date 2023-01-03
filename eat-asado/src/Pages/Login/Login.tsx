import { useTranslation } from '../../stores/LocalizationContext';
import styles from './styles.module.scss';
import Button from '../../Components/micro/Button/Button';
import FormLayout from '../../Components/macro/layout/FormLayout';

const Login = () => {
	const translation = useTranslation('login');

	return (
		<FormLayout>
			<div className={styles.closeBtn}></div>
			<p className={styles.title}>LOGIN</p>
			<label htmlFor="email" className={styles.loginLabel}>
				Email Endava
			</label>
			<input id="email" placeholder="EMAIL" type="text" />
			<label htmlFor="password" className={styles.loginLabel}>
				Clave
			</label>
			<input id="password" placeholder="CONTRASEÑA" type="password" />
			<Button kind="primary" size="large">
				LOGIN
			</Button>
			<a href="/register" className={styles.forgotPassword}>
				FORGOT PASSWORD
			</a>
		</FormLayout>
	);
};

export default Login;
