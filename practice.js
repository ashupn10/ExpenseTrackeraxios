let btn = document.getElementById('addItem');
let container=document.getElementById('Expenses');
let inputs=document.querySelectorAll('.form-control');
console.log(btn);
btn.addEventListener('click',(e)=>{
    e.preventDefault;
    axios.post('https://crudcrud.com/api/67682b50fe984cf3b6a504fcb20b0d20/Expenses',{
        "Expense": inputs[0].value,
        "Category": inputs[1].value,
        "Description":inputs[2].value
    }).then(res=>{
        ShowExpenses();
        console.log(res);
    })
    .catch(err=>console.log(err));
})
function ShowExpenses(){
    axios.get('https://crudcrud.com/api/67682b50fe984cf3b6a504fcb20b0d20/Expenses')
    .then(res=>{
        container.innerHTML='';
        res.data.forEach((key)=>{
            // console.log(key);
            let list=document.createElement('li');
            let expenseItem=document.createTextNode(`Expense: ${key.Expense} Category: ${key.Category} Description: ${key.Description}`);
            let Editbtn=document.createElement('button');
            Editbtn.textContent='Edit';
            let Deletebtn=document.createElement('button');
            Deletebtn.textContent='Delete';
            Editbtn.addEventListener('click',()=>{
                Edit(key,list);
            })
            Deletebtn.addEventListener('click',()=>{
                Delete(key._id,list);
            })
            list.appendChild(expenseItem);
            list.appendChild(Editbtn);
            list.appendChild(Deletebtn);
            container.appendChild(list);
        })
    })
    .catch(err=>console.log(err));
}
function Delete(key,list){
    list.remove();
    axios.delete('https://crudcrud.com/api/67682b50fe984cf3b6a504fcb20b0d20/Expenses/'+key)
    .then(ShowExpenses);
}
function Edit(key,list){
    inputs[0].value=key.Expense;
    inputs[1].value=key.Category;
    inputs[2].value=key.Description;
    Delete(key._id,list);

}

window.addEventListener('DOMContentLoaded',()=>{
    ShowExpenses();
})