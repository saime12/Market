const title = document.getElementById('title')
const price = document.getElementById('price')
const description = document.getElementById('description')
const image = document.getElementById('image')
const addBtn = document.getElementById('button')
const postBtn = document.getElementById('postBtn')
const listingsDiv = document.getElementById('listings')
let user;

function toBase64(file) {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.onload = function () {
            resolve(reader.result)
        }
        reader.onerror = function () {
            reject("error reading file")
        }
        reader.readAsDataURL(file)
    })
}

if(addBtn) {
    addBtn.addEventListener('click', function() {
        window.location.replace("add.html")
    })
}

if(postBtn) {
    user = prompt("Enter your username")
    postBtn.addEventListener('click', async function() {
        if(title.value === "", price.value === "", description.value === "", image.value === "") {
            alert("fill inputs")
            return
        }
        else {
            await postData()
            window.location.replace("index.html")
        }    
    })
}

async function postData() {
    const Base64Image = await toBase64(image.files[0])

    const response = await fetch('https://tinkr.tech/sdb/db_Market', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        user: user,
        title: title.value ,
        price: price.value,
        description: description.value ,
        image: Base64Image
    })
    });
    const data = await response.json();
    console.log(data)
}

async function getData() {
    const response = await fetch('https://tinkr.tech/sdb/db_Market');
    const data = await response.json();
    console.log(data)
    return data
}

if(addBtn) {
    async function loop() {
        const data = await getData()
        for(const obj of data) {
            const newDiv = document.createElement("div")
            newDiv.classList.add("newDiv")
            listingsDiv.appendChild(newDiv)
            const h1 = document.createElement("h1")
            h1.classList.add("user")
            const span1 = document.createElement("span")
            const span2 = document.createElement("span")
            span2.classList.add("span2")
            span1.textContent = "User:"
            span2.textContent = obj.user
            h1.appendChild(span1)
            h1.appendChild(span2)
            newDiv.appendChild(h1)
            const h2 = document.createElement("h2")
            const span3 = document.createElement("span")
            const span4 = document.createElement("span")
            span4.classList.add("span2")
            span3.textContent = "Title:"
            span4.textContent = obj.title
            h2.appendChild(span3)
            h2.appendChild(span4)
            newDiv.appendChild(h2)
            const p1 = document.createElement("p")
            p1.classList.add("price")
            const span5 = document.createElement("span")
            const span6 = document.createElement("span")
            span6.classList.add("span2")
            span5.textContent = "Price:"
            span6.textContent = obj.price
            p1.appendChild(span5)
            p1.appendChild(span6)
            newDiv.appendChild(p1)
            const img = document.createElement("img")
            img.src = obj.image
            img.width = 400
            newDiv.appendChild(img)
            const p2 = document.createElement("p")
            p2.textContent = "Description"
            newDiv.appendChild(p2)
            const p3 = document.createElement("p")
            p3.textContent = obj.description
            p3.classList.add("description")
            newDiv.appendChild(p3)
            const buyBtn = document.createElement("button")
            buyBtn.innerText = "Buy"
            buyBtn.addEventListener('click', function() {
                
            })
            newDiv.appendChild(buyBtn)

        }
    }
loop()
}