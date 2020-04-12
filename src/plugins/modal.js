export default {
	install(Vue) {
		Vue.prototype.$createModal = function (options) {
			const modal = document.createElement('div')
			modal.classList.add('vmodal')
			modal.classList.add('vmodal')
			modal.setAttribute('data-close', true)
			modal.insertAdjacentHTML('afterbegin', `
					<div class="vmodal__wrapper">
						<div class="vmodal__content">
							<div class="vmodal__header">
								<button class="vmodal__close" data-close="true">&times;</button>
							</div>
							<div class="vmodal__body">
								<p>${options.title}</p>
							</div>
							<div class="vmodal__footer">
								<button class="ok" data-ok="true">Ok</button>
								<button class="cancel" data-close="true">Cancel</button>
							</div>
						</div>
					</div>
				`)
			document.body.appendChild(modal)
			return modal
		};
		Vue.prototype.$modal = function (options, handler, targetId) {
			let modal = this.$createModal(options)
			const ANIMATION_SPEED = 500
			let modalMethods = {
				open() {
					setTimeout(() => {
						modal.classList.add('open')

					}, 100)
				},
				close() {
					modal.classList.remove('open')
					modal.classList.add('hide')
					setTimeout(() => {
						modal.classList.remove('hide')
						modalMethods.destroyed()
					}, ANIMATION_SPEED)
				},
				destroyed() {
					modal.remove()
				}
			}
			modal.addEventListener('click', function (event) {
				if (event.target.dataset.close) {
					modalMethods.close()
				} else if (event.target.dataset.ok) {
					event.stopPropagation()
					handler(targetId)
					modalMethods.close()
				}
			})
			return modalMethods
		};
	}
};
