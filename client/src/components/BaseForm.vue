<template>
    <el-form class="form-box" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
            <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass" v-if="mode === 'signup'">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age" v-if="mode === 'signup'">
            <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>

        <el-form-item class="footer" v-if="mode === 'login'">
            <el-button type="primary" @click="changeMode('signup')">注册</el-button>
            <el-button type="primary" @click="handleLogin('ruleForm')" :loading="loading">登录</el-button>
        </el-form-item>

        <el-form-item class="footer" v-else-if="mode === 'signup'">
            <el-button type="primary" @click="changeMode('login')">返回登录</el-button>
            <el-button type="submit" @click="handleSignup('ruleForm')">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
  import {Message} from 'element-ui'

  export default {
    data() {
      let validateUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'))
        }
        callback()
      }
      let checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          username: [
            {validator: validateUsername, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          age: [
            {validator: checkAge, trigger: 'blur'}
          ]
        },
        mode: 'login',
        redirect: undefined,
        otherQuery: {},
        loading: false,
      };
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true,
      }
    },
    computed: {},
    methods: {
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      },
      // 注册
      handleSignup(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/api/user/add', {
              username: this.ruleForm.username,
              password: this.ruleForm.pass,
              age: this.ruleForm.age
            }).then(response => {
              console.log(response)
              if (response.status === 200 && response.data.code === 0) {
                this.$refs[formName].resetFields()
                Message({
                  message: '注册成功',
                  type: 'success'
                })
                this.mode = 'login'
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleLogin(formName) {
        // debugger
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('login', {username: this.ruleForm.username, password: this.ruleForm.pass})
                .then(() => {
                  this.$router.push({
                    path: this.redirect || '/',
                    query: this.otherQuery
                  })
                  this.loading = false
                }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      },
      changeMode(mode) {
        this.mode = mode
      }
    }
  }
</script>

<style scoped>

</style>