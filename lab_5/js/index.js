isRepeated = (value) => {
    let repeated = false;
    $(".todoItemText").each(function() {
        repeated |= ($(this).text() === value);
    })
    return repeated;
}

$(document).ready(function() {
    $(".submitButton").click(function(event) {
        event.preventDefault();
        if ($(".newTodo").val() !== "") {
            if (!isRepeated($(".newTodo").val())) {
                texto = $(".newTodo").val();
                var newElement = 
                `<div class="todoItemBox">
                    <input type = "checkbox" name="todo" class="todoItem"/><p class="todoItemText">${texto}</p>
                </div><br>`
                $(".listOfTodos").append(newElement);
            } else {
                alert("Error, you have already written this todo in the list.")
            }
            $(".newTodo").val('');
        }
    })

    $(".markAllButton").on("click", function(event) {
        event.preventDefault();
        $(".todoItem").prop("checked", true);
    })

    $(".clearButton").on("click", function(event) {
        event.preventDefault();
        $(".todoItem").prop("checked", false);
    })  

    $(".deleteButton").on("click", function(event) {
        event.preventDefault();
        result = window.confirm("Are you sure you want to erase the todo list?");
        if (result) {
            $(".listOfTodos").children().remove();
        }
    })
})