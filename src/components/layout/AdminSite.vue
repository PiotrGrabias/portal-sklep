<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn @click="toggleDrawer" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-toolbar-title>Panel Admina</v-toolbar-title>
      </v-col>
    </v-row>

    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item @click="selectSection('products')">
          <v-list-item-title>Produkty</v-list-item-title>
        </v-list-item>
        <v-list-item @click="selectSection('orders')">
          <v-list-item-title>Zamówienia</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-btn
          v-if="selectedSection === 'products'"
          color="primary"
          @click="createProductDialog = true"
          >Dodaj produkt</v-btn
        >

        <div v-if="selectedSection === 'products'">
          <v-row v-for="(item, index) in products" :key="index">
            <v-col cols="12">
              <v-card>
                <v-card-title>{{ item.attributes?.product_name }}</v-card-title>
                <v-card-subtitle
                  >{{ item.attributes?.price }} PLN</v-card-subtitle
                >
                <v-card-text>
                  <p>
                    <strong>Producent:</strong> {{ item.attributes?.producer }}
                  </p>
                  <p>
                    <strong>Kategoria:</strong> {{ item.attributes?.category }}
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="red" @click="deleteProduct(item.id)"
                    >Usuń</v-btn
                  >
                  <v-btn color="teal" @click="editProduct(item.id)"
                    >Edytuj</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <div v-if="selectedSection === 'orders'">
          <v-text-field
            v-model="emailSearch"
            label="Wyszukaj zamawiającego"
            outlined
            clearable
            placeholder="Wpisz email lub nazwisko/imie"
          ></v-text-field>
          <v-row v-for="(item, index) in filteredOrders" :key="index">
            <v-col cols="12">
              <v-card v-if="item && item.attributes">
                <v-card-title>
                  Zamawiający: {{ item.attributes.first_name }}
                  {{ item.attributes.last_name }}
                </v-card-title>
                <v-card-subtitle>
                  {{ item.attributes.city_code }}
                  {{ item.attributes.city_name }} {{ item.attributes.address }}
                </v-card-subtitle>
                <v-card-text>
                  <p>
                    <strong>Email:</strong>
                    {{ item.attributes.email || "Brak emailu" }}
                  </p>
                  <p>
                    <strong>Data zamówienia:</strong>
                    {{ item.attributes.date_created || "Brak daty" }}
                  </p>
                </v-card-text>
                <v-row>
                  <v-col
                    lg="4"
                    sm="4"
                    md="4"
                    v-for="(productInfo, productName) in item.attributes
                      .products"
                    :key="productName"
                  >
                    <v-list-item-avatar>
                      <v-img
                        :height="300"
                        :src="item.attributes.image[productName]"
                        alt="Product Image"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        >{{ productInfo.prodName }} -
                        {{ productInfo.amount }} szt.</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <v-dialog v-model="createProductDialog" max-width="600px">
          <v-card>
            <v-card-title>Dodaj nowy produkt</v-card-title>
            <v-card-text>
              <v-form ref="productForm" v-model="validProduct">
                <v-text-field
                  v-model="newProduct.name"
                  label="Nazwa"
                  required
                />
                <v-text-field
                  v-model="newProduct.price"
                  label="Cena"
                  type="number"
                  required
                />
                <v-text-field
                  v-model="newProduct.producer"
                  label="Producent"
                  required
                />
                <v-text-field
                  v-model="newProduct.category"
                  label="Kategoria"
                  required
                />
                <v-textarea v-model="newProduct.description" label="Opis" />
                <v-text-field
                  v-model="newProduct.image_path"
                  label="Zdjęcie"
                  required
                />
                <v-text-field
                  v-model="newProduct.amount"
                  label="Ilość"
                  type="number"
                  required
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="createProduct"
                :disabled="!validProduct"
                color="primary"
                >Dodaj</v-btn
              >
              <v-btn @click="createProductDialog = false" color="secondary"
                >Anuluj</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="editProductDialog" max-width="600px">
          <v-card>
            <v-card-title>Edytuj produkt</v-card-title>
            <v-card-text>
              <v-form ref="editForm" v-model="validProduct">
                <v-text-field
                  v-model="editableProduct.product_name"
                  label="Nazwa"
                  required
                />
                <v-text-field
                  v-model="editableProduct.price"
                  label="Cena"
                  type="number"
                  required
                />
                <v-text-field
                  v-model="editableProduct.producer"
                  label="Producent"
                  required
                />
                <v-text-field
                  v-model="editableProduct.category"
                  label="Kategoria"
                  required
                />
                <v-textarea
                  v-model="editableProduct.description"
                  label="Opis"
                />
                <v-text-field
                  v-model="editableProduct.image_path"
                  label="Zdjęcie"
                  required
                />
                <v-text-field
                  v-model="editableProduct.amount"
                  label="Ilość"
                  type="number"
                  required
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                @click="updateProduct"
                :disabled="!validProduct"
                color="primary"
                >Zapisz zmiany</v-btn
              >
              <v-btn @click="editProductDialog = false" color="secondary"
                >Anuluj</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useProductStore } from "@/stores/product";

const drawer = ref(false);
const createProductDialog = ref(false);
const editProductDialog = ref(false);
const editableProduct = ref();
const emailSearch = ref("");

const filteredOrders = computed(() => {
  if (!emailSearch.value) {
    return orders.value;
  }
  return orders.value.filter((order) => {
    const email = order.attributes?.email?.toLowerCase() || "";
    const firstName = order.attributes?.first_name?.toLowerCase() || "";
    const lastName = order.attributes?.last_name?.toLowerCase() || "";
    const searchQuery = emailSearch.value.toLowerCase();

    return (
      email.includes(searchQuery) ||
      firstName.includes(searchQuery) ||
      lastName.includes(searchQuery)
    );
  });
});


const products = computed(() => useProductStore().products);
const orders = ref([]);

const selectedSection = ref("products");

const validProduct = ref(false);
const newProduct = ref({
  name: "",
  price: "",
  producer: "",
  description: "",
});

const productStore = useProductStore();

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const selectSection = (section) => {
  selectedSection.value = section;
};

const getOrders = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/all-orders/");
    console.log("Orders response:", response.data);
    if (response.data && Array.isArray(response.data.data)) {
      orders.value = response.data.data;
    } else {
      console.error("Unexpected response format:", response.data);
      orders.value = [];
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    orders.value = [];
  }
};

const createProduct = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/create/",
      newProduct.value,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    products.value.push(response.data);
    location.reload()
    createProductDialog.value = false;
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

const editProduct = (productId) => {
  const productToEdit = products.value.find(
    (product) => product.id === productId
  );
  if (productToEdit) {
    editableProduct.value = { ...productToEdit.attributes, id: productId };
    editProductDialog.value = true;
  }
};

const updateProduct = async () => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/product/${editableProduct.value.id}/update/`,
      editableProduct.value,
      { headers: { "Content-Type": "application/json" } }
    );
    const index = products.value.findIndex(
      (product) => product.id === editableProduct.value.id
    );
    if (index !== -1) {
      products.value[index] = response.data;
    }
    await productStore.getItems();
    editProductDialog.value = false;
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const deleteProduct = async (productId) => {
  try {
    await axios.delete(`http://localhost:8000/api/product/${productId}/`);
    products.value = products.value.filter(
      (product) => product.id !== productId
    );
    await productStore.getItems();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

onMounted(() => {
  productStore.getItems();
  getOrders();
  console.log(products.value);
});
</script>

<style scoped>
.v-btn {
  margin-bottom: 10px;
}
</style>
