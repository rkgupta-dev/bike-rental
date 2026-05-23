<template>
  <div class="support-page">
    <!-- MAIN -->
    <section class="section">
      <b-container>
        <div class="listing-top-area">
          <b-breadcrumb class="custom-breadcrumb">
            <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item to="/frequently-asked-questions" active
              >FAQ</b-breadcrumb-item
            >
          </b-breadcrumb>
        </div>
        <b-row>
          <!-- LEFT SIDEBAR -->
          <b-col lg="4" class="mb-4">
            <!-- COMPANY CARD -->
            <div class="card-app support-company-card mb-4">
              <div class="company-top">
                <div class="company-icon">
                  <div class="brand-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="5.5"
                        cy="17.5"
                        r="3.5"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <circle
                        cx="18.5"
                        cy="17.5"
                        r="3.5"
                        stroke="currentColor"
                        stroke-width="2"
                      />
                      <path
                        d="M15 17.5H9M9 17.5L7 8l4 1 2-4 4 3 1 6"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <h4>BikeOntrack Pvt. Ltd.</h4>
                  <p>Premium Bike Rental Platform</p>
                </div>
              </div>

              <div class="company-detail">
                <span>GSTN</span>
                <strong>27AABCB1234C1Z5</strong>
              </div>

              <div class="company-detail">
                <span>CIN</span>
                <strong>U74999MH2018PTC317642</strong>
              </div>

              <div class="company-detail align-start">
                <span>Address</span>

                <strong>
                  123, Track Avenue, Ground Floor, Ranchi - 834001
                </strong>
              </div>
            </div>

            <!-- MENU -->
            <div class="card-app support-menu-card">
              <div
                v-for="support in items"
                :key="support"
                class="support-menu-item"
                :class="{ active: selectedItem === support }"
                @click="selectItem(support)"
              >
                <div class="menu-left">
                  <div class="menu-icon">
                    <i :class="getMenuIcon(support)"></i>
                  </div>

                  <span>{{ support }}</span>
                </div>

                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </b-col>

          <!-- RIGHT CONTENT -->
          <b-col lg="8">
            <div class="card-app content-card">
              <!-- FAQ -->
              <div v-if="selectedItem === 'FAQs'">
                <div class="content-header">
                  <h3>Frequently Asked Questions</h3>
                  <p>Quick answers to common BikeOntrack questions.</p>
                </div>

                <div
                  v-for="(faq, index) in filteredFAQs"
                  :key="index"
                  class="faq-item"
                >
                  <div
                    class="faq-question"
                    @click="toggleIcon(index)"
                    v-b-toggle="'collapse-' + index"
                  >
                    <span>{{ faq.question }}</span>

                    <div class="faq-icon">
                      <i
                        :class="
                          faq.isOpen ? 'fa-solid fa-minus' : 'fa-solid fa-plus'
                        "
                      ></i>
                    </div>
                  </div>

                  <b-collapse :id="'collapse-' + index" accordion="faq-group">
                    <div class="faq-answer">
                      {{ faq.answer }}
                    </div>
                  </b-collapse>
                </div>
              </div>

              <!-- TERMS -->
              <div v-if="selectedItem === 'Terms & Conditions'">
                <div class="content-header">
                  <h3>Terms & Conditions</h3>
                  <p>Please read all rental policies carefully.</p>
                </div>

                <div
                  v-for="(term, index) in terms"
                  :key="index"
                  class="policy-card"
                >
                  <div class="policy-title">
                    {{ term.title }}
                  </div>

                  <p>
                    {{ term.content }}
                  </p>
                </div>
              </div>

              <!-- PRIVACY -->
              <div v-if="selectedItem === 'Privacy Policy'">
                <div class="content-header">
                  <h3>Privacy Policy</h3>
                  <p>Your information security matters to us.</p>
                </div>

                <div
                  v-for="(policy, index) in privacyPolicy"
                  :key="index"
                  class="policy-card"
                >
                  <div class="policy-title">
                    {{ policy.title }}
                  </div>

                  <p>
                    {{ policy.content }}
                  </p>
                </div>
              </div>

              <!-- DISCLAIMER -->
              <div v-if="selectedItem === 'Disclaimer Policy'">
                <div class="content-header">
                  <h3>Disclaimer Policy</h3>
                  <p>Important legal and informational disclaimers.</p>
                </div>

                <div
                  v-for="(section, index) in disclaimerPolicy"
                  :key="index"
                  class="policy-card"
                >
                  <div class="policy-title">
                    {{ section.title }}
                  </div>

                  <p>
                    {{ section.content }}
                  </p>
                </div>
              </div>

              <!-- COPYRIGHT -->
              <div v-if="selectedItem === 'Copyright Guidelines'">
                <div class="content-header">
                  <h3>Copyright Guidelines</h3>
                  <p>Usage rights and intellectual property information.</p>
                </div>

                <div
                  v-for="(section, index) in copyrightGuidelines"
                  :key="index"
                  class="policy-card"
                >
                  <div class="policy-title">
                    {{ section.title }}
                  </div>

                  <p>
                    {{ section.content }}
                  </p>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        "FAQs",
        "Terms & Conditions",
        "Privacy Policy",
        "Disclaimer Policy",
        "Copyright Guidelines",
      ],

      selectedItem: "FAQs",

      faqs: [
        {
          question: "What is BikeOntrack?",
          answer:
            "BikeOntrack is a bike rental service offering scooters, commuters, and premium motorcycles for flexible monthly rentals.",
          isOpen: false,
        },
        {
          question: "How do I rent a bike?",
          answer:
            "Sign up, complete KYC verification, choose your preferred bike, and proceed with checkout and payment.",
          isOpen: false,
        },
        {
          question: "What documents are required?",
          answer:
            "A valid government ID, driving license, and address verification documents are required.",
          isOpen: false,
        },
        {
          question: "Can I extend my booking?",
          answer:
            "Yes, rental extensions can be requested before your current booking ends.",
          isOpen: false,
        },
      ],

      terms: [
        {
          title: "1. Rental Agreement",
          content:
            "By renting a bike from BikeOntrack, you agree to abide by all rental terms and conditions outlined in this agreement.",
        },
        {
          title: "2. Eligibility",
          content:
            "Renters must be at least 18 years old, possess a valid government-issued ID, and hold a valid driving license for the type of bike rented.",
        },
        {
          title: "3. Security Deposit",
          content:
            "A security deposit is required before the bike can be rented. The deposit will be refunded upon the bike's return, subject to inspection for damages.",
        },
        {
          title: "4. Insurance and Liability",
          content:
            "All renters are responsible for any damages to the bike during the rental period. Optional insurance coverage is available to help cover potential damages.",
        },
        {
          title: "5. Rental Duration and Extensions",
          content:
            "The rental period begins at the time specified in the rental agreement. Extensions must be requested at least 2 hours before the rental ends, and additional fees may apply.",
        },
        {
          title: "6. Late Fees",
          content:
            "If the bike is returned after the agreed rental period without an approved extension, a late fee will apply.",
        },
        {
          title: "7. Mileage Limit",
          content:
            "Each rental includes a mileage limit. If you exceed this limit, additional charges will be applied based on the extra kilometers driven.",
        },
        {
          title: "8. Fuel Policy",
          content:
            "The bike is provided with a full tank of fuel. The renter is responsible for refueling the bike before return; otherwise, fuel charges will apply.",
        },
        {
          title: "9. Cancellation Policy",
          content:
            "Bookings can be canceled up to 24 hours before the rental period for a full refund. Cancellations within 24 hours may incur a fee.",
        },
        {
          title: "10. Prohibited Uses",
          content:
            "The bike cannot be used for racing, stunts, or any unlawful activities. Violations will result in termination of the rental agreement without a refund.",
        },
        {
          title: "11. Safety Equipment",
          content:
            "It is mandatory for renters to wear helmets and other necessary safety gear while using the bike. Failure to do so may lead to penalties.",
        },
        {
          title: "12. Damages and Repairs",
          content:
            "The renter is responsible for any damages that occur during the rental period. If the bike requires repairs, the cost will be deducted from the security deposit.",
        },
        {
          title: "13. Privacy and Data Use",
          content:
            "Personal data collected during the rental process will be used in compliance with our privacy policy and will not be shared with third parties without consent.",
        },
      ],

      privacyPolicy: [
        {
          title: "1. Data Collection",
          content:
            "We collect data to improve your experience and manage your rentals effectively.",
        },
        {
          title: "2. Personal Information Usage",
          content:
            "Personal information is used strictly for account verification and rental processing.",
        },
        {
          title: "3. Third-Party Sharing",
          content:
            "We do not share your data with third parties without consent, except as required by law.",
        },
        {
          title: "4. Data Security",
          content:
            "We employ strong security measures to protect your data from unauthorized access.",
        },
        {
          title: "5. Cookies",
          content:
            "Cookies help us remember your preferences and enhance your browsing experience.",
        },
        {
          title: "6. License Agreement",
          content:
            "The use of our services is subject to the terms of our license agreement. Unauthorized use of our proprietary technology or content is prohibited.",
        },
        {
          title: "7. User Consent",
          content:
            "By using our platform, you consent to the collection, use, and storage of your information as described in this policy.",
        },
        {
          title: "8. Data Retention",
          content:
            "We retain your personal data for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.",
        },
        {
          title: "9. Policy Changes",
          content:
            "We may update our privacy policy from time to time. We encourage you to review this policy periodically to stay informed about our data practices.",
        },
        {
          title: "10. Children's Privacy",
          content:
            "Our services are not intended for individuals under 18. We do not knowingly collect personal information from children under 18 years of age.",
        },
        {
          title: "11. Your Rights",
          content:
            "You have the right to access, update, and delete your personal information. Contact us if you wish to exercise any of these rights.",
        },
      ],

      disclaimerPolicy: [
        {
          title: "1. General Disclaimer",
          content:
            "The information provided by BikeOntrack Techno Pvt. Ltd. on this website is for general informational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the site.",
        },
        {
          title: "2. Limitation of Liability",
          content:
            "Under no circumstances shall BikeOntrack Techno Pvt. Ltd. be liable for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Use of this site and reliance on any information is at your own risk.",
        },
        {
          title: "3. External Links Disclaimer",
          content:
            "The site may contain links to external websites or content belonging to third parties. Such external links are not investigated, monitored, or checked for accuracy, and we are not responsible for any information or content found on these external sites.",
        },
        {
          title: "4. Professional Advice Disclaimer",
          content:
            "The site cannot and does not contain professional advice. The information provided is for general informational and educational purposes only and is not a substitute for professional advice. Always seek the guidance of a qualified professional before taking any action based on information on our site.",
        },
        {
          title: "5. Views Expressed Disclaimer",
          content:
            "Any views or opinions represented on this site belong solely to the content creators and do not represent the views or opinions of BikeOntrack Techno Pvt. Ltd. or its affiliates.",
        },
        {
          title: "6. 'As Is' and 'As Available' Disclaimer",
          content:
            "All content on this site is provided 'as is' and 'as available' without warranty of any kind, either express or implied. BikeOntrack Techno Pvt. Ltd. makes no warranties regarding the site's operation, information, content, or materials.",
        },
        {
          title: "7. Changes to This Disclaimer",
          content:
            "We reserve the right to update or modify this disclaimer at any time. Your continued use of the site following any changes to this disclaimer will mean that you accept and agree to the changes.",
        },
      ],

      copyrightGuidelines: [
        {
          title: "1. Ownership",
          content:
            "All content on this website, including text, graphics, logos, and images, is owned by BikeOntrack Techno Pvt. Ltd. or its content creators and is protected under copyright law.",
        },
        {
          title: "2. Authorized Use",
          content:
            "Users are permitted to view, download, and print content for personal, non-commercial use only. Unauthorized commercial use or distribution of our content without explicit permission is prohibited.",
        },
        {
          title: "3. Prohibited Activities",
          content:
            "Copying, reproducing, republishing, uploading, posting, or distributing any of our copyrighted material without permission is strictly prohibited and may result in legal action.",
        },
        {
          title: "4. Fair Use Policy",
          content:
            "Some content may be used under fair use, provided it is attributed to BikeOntrack Techno Pvt. Ltd. and does not infringe upon the rights of the copyright holder.",
        },
        {
          title: "5. Third-Party Content",
          content:
            "Certain content, including images and trademarks, may be the property of third parties. Such content is used with permission, and we do not claim any rights over third-party materials.",
        },
        {
          title: "6. Copyright Infringement Claims",
          content:
            "If you believe that any content on our site infringes upon your copyright, please contact us with a formal notice. We will promptly investigate and take action where necessary.",
        },
        {
          title: "7. Permission Requests",
          content:
            "For permission to use any of our content beyond the scope of these guidelines, please contact us. We review requests on a case-by-case basis.",
        },
      ],
    };
  },

  computed: {
    filteredFAQs() {
      return this.faqs;
    },
  },

  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },

    toggleIcon(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    },

    getMenuIcon(item) {
      switch (item) {
        case "FAQs":
          return "fa-solid fa-circle-question";

        case "Terms & Conditions":
          return "fa-solid fa-file-contract";

        case "Privacy Policy":
          return "fa-solid fa-user-shield";

        case "Disclaimer Policy":
          return "fa-solid fa-triangle-exclamation";

        case "Copyright Guidelines":
          return "fa-solid fa-copyright";

        default:
          return "fa-solid fa-file";
      }
    },
  },
};
</script>

<style scoped>
.support-page {
  background: var(--color-gray-50);
  min-height: 100vh;
}

/* CARDS */

.support-company-card,
.support-menu-card,
.content-card {
  border-radius: var(--radius-2xl);
}

.support-company-card {
  padding: 1.8rem;
}

.company-top {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 1.5rem;
}

.company-icon {
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: rgba(var(--color-primary-rgb), 0.12);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.company-top h4 {
  font-size: 18px;
  margin-bottom: 4px;
  font-weight: 700;
}

.company-top p {
  margin: 0;
  color: var(--color-gray-500);
  font-size: 14px;
}

.company-detail {
  padding: 14px 0;
  border-bottom: 1px solid var(--color-gray-100);
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.company-detail:last-child {
  border-bottom: none;
}

.company-detail span {
  color: var(--color-gray-500);
  font-size: 14px;
}

.company-detail strong {
  color: var(--color-dark);
  font-size: 14px;
  text-align: right;
}

.align-start {
  align-items: flex-start;
}

/* MENU */

.support-menu-card {
  padding: 12px;
}

.support-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: var(--transition-base);
  margin-bottom: 10px;
}

.support-menu-item:hover {
  background: var(--color-gray-50);
}

.support-menu-item.active {
  background: var(--color-primary);
  color: #fff;
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.menu-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* CONTENT */

.content-card {
  padding: 2rem;
  max-height: 900px;
  overflow-y: auto;
}

.content-header {
  margin-bottom: 2rem;
}

.content-header h3 {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
}

.content-header p {
  color: var(--color-gray-500);
  margin: 0;
}

/* FAQ */

.faq-item {
  border: 1px solid var(--color-gray-100);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: 1rem;
  background: #fff;
}

.faq-question {
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 600;
}

.faq-answer {
  padding: 0 20px 18px;
  color: var(--color-gray-500);
  line-height: 1.8;
}

.faq-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* POLICY */

.policy-card {
  padding: 1.5rem;
  border-radius: var(--radius-xl);
  background: #fff;
  border: 1px solid var(--color-gray-100);
  margin-bottom: 1rem;
}

.policy-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--color-dark);
}

.policy-card p {
  margin: 0;
  color: var(--color-gray-500);
  line-height: 1.8;
}

/* MOBILE */

@media (max-width: 991px) {
  .content-card {
    padding: 1.4rem;
  }
}

@media (max-width: 575px) {
  .content-header h3 {
    font-size: 22px;
  }

  .company-detail {
    flex-direction: column;
  }

  .company-detail strong {
    text-align: left;
  }

  .faq-question {
    padding: 16px;
    font-size: 14px;
  }

  .faq-answer {
    padding: 0 16px 16px;
    font-size: 14px;
  }
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

.brand-icon {
  width: 50px;
  height: 50px;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>
