<script>
	import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
	/**
	 * 커스텀 영역
	 */

	//비밀번호 특수 + 영문 + 숫자
	extend('password_valid', {
		validate: value => {
			/* eslint-disable */
			const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,20}$/;
			if (!regExp.test(value)) {
				return '영문, 숫자, 특수문자를 조합한 10자리 이상 20자리 이하 비밀번호를 입력해 주세요. ';
			} else {
				return true;
			}
		},
	});
	export default {
		components: {
			ValidationProvider,
			ValidationObserver,
		},
	};
</script>