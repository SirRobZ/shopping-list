function main() {
  // set initial state
  var state = {
    items: []
  };

  // methods
  function init(state) {
    $('.shopping-item').each(function() {
    	var itemObj = {
    		name: $(this).text(),
    		checked: $(this).hasClass('shopping-item__checked')
    	}
      state.items.push(itemObj)
    });
  }

  function renderList(state, element) {
    //map through state.items array
    var htmlList = state.items.map(function(itemObj) {
	      //return html list item array
        return ('<li>' +
	          '<span class="shopping-item' + (itemObj.checked ? " shopping-item__checked" : "") + '">' + itemObj.name + '</span>' +
	          '<div class="shopping-item-controls">' +
		          '<button class="shopping-item-toggle">' +
		          	'<span class="button-label">check</span>' +
		          '</button>' +
		          '<button class="shopping-item-delete">' +
		          	'<span class="button-label">delete</span>' +
		          '</button>' +
	          '</div>' +
          '</li>')
      })
    //inject html list item array into shopping list ul
    $(element).html(htmlList);
  }

  function handleSubmit(state, form){
  	$(form).on('submit', function(event) {
  		event.preventDefault();
  		var newItem = $(form + ' #shopping-list-entry').val();
  		var itemObj = {
  			name: newItem,
  			checked: false
  		};
  		state.items.push(itemObj);
  		renderList(state, '.shopping-list');
  		$(form + ' #shopping-list-entry').val('');
  	})
  }

  function bindDeleteEvent(state){
  	$('.shopping-list').on('click', '.shopping-item-delete', function(event){
  		var itemIndex = $(this).closest('li').index();
  		state.items.splice(itemIndex, 1);
  		renderList(state, '.shopping-list');
  	})
  }

  function bindCheckEvent(state){
  	$('.shopping-list').on('click', '.shopping-item-toggle', function(event){
  		//toggle class shopping-item_checked
  		$(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
  	})
  }

  // execute
  init(state);
  bindDeleteEvent(state);
  bindCheckEvent(state);
  handleSubmit(state, '#js-shopping-list-form');
  renderList(state, '.shopping-list');


};

$(document).ready(main)

/*
TODO: 
- Prevent form from being submitted
- Push input value into state.items
- Re-render list
- Bind click event to delete button, which will remove
	element from state.items and re-render list.
- Bind click event to toggle button for shopping-item_checked class
*/
