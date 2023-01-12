<template>
  <el-dialog custom-class="register-dialog" title="회원가입" v-model="state.dialogVisible" @close="handleClose">
    <el-form :model="state.form" :rules="state.rules" ref="registerForm" :label-position="state.form.align">
      <el-form-item prop="department" label="소속" :label-width="state.formLabelWidth" >
        <el-input v-model="state.form.department" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="position" label="직책" :label-width="state.formLabelWidth" >
        <el-input v-model="state.form.position" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="이름" :label-width="state.formLabelWidth" >
        <el-input v-model="state.form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="id" label="아이디" :label-width="state.formLabelWidth" >
        <el-input v-model="state.form.id" autocomplete="off"></el-input>
        <!-- <el-button type="primary" @click="clickId">중복ID</el-button> -->
      </el-form-item>
      <el-form-item prop="password" label="비밀번호" :label-width="state.formLabelWidth">
        <el-input v-model="state.form.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item prop="passwordCheck" label="비밀번호 확인" :label-width="state.formLabelWidth" >
        <el-input v-model="state.form.passwordCheck" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="clickRegister">회원가입</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style>
.register-dialog {
  width: 400px !important;
  height:500px;
}
.register-dialog .el-dialog__headerbtn {
  float: right;
}
.register-dialog .el-form-item__content {
  margin-left: 0 !important;
  float: right;
  width: 200px;
  display: inline-block;
  border: 1px solid gray;
  border-radius: 5x;
  padding: 0px 0px 0px 5px;
}
.register-dialog .el-form-item {
  margin-bottom: 20px;
}
.register-dialog .el-form-item__error {
  font-size: 12px;
  color: red
}
.register-dialog .el-input__suffix {
  display: none;
}
.register-dialog .el-dialog__footer {
  margin: 0 calc(50% - 80px);
  padding-top: 0;
  display: inline-block;
}
.register-dialog .dialog-footer .el-button {
  width: 120px;
}
</style>
<script>
import { reactive, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElLoading, FormInstance } from 'element-plus'

export default {
  name: 'register-dialog',

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const store = useStore()
    // 마운드 이후 바인딩 될 예정 - 컨텍스트에 노출시켜야함. <return>
    const registerForm = ref(null)
    // const idInput = ref(null)

    /*
      // Element UI Validator
      // rules의 객체 키 값과 form의 객체 키 값이 같아야 매칭되어 적용됨
      //
    */
    const state = reactive({
      form: {
        department: '',
        position: '',
        name: '',
        id: '',
        password: '',
        passwordCheck: '',
        align: 'left'
      },
      rules: {
        department: [
          { max: 30, message: '최대 30자까지 입력 가능합니다.', trigger: 'blur'}
        ],
        position: [
          { max: 30, message: '최대 30자까지 입력 가능합니다.', trigger: 'blur'}
        ],
        name: [
          { required: true, message: 'Please input name', trigger: 'blur' },
          { max: 30, message: '최대 30자까지 입력 가능합니다.', trigger: 'blur'}
        ],
        id: [
          { required: true, message: '필수 입력 항목입니다.', trigger: 'blur' },
          { max: 16, message: '최대 30자까지 입력 가능합니다.', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '영문, 숫자, 특수문자가 조합되어야 합니다.',
              trigger: 'blur', validator (rule, value, callback) {
              if (/^.(?=^)(?=.\d)(?=.[a-zA-Z])(?=.[!@#$%^&+=]).*$/.test(value)) {

              } else {
                callback(new Error('영문, 숫자, 특수문자가 조합되어야 합니다.'))
              }
          }},
          { max: 16, message: '최대 16자까지 입력 가능합니다.', trigger: 'blur'},
          { min: 9, message: '최소 9자를 입력 해야합니다.', trigger: 'blur'}
        ],
        passwordCheck: [
          { required: true, message: 'Please input passwordCheck', trigger: 'blur' },
          { max: 16, message: '최대 16자까지 입력 가능합니다.', trigger: 'blur'},
          { min: 9, message: '최소 9자를 입력 해야합니다.', trigger: 'blur'}
        ]

      },
      dialogVisible: computed(() => props.open),
      formLabelWidth: '120px'
    })

    onMounted(() => {
      // console.log(registerForm.value)
    })

    // const clickId = function () {
    //   idInput.value.validate(async (valid) => {
    //     if (valid) {
    //       console.log('submit')
    //       await store.dispatch('accountStore/idAction', { id: state.form.id})
    //     }
    //   })
    // }

    const clickRegister = function () {
      // 로그인 클릭 시 validate 체크 후 그 결과 값에 따라, 로그인 API 호출 또는 경고창 표시
      registerForm.value.validate(async (valid) => {
        if (valid) {
          const loadingInstance = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          console.log('submit')
          await store.dispatch('accountStore/registerAction', {
            id: state.form.id,
            password: state.form.password,
            name:state.form.name,
            position: state.form.position,
            department: state.form.department
          })
          loadingInstance.close()
        } else {
          alert('Validate error!')
        }
      });
    }

    const handleClose = function () {
      state.form.department = ''
      state.form.position = ''
      state.form.name = ''
      state.form.id = ''
      state.form.password = ''
      emit('closeRegisterDialog')
    }

    return { registerForm, state, clickRegister, handleClose }
  }
}

</script>
