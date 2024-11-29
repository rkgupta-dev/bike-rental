<template>
  <div>
    <NavBar />
    <b-container class="mt-4">
      <b-row>
        <b-col lg="8" class="mx-auto">
          <h2 class="my-4">Account Settings</h2>
          <b-card no-body>
            <b-tabs pills card horizontal>
              <!-- Profile Tab -->
              <b-tab title="Profile">
                <b-card-text class="text-center">
                  <b-avatar
                    :src="profilePicture"
                    alt="Profile Picture"
                    size="100px"
                    class="mb-3"
                  ></b-avatar>
                  <b-form-file
                    v-model="newProfilePicture"
                    :state="Boolean(newProfilePicture)"
                    @change="handleFileChange"
                    accept="image/*"
                    label="Choose a new profile picture"
                    class="mb-3"
                  ></b-form-file>
                  <div>
                    <h4>{{ personalInfo.name }}</h4>
                    <p><strong>Email:</strong> {{ personalInfo.email }}</p>
                    <p><strong>Phone:</strong> {{ personalInfo.phone }}</p>
                    <p><strong>Address:</strong> {{ personalInfo.address }}</p>
                  </div>
                </b-card-text>
              </b-tab>

              <!-- Personal Information Tab -->
              <b-tab title="Personal Information" active>
                <b-card-text>
                  <b-form @submit.prevent="updatePersonalInfo">
                    <b-form-group label="Full Name" label-for="full-name">
                      <b-form-input
                        id="full-name"
                        v-model="personalInfo.name"
                        required
                        placeholder="Enter your full name"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Email" label-for="email">
                      <b-form-input
                        id="email"
                        v-model="personalInfo.email"
                        type="email"
                        required
                        placeholder="Enter your email"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Phone Number" label-for="phone">
                      <b-form-input
                        id="phone"
                        v-model="personalInfo.phone"
                        placeholder="Enter your phone number"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Address" label-for="address">
                      <b-form-textarea
                        id="address"
                        v-model="personalInfo.address"
                        placeholder="Enter your address"
                        rows="3"
                      ></b-form-textarea>
                    </b-form-group>

                    <b-button type="submit" variant="primary">
                      Update Personal Information
                    </b-button>
                  </b-form>
                </b-card-text>
              </b-tab>

              <!-- Change Password Tab -->
              <b-tab title="Change Password">
                <b-card-text>
                  <b-form @submit.prevent="changePassword">
                    <b-form-group label="New Password" label-for="new-password">
                      <b-form-input
                        id="new-password"
                        v-model="passwordChange.password"
                        type="password"
                        required
                        placeholder="Enter your new password"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label="Confirm New Password"
                      label-for="confirm-password"
                    >
                      <b-form-input
                        id="confirm-password"
                        v-model="passwordChange.confirmPassword"
                        type="password"
                        required
                        placeholder="Confirm your new password"
                      ></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="primary">
                      Change Password
                    </b-button>
                  </b-form>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
      passwordChange: {
        password: "",
        confirmPassword: "",
      },
      profilePicture: "path-to-profile-picture.jpg", // Default profile picture
      newProfilePicture: null, // Holds the new profile picture selected by the user
    };
  },
  methods: {
    updatePersonalInfo() {
      // Check if the user is logged in
      const user = JSON.parse(localStorage.getItem("user")) || {};
      if (user) {
        // Update user info and save to localStorage
        user.name = this.personalInfo.name;
        user.email = this.personalInfo.email;
        user.phone = this.personalInfo.phone;
        user.address = this.personalInfo.address;
        localStorage.setItem("user", JSON.stringify(user));

        this.$bvToast.toast("Personal information updated successfully", {
          title: "Success",
          variant: "success",
          solid: true,
          autoHideDelay: 3000,
        });
      }
    },
    changePassword() {
      if (
        this.passwordChange.password !== this.passwordChange.confirmPassword
      ) {
        this.$bvToast.toast("Passwords do not match", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
        return;
      }

      if (!this.passwordChange.password) {
        this.$bvToast.toast("Password cannot be empty", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
        return;
      }

      // Retrieve the existing user data from localStorage
      const user = JSON.parse(localStorage.getItem("user")) || {};
      if (user) {
        // Update password
        user.password = this.passwordChange.password;
        localStorage.setItem("user", JSON.stringify(user));

        this.$bvToast.toast("Password updated successfully", {
          title: "Success",
          variant: "success",
          solid: true,
          autoHideDelay: 3000,
        });

        // Clear the password input fields
        this.passwordChange.password = "";
        this.passwordChange.confirmPassword = "";
      }
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePicture = e.target.result;
          localStorage.setItem("profilePicture", e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.$bvToast.toast("Please select a valid image file", {
          title: "Error",
          variant: "danger",
          solid: true,
          autoHideDelay: 3000,
        });
      }
    },
  },
  mounted() {
    // Retrieve user data and profile picture from localStorage
    const savedPersonalInfo = localStorage.getItem("user");
    if (savedPersonalInfo) {
      this.personalInfo = JSON.parse(savedPersonalInfo);
    }

    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      this.profilePicture = savedProfilePicture;
    }
  },
};
</script>
