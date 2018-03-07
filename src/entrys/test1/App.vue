<template>
    <div id="app" class="app">
        <div @click="getData()">123123123</div>
        <div>{{this.data}}</div>
    </div>
</template>
<script>
    import Vue from 'vue';
    // import 'style/common.less';
    import axios from 'axios';
    if(process.env.NODE_ENV != 'production') {
        window.__ACTIVITY_ID__ = 100;
        window.__ACTIVITY_CONFIG__ = {
            __AWARDS__: [],
            __TASKS__: [],
            __APPS__: [],
            __ZIPPOS__: []
        }
    }
    Vue.use({
        install(vue) {
            vue.__STORE__ = ({});
            vue.__META__ = ({});
            vue.__REQ_ENV__ = process.env.NODE_ENV != 'production' ? '/mock' : '';
        }
    });
    export default {
        name: 'App',
        $global: true,
        data: function() {
            return {
                data:''
            }
        },
        beforeMount() {

        },
        components: {},
        methods: {
            getData(){
                axios.get(`https://app.lishijie.net/bizLog/viewRecord?token=0&contentId=0`, {}).then((res)=>{console.log(res);this.data = res.code;});
            }
        }
    }
</script>