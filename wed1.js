let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let category = document.getElementById('category');
let count = document.getElementById('count');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp; // لحفظ رقم العنصر أثناء التعديل
function getTotal()
 {
    if (title.value != '' && price.value != '') {  // تحقق من أن العنوان والسعر موجودان
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value);
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

let maindata = [];

if (localStorage.getItem('products')) {
  maindata = JSON.parse(localStorage.getItem('products'));
}

submit.onclick = function () {
    let subdata = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value
    };
    if (mood === 'create') {
        
            maindata.push(subdata);
        }
     else {
        // تحديث المنتج
        maindata[tmp] = subdata;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    localStorage.setItem('products', JSON.stringify(maindata));
    clearInputs();
    show();
}

function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
}

function show() {
    let table = '';
    for (let i = 0; i < maindata.length; i++) 
      {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${maindata[i].title}</td>
                <td>${maindata[i].price}</td>
                <td>${maindata[i].taxes}</td>
                <td>${maindata[i].ads}</td>
                <td>${maindata[i].discount}</td>
                <td>${maindata[i].total}</td>
                <td>${maindata[i].count}</td>
                <td>${maindata[i].category}</td>
                <td><button onclick="update(${i})" class="btn-update">Update</button></td>
                <td><button onclick="delet(${i})" class="btn-delete">Delete</button></td>
            </tr>
        `;
      }
    document.getElementById('tbody').innerHTML = table;

    let deletall = document.getElementById('deletall');
    if (maindata.length > 0) {
        deletall.innerHTML = `<button onclick="deletall()">Delete All (${maindata.length})</button>`;
    } else {
        deletall.innerHTML = '';
    }
}

function delet(i) {
    maindata.splice(i, 1);
    localStorage.setItem('products', JSON.stringify(maindata));
    show();
}

function deletall() {
    localStorage.clear();
    maindata = [];
    show();
}

function update(i) {
    let data = maindata[i];
    title.value = data.title;
    price.value = data.price;
    taxes.value = data.taxes;
    ads.value = data.ads;
    discount.value = data.discount;
    category.value = data.category;
    getTotal();
    count.value = data.count;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i; // ← حفظ رقم المنتج المراد تعديله
   
}

show();
let searchmood = 'title';
/// هنا قمنا فقط تميز بين الزرين 
function searchfunc(id)
{
  let search =document.getElementById('search');
if( id == 'searchTitle'){
  
  searchmood = 'title';
}
else
{
  
  searchmood = 'category';
}
search.focus()
}
// هنا العمل الرسمي على خاصيه البحثf
function searchData(value) {
    let table = '';
    for (let i = 0; i < maindata.length; i++) {
        if (searchmood === 'title') {
            if (maindata[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${maindata[i].title}</td>
                        <td>${maindata[i].price}</td>
                        <td>${maindata[i].taxes}</td>
                        <td>${maindata[i].ads}</td>
                        <td>${maindata[i].discount}</td>
                        <td>${maindata[i].total}</td>
                        <td>${maindata[i].count}</td>
                        <td>${maindata[i].category}</td>
                        <td><button onclick="update(${i})" class="btn-update">Update</button></td>
                        <td><button onclick="delet(${i})" class="btn-delete">Delete</button></td>
                    </tr>
                `;
            }
        } else {
            if (maindata[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${maindata[i].title}</td>
                        <td>${maindata[i].price}</td>
                        <td>${maindata[i].taxes}</td>
                        <td>${maindata[i].ads}</td>
                        <td>${maindata[i].discount}</td>
                        <td>${maindata[i].total}</td>
                        <td>${maindata[i].count}</td>
                        <td>${maindata[i].category}</td>
                        <td><button onclick="update(${i})" class="btn-update">Update</button></td>
                        <td><button onclick="delet(${i})" class="btn-delete">Delete</button></td>
                    </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
