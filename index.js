let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"));
const saveTabBtn = document.getElementById("saveTab-btn");
console.log(leadsFromStorage);

if(leadsFromStorage) {
    myLeads = leadsFromStorage;
    render(myLeads);
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    console.log(myLeads);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    inputEl.value = "";
    render(myLeads);
})  

deleteBtn.addEventListener("click", function() {
    localStorage.clear();
    myLeads=[];
    render(myLeads);
})

saveTabBtn.addEventListener("click", function() {
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})


function render(leads) {
    let listItems = "";
    for (i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href=${leads[i]} target='_blank' rel='noreferrer noopener'>
                ${leads[i]}
            </a>
        </li>`;
    }
    ulEl.innerHTML = listItems;
}


