<template>
  <v-container>
    <v-row align="center" justify="center" style="height: 100vh" dense>
      <v-col cols="12" lg="6" md="6">
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
          elevation="18"
          min-height="250"
        >
          <v-list-item v-if="!showSignUp">
            <h1>Login</h1>
            <div class="form-group">
              <label>User name: </label>
              <v-text-field
                type="text"
                class="form-control form-control-lg"
                v-model="login_data.username"
                :rules="[rules.required]"
                required
              />
            </div>
            <div class="form-group">
              <label>Password: </label>
              <v-text-field
                class="form-control form-control-lg"
                :type="show1 ? 'text' : 'password'"
                v-model="login_data.password"
                :rules="[rules.required]"
                required
              />
            </div>
            <v-btn
              type="submit"
              class="btn btn-dark btn-lg btn-block"
              color="primary"
              @click="Login"
            >
              Login
            </v-btn>
            <div>
              <p>
                Don't have an account?
                <a href="#" @click="signUpForm">Sign up here</a>
              </p>
            </div>
          </v-list-item>
          <v-list-item v-else>
            <h1>SignUp</h1>
            <div class="form-group">
              <label>User name: </label>
              <v-text-field
                class="form-control form-control-lg"
                type="text"
                v-model="user_details.username"
                :rules="[rules.required]"
                required
              />
            </div>
            <div class="form-group">
              <label>Email address: </label>
              <v-text-field
                class="form-control form-control-lg"
                type="text"
                v-model="user_details.email"
                :rules="[rules.required]"
                required
              />
            </div>
            <div class="form-group">
              <label>Password: </label>
              <v-text-field
                class="form-control form-control-lg"
                :type="show1 ? 'text' : 'password'"
                v-model="user_details.password"
                :rules="[rules.required]"
                required
              />
            </div>
            <div class="form-group">
              <label>Re-type Password: </label>
              <v-text-field
                class="form-control form-control-lg"
                :type="show1 ? 'text' : 'password'"
                v-model="user_details.password2"
                :rules="[rules.required]"
                required
              />
            </div>
            <div class="container">
              <div class="large-12 medium-12 small-12 cell">
                <label
                  >Files
                  <input
                    type="file"
                    id="files"
                    ref="files"
                    multiple
                    v-on:change="handleFilesUpload()"
                  />
                </label>
              </div>
            </div>
            <div>
              <v-btn
                type="submit"
                class="btn btn-dark btn-lg btn-block"
                color="primary"
                @click="saveUserDetails"
              >
                Register
              </v-btn>
            </div>
            <div>
              <p>
                Already have an account?
                <a href="#" @click="signInForm">Sign in here</a>
              </p>
            </div>
          </v-list-item>
        </v-card>
        <div style="margin-top: 130px">
          <v-alert v-if="showAlert" border="top" color="red lighten-2" dark>
            {{ alertMsg }}
          </v-alert>
        </div>
        <div style="margin-top: 130px">
          <v-alert v-if="showalertRegisterMsg" border="top" color="green" dark>
            {{ alertRegisterMsg }}
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      login_data: {
        username: null,
        password: null,
      },
      rules: {
        required: (value) => !!value || "Required.",
      },
      showAlert: false,
      alertMsg: null,
      alertRegisterMsg: null,
      showalertRegisterMsg: null,
      show1: false,
      registerActive: false,
      showSignUp: false,
      user_details: {
        email: null,
        password: null,
        password2: null,
        username: null,
      },
    };
  },

  methods: {
    saveUserDetails() {
      console.log("user details", this.user_details);
      if (this.user_details) {
        if (
          this.user_details.username != null &&
          this.user_details.email != null &&
          this.user_details.password != null &&
          this.user_details.password2 != null
        ) {
          this.showAlert = false;
          axios
            .post("http://127.0.0.1:8000/register", this.user_details)
            .then((response) => {
              this.showalertRegisterMsg = true
              this.alertRegisterMsg = "User Registered Successfully!"
            })
            .catch((error) => {
              this.showAlert = true;
              this.alertMsg = "Enter a valid data"
              console.log(error);
              console.debug(error);
              console.dir(error);
            });
        } else {
          this.showAlert = true;
          this.alertMsg = "Fill all the fields"
        }
      }
    },
    signInForm() {
      this.showSignUp = false;
      this.showAlert = false;
      this.showalertRegisterMsg = false
    },
    signUpForm() {
      this.showSignUp = true;
      this.showalertRegisterMsg = false
    },
    Login() {
      var payload;
      if (
        this.login_data.username != null &&
        this.login_data.password != null
      ) {
        payload = this.login_data;
      }
      if (payload) {
        axios
          .post(this.$store.state.endpoints.obtainJWT, payload)
          .then((response) => {
            this.showalertRegisterMsg = true
            this.alertRegisterMsg = "User Logged-in Successfully!"
            // console.log("token", response);
            // this.$store.commit("updateToken", response.data.token);
            // const base = {
            //   baseURL: this.$store.state.endpoints.baseUrl,
            //   headers: {
            //     // Set your Authorization to 'JWT', not Bearer!!!
            //     Authorization: `JWT ${this.$store.state.jwt}`,
            //     "Content-Type": "application/json",
            //   },
            //   xhrFields: {
            //     withCredentials: true,
            //   },
            // };
            // const axiosInstance = axios.create(base);
            // axiosInstance({
            //   method: "get",
            //   params: {},
            // }).then((response) => {
            //   console.log("login response", response)
            //   this.$store.commit("setAuthUser", {
            //     authUser: response.data,
            //     isAuthenticated: true,
            //   });
              // this.$router.push({ name: "Login" });
            // });
          })
          .catch((error) => {
            console.log(error);
            console.debug(error);
            console.dir(error);
          });
      }
    },
    submitFiles() {
      /*
        Initialize the form data
      */
      let formData = new FormData();

      /*
        Iteate over any file sent over appending the files
        to the form data.
      */
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        formData.append("files[" + i + "]", file);
      }

      /*
        Make the request to the POST /multiple-files URL
      */
      axios
        .post("/multiple-upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },

    /*
      Handles a change on the file upload
    */
    handleFilesUpload() {
      this.files = this.$refs.files.files;
    },
  },
};
</script>

<style></style>
