const addBtn = document.getElementById('button')

if(addBtn) {
    addBtn.addEventListener('click', function() {
        window.location.replace("add.html")
    })
}

const postBtn = document.getElementById('postBtn')

if(postBtn) {
    postBtn.addEventListener('click', async function() {
        if(title.value === "", price.value === "", description.value === "", image.value === "") {
            alert("fill inputs")
        }
        else {
            window.location.replace("index.html")
            postData()
        }    
    })
}

const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const image = document.getElementById('image')

async function postData() {
    const response = await fetch('https://tinkr.tech/sdb/db_newMarket', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        user: 'John',
        title: title.value ,
        price: price.value,
        description: description.value ,
        image: image.value
    })
    });
    const data = await response.json();
    console.log(data)
}

async function getData() {
    const response = await fetch('https://tinkr.tech/sdb/db_newMarket');
    const data = await response.json();
    return data
}

const listingsDiv = document.getElementById('listings')

async function addToPage() {
    const data = await getData()
    console.log(data[3].price)
}
addToPage()