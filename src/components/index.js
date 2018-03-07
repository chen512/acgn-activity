import Dialog from './base/Dialog.vue';
import SnackBar from './base/SnackBar.vue';
import Vue from 'vue';

var install = function() {
	Vue.component(Dialog.name, Dialog);
	Vue.component(SnackBar.name, SnackBar);
}

export default {
	install
}