const btn = document.querySelector('#btn');
const sidebar = document.querySelector('.sidebar');
const input = document.querySelector('#input');
const list = document.querySelector('.list-nav');
const li_list = list.children;
for (let li of li_list) {
	li.addEventListener('click', (e) => {
		for (let li of li_list) {
			if (li.classList.contains('active')) {
				li.classList.remove('active');
			}
		}
		li.classList.add('active');
	});
}
btn.onclick = () => {
	sidebar.classList.toggle('active');
	menuChange();
};
const menuChange = () => {
	if (sidebar.classList.contains('active')) {
		btn.classList.replace('bx-menu', 'bx-menu-alt-right');
	} else {
		btn.classList.replace('bx-menu-alt-right', 'bx-menu');
	}
};
