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
                var newElement = `<div class="todoItemBox"><input type = "checkbox" name="todo" class="todoItem"/><p class="todoItemText">${texto}</p></div><br>`
                $(".listOfTodos").append(newElement);
            } else {
                alert("You are trying to insert a repeated elmenet, ARE U CRAzy¿¿")
            }
            $(".newTodo").val('');
        }
    })

    $("ul").on("click", ".checar", function(event) {
        event.preventDefault();
        ($(this).parent().hasClass("chec")?
        $(this).parent().removeClass("chec") : $(this).parent().addClass("chec"));
    })  

    $("ul").on("click", ".del", function(event) {
        event.preventDefault();
        $(this).parent().parent().remove();
    })
})