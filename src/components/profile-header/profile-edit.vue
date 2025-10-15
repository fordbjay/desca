<template>

    <div class="main-container">

        <p class="close-btn" @click="$emit('close')">&times;</p>


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

        <p v-if="saveClicked">{{ this.message}}</p>

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
                saveClicked: false,
                message: 'test'
            }
        },
    methods: {
        logOut() {
            this.$store.dispatch('logOut')
        },
        submitChanges() {
            const newDetails = this.editProfileDetails
            const prevDetails = this.originalDetails

            const isSame = JSON.stringify(prevDetails) === JSON.stringify(newDetails)

            if (isSame) {
                this.message = 'no changes'
                
            } else {
                this.$store.dispatch('submitChanges', { 
                    details: newDetails, 
                    user: this.$store.state.user.uid                
                })
                this.message = 'changes saved'
                this.originalDetails = JSON.parse(JSON.stringify(newDetails))

            }

            this.saveClicked = true
            setTimeout(() => { 
                this.saveClicked = false, 
                this.message = 'changes saved'
            }, 
            2000
            )
        }
    },
    mounted() {
        this.originalDetails = JSON.parse(JSON.stringify(this.editProfileDetails))
    },

}

</script>

<style scoped>

.main-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;

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

.close-btn {
    position: absolute;
    font-size: 30px;
    cursor: pointer;
    right: 5px;
    user-select: none;
}


</style>