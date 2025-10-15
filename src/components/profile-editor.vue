<template>

    <div class="main-container">

        <img
            :src="editProfileDetails.photoURL"
            alt="User Photo"
            style="display: block; width: 75px;"
        >
        <div>{{ editProfileDetails.profName }}</div>
        

        <div class="social-input">
            <p>username</p>
            <input type="text" v-model="editProfileDetails.profName">
        </div>


        <div class="social-input" v-for="social in socials">
            <p>{{social}}</p>
            <input type="text" :name="social" v-model="editProfileDetails.socialLinks[social]">
        </div>


        <div>
            <button @click="submitChanges()">save</button>
            <button @click="logOut()">log out</button>
        </div>

    </div>

</template>

<script>

export default {
    props: {
        editProfileDetails: {
            type: Object,
        }

    },
    components: {
        
    },
    data() {
            return {
                socials: ['x','facebook','youtube','website', 'discord','twitch',],
                originalDetails: null,
            }
        },
    methods: {
        logOut() {
            this.$store.dispatch('logOut')
        },
        submitChanges() {
            const newDetails = this.editProfileDetails
            const prevDetails = this.originalDetails

            // Deep compare cloned vs. edited object
            const isSame = JSON.stringify(prevDetails) === JSON.stringify(newDetails)

            if (isSame) {
                console.log('No changes detected')
            } else {
                this.$store.dispatch('submitChanges', { 
                details: newDetails, 
                user: this.$store.state.user.uid
                })
            }
        }
    },
    mounted() {
        // Store a deep clone of the original data for comparison
        this.originalDetails = JSON.parse(JSON.stringify(this.editProfileDetails))
    },

}

</script>

<style scoped>

.main-container {
    border: 1px solid;
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.social-input {
    display: flex;
    align-items: center;
}


</style>