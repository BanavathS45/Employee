//HTML Data
let regForm = document.querySelector(".reg-Form");
let allInput = regForm.querySelectorAll("INPUT");
console.log(allInput)
let allBtn = regForm.querySelectorAll("button");
console.log(allBtn)
let closebtn1 = document.querySelector(".close");
let regList = document.querySelector(".data-list");
let addBtn = document.querySelector(".add-btn");  
let searchEl = document.querySelector(".search"); 
let delAllBtn = document.querySelector(".allDlt"); 
// Total Data store
let allRegData = [];
// picture url
let url = "";
// console.log(allInput);

// getting input data form local storage
if (localStorage.getItem("allRegData") != null) {
    allRegData = JSON.parse(localStorage.getItem("allRegData"))
    console.log(allRegData);
}
// Add Details
regForm.onsubmit = (e) => {
    e.preventDefault();
// Email Checking
    let checkemil = allRegData.find((data) => data.email == allInput[1].value);
     console.log(checkemil);
    if (checkemil == undefined) {
        allRegData.push({
            // pushing all data to allRegData
            name: allInput[0].value,
            email: allInput[1].value,
            phone: allInput[2].value,
            salary: allInput[3].value,
            city: allInput[4].value.toLocaleUpperCase(),
            join: allInput[5].value,
            // emID: allInput[6].value,
            profile: url == "" ? "CGT_Log.jpg" : url
        });
        // setting the data in local storage
        localStorage.setItem("allRegData", JSON.stringify(allRegData));
        // Alert massage
        swal("Data Inserted", "Successfully !", "success")
        closebtn1.click();
        regForm.reset('');
        getRegData();
    } else {
        swal("Email already exists", "Failed !", "warning")
    }
}
// get data from HTML Input 
const getRegData = () => {
    regList.innerHTML = "";
    allRegData.forEach((data, index) => {
        // console.log(data.name)
        let dataStr = JSON.stringify(data);
        // console.log(dataStr);
        let finalData = dataStr.replace(/"/g, "'")
        // console.log(finalData)
        regList.innerHTML += `
<tr>
           <td>${index+1}</td>
          
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered model-md">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><img src=${data.profile} alt="">  
                        </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</div>
<td><button type="button" data-toggle="modal" data-target="#exampleModal2" data-whatever="@mdo"><img
src=${data.profile} alt=""></button></td>      
           <td>${data.join}</td>
           <td>${"EM-"+(index+1)}</td>
           <td>${data.name}</td>
           <td>${data.email}</td>
           <td>${data.phone}</td>
           <td>${data.salary}</td>
           <td>${data.city}</td>
 
           <td><button index="${index}" class=" del-btn btn bg-danger mr-2"><i class="fa fa-trash-o" aria-hidden="true"></i>Delete</button>
           <button  data="${finalData}" index="${index}"  class="edit-btn btn bg-primary"><i class="fa fa-pencil" aria-hidden="true"></i>Edit</button></td>  
           
        </tr>
        `;
    });
    action();
}
// delete and update
const action = () => {
    let allDelBtn = regList.querySelectorAll(".del-btn");
    for (let btn of allDelBtn) {

        btn.onclick = async () => {
            let isConfirm = await confirm();
            // alert(isConfirm)
            if (isConfirm) {
                let index = btn.getAttribute("index");
                allRegData.splice(index, 1);
                localStorage.setItem("allRegData", JSON.stringify(allRegData));
                getRegData();
            }

        }
    }
    // update
    let allEditBtn = regList.querySelectorAll(".edit-btn");
    // console.log(allEditBtn)
    for (let btn of allEditBtn) {
        // console.log(btn)

        btn.onclick = () => {
            let index = btn.getAttribute("index");
            // alert(index)
            let dataStr = btn.getAttribute("data");
            let finalData = dataStr.replace(/'/g, '"');
            let data = JSON.parse(finalData);
            // console.log(data)
            addBtn.click();
            allInput[0].value = data.name;
            allInput[1].value = data.email;
            allInput[2].value = data.phone;
            allInput[3].value = data.salary;
            allInput[4].value = data.city.toLocaleUpperCase();
            allInput[5].value = data.join;
            allInput[6].disabled = true;
            url = data.profile;
            // console.log(allInput[0])
            allBtn[0].disabled = false ;
            allBtn[1].disabled =  false;
            allBtn[2].disabled = true;
            // allBtn[2].disabled = true;

            allBtn[1].onclick = () => {
                allRegData[index] = {
                    name: allInput[0].value,
                    email: allInput[1].value,
                    phone: allInput[2].value,
                    salary: allInput[3].value,
                    city: allInput[4].value,
                    join: allInput[5].value,
                    emID: allInput[6].value,
                    profile: url == "" ? "CGT_Log.jpg" : url
                };
                localStorage.setItem("allRegData", JSON.stringify(allRegData));
                swal("Data Updated", "Successfully !", "success")
                closebtn1.click();
                regForm.reset('');
                getRegData();
               
            }
            
        }
        allBtn[0].disabled = false;
        allBtn[1].disabled =true ;
        allBtn[2].disabled = false ;
    }
}
getRegData();
// Profile Picture Reader
allInput[7].onchange = () => {
    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[7].files[0]);
    fReader.onload = (e) => {
        url = e.target.result;
        //  console.log(url)
    }
}
// all Delete
delAllBtn.onclick = () => {
    let isConfirm = confirm();
    if(isConfirm){
        allRegData=[];
        localStorage.removeItem("allRegData");
        getRegData();
    }
}
// confirm
const confirm = () => {
    return new Promise((resolve, reject) => {
        swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    resolve(true)
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    reject(false)
                    swal("Your imaginary file is safe!");
                }
            });
    })
}

// serach
searchEl.oninput=()=>{
    search();

}
const search = ()=>{
    let value = searchEl.value.toLowerCase();
// alert(value)
let tr = regList.querySelectorAll("TR");
 console.log(tr);
let i;
for (let i = 0; i < tr.length; i++) {
    let allTd = tr[i].querySelectorAll("td");
let name = allTd[4].innerHTML;
let email = allTd[5].innerHTML;
let phone = allTd[6].innerHTML;
let address = allTd[7].innerHTML;
if(name.toLocaleLowerCase().indexOf(value) != -1){
    tr[i].style.display = "";
}
else if(email.toLocaleLowerCase().indexOf(value) != -1){
    tr[i].style.display = "";
}
else if(phone.toLocaleLowerCase().indexOf(value) != -1){
    tr[i].style.display = "";
}
else if(address.toLocaleLowerCase().indexOf(value) != -1){
    tr[i].style.display = "";
}
else{
tr[i].style.display= "none";
}
// alert(name)
    
}
}