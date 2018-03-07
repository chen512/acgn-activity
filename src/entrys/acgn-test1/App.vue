<template>
<div id="app" class="app">
</div>
</template>
<script>
    import Vue from 'vue';
    import 'style/common.less';
    import logger from 'common/logger';
    import util from 'common/util';
    import NativeInterface from 'common/nativeinterface';
    import Enum from 'common/enum';
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
            }
        },
        beforeMount() {
            if(process.env.NODE_ENV == 'production' && !(parent && parent._is_preview)) {
                logger.makeActivityLog('activity_page_skim');
                NativeInterface.on(Enum.INTERFACE_EVENT.LOGIN, ()=> {
                    window.location.reload();
                });
                NativeInterface.on(Enum.INTERFACE_EVENT.LOGOUT, ()=> {
                    window.location.reload();
                });
            }
        },
        components: {}
    }
</script>