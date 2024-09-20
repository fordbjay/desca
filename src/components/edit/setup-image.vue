<template>

    <img
        v-if="imageURL"
        class="image"
        draggable="false"
        :src="imageURL"
    />
    <div v-else>loading</div>

</template>

<script>
import { downloadPic } from "../../firebase.js"

export default {
    components: {
    },  
    async created() {
        await this.refreshImageURL()
    },
    data() {
        const setup = this.$store.getters.setup(this.$route.params.setupId)
        
        return {
            imageURL: null,
            setup,
        }
    },
    methods: {
        async refreshImageURL() {
            const key = `${this.setup.user}/${this.$route.params.setupId}`
            const url = await downloadPic(key)
            this.imageURL = url
        },
    }
}
</script>

<style scoped>

.image {
    width: 650px;
    height: 450px;
    object-fit: cover;
    display: block;
}

</style>