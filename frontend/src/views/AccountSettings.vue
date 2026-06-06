<template>
  <div class="section gradient-light">
    <b-container class="profile-container">
      <div class="listing-top-area">
        <b-breadcrumb class="custom-breadcrumb">
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item to="/my-profile">Profile</b-breadcrumb-item>
          <b-breadcrumb-item to="/account-settings" active
            >Account Settings</b-breadcrumb-item
          >
        </b-breadcrumb>
      </div>
      <b-row>
        <!-- LEFT PROFILE CARD -->
        <b-col lg="4" class="mb-4">
          <div class="profile-card sticky-card">
            <div class="profile-header">
              <div class="avatar-wrap">
                <b-avatar
                  :src="profilePicture || defaultAvatar"
                  size="100px"
                ></b-avatar>
              </div>

              <h4 class="mb-1 mt-3">
                {{ personalInfo.name || "Guest User" }}
              </h4>

              <p class="text-muted mb-3">
                {{ personalInfo.email || "No email added" }}
              </p>

              <span class="badge-app badge-primary"> Verified Rider </span>
            </div>

            <div class="profile-info">
              <div class="info-item">
                <span>Phone</span>
                <strong>{{ personalInfo.phone || "-" }}</strong>
              </div>

              <div class="info-item">
                <span>Address</span>
                <strong>{{ personalInfo.address || "-" }}</strong>
              </div>
            </div>

            <div class="mt-4">
              <label class="upload-label mb-2"> Update Profile Picture </label>

              <b-form-file
                v-model="newProfilePicture"
                accept="image/*"
                @change="handleFileChange"
                browse-text="Upload"
                placeholder="Choose profile image..."
                class="custom-upload mb-3"
              ></b-form-file>
            </div>
          </div>
        </b-col>

        <!-- RIGHT SETTINGS -->
        <b-col lg="8">
          <!-- PERSONAL INFO -->
          <div class="settings-card mb-4">
            <div class="card-title-wrap">
              <h5 class="mb-1">Personal Information</h5>
              <p class="text-muted mb-0">Update your personal details</p>
            </div>

            <b-form @submit.prevent="updatePersonalInfo">
              <div class="grid-2">
                <div class="input-icon-wrap">
                  <i class="fa-solid fa-user"></i>

                  <b-form-input
                    v-model="personalInfo.name"
                    class="custom-input"
                    placeholder="Full Name"
                    required
                  ></b-form-input>
                </div>

                <div class="input-icon-wrap">
                  <i class="fa-solid fa-envelope"></i>

                  <b-form-input
                    v-model="personalInfo.email"
                    type="email"
                    class="custom-input"
                    placeholder="Email Address"
                    required
                  ></b-form-input>
                </div>
              </div>

              <div class="grid-2 mt-3">
                <div class="input-icon-wrap">
                  <i class="fa-solid fa-phone"></i>

                  <b-form-input
                    v-model="personalInfo.phone"
                    type="tel"
                    class="custom-input"
                    placeholder="Phone Number"
                  ></b-form-input>
                </div>

                <div class="input-icon-wrap">
                  <i class="fa-solid fa-location-dot"></i>

                  <b-form-input
                    v-model="personalInfo.address"
                    class="custom-input"
                    placeholder="Address"
                  ></b-form-input>
                </div>
              </div>

              <div class="mt-4">
                <b-button type="submit" class="btn-primary-app px-4">
                  Save Changes
                </b-button>
              </div>
            </b-form>
          </div>

          <!-- SECURITY -->
          <div class="settings-card">
            <div class="card-title-wrap">
              <h5 class="mb-1">Security</h5>
              <p class="text-muted mb-0">Change your account password</p>
            </div>

            <b-form @submit.prevent="changePassword">
              <div class="grid-2">
                <div class="input-icon-wrap">
                  <i class="fa-solid fa-lock"></i>

                  <b-form-input
                    v-model="passwordChange.password"
                    type="password"
                    class="custom-input"
                    placeholder="New Password"
                  ></b-form-input>
                </div>

                <div class="input-icon-wrap">
                  <i class="fa-solid fa-unlock-keyhole"></i>

                  <b-form-input
                    v-model="passwordChange.confirmPassword"
                    type="password"
                    class="custom-input"
                    placeholder="Confirm Password"
                  ></b-form-input>
                </div>
              </div>

              <div class="mt-4">
                <b-button type="submit" class="btn-primary-app px-4">
                  Update Password
                </b-button>
              </div>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultAvatar: "https://i.pravatar.cc/150?img=12",

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

      profilePicture: "",
      newProfilePicture: null,
    };
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      this.personalInfo = {
        ...this.personalInfo,
        ...user,
      };
    }

    const savedImage = localStorage.getItem("profilePicture");

    if (savedImage) {
      this.profilePicture = savedImage;
    }
  },

  methods: {
    updatePersonalInfo() {
      localStorage.setItem("user", JSON.stringify(this.personalInfo));

      this.$bvToast.toast("Profile updated successfully", {
        title: "Success",
        variant: "success",
        solid: true,
        autoHideDelay: 2500,
        toaster: "b-toaster-bottom-right",
      });
    },

    changePassword() {
      if (
        !this.passwordChange.password ||
        !this.passwordChange.confirmPassword
      ) {
        this.$bvToast.toast("Please fill all password fields", {
          title: "Error",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });

        return;
      }

      if (
        this.passwordChange.password !== this.passwordChange.confirmPassword
      ) {
        this.$bvToast.toast("Passwords do not match", {
          title: "Error",
          variant: "danger",
          solid: true,
          toaster: "b-toaster-bottom-right",
        });

        return;
      }

      const user = JSON.parse(localStorage.getItem("user")) || {};

      user.password = this.passwordChange.password;

      localStorage.setItem("user", JSON.stringify(user));

      this.passwordChange.password = "";
      this.passwordChange.confirmPassword = "";

      this.$bvToast.toast("Password updated successfully", {
        title: "Success",
        variant: "success",
        solid: true,
        autoHideDelay: 2500,
        toaster: "b-toaster-bottom-right",
      });
    },

    handleFileChange(event) {
      const file = event.target.files[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = (e) => {
        this.profilePicture = e.target.result;

        localStorage.setItem("profilePicture", e.target.result);
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
}

.sticky-card {
  position: sticky;
  top: 100px;
}

.profile-card,
.settings-card {
  background: #fff;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}

.profile-header {
  text-align: center;
}

.avatar-wrap {
  display: flex;
  justify-content: center;
}

.profile-header h4 {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.profile-info {
  margin-top: 24px;
  border-top: 1px solid #f1f5f9;
  padding-top: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f8fafc;
}

.info-item span {
  color: #64748b;
  font-size: 14px;
}

.info-item strong {
  color: #0f172a;
  font-size: 14px;
  text-align: right;
}

.card-title-wrap {
  margin-bottom: 24px;
}

.card-title-wrap h5 {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.input-icon-wrap {
  position: relative;
}

.input-icon-wrap i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  z-index: 2;
}

.custom-input {
  height: 52px;
  border-radius: 14px;
  padding-left: 48px !important;
  border: 1px solid #e2e8f0;
  box-shadow: none !important;
}

.custom-input:focus {
  border-color: var(--color-primary);
}

.upload-label {
  font-size: 14px;
  font-weight: 600;
  color: #475569;
}

@media (max-width: 991px) {
  .sticky-card {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }

  .profile-card,
  .settings-card {
    padding: 18px;
    border-radius: 20px;
  }

  .profile-header h4 {
    font-size: 20px;
  }
}

.custom-upload ::v-deep .custom-file-label {
  height: 52px;
  border-radius: 14px;
  border: 1px solid #dbe2ea;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-size: 14px;
  color: #64748b;
  background: #fff;
  overflow: hidden;
}

.custom-upload ::v-deep .custom-file-label::after {
  height: 50px;
  border: none;
  background: linear-gradient(135deg, var(--color-primary), #6366f1);
  color: #fff;
  font-weight: 600;
  padding: 0 22px;
  display: flex;
  align-items: center;
}

.custom-upload ::v-deep .custom-file-input:focus ~ .custom-file-label {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

/* breadcrumb */
.listing-top-area {
  margin-bottom: 2rem;
}

.custom-breadcrumb {
  background: transparent;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.custom-breadcrumb .breadcrumb {
  background: transparent !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
}

.custom-breadcrumb .breadcrumb-item a {
  color: var(--color-gray-500);
  font-weight: 500;
  text-decoration: none;
}

.custom-breadcrumb .breadcrumb-item.active {
  color: var(--color-primary);
  font-weight: 700;
}

.custom-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
  color: var(--color-gray-300);
}

.card-disabled {
  opacity: 0.55;
}
</style>
