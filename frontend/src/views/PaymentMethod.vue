<template>
    <div>
      <NavBar />
      <b-container style="margin-top: 4rem;">
        <b-row>
          <b-col lg="8" class="mx-auto">
            <h2 class="my-4">Payment Methods</h2>
            <b-card no-body>
              <b-card-header>
                <b-button v-b-modal.add-payment-modal variant="primary">
                  <i class="fas fa-plus mr-2"></i>Add Payment Method
                </b-button>
              </b-card-header>
              <b-list-group flush>
                <b-list-group-item
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="d-flex justify-content-between align-items-center"
                >
                  <div class="d-flex align-items-center">
                    <i
                      :class="getPaymentIcon(method.type)"
                      class="fa-2x mr-3"
                    ></i>
                    <div>
                      <h5 class="mb-0">{{ method.name }}</h5>
                      <p class="mb-0 text-muted">
                        <template v-if="method.type === 'card'">
                          **** **** **** {{ method.last4 }}
                        </template>
                        <template v-else-if="method.type === 'paypal'">
                          {{ method.email }}
                        </template>
                        <template v-else-if="method.type === 'googlepay'">
                          Google Pay
                        </template>
                        <template v-else-if="method.type === 'phonepay'">
                          Phone Pay
                        </template>
                      </p>
                    </div>
                  </div>
                  <div>
                    <b-button
                      variant="outline-secondary"
                      size="sm"
                      class="mr-2"
                      @click="editPaymentMethod(method)"
                    >
                      Edit
                    </b-button>
                    <b-button
                      variant="outline-danger"
                      size="sm"
                      @click="deletePaymentMethod(method.id)"
                    >
                      Delete
                    </b-button>
                  </div>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
        </b-row>
  
        <!-- Add Payment Method Modal -->
        <b-modal
          id="add-payment-modal"
          title="Add Payment Method"
          @ok="addPaymentMethod"
        >
          <b-form>
            <b-form-group label="Payment Type">
              <b-form-select
                v-model="newPaymentMethod.type"
                :options="paymentTypeOptions"
              ></b-form-select>
            </b-form-group>
            <template v-if="newPaymentMethod.type === 'card'">
              <b-form-group label="Card Number">
                <b-form-input
                  v-model="newPaymentMethod.cardNumber"
                  placeholder="1234 5678 9012 3456"
                ></b-form-input>
              </b-form-group>
              <b-row>
                <b-col md="6">
                  <b-form-group label="Expiration Date">
                    <b-form-input
                      v-model="newPaymentMethod.expirationDate"
                      placeholder="MM/YY"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="CVV">
                    <b-form-input
                      v-model="newPaymentMethod.cvv"
                      placeholder="123"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </template>
            <template v-else-if="newPaymentMethod.type === 'paypal'">
              <b-form-group label="PayPal Email">
                <b-form-input
                  v-model="newPaymentMethod.email"
                  type="email"
                  placeholder="your@email.com"
                ></b-form-input>
              </b-form-group>
            </template>
            <template v-else-if="newPaymentMethod.type === 'googlepay'">
              <b-form-group label="Google Pay Email">
                <b-form-input
                  v-model="newPaymentMethod.email"
                  type="email"
                  placeholder="your@email.com"
                ></b-form-input>
              </b-form-group>
            </template>
            <template v-else-if="newPaymentMethod.type === 'phonepay'">
              <b-form-group label="Phone Pay Number">
                <b-form-input
                  v-model="newPaymentMethod.phone"
                  placeholder="Phone Number"
                ></b-form-input>
              </b-form-group>
            </template>
          </b-form>
        </b-modal>
  
        <!-- Edit Payment Method Modal -->
        <b-modal
          id="edit-payment-modal"
          title="Edit Payment Method"
          @ok="updatePaymentMethod"
        >
          <b-form>
            <b-form-group label="Name">
              <b-form-input v-model="editingPaymentMethod.name"></b-form-input>
            </b-form-group>
            <template v-if="editingPaymentMethod.type === 'card'">
              <b-form-group label="Expiration Date">
                <b-form-input
                  v-model="editingPaymentMethod.expirationDate"
                  placeholder="MM/YY"
                ></b-form-input>
              </b-form-group>
            </template>
            <template v-else-if="editingPaymentMethod.type === 'paypal'">
              <b-form-group label="PayPal Email">
                <b-form-input
                  v-model="editingPaymentMethod.email"
                  type="email"
                ></b-form-input>
              </b-form-group>
            </template>
            <template v-else-if="editingPaymentMethod.type === 'googlepay'">
              <b-form-group label="Google Pay Email">
                <b-form-input
                  v-model="editingPaymentMethod.email"
                  type="email"
                ></b-form-input>
              </b-form-group>
            </template>
            <template v-else-if="editingPaymentMethod.type === 'phonepay'">
              <b-form-group label="Phone Pay Number">
                <b-form-input
                  v-model="editingPaymentMethod.phone"
                  placeholder="Phone Number"
                ></b-form-input>
              </b-form-group>
            </template>
          </b-form>
        </b-modal>
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
        paymentMethods: [
          {
            id: 1,
            type: "card",
            name: "Visa",
            last4: "4242",
            expirationDate: "12/24",
          },
          { id: 2, type: "paypal", name: "PayPal", email: "user@example.com" },
          {
            id: 3,
            type: "googlepay",
            name: "Google Pay",
            email: "user@example.com",
          },
          { id: 4, type: "phonepay", name: "Phone Pay", phone: "1234567890" },
        ],
        newPaymentMethod: {
          type: "card",
          cardNumber: "",
          expirationDate: "",
          cvv: "",
          email: "",
          phone: "",
        },
        editingPaymentMethod: {},
        paymentTypeOptions: [
          { value: "card", text: "Credit Card" },
          { value: "paypal", text: "PayPal" },
          { value: "googlepay", text: "Google Pay" },
          { value: "phonepay", text: "Phone Pay" },
        ],
      };
    },
    methods: {
      getPaymentIcon(type) {
        switch (type) {
          case "card":
            return "fas fa-credit-card";
          case "paypal":
            return "fab fa-paypal";
          case "googlepay":
            return "fab fa-google";
          case "phonepay":
            return "fas fa-phone";
          default:
            return "";
        }
      },
      addPaymentMethod() {
        const newMethod = {
          id: this.paymentMethods.length + 1,
          type: this.newPaymentMethod.type,
          name:
            this.newPaymentMethod.type === "card"
              ? "Credit Card"
              : this.newPaymentMethod.type === "paypal"
              ? "PayPal"
              : this.newPaymentMethod.type === "googlepay"
              ? "Google Pay"
              : "Phone Pay",
        };
  
        if (this.newPaymentMethod.type === "card") {
          newMethod.last4 = this.newPaymentMethod.cardNumber.slice(-4);
          newMethod.expirationDate = this.newPaymentMethod.expirationDate;
        } else if (
          this.newPaymentMethod.type === "paypal" ||
          this.newPaymentMethod.type === "googlepay"
        ) {
          newMethod.email = this.newPaymentMethod.email;
        } else if (this.newPaymentMethod.type === "phonepay") {
          newMethod.phone = this.newPaymentMethod.phone;
        }
  
        this.paymentMethods.push(newMethod);
        this.resetNewPaymentMethod();
      },
      editPaymentMethod(method) {
        this.editingPaymentMethod = { ...method };
        this.$bvModal.show("edit-payment-modal");
      },
      updatePaymentMethod() {
        const index = this.paymentMethods.findIndex(
          (m) => m.id === this.editingPaymentMethod.id
        );
        if (index !== -1) {
          this.paymentMethods[index] = { ...this.editingPaymentMethod };
        }
      },
      deletePaymentMethod(id) {
        this.$bvModal
          .msgBoxConfirm("Are you sure you want to delete this payment method?")
          .then((value) => {
            if (value) {
              this.paymentMethods = this.paymentMethods.filter(
                (m) => m.id !== id
              );
            }
          });
      },
      resetNewPaymentMethod() {
        this.newPaymentMethod = {
          type: "card",
          cardNumber: "",
          expirationDate: "",
          cvv: "",
          email: "",
          phone: "",
        };
      },
    },
  };
  </script>
  
  <style scoped>
 
  </style>
  