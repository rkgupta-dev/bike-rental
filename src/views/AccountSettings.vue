<template>
    <div>
      <NavBar/>
      <b-container>
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
                      <h4>{{ personalInfo.fullName }}</h4>
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
                          v-model="personalInfo.fullName"
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
  
                      <b-button type="submit" variant="primary"
                        >Update Personal Information</b-button
                      >
                    </b-form>
                  </b-card-text>
                </b-tab>
  
                <!-- Change Password Tab -->
                <b-tab title="Change Password">
                  <b-card-text>
                    <b-form @submit.prevent="changePassword">
                      <b-form-group
                        label="Current Password"
                        label-for="current-password"
                      >
                        <b-form-input
                          id="current-password"
                          v-model="passwordChange.currentPassword"
                          type="password"
                          required
                          rows="5"
                          placeholder="Enter your current password"
                        ></b-form-input>
                      </b-form-group>
  
                      <b-form-group label="New Password" label-for="new-password">
                        <b-form-input
                          id="new-password"
                          v-model="passwordChange.newPassword"
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
  
                      <b-button type="submit" variant="primary"
                        >Change Password</b-button
                      >
                    </b-form>
                  </b-card-text>
                </b-tab>
  
                <!-- Notification Preferences Tab -->
                <b-tab title="Notification Preferences">
                  <b-card-text>
                    <b-form @submit.prevent="updateNotificationPreferences">
                      <b-form-group label="Email Notifications">
                        <b-form-checkbox
                          v-model="
                            notificationPreferences.emailBookingConfirmation
                          "
                        >
                          Booking Confirmations
                        </b-form-checkbox>
                        <b-form-checkbox
                          v-model="notificationPreferences.emailRentalReminders"
                        >
                          Rental Reminders
                        </b-form-checkbox>
                        <b-form-checkbox
                          v-model="notificationPreferences.emailPromotions"
                        >
                          Promotions and Offers
                        </b-form-checkbox>
                      </b-form-group>
  
                      <b-form-group label="SMS Notifications">
                        <b-form-checkbox
                          v-model="notificationPreferences.smsBookingConfirmation"
                        >
                          Booking Confirmations
                        </b-form-checkbox>
                        <b-form-checkbox
                          v-model="notificationPreferences.smsRentalReminders"
                        >
                          Rental Reminders
                        </b-form-checkbox>
                      </b-form-group>
  
                      <b-button type="submit" variant="primary"
                        >Update Notification Preferences</b-button
                      >
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
  import NavBar from './NavBar.vue';
  
  export default {
    components: {
      NavBar,
    },
    data() {
      return {
        personalInfo: {
          fullName: "",
          email: "",
          phone: "",
          address: "",
        },
        passwordChange: {
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
        notificationPreferences: {
          emailBookingConfirmation: true,
          emailRentalReminders: true,
          emailPromotions: false,
          smsBookingConfirmation: false,
          smsRentalReminders: false,
        },
        profilePicture: "path-to-profile-picture.jpg", // Default profile picture
        newProfilePicture: null, // Holds the new profile picture selected by the user
      };
    },
    methods: {
      updatePersonalInfo() {
        console.log("Updating personal information:", this.personalInfo);
        this.$bvToast.toast("Personal information updated successfully", {
          title: "Success",
          variant: "success",
          solid: true,
        });
      },
      changePassword() {
        if (
          this.passwordChange.newPassword !== this.passwordChange.confirmPassword
        ) {
          this.$bvToast.toast("New passwords do not match", {
            title: "Error",
            variant: "danger",
            solid: true,
          });
          return;
        }
        console.log("Changing password");
        this.$bvToast.toast("Password changed successfully", {
          title: "Success",
          variant: "success",
          solid: true,
        });
        this.passwordChange = {
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        };
      },
      updateNotificationPreferences() {
        console.log(
          "Updating notification preferences:",
          this.notificationPreferences
        );
        this.$bvToast.toast("Notification preferences updated successfully", {
          title: "Success",
          variant: "success",
          solid: true,
        });
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.profilePicture = e.target.result; // Set the selected image as the profile picture
          };
          reader.readAsDataURL(file); // Read the image as a Data URL
        }
      },
    },
    mounted() {
      this.personalInfo = {
        fullName: "",
        email: "",
        phone: "",
        address: "",
      };
    },
  };
  </script>
  