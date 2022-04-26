// -----------------------------------------Thực hành 1-----------------------------------------

const stringReverse = (string) => {
    return string.split("").reverse().join("");
}

console.log(stringReverse('abcdef'))

// -----------------------------------------Thực hành 2-----------------------------------------

const deleteDublicate = (array) => {
    const newArray = []
    array.map((a) => {newArray.includes(a) ? "" : newArray.push(a)})
    return newArray;
}

console.log(deleteDublicate([1, 2, 3, 5, 4, 2, 6, 4]))

// -----------------------------------------Thực hành 3-----------------------------------------

const mostAppear2 = (array) => {
    const count = {}
    const returnObject = {}

    array.forEach((v) => {count[v] = (count[v]||0) + 1})

    let newObject = Object.entries(count)
    let numb = newObject[0][1];

    for (let i = 0; i < newObject.length - 1; i++) {
        if(newObject[i][1] > numb) {
            numb = newObject[i][1];
        }
    }

    for (let i in newObject) {
        if(newObject[i][1] == numb) {
            returnObject['value'] = newObject[i][0]
        }
    }
    returnObject['count'] = numb;

    return returnObject
}

console.log(mostAppear2([1, 2, 3, 5, 6, 4, 2, 1, 6, 3, 5, 3]))

//-----------------------------------------Thực hành 4-----------------------------------------

// Dữ liệu ban đầu
const Contact = [
    {
        name: 'Alice',
        phone: '(816)-403-5456'
    },
    {
        name: 'Bob',
        phone: '(572)-566-2397'
    },
    {
        name: 'Cris',
        phone: '(864)-309-4841'
    },
    {
        name: 'Daniel',
        phone: '(816)-403-5456'
    },
]

// Sắp xếp theo bảng chữ cái
const sortByName = (Arr) => {
    Arr.sort((a,b) => {return a.name == b.name ? 0 : (a.name > b.name) ? 1 : -1})
}


// Hiển thị dữ liệu ra màn hình
let list = document.getElementById('list')
const displayContact = (Arr) => {
    list.innerHTML = ''
    sortByName(Contact)
    Arr.forEach((value, index) => {
        let new_list = document.createElement('li')
        new_list.id = `new_${index}_list`
        new_list.classList.add('contact_list')
        list.appendChild(new_list)
    
        let contact_name = document.createElement('p')
        contact_name.innerText = value.name
        contact_name.classList.add('contact_name')
        new_list.appendChild(contact_name)
    
        let contact_phone = document.createElement('p')
        contact_phone.innerText = value.phone
        contact_phone.classList.add('contact_phone')
        new_list.appendChild(contact_phone)
    })
}
displayContact(Contact)

// Thêm mới danh bạ với tên và số điện thoại
let name_input = document.forms['contacts_form']['name']
let phone_input = document.forms['contacts_form']['phone']
let add_button = document.getElementById('add_button')

add_button.addEventListener('click', () => {
    if(name_input.value == '' || phone_input.value == '') {
        alert('Tên và Điện thoại không được bỏ trống!')
    } else {
        let new_contact = {}
        new_contact['name'] = name_input.value
        new_contact['phone'] = phone_input.value
        Contact.push(new_contact)
        displayContact(Contact)
        alert('Đã thêm!')
    }
})

//Tìm kiếm bằng tên hoặc số điện thoại
let search_input = document.forms['contacts_form']['search']
let find_button = document.getElementById('find_button')

find_button.addEventListener('click', () => {
    let value_search = search_input.value.toLowerCase().trim()
    let searchContact = Contact.filter(element => {
        return (element.name.toLowerCase()).includes(value_search) || element.phone.includes(value_search)
    })
    if(value_search == '') {
        search_input.placeholder = 'Bạn chưa nhập gì!'
        search_input.style.border = '1px solid red'
        find_button.style.backgroundColor = 'red'
        setTimeout(() => {
            search_input.placeholder = 'Tìm kiếm'
            search_input.style.border= '1px solid gray'
            find_button.style.backgroundColor = 'rgb(55, 88, 183)'
        }, 1000)
        displayContact(Contact)
    } else {
        displayContact(searchContact)
    }
})

//Xóa danh bạ bị trùng số điện thoại
let delete_dublicate_button = document.getElementById('delete_dublicate_button')

const deleteDublicateContact = (array) => {
    const newArray = []
    array.forEach(value => {
        let a = Object.entries(value) // => chuyển [{},{},{}] về dạng [[],[],[]]
        newArray.push(a);
    })

    newArray.forEach((value, index) => {
        let phone = value[1][1] // => sđt ứng với index hiện tại
        let dem = 0 // => biến đếm số lần trùng lặp sđt

        for(let i = index + 1; i < newArray.length; i++) { // => so sánh với những sđt phía sau index hiện tại
            if(newArray[i][1][1] == phone) {
                dem++ // => nếu trùng, biến đếm + 1
            }
        }

        for(let i = newArray.length - 1; i >= 0; i--) { // => cho for chạy ngược để xóa phần tử nằm sau 
            if(dem > 0 && newArray[i][1][1] == phone) { 
                newArray.splice(i, 1) // => tìm ra phần tử có sđt trùng lặp, xóa nó đi
                dem-- // => sau khi xóa, giảm biến đếm, khi biến đếm = 0, if() không còn thỏa mãn
            }
            if(dem == 0) {break} // => đếm = 0 thì break ra luôn
        }
    })

    array.splice(0, array.length) // => xóa hết phần tử trong array lưu dữ liệu
    newArray.forEach(value => {
        let newObject = {}
        newObject['name'] = value[0][1]
        newObject['phone'] = value[1][1]
        array.push(newObject) // => thêm phần tử đã lọc trùng vào array lưu dữ liệu
    })

}

delete_dublicate_button.addEventListener('click', () => {
    deleteDublicateContact(Contact)
    displayContact(Contact)
    alert('Đã xóa')
})