<template>
    <div class="dashboard">
        <div id="heading-bg">
            <h1 class="dashboard-title">{{ $store.state.user.fullname }} - Teacher Dashboard</h1>
        </div>
        <main id="dashboard-content">
            <div id="content">
                <h2>My Courses</h2>
                <section id="courses">
                    <course-listing :course="course" v-for="course in courses" :key="course.courseId" />
                </section>
                <button @click="focusCreateForm" class="add"><img class="icon invert" src="../assets/add.svg" /> Create Course</button>
                <div class="accordion" :class="{ hide: hideAddClassForm }">
                    <div @click="successMsg = ''" v-show="successMsg != ''" class="alert alert-success">{{ successMsg }} </div>
                    <div @click="errorMsg = ''" v-show="errorMsg != ''" class="alert alert-error">{{ errorMsg }} </div>
                    <h3>Create New Course</h3>
                    <form @submit.prevent="createClass" class="flex-column">
                        <div>
                            <label for="name">Name:</label>
                            <input id="name" ref="courseName" type="text" class="form-control" v-model="newCourse.name" placeholder="Course Name" required />
                        </div>
                        <div>
                            <label for="description">Description:</label>
                            <textarea id="description" class="form-control" v-model="newCourse.description" placeholder="Course Description" required></textarea>
                        </div>
                        <div>
                            <label for="difficulty">Difficulty:</label>
                            <select id="difficulty" class="form-control" v-model="newCourse.difficulty" required>
                                <option value="">Please choose an option</option>
                                <option value="beginner">Beginner</option>
                                <option value="easy">Easy</option>
                                <option value="moderate">Moderate</option>
                                <option value="hard">Hard</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                        <div class="button-bar">
                            <button v-on:click="cancelForm" type="button">Cancel</button>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <section>
                <div id="notifications-column">
                    <h3 class="underline">Latest Activity</h3>
                    <div id="notifications-list">
                        <div>
                            <span class="sName">4 submissions</span> in <span class="lName">Development Tools</span>
                        </div>
                        <div>View All Submissions</div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import courseService from '../services/CourseService.js'
import CourseListing from '../components/CourseListing.vue'
export default {
    data() {
        return {
             courses: [],
             hideAddClassForm: true,
             newCourse: {
                 teacher_id: this.$store.state.user.id,
                 name: '',
                 description: '',
                 difficulty: '',
                 cost: 0.00,
             },
             successMsg: '',
             errorMsg: '',
        }
    },
    computed: {
        userFirstName() {
            const username = this.$store.state.user.username;
            const firstName = username
            return firstName;
        },
    },
    created: function() {
        this.courses = courseService.getCoursesForUser().then(response => {
            if (response.status === 200) {
                this.courses = response.data;
            }
        });
        //console.log(this.courses);
    },
    components: {
        CourseListing,
    },
    methods: {
        focusCreateForm() {
            this.hideAddClassForm = !this.hideAddClassForm;
            if (!this.hideAddClassForm) {
                this.$refs.courseName.focus();
            }
        },
        cancelForm() {
            this.clearForm();
            this.hideAddClassForm = true;
        },
        clearForm() {
            //this.hideAddClassForm = true;
            this.newCourse.name = '';
            this.newCourse.description = '';
            this.newCourse.difficulty = '';
        },
        createClass() {
            courseService.createCourse(this.newCourse).then(response => {
                if (response.status === 201 || response.status === 200) {
                    this.successMsg = "Course Created Successfully.";
                    this.courses.push(response.data);
                    this.clearForm();
                    // COMMIT course to store
                } else {
                    this.errorMsg = "There was an error creating the course.";
                }
            });
        }
    }
};
</script>

<style scoped>
    #courses {
        display:flex; 
        flex-wrap:wrap;
        gap:12px; 
    }
    button img.icon { width: 25px; margin-right:0.25rem; margin-top:-2px; margin-left:-7px; }
    #notifications-column h3 {
        line-height:1.6;
    }
    #notifications-list {
        font-size:0.9rem;
    }

    #notifications-list div {
        border-bottom:1px solid #CCC;
        padding-bottom:12px;
        margin-bottom:12px;
        color:#888;
    }

    #notifications-list div:last-child {
        border-bottom:0;
    }

    .sName, .lName {
        /* font-weight:bold; */
        color:#444;
    }
</style>