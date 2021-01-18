<template>
    <div class="v-catalog-item">
        
        <img class="v-catalog-item-image" :src="require('../assets/images/'+ product_data.image)" alt="img"><!--Отображение картинки во Vue-->
        <p class="v-catalog-item-name">{{product_data.name}}</p>
        <p class="v-catalog-item-price">{{product_data.price}} P</p>
        <button class="v-catalog-item-add_to_cart btn" 
        @click="addToCart"
        >Add too cart</button><!---->
    </div>
</template>

<script>



export default {
    name : "v-catalog-item",
    components : {

    },
    props: {//Получение данных от родителя, за счет этого отображаем весь каталог
        product_data: {//Новый елемент, который потом ипользуем выше, для отправной точки отображения массива
            type : Object,
            default() {
                return{}
            }
        }
    },
    data() {
        return {}
    },
    computed : {},
    methods: {
        addToCart() {
            this.$emit('addToCart', this.product_data)
        }
    },
    watch: {},
    mounted() {
        //Обязательно $set, обязательно в скобках указываем что изменяем, новый ключ и его значение
        this.$set(this.product_data, 'quantity', 1)
    },
}
</script>

<style lang="scss">
.v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    justify-content: space-between;
    padding: 16px;
    margin: 16px;
    .btn {
        background-color: rgb(175, 241, 145);
        padding: 8px 8px*2;
        border: 0;
        border-radius: 5px;
        color: rgb(63, 63, 63);
    }
}
</style>