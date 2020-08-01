import productdb, {
    bulkcreate,getData,createEle
} from './module.js'



let db = productdb("Productdb",{
    products:`++id, name, seller, price`
})

//input tags
const userid = document.getElementById('userId')
const productname = document.getElementById('productName')
const seller = document.getElementById('seller')
const price = document.getElementById('price')

//buttons
const btncreate = document.getElementById('btn-create')
const btnread = document.getElementById('btn-read')
const btnupdate = document.getElementById('btn-update')
const btndelete = document.getElementById('btn-delete')


//notfound
const notfound = document.getElementById("notfound")

//insert values using button

btncreate.onclick = (event)=>{
    let flag = bulkcreate(db.products, {
        name:productname.value,
        seller:seller.value,
        price:price.value
    })
    // console.log(flag)
    productname.value = seller.value = price.value = "";
    getData(db.products, (data)=>{
        // console.log(data)
        userid.value = data.id +1 || 1
    });
    table();
    let insertmsg = document.querySelector(".insertmsg");
    getMsg(flag, insertmsg)
}

// update event
btnupdate.onclick = ()=>{
   const id =  parseInt(userid.value||0)
   if(id){
       db.products.update(id, {
           name: productname.value,
           seller: seller.value,
           price: price.value
       }).then((updated)=>{
        //    let get = updated?`Data updated`:`Couldent updated`
        let get = updated? true:false;
        let updatemsg = document.querySelector(".updatemsg")
        getMsg(get, updatemsg);
       })
   }

}

//delete records
btndelete.onclick = ()=>{
    db.delete();
    db = productdb("Productdb",{
        products:`++id, name, seller, price`
    })
    db.open()
    table()
    let deletemsg = document.querySelector(".deletmsg")
    getMsg(true, deletemsg)
}

// window onload event
window.onload = ()=>{
    textID(userid)
}

function textID(textboxid){
    getData(db.products, data=>{
        textboxid.value = data.id + 1|| 1;

    })
}

btnread.onclick = table;

function table(){
    const tbody = document.getElementById("tbody")

    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }
    getData(db.products, (data)=>{
        if(data){
            createEle("tr", tbody, tr=>{
                for(const value in data){
                    createEle("td",tr, td=>{
                        td.textContent = data.price === data[value]?`$${data[value]}`:data[value]
                    })
                }
                createEle("td", tr, td=>{
                    createEle("i", td, i=>{
                        i.className += "fas fa-edit btnedit"
                        i.setAttribute(`data-id`, data.id)
                        i.onclick = editbtn;
                    })
                })
                createEle("td", tr, td=>{
                    createEle("i", td, i=>{
                        i.className += "fas fa-trash btndelete"
                        i.setAttribute(`data-id`, data.id)
                        i.onclick = deletebtn;
                    })
                })
            })
        }else{
            notfound.textContent = "No record found in database"
        }
    })
}

function editbtn(event){
    let id = parseInt(event.target.dataset.id)
    db.products.get(id, data =>{
        userid.value = data.id||0
        productname.value = data.name||""
        seller.value = data.seller||""
        price.value = data.price||""
   })
}

function deletebtn(event){
    let id = parseInt(event.target.dataset.id);
    db.products.delete(id)
    table()
}

function getMsg(flag, element){
    if(flag){
        element.className+="movedown"

        setTimeout(()=>{
            element.classList.forEach(classname =>{
                classname == "movedown"? undefined:element.classList.remove("movedown")
            });
        },4000);
    }
}