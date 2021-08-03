

jsonT=[{"name":"TABLE-1"},{"name":"TABLE-2"},{"name":"TABLE-3"}]


jsonMenu=[
{"id":"0","name":"Biryani","price":"310"},
{"id":"1","name":"Manchuria","price":"200"},
{"id":"2","name":"Chicken Curry","price":"210"},
{"id":"3","name":"Panner Butter Masala","price":"180"},
{"id":"4","name":"Curd Rice","price":"100"},
{"id":"5","name":"Prawns Fry","price":"160"},
{"id":"6","name":"Chicken Fry","price":"150"},
{"id":"7","name":"Egg Rice","price":"150"},
{"id":"8","name":"Burger","price":"150"},
]


  window.onload = ()=>{
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];



    var cloneMenu=document.getElementsByTagName('ul')[0];
    console.log("I am Lavanya")
    var cloneMenuno=cloneMenu.getElementsByTagName('li')[0].cloneNode('true');
    for(var i=0;i<3;i++){
    var dyn_Menu=document.createElement('li');
    dyn_Menu.innerHTML=cloneMenuno.innerHTML;
    dyn_Menu.setAttribute('id',"tb"+i);
    dyn_Menu.getElementsByTagName("p")[0].innerHTML=jsonT[i].name;
    dyn_Menu.getElementsByTagName("p")[1].setAttribute('id',"to"+i);
    dyn_Menu.getElementsByTagName("p")[2].setAttribute('id',"bl"+i);
    dyn_Menu.classList.add("table");
    dyn_Menu.classList.add("search1");
    cloneMenu.appendChild(dyn_Menu);
    dyn_Menu.addEventListener('dragover',function(event){
         event.preventDefault();
        event.stopPropagation();
    });

    dyn_Menu.addEventListener('click',function(e) {
        modal.style.display = "block";
        populateModal(e.target.id.substring(2));
    });

    dyn_Menu.addEventListener('drop',function(event){
        event.preventDefault();
        event.stopPropagation();
        var itemIdString = event.dataTransfer.getData('text');
        var itemId = itemIdString.substring(2);
        console.log(itemIdString);
        var tableIdString = event.target.id;
        console.log(tableIdString)
        var tableId = tableIdString.substring(2);
        console.log("HIII DROPED");
        
        addItem(tableId,itemId);
        updateTable(tableId);


    });

}

var cloneMenu=document.getElementsByTagName('ul')[1];
    console.log("I am Lavanya")
    var cloneMenuno=cloneMenu.getElementsByTagName('li')[0].cloneNode('true');
    for(var i=0;i<9;i++){
    var dyn_Menu=document.createElement('li');
    dyn_Menu.innerHTML=cloneMenuno.innerHTML
    dyn_Menu.setAttribute('id',"it"+i);
    dyn_Menu.setAttribute('draggable',true);
    dyn_Menu.getElementsByTagName("p")[0].innerHTML=jsonMenu[i].name;
    dyn_Menu.getElementsByTagName("p")[1].innerHTML=jsonMenu[i].price;
    dyn_Menu.classList.add("menu","search1");
    dyn_Menu.addEventListener('dragstart',function(){
        event.dataTransfer.setData('text', event.target.id);
        console.log("DRAG START");
    });
    cloneMenu.appendChild(dyn_Menu);

}


}


jsonTable=[[],[],[],[]]











function addItem(tableId, itemid){
  var tableLength = jsonTable[tableId].length;  
  if(jsonTable[tableId].length!==0){
    for(var i=0; i<jsonTable[tableId].length; i++){
      if(jsonTable[tableId][i].id===itemid){
        jsonTable[tableId][i].quantity++;
        break;
      }
      else if(i===tableLength-1){
        var itemName;
        var itemPrice;
        var itemQuantity = 1;
        for(var cell in jsonMenu){
          if(jsonMenu[cell].id===itemid){
            itemName = jsonMenu[cell].name;
            itemPrice = jsonMenu[cell].price;
          }
        }
        var jsonString = "{\"id\":\""+itemid+"\",\"name\":\""+itemName+"\",\"price\":\""+itemPrice+"\",\"quantity\":\""+itemQuantity+"\"}";
        var jsonObj = JSON.parse(jsonString);
        jsonTable[tableId].splice(jsonTable[tableId].length,0,jsonObj); 
        break;
      }
    }
  } 
  else{
    var itemName;
    var itemPrice;
    var itemQuantity = 1;
    for(var cell in jsonMenu){
      if(jsonMenu[cell].id===itemid){
        itemName = jsonMenu[cell].name;
        itemPrice = jsonMenu[cell].price;
      }
    }
    var jsonString = "{\"id\":\""+itemid+"\",\"name\":\""+itemName+"\",\"price\":\""+itemPrice+"\",\"quantity\":\""+itemQuantity+"\"}";
    var jsonObj = JSON.parse(jsonString);
    jsonTable[tableId].splice(itemid,0,jsonObj);
  }
}




function updateTable(tableId){
  var tablePrice = 0;
  var tableItems = 0;
  
  for(var cell in jsonTable[tableId]){    
    tablePrice += parseInt(jsonTable[tableId][cell].quantity)*parseInt(jsonTable[tableId][cell].price);
    tableItems += parseInt(jsonTable[tableId][cell].quantity);    
  }
  var totalItems=document.getElementById("to"+tableId);
  var bill=document.getElementById("bl"+tableId);
  totalItems.textContent="Total-Items:"+tableItems;
  bill.textContent="Total-Price"+tablePrice;
}















function tableSearch() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search_table');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myul");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("p")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function itemSearch() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search_menu');
  filter = input.value.toUpperCase();
  ul = document.getElementById("itemlist");
  li = ul.getElementsByTagName('li');

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("p")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}





var menu=document.getElementsByClassName("menu");
var table=document.getElementsByClassName("table");


var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var modalTable= document.getElementsByTagName('table')[1];
for(var i=0; i<table.length; i++){
        table[i].addEventListener('click',function(e) {
        modal.style.display = "block";
        populateModal(e.target.id.substring(2));
    });
}


var cloned = modalTable.getElementsByTagName('tr')[0].cloneNode('true');

function populateModal(tableId){
    var tablenum = parseInt(tableId)+1;
    modal.getElementsByTagName('h2')[0].innerHTML = "Table-"+tablenum+" | Order Details";
    modal.getElementsByClassName('modal-footer')[0].getElementsByTagName('span')[0].id='mf'+tableId;
    var rows = modalTable.getElementsByTagName('tr');
    var rowsLength = rows.length;
    document.getElementsByClassName('modal-footer')[0].style.display = '';
    while(rowsLength--){
        if(rows[rowsLength].style.display!=='none' && rowsLength!=0)
        modalTable.removeChild(rows[rowsLength]);
    } 
    
    for(var i=0; i<jsonTable[tableId].length; i++){
        var clone = document.createElement('tr');
        clone.innerHTML = cloned.innerHTML;
        clone.setAttribute('id', 'rw'+jsonTable[tableId][i].id);
        var cellsTable = clone.getElementsByTagName('td');
        cellsTable[1].innerHTML = jsonTable[tableId][i].name;
        cellsTable[2].innerHTML = jsonTable[tableId][i].price;
        clone.getElementsByTagName('input')[0].value = jsonTable[tableId][i].quantity;
        clone.getElementsByTagName('input')[0].addEventListener('blur',function(e){

      var modalRows = modal.getElementsByTagName('tr');
  for(var i=0; i<modalRows.length; i++){
    if(modalRows[i].style.display==='none')
        continue;
    else{
        for(var j=0; j<jsonTable[tableId].length; j++){
          if(jsonTable[tableId][j].id===modalRows[i].id.substring(2)){
            jsonTable[tableId][j].quantity = modalRows[i].getElementsByTagName('input')[0].value;
            break;
          }
        }
        updateTable(tableId);       
      }
    }

  var tablePrice = 0;
  for(var cell in jsonTable[tableId]){
    tablePrice += parseInt(jsonTable[tableId][cell].quantity)*parseInt(jsonTable[tableId][cell].price);
  }
  console.log(tablePrice);
  modal.getElementsByTagName("h3")[0].innerHTML="Total : "+tablePrice;

    });
        clone.getElementsByTagName('i')[0].addEventListener('click', function(e){
            jsonTable[tableId].splice(jsonTable[tableId][e.target.parentNode.parentNode.id],1,);
            populateModal(tableId);
            updateTable(tableId);
            var tablePrice = 0;
  for(var cell in jsonTable[tableId]){
    tablePrice += parseInt(jsonTable[tableId][cell].quantity)*parseInt(jsonTable[tableId][cell].price);
  }
  console.log(tablePrice);
  modal.getElementsByTagName("h3")[0].innerHTML="Total : "+tablePrice;
        });
        clone.style.display = "";
        modalTable.appendChild(clone);
    }

    span.onclick = function() {
    var modalRows = modal.getElementsByTagName('tr');
    for(var i=0; i<modalRows.length; i++){
        if(modalRows[i].style.display==='none')
                continue;
        else{
                for(var j=0; j<jsonTable[tableId].length; j++){
                    if(jsonTable[tableId][j].id===modalRows[i].id.substring(2)){
                        jsonTable[tableId][j].quantity = modalRows[i].getElementsByTagName('input')[0].value;
                        break;
                    }
                }
                updateTable(tableId);               
            }
        }
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            var modalRows = modal.getElementsByTagName('tr');
        for(var i=0; i<modalRows.length; i++){
            if(modalRows[i].style.display==='none')
                    continue;
            else{
                    for(var j=0; j<jsonTable[tableId].length; j++){
                        if(jsonTable[tableId][j].id===modalRows[i].id.substring(2)){
                            jsonTable[tableId][j].quantity = modalRows[i].getElementsByTagName('input')[0].value;
                            break;
                        }
                    }
                    updateTable(tableId);               
                }
            }
            modal.style.display = "none";
        }
    }
    //calculating price of table's items
var tablePrice = 0;
  for(var cell in jsonTable[tableId]){
    tablePrice += parseInt(jsonTable[tableId][cell].quantity)*parseInt(jsonTable[tableId][cell].price);
  }
  console.log(tablePrice);
  modal.getElementsByTagName("h3")[0].innerHTML="Total : "+tablePrice;
    
}




modal.getElementsByClassName('modal-footer')[0].getElementsByTagName('span')[0].addEventListener('click', function(e){              
        var tableId = e.target.id.substring(2);
        var modalRows = modal.getElementsByTagName('tr');
        for(var i=0; i<modalRows.length; i++){
            if(modalRows[i].style.display==='none')
                    continue;
            else{   
                    for(var j=0; j<jsonTable[tableId].length; j++){
                        if(jsonTable[tableId][j].id===modalRows[i].id.substring(2)){
                            jsonTable[tableId][j].quantity = modalRows[i].getElementsByTagName('input')[0].value;
                            break;
                        }
                    }
                                    
            }
        }
        populateModal(tableId);
        var tabnum = parseInt(tableId)+1;
        modal.getElementsByTagName('h2')[0].innerHTML = 'Table:'+tabnum+" | Bill Details";
        var rows = modalTable.getElementsByTagName('tr');
        var rowsLength = rows.length;
        while(rowsLength--){
            if(rows[rowsLength].style.display!=='none')
            modalTable.removeChild(rows[rowsLength]);
        }
        
        for(var i=0; i<jsonTable[tableId].length; i++){
            var clone = document.createElement('tr');
            clone.innerHTML = cloned.innerHTML;
            var cellsTable = clone.getElementsByTagName('td');
            cellsTable[1].innerHTML = jsonTable[tableId][i].name;
            cellsTable[2].innerHTML = jsonTable[tableId][i].price;
            cellsTable[3].innerHTML = jsonTable[tableId][i].quantity+' qty.';
            cellsTable[4].innerHTML = "";
            clone.style.display = "";
            modalTable.appendChild(clone);
        }
        document.getElementsByClassName('modal-footer')[0].style.display = 'none';
        span.onclick = function(){
            var tablen = jsonTable[tableId].length;
            while(tablen--){
                jsonTable[tableId].splice(tablen,1,);
            }
            
            updateTable(tableId);
            modal.style.display = 'none';
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                var tablen = jsonTable[tableId].length;
                while(tablen--){
                    jsonTable[tableId].splice(tablen,1,);
                }
                
                updateTable(tableId);
                modal.style.display = "none";
            }
        }       
    });
