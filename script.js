// localStorage.clear()


const butAdd = document.getElementById('addCase')
const input = document.getElementById('case')
const all = document.getElementById('all')
const clearAll = document.getElementById('clearLocStorage')

function addCase() {
    all.innerHTML = ''
    let count = 0;
    data.forEach(element => {
        count++
        const newCase = document.createElement('div')
        const newP = document.createElement('p')
        const newButTrue = document.createElement('button')
        const newButDel = document.createElement('button')
        const divText = document.createElement('div')
        const divBut = document.createElement('div')
        newP.textContent = element['name']
        newButTrue.textContent = 'Готово'
        newButDel.textContent = 'Удалить'
        divText.classList.add('divText')
        divBut.classList.add('divBut')
        newCase.classList.add('divCase')
        newButTrue.classList.add('butTrue')
        newButDel.classList.add('butDel')
        if (element['done'] === true) {
            newCase.classList.add('divCaseTrue')
        }
        divText.append(newP)
        divBut.append(newButDel, newButTrue)
        newCase.append(divText,divBut)
        all.append(newCase)
        newButTrue.addEventListener('click', () => {
            element['done'] === false ? element['done'] = true : element['done'] = false
            localStorage.setItem('Case', JSON.stringify(data))
            element['done'] === false ? newCase.classList.remove('divCaseTrue') : newCase.classList.add('divCaseTrue')
        })
        newButDel.addEventListener('click', () => {
            if(confirm("Вы уверены?")){
            const index = data.findIndex(item => item.id === element.id)
            data.splice(index, 1)
            localStorage.setItem('Case', JSON.stringify(data))
            addCase()
            }
        })


    });
}

if (localStorage.getItem('Case') === null) {
    const obj = []
    localStorage.setItem('Case', JSON.stringify(obj))
}

const data = JSON.parse(localStorage.getItem('Case'))



butAdd.addEventListener('click', (event) => {
    event.preventDefault()
    if (input.value.length === 0) {
        input.classList.add('inCaseFalse')
    }
    else {
        input.classList.remove('inCaseFalse')
        data.push({ name: input.value, done: false, id: crypto.randomUUID() })
        localStorage.setItem('Case', JSON.stringify(data))
        addCase()
    }
})

clearAll.addEventListener('click', () => {
    if(confirm("Вы уверены что хотите все удалить?")){
        data.length = 0
        localStorage.setItem('Case', JSON.stringify(data))
        addCase()
    }
})

addCase()