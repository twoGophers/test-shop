<template>
    <div class="v-cart">
        <!--Принимает значения имя из router.js, второй параметр => берет из main-wrapper.vue-->
        <router-link :to="{name : 'catalog'}">
            <div class="v-catalog__to_cart">Back to Catalog</div>
        </router-link>

        <h3>Cart</h3>
        <p v-if="!cart_data.length">There are no products in car...</p>
        <v-cart-item
            v-for="(item, index) in cart_data"
            :key="item.article"
            :cart_item_data="item"
            @deleteFromCart = "deleteFromCart(index)"
            @increment ="increment(index)"
            @decrement ="decrement(index)"
        />

    <div class="v-cart__total">
        <p class="total__name">Total</p>
        <p>{{cartTotalCost}} P.</p>
    </div>
    </div>
</template>

<script>
import vCartItem from "./v-cart-item"
import {mapActions} from "vuex"

export default {
    name : "v-cart",
    components : {
        vCartItem
    },
    props: {
        cart_data : {
            type: Array,
            default() {
                return[]
            }
        }
    },
    data() {
        return {}
    },
    computed : {
        //Общая сумма выбранных товаров в корзине
        cartTotalCost() {
            let result = []


            if(this.cart_data.length) {//Проверка наличия элементов в корзине

                for(let item of this.cart_data) {
                result.push(item.price * item.quantity);
            }

                result = result.reduce(function(sum, el) {
                    return sum + el;
                })
            return result;
            } else {
                return 0;
            }
            
        }
    },
    methods: {
        deleteFromCart (index) {
            this.DELETE_FROM_CART(index)
        },
        ...mapActions([
            "DELETE_FROM_CART",
            'INCREMENT_CART_ITEM',
            'DECREMENT_CART_ITEM'
        ]),
        increment(index) {
            this.INCREMENT_CART_ITEM(index);
        },
        decrement(index) {
            this.DECREMENT_CART_ITEM(index);
        }
    },
    watch: {},
    mounted() {},
}
</script>

<style lang="scss">
.v-cart{
    margin-bottom: 100px;
    &__total{
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        padding: 16px;
        display: flex;
        justify-content: center;
        background-color: rgb(97, 240, 173);
        color: #ffffff;
        font-size: 20px;
    }
    .total__name{
        margin-right: 16px;
    }
}
</style>