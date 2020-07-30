import productdb, {
    bulkcreate
} from './module.js'



productdb("Productdb",{
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

//insert values using button

btncreate.onclick = (event)=>{
    let flag = bulkcreate(db.products, {
        name:productname.nodeValue,
        seller:seller.nodeValue,
        price:price.value
    })
    console.log(flag)
}


