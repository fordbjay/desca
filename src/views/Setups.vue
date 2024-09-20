<template>
    
    <profileHeader/>

    <p>SETUPS:</p>

    <label for="input" style="border: 1px solid;">
        {{!uploading ? 'upload' : uploadProgress}}
        <input
            id="input"
            type="file"
            @change="makeNewSetup"
            accept=".jpg, .jpeg, .png"
            style="display: none;"
            :disabled="uploading"
        >
    </label>

    <div 
        class="setup-links"
        v-for="(setup, index) in $store.state.setups"
        :key="setup.setupId"
        >
        <img
            style="width: 250px; height: 150px; object-fit: cover;"
            draggable="false"
            :src="setup.imageURL"
            :alt="setup.imageURL"  
        />
    </div>

</template>

<script>
import profileHeader from '../components/profile-header.vue'
import {uploadPic, downloadPic} from "../firebase/manage-pic.js"

export default {
    data() {
        return {
            uploading: false
        }
    },
    components: {
        profileHeader,
    },
    methods: {
        async makeNewSetup(event) {
            this.uploading = true

            const setupId = 'setup' + '-' + Date.now();
            const user = this.$store.state.user.uid         
            const key = `${user}/${setupId}`

            // UPLOAD PIC
            await uploadPic(key, event.target.files[0])
            const imageURL = await downloadPic(key)

            const setup = {    
                user,
                timeCreated: Date.now(),
                setupId,
                imageURL,
                items: []
            }

            this.$store.dispatch('addSetup', setup)

            this.uploading = false
        },
    },
    computed: {
        uploadProgress() {
            const uploadProgress = this.$store.state.uploadProgress

            if (this.uploading) {
                if (isNaN(uploadProgress)) {
                    return uploadProgress
                } else {
                    return uploadProgress + '%'
                } 
            }      
        }
    },  

}
</script>

<style scoped>

</style>
