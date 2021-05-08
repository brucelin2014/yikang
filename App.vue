<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.status_new {
		color: #ef2929;
		/*red*/
	}
	.status_feedback {
		color: #C10066;
		/*purple*/
	}
	.status_acknowledged {
		color: #f57900;
		/*orange*/
	}
	.status_confirmed {
		color: #EEEE00;
		/*yellow*/
	}
	.status_assigned {
		color: #729fcf;
		/*blue*/
	}
	.status_resolved {
		color: #008800;
		/*green*/
	}
	.status_closed {
		color: #babdb6;
		/*grey*/
	}
	.status_all {
		color: #000000;
		/*red*/
	}
</style>
