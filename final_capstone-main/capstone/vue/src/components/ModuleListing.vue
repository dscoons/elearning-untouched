<template>
      <router-link class="module-listing" :key="module.id" :to="{name:moduleView, params: { courseId: module.courseId, moduleId: module.id }}"><span class="mName">{{ module.name }}</span> <span class="small mDescription hide-mobile">- {{ module.description }}</span></router-link>
</template>

<script>
export default {
    props: [ 'module' ],
    moduleView: 'student-module',
    created: function() {
        this.moduleView = (this.$store.state.user.authorities[0].name === "ROLE_ADMIN") ? 'teacher-module' : 'student-module';
    }
}
</script>

<style scoped>
    .module-listing {
        display: block;
        border: 1px solid #CCC;
        padding: 0.75rem 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        border-left: 7px solid #429cb9;
        text-decoration:none;
        color:#243e46;
    }
    .module-listing:hover {
        border-color:#666;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-left-color: #17b0e1;
    }
    .mName {
        font-weight:bold;
    }
    .grid .mDescription {
        display:none;
    }
    .grid .module-listing {
        text-align:center;
    }
</style>