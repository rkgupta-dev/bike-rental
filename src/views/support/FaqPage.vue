<template>
  <div>
    <NavBar />
    <h4 class="text-center" style="margin-top: 4rem;">Help and Support</h4>
    <hr />
    <!-- Main Content -->
    <b-container>
      <b-row>
        <b-col md="4" class="my-2">
          <b-card>
            <h5><strong>BikeOntrack Techno Pvt. Ltd.</strong></h5>
            <h6>GSTN: 27AABCB1234C1Z5</h6>
            <h6>CIN: U74999MH2018PTC317642</h6>
            <h6>Address</h6>
            <p>
              BikeOntrack Techno Pvt. Ltd. 123, Track Avenue, Unit No. 45,
              Ground Floor, Giridih - 815314, Jharkhand, India.
            </p>
          </b-card>
          <b-card class="my-4">
            <b-list-group>
              <b-list-group-item
                v-for="support in items"
                :key="support"
                @click="selectItem(support)"
                class="d-flex justify-content-between align-items-center"
                variant="primary"
              >
                {{ support }}
                <b-badge variant="dark">
                  <i class="fa-solid fa-arrow-right"></i>
                </b-badge>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>

        <!-- Right-side Column (Dynamic Content) -->
        <b-col lg="8" class="my-2">
          <!-- FAQ Section -->
          <b-card
            v-if="selectedItem === 'FAQs'"
            style="height: 700px; overflow-y: auto"
          >
            <h5><code>FAQs</code></h5>
            <b-card
              v-for="(faq, index) in filteredFAQs"
              :key="index"
              class="my-2 shadow-sm"
            >
              <b-button
                :id="'question-' + index"
                v-b-toggle="'collapse-' + index"
                variant="light"
                class="w-100 text-left d-flex justify-content-between align-items-center"
                aria-controls="'collapse-' + index"
                aria-expanded="false"
                @click="toggleIcon(index)"
              >
                <span>{{ faq.question }}</span>
                <b-icon
                  :icon="faq.isOpen ? 'dash' : 'plus'"
                  class="ml-2"
                ></b-icon>
              </b-button>

              <b-collapse :id="'collapse-' + index" accordion="faq-accordion">
                <b-card-body class="p-2" style="font-size: small">
                  {{ faq.answer }}
                </b-card-body>
              </b-collapse>
            </b-card>
          </b-card>

          <!-- Terms and Conditions Section -->
          <b-card
            v-if="selectedItem === 'Terms & Conditions'"
            style="height: 700px; overflow-y: auto"
          >
            <h5><code> Terms & Conditions</code></h5>
            <b-card v-for="(term, index) in terms" :key="index" class="mb-3">
              <h6>
                <strong>{{ term.title }}</strong>
              </h6>
              <p>{{ term.content }}</p>
            </b-card>
          </b-card>

          <!-- Privacy Policy Section -->
          <b-card
            v-if="selectedItem === 'Privacy Policy'"
            style="height: 700px; overflow-y: auto"
          >
            <h5><code>Privacy Policy</code></h5>
            <b-card
              v-for="(policy, index) in privacyPolicy"
              :key="index"
              class="mb-3"
            >
              <h6>
                <strong>{{ policy.title }}</strong>
              </h6>
              <p>{{ policy.content }}</p>
            </b-card>
          </b-card>

          <!-- Disclaimer Policy Section -->
          <b-card
            v-if="selectedItem === 'Disclaimer Policy'"
            style="height: 700px; overflow-y: auto"
          >
            <h5><code>Disclaimer Policy</code></h5>
            <b-card
              v-for="(section, index) in disclaimerPolicy"
              :key="index"
              class="mb-3 shadow-sm"
            >
              <b-card-header class="font-weight-bold">{{
                section.title
              }}</b-card-header>
              <b-card-body>{{ section.content }}</b-card-body>
            </b-card>
          </b-card>

          <!-- Copyright Guidelines Section -->
          <b-card
            v-if="selectedItem === 'Copyright Guidelines'"
            style="height: 700px; overflow-y: auto"
          >
            <h5><code>Copyright Guidelines</code></h5>
            <b-card
              v-for="(section, index) in copyrightGuidelines"
              :key="index"
              class="mb-3 shadow-sm"
            >
              <b-card-header class="font-weight-bold">{{
                section.title
              }}</b-card-header>
              <b-card-body>{{ section.content }}</b-card-body>
            </b-card>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from "@/views/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      items: [
        "FAQs",
        "Terms & Conditions",
        "Privacy Policy",
        "Disclaimer Policy",
        "Copyright Guidelines",
      ],
      selectedItem: "FAQs", // Default selected item is 'FAQs'
      faqs: [
        {
          question: "What is BikeOntrack?",
          answer:
            "BikeOntrack is a bike rental service that offers a wide variety of bikes, from sportbikes to scooters, for daily rentals.",
          isOpen: false,
        },
        {
          question: "How do I rent a bike?",
          answer:
            "To rent a bike, simply sign up on our website, browse our fleet, and select your desired bike.",
          isOpen: false,
        },
        {
          question: "What documents do I need to rent a bike?",
          answer:
            "For renting a bike, you need a valid government-issued ID (Aadhar/Passport/Driver's License), a valid driving license, and a security deposit.",
          isOpen: false,
        },
        {
          question: "What happens if I damage the bike?",
          answer:
            "If you cause any damage to the bike, you will be liable for the repair costs. Insurance is recommended for peace of mind.",
          isOpen: false,
        },
        {
          question: "Can I extend my rental period?",
          answer:
            "Yes, you can extend your rental period by contacting our support team at least 2 hours before your scheduled return time.",
          isOpen: false,
        },
        {
          question: "Are there any late fees?",
          answer:
            "Yes, if the bike is returned late, additional charges will apply based on the rental rate.",
          isOpen: false,
        },
        {
          question: "Is there a mileage limit for rentals?",
          answer:
            "Each rental includes a specific mileage limit. Additional charges may apply for exceeding the limit.",
          isOpen: false,
        },
        {
          question: "What types of bikes are available for rent?",
          answer:
            "We offer various bikes, including scooters, commuter bikes, sportbikes, and cruisers.",
          isOpen: false,
        },
        {
          question: "Can I cancel my booking?",
          answer:
            "Yes, you can cancel your booking up to 24 hours before the rental period for a full refund.",
          isOpen: false,
        },
        {
          question: "How is the security deposit handled?",
          answer:
            "The security deposit will be held until the bike is returned. It will be refunded after inspection for any damages.",
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
          title: "1. General Information",
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
          title: "1. Ownership of Content",
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
    // Method to update the selected item
    selectItem(item) {
      this.selectedItem = item;
    },
    // Method to toggle the FAQ icon between 'plus' and 'dash'
    toggleIcon(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    },
  },
};
</script>
