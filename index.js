const books = [
	{
		id: "1",
		title: `Apple. Эволюция компьютера`,
		author: `Владимир Невзоров`,
		img: `https://bukva.ua/img/products/449/449532_200.jpg`,
		plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
	},
	{
		id: "2",
		title: `Как объяснить ребенку информатику`,
		author: `Кэрол Вордерман`,
		img: `https://bukva.ua/img/products/480/480030_200.jpg`,
		plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
	},
	{
		id: "3",
		title: `Путь скрам-мастера. #ScrumMasterWay`,
		author: `Зузана Шохова`,
		img: `https://bukva.ua/img/products/480/480090_200.jpg`,
		plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
	},
];
localStorage.setItem('books', JSON.stringify(books))

const root = document.querySelector('#root')
console.log(root)



const left_box = document.createElement('div')
const right_box = document.createElement('div')
root.appendChild(left_box)
root.appendChild(right_box)
root.firstElementChild.className = "left_box"
root.lastElementChild.className = "right_box"

const rightDiv = document.querySelector('.right_box')
const heading = document.createElement('h1')
heading.textContent = 'Books'

const utils = document.createElement('ul')
const leftBox = document.querySelector('.left_box')
leftBox.append(heading, utils)
utils.className = 'books_list'
const listBooks = document.querySelector('.books_list')

const btn_add = document.createElement('button')
btn_add.className = 'btn_add'
btn_add.textContent = 'add'
left_box.append(btn_add)

const addButton = document.querySelector('.btn_add')
addButton.addEventListener('click', addNewBook)
const booksFromLoc = JSON.parse(localStorage.getItem('books'))

function renderList() {
	const booksFromLoc = JSON.parse(localStorage.getItem('books'))
console.log(booksFromLoc);

	const listMarkUp = booksFromLoc.map(({ title, id }) => {
		return `<li id = ${id} class="books_item">
		<p class='title_text'>${title}</p>
		<button class='delete'>Delete
		</button>
		<button class='edit'>Edit
		</button>
		</li>`
	}).join('')
	listBooks.insertAdjacentHTML('beforeend', listMarkUp)
	const titleText = document.querySelectorAll('.title_text')
	titleText.forEach(item => item.addEventListener('click', renderPreview))
	const deleteButton = document.querySelectorAll('.delete')
	const editButton = document.querySelectorAll('.edit')
	deleteButton.forEach(button => button.addEventListener('click',deleteBook))
	editButton.forEach(button => button.addEventListener('click',editContent))
}
renderList()

function deleteBook(e) {
	const booksFromLoc = JSON.parse(localStorage.getItem('books'))
	const carrentElems = e.target.parentNode
const getAttr = carrentElems.getAttribute('id')
	console.log(getAttr);
	const findBks = booksFromLoc.filter(findBk => findBk.id !== getAttr)
	console.log((findBks));
	const newBooks = localStorage.setItem('books', JSON.stringify(findBks))
	listBooks.innerHTML = ""
	rightDiv.innerHTML = ""
	renderList()

}
function editContent(e) {
	
	const carrentBtn = e.target.parentNode
	const getAttrById = carrentBtn.getAttribute('id')
	console.log(getAttrById)
	const findBksById = booksFromLoc.find(findBks => findBks.id === getAttrById)
	console.log(findBksById);
	rightDiv.insertAdjacentHTML('beforeend', getMarkupForm(findBksById))

	formFunc(findBksById)
	
	const saveBtn = document.querySelector('.save_btn')
	saveBtn.addEventListener('click', clickSaveBtnInp)
	function clickSaveBtnInp(e) {

		e.preventDefault()
		console.log(findBksById);

		if (findBksById.title === "" || findBksById.author === "" ||
			findBksById.img === "" || findBksById.plot === "") {
		alert(`заполните пустое поле`)
		} else {
			const findBksById = booksFromLoc.find(findBks => findBks.id === getAttrById)
	console.log(findBksById);
			const newBokInpEdit = JSON.parse(localStorage.getItem('books')) 
		console.log(newBokInpEdit);
			const a = newBokInpEdit.indexOf(findBksById)
			console.log(newBokInpEdit);
			console.log(findBksById);
			console.log(a);
	    }
	
}
clickSaveBtnInp(e)
}

function addNewBook() {
	
	const newBook = {
		id: `${Date.now()}`,
		title: '',
		author: '',
		img: '',
		plot: '',
	}
	rightDiv.innerHTML = ''
	rightDiv.insertAdjacentHTML('beforeend', getMarkupForm(newBook))
	formFunc(newBook)
	
	const saveBtn = document.querySelector('.save_btn')
	saveBtn.addEventListener('click', clickSaveBtn)
	
	function clickSaveBtn(e) {
        e.preventDefault()
		console.log(newBook);
		const newBokInp = JSON.parse(localStorage.getItem('books')) 
		console.log(newBokInp);
	    newBokInp.push(newBook)

		localStorage.setItem('books', JSON.stringify(newBokInp))
		listBooks.innerHTML = ""
		
		renderList()
		rightDiv.innerHTML = ''
		rightDiv.insertAdjacentHTML('beforeend', renderPreviewMarkUp(newBook))
		
		setTimeout(() => {
			alert(`book successfully added`)
		}, 300);
	}
}

function getMarkupForm({title, author, img, plot}) {
	return `<form action="">
    <label class = "label-title" for="">Title<input class = "form-input" type="text" name="title" value="${title}"></label>
    <label class = "label-title" for="">Author<input class = "form-input" type="text" name="author" value="${author}"></label>
    <label class = "label-title" for="">Img<input class = "form-input" type="text" name="img" value="${img}"></label>
    <label class = "label-title" for="">Plot<input class = "form-input" type="text" name="plot" value="${plot}"></label>
    <button class="save_btn" type="submit"> Save</button>
</form>`
	
}
function formFunc(book) {
	const inputs = document.querySelectorAll('input')
	console.log(inputs);
	inputs.forEach(input => input.addEventListener('change', upDateValue))
	function upDateValue(e) {
		console.log(e.target.name);
	    book[e.target.name] = e.target.value;
		// console.log(book[e.target.name] = e.target.value);
	}
	console.log(book);
}

function renderPreviewMarkUp({title, author, img, plot}) {
	return `
	<div>
        <h2>${title}</h2>
        <p">${author}</p>
        <img src=${img} alt=${title}>
		<p>${plot}</p>
    </div>
	`
}

function renderPreview(event) {
	console.log(event.target)
	const result = books.find(element => element.title === event.target.innerText)
	rightDiv.innerHTML = ''
    rightDiv.insertAdjacentHTML('beforeend', renderPreviewMarkUp(result))
    console.log(result)
}






 
