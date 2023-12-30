let regForm = document.querySelector(".reg-Form");
let allInput = regForm.querySelectorAll("INPUT");
let closebtn = document.querySelector(".close");
let regList = document.querySelector(".data-list"); 
let url = "";
let allRegData = [];
console.log(allInput);
if (localStorage.getItem("allRegData") != null) {
    allRegData = JSON.parse(localStorage.getItem("allRegData"))
}
regForm.onsubmit = (e) => {
    e.preventDefault();
    let checkemil = allRegData.find((data) => data.email == allInput[1].value);

    if (checkemil == undefined) {
    allRegData.push({
        name: allInput[0].value,
        email: allInput[1].value,
        phone: allInput[2].value,
        salary: allInput[3].value,
        city: allInput[4].value,
        join: allInput[5].value,
        emID: allInput[6].value,
        profile: url == "" ? "prasahth.jpg": url
    });
    localStorage.setItem("allRegData", JSON.stringify(allRegData));
        swal("Data Inserted", "Successfully !", "success");
        console.log(regForm)
        closebtn.click();
        regForm.reset('');
}
else {
    swal("Email already exists", "Failed !", "warning")
    // swal({
    //     title: "Error!",
    //     text: "Here's my error message!",
    //     type: "error",
    //     confirmButtonText: "Cool"
    //   });

}

}
const getRegData = () => {
    allRegData.forEach((data,index) => {

        regList.innerHTML += `
<tr>
           <td>${index+1}</td>
            <td><button type="button" data-toggle="modal" data-target="#exampleModal2" data-whatever="@mdo"><img
           src=${data.profile} alt=""></button></td>
           <td>${data.join}</td>
           <td>${data.emID}</td>
           <td>${data.name}</td>
           <td>${data.email}</td>
           <td>${data.phone}</td>
           <td>${data.salary}</td>
           <td>${data.city}</td>
           <td><button class="btn bg-danger mr-2">Delete</button>
               <button class="btn bg-success">Edit</button></td>
</tr>
`;
    });
}
getRegData();
allInput[7].onchange = () => {
    let fReader = new FileReader();
    fReader.readAsDataURL(allInput[7].files[0]);
    fReader.onload = (e) => {
        url = e.target.result;
       //  console.log(url)
    }
}