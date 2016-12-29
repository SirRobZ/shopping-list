var state = {
	items: []
};

function main() {
	// store all jQuery elements needed
	function storeItems(state, cartItem) {
		cartItem.each(function(index) {
			var itemObject = {};
			itemObject['name'] = $(this).text();
			if ($(this).hasClass('shopping-item__checked')) {
				itemObject['checked'] = true;
			} else {
				itemObject['checked'] = false;
			}
			state.items.push(itemObject);
		})
	}

	// input, form, ul (that contains the list items), 
	function addItem(state, item) {
		var newObject = {
			name: item,
			checked: false
		}
		state.items.push(newObject);
	}

	function attachEventHandlers() {
		$('.shopping-list').on('click', '.shopping-item-delete', function(event) {
			var deleteIndex = $(event.target).closest('li').index();
			state.items.splice(deleteIndex, 1);
			renderList(state, $('.shopping-list'));
		})
		$('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
			var checkIndex = $(event.target).closest('li').index();
			state.items[checkIndex].checked = !state.items[checkIndex].checked;
			renderList(state, $('.shopping-list'));
		})
	}

	function initFormHandler() {
		$('#js-shopping-list-form').submit(function(event) {
		event.preventDefault();
		addItem(state, $('input[name=shopping-list-entry]').val());
		renderList(state, $('.shopping-list'));
		$('input[name=shopping-list-entry]').val(''); 
		})
	}

	var renderList = function(state, element){
		var itemsHTML = state.items.map(function(item) {
			return ('<li>' +
        '<span class="shopping-item' + (item.checked ? ' shopping-item__checked' : '') +'">' + item.name + '</span>' +
        '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
				'</li>');
		});

		element.html(itemsHTML);
	};

	//run on startup
	storeItems(state, $('.shopping-item'));
	renderList(state, $('.shopping-list'));
	initFormHandler();
	attachEventHandlers();
}

$(document).ready(main);