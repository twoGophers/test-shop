<template>
    <div class="v-catalog">
        <!--Принимает значения имя из router.js, второй параметр => берет из main-wrapper.vue-->
        <router-link :to="{name : 'cart', params : {cart_data:CART}}">
            <div class="v-catalog__to_cart">Cart: {{CART.length}}</div>
        </router-link>

        <h3>Catalog</h3>
            <div class="filtters">
                <v-select 
            
                    :selected="selected"
                    :options="categories"
                    @select="sortByCategories"
                    :isExpanded="IS_DESKTOP"
                />
                <div class="range-slider">
                    <input 
                    v-model.number="minPrice"
                     type="range"
                      min="0"
                       max="1000" 
                       step="10"
                       @change="setRangeSlider"
                       >

                    <input 
                    v-model.number="maxPrice" 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="10"
                    @change="setRangeSlider"
                    >

                </div>
                <div class="range-values">
                    <p>Min : {{minPrice}}</p>
                    <p>Max : {{maxPrice}}</p>
                </div>
            </div>
            
        <div class="v-catalog__list">
            <!--Цикл перебора массива из геттера в папке store.js => getters-->
            <!--Ключ, который должен быть индивидуальный, чтобы можно было по нему обращатся-->
            <!--Показываем что, продукт из ребенка catalog-item массив равно нашему элементу из массива -->
            <!--Метод, отображение в консоли артикла, по которому нажали-->
            <v-catalog-item
            v-for="product in filteredProducts"
            :key="product.article"
            v-bind:product_data="product"
            @addToCart="addToCart"
            ></v-catalog-item><!--Связать дочерный элемент через методы каталога и каталог итем-->

            

            
        </div>
    </div>
</template>

<script>
import vCatalogItem from './v-catalog-item'
//import Item  для того чтобы не писать название, в компутед пишем
import {mapActions, mapGetters} from 'vuex'
//Добавление селектора
import vSelect from './v-select'

export default {
    name : "v-catalog",
    components : {
        vCatalogItem,
        vSelect
    },
    props: {},
    data() {
        return {
             categories : [
                 {name : 'Все', value : 'p/y' },
                 {name : 'Проводные', value : 'p' },
                 {name : 'USB', value : 'y' }
             ],
             selected : 'Всe',
             sortedProducts : [],
             minPrice : 0,
             maxPrice : 2000
        }
    },
    computed : {
        ...mapGetters([//геттер в папке store.js => getters-->
            "PRODUCTS",
            "CART",
            "IS_MOBILE",
            "IS_DESKTOP"
        ]),
        filteredProducts() {
            if(this.sortedProducts.length) {
               return this.sortedProducts;
            } else {
               return this.PRODUCTS;
            }
        }
    },
    methods: {
        setRangeSlider() {
        if (this.minPrice > this.maxPrice) {
          let tmp = this.maxPrice;
          this.maxPrice = this.minPrice;
          this.minPrice = tmp;
        }
        this.sortByCategories()
        },
        ...mapActions([
            "GET_PRODUCTS_FROM_API",
            "ADD_TO_CART"
        ]),
        addToCart(data) {
            this.ADD_TO_CART(data)
            .then(() => {
                let timeStamp = Date.now().toLocaleString();
                this.messages.unshift(
                {name: 'Товар добавлен в корзину', icon: 'check_circle', id: timeStamp}
                )
            })
        },
        //Метод который делает выборку товара по категории category (db.json)
        sortByCategories(category) {
            let vm = this;
            this.sortedProducts = [...this.PRODUCTS]
            this.sortedProducts = this.sortedProducts.filter(function (item) {
            return item.price >= vm.minPrice && item.price <= vm.maxPrice
            })
            if (category) {
            this.sortedProducts = this.sortedProducts.filter(function (e) {
                vm.selected === category.name;
                return e.category === category.name
            })
            }
        },
        },

    watch: {},
    mounted() {
        this.GET_PRODUCTS_FROM_API()
        .then((response) => {
            if (response.data) {
                console.log('Data arrived');
                this.sortByCategories()
            }
        })
    },
}
</script>




<style lang="scss">
.v-catalog {
    &__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

    }
    &__to_cart{
        position: absolute;
        top : 1%;
        right: 1%;
        padding: 16px;
        border: 1px solid #e0e0e0;
    }

    .filtters {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .range-slider {
        width: 200px;
        margin:  auto 16px;
        text-align: center;
        position: relative;
    }

    .range-slider svg, .range-slider input[type=range] {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    input[type=range]::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        top: 2px;
        margin-top: -7px;
    }
}
</style>