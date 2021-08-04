//search for table
$(document).ready(function(){
    $("#search-table").on("keyup",function(){
        var value=$(this).val().toLowerCase();
        $(".tableitem").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value)>-1)
        })
    })
})

//search for menu
$(document).ready(function(){
    $("#search-menu").on("keyup",function(){
        var value=$(this).val().toLowerCase();
        $("#items h4").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value)>-1)
        })
    })
})


function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev,target) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(target.id);
    console.log(data);
    let item=document.getElementById(data).textContent;
    console.log(target.id);
    var setTableId=target.id.replace('able','');
    var vals=item.split(" Rs-");
    console.log(vals);
    let itemcount=1;
    var itemexists=false;
    let tbodies=document.getElementById(setTableId).getElementsByTagName("tbody");
    console.log(tbodies);
    console.log(tbodies.length);
    for(var i=0;i<tbodies.length;i++){
        let tr=tbodies[i].children[0];
        let itemname=tr.children[0].textContent;
        console.log(itemname);
        if(itemname==vals[0]){
            itemexists=true;
            inputId=setTableId+"i"+(i+1); 
            console.log("inputid",inputId)
            console.log("inputid",document.getElementById(inputId));
            let quantity=parseInt(document.getElementById(inputId).value)+1;
            tr.children[2].innerHTML=`<input type="number" id=${inputId} value=${quantity}  min='1' max='10' onChange="setQuantity(this); calculateTotal('${setTableId}'); ">`
            break;
        } 
    }   
    let quantity=1;
    let inpId=setTableId+"i"+document.getElementById(setTableId).rows.length; 
    
    if(itemexists==false){
        console.log(document.getElementById(setTableId).innerHTML);
        document.getElementById(setTableId).innerHTML+=`<tr><td>${vals[0]}</td><td>${vals[1]}</td><td><input type="number" id=${inpId} value=${quantity}  min='1' max='10' onChange="setQuantity(this); calculateTotal('${setTableId}'); "></td><td><a onclick="deleteItem(this,'${setTableId}')"><div class="w3-padding w3-xlarge w3-text-black">
        <i class="material-icons">delete</i>
        </div></a></td></tr>`;
        total=calculateTotal(setTableId);
        document.getElementById("total_"+setTableId).innerHTML=`${total}`;
    }
    var itemsId="items"+setTableId;
    var noOfItems=document.getElementById(setTableId).rows.length-1;
    document.getElementById(itemsId).innerHTML=`Items : ${noOfItems}`;
    calculateTotal(setTableId);
  }
  function deleteItem(element,id){
    element.parentElement.parentElement.parentElement.remove();
    calculateTotal(id);
}

  function showTable(id){
    
    console.log(id);
    const table=document.getElementById("table"+id.slice(1));
    table.style.backgroundColor='green';
    const modal = document.querySelector('#my-modal-'+id);
    modal.style.display = 'block';
    
}
 function closeTable(id){
    console.log(id);
    const table=document.getElementById("table"+id.slice(1));
    table.style.backgroundColor='white';
    const modal = document.querySelector('#my-modal-'+id);
    modal.style.display = 'none';
 }
 function resetTable(id){
    alert("The total bill is "+calculateTotal(id));
    document.getElementById(id).innerHTML=`<thead><tr>
    <th>Item</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>delete</th>
    </tr></thead>`
    calculateTotal(id);
    let viewId="view"+id.slice(1);
    let bId="reset"+id.slice(1);
    document.getElementById(bId).style.display='block';
    document.getElementById(viewId).style.display='block';
    const modal = document.querySelector('#my-modal-'+id);
    modal.style.display = 'none';
    const table=document.getElementById("table"+id.slice(1));
    table.style.backgroundColor='white';

 }
 function setQuantity(element){
    let quantity=element.value;
    if(quantity<0 || quantity>10){
        alert("Minimum order 1 and Maximum orders is 10");
        element.defaultValue=1;
        element.value=1;
    }
    else{
    element.defaultValue=quantity;
    }
    console.log(element);
} 
 function calculateTotal(tableId) {
    var totalId="total"+tableId;
    var total=0;
    var Rows=document.getElementById(tableId).rows;
    var noOfItems=Rows.length-1;
    for(let k=1;k<Rows.length;k++){
    
        let inputId=Rows[k].children[2].children[0].id;
        let price=parseInt(Rows[k].children[1].textContent);
        total+=price*parseInt(document.getElementById(inputId).value);
    }
    var itemsId="items"+tableId;
    document.getElementById(itemsId).innerHTML=`Items : ${Rows.length-1}`
    document.getElementById(totalId).innerHTML=`Total : ${total}`;
    totalID="total_"+tableId;
    document.getElementById(totalID).innerHTML=`<b>Total :</b> ${total}`;
    return total;
 }
