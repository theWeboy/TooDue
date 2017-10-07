/**
 * Created by Deepak on 02-10-2017.
 */

var todoList = localStorage.getItem('todo');
    if(!todoList) {
        todoList = [];
        localStorage.setItem('todo', JSON.stringify(todoList));
    }

function Reset(el) {
    todoList[el.id].done = el.checked;
    localStorage.setItem('todo',JSON.stringify(todoList));
}

function Colr(element,ide) {
        console.log("Colr function called");
    if(todoList[ide].done===true){
        element.style.backgroundColor = "palegreen";
    }
    else  element.style.backgroundColor = "bisque";
}

$(function () {

    $("#addbtn").click(function () {
        let frm = $('#addform').val();
        let head = $('#heading').val();
        let desc = $('textarea#description').val();
        let date = $('#ddate').val();
        let pri = $('#priority').val();
        todoList.push(
            {
                id : 0,
                head : head,
                desc : desc,
                date : date,
                pri : pri,
                done : false
            }
        );
        localStorage.setItem('todo',JSON.stringify(todoList));
        refreshList();
    });
    refreshList();

    function refreshList() {
        todoList = JSON.parse(localStorage.getItem('todo'));
        let output = '';
        for (var i=0; i<todoList.length; i++){
            heading = todoList[i].head;
            todoList[i].id = i;

            output += `
            <div id="list">
                <div class = "col-md-8 animated fadeIn " id="cont" onload="Colr(this,${todoList[i].id})" style="margin-bottom: 10px;min-height: 56px">
                    <div class="header animated fadeInDown" style=" padding-left: 10px">
                        <h3 class="header" style="cursor: pointer">${todoList[i].head}<i class="fa fa-chevron-down" style="font-size: 13px;margin-left: 8px" aria-hidden="true"></i></h3>
                    </div>
                    <div class="content" style="padding-left: 20px">
                    <hr style="height: 1px; background-color: #888">
                        <p><span style="font-family: Poppins"><strong>Description : </strong></span> ${todoList[i].desc} </p>
                        <p><span style="font-family: Poppins"><strong>DueDate : </strong></span> ${todoList[i].date} </p>
                        <p><span style="font-family: Poppins"><strong>Priority : </strong></span> ${todoList[i].pri} </p>
                    </div>
                </div>  
                              
                <div class="col-md-2 collapsible collapsed animated fadeInDown" style="min-height:28px; padding-top: 9px;text-align: center">
                    <a class="del-anch"></a><i class="fa fa-trash-o del-icon" id="${todoList[i].id}" aria-hidden="true"></i>
                </div>
                <div class="col-md-2 collapsible collapsed animated fadeInDown" style="min-height:28px; padding-top: 12px;text-align: center">
                    <input type="checkbox" ${todoList[i].done? "checked": "" } onchange="Reset(this)" class="manager" id="${todoList[i].id}" />
                    <label for="manager"></label>
                </div>
            </div>
            
            `;
        }
            $("#td").append(output);
    }

    $(".manager").click(function () {
        let id1 = $(this).attr('id');
        console.log(id1);
        console.log($(this).parent().parent().children(':first-child'));
        $cont = $(this).parent().parent().children(':first-child');
        if (this.checked){
            todoList[id1].done = true;
            localStorage.setItem('todo', JSON.stringify(todoList));
            $cont.css("background-color","palegreen");
        }
        else $cont.css("background-color","bisque");
        console.log(todoList[id1].done);
    });

    $(".header").click(function () {
        $header = $(this);        
        $content = $header.next();
        $content.slideToggle(500, function () {
            $header.css({"font-family": "Poppins","font-size":"24px","font-weight": "500","line-height" : "1.1","color": "inherit","margin-top":"20px"});
        });
    });

    $('.del-icon').click(function(){
        let idee = $(this).attr('id');
        console.log(idee);
        console.log(todoList);
        todoList.splice(idee,1);
        for(var k = 0; k<todoList.length; k++){
            console.log(todoList[k]);
        }
        localStorage.setItem('todo', JSON.stringify(todoList));
        $ele = $(this).parent().parent();
        $ele.fadeOut(300,function () {
            $(this).remove();
        });

    });
});
