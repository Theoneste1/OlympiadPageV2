let SHEET_ID = '1_goCAnx9eFbY_hBHQpUggbWYQKWuKZrUPWP8s8zgpIM'
// let SHEET_TITLE = 'teachers';
let SHEET_TITLE = 'STATI';
let SHEET_RANGE = 'A1:F29'

let FULL_URL = ('https://docs.google.com/spreadsheets/d/'+ SHEET_ID +'/gviz/tq?sheet='+SHEET_TITLE +'&range='+SHEET_RANGE);


let length;
let table
let data
let countList = new Array()

let firstcount=0;
let lastpoint=length;
let pageSize =10;
let countPerEachPage =10;
let presentPage =1;
let countOfPages;

let currentStartingPoint =0;
let currentEndingPoing =pageSize;

let previousStartingPoint;
let previousEndingPoint;

let nextStatingPoint;
let nextEndingPoint;



function getCode(){
    
    return parseInt(document.getElementById('code').value);
    
}
getCode()

// If the code change please clean
let getcodechange =document.getElementById('code')
getcodechange.addEventListener("change",(Event)=>{
       

});



fetch(FULL_URL)
.then(res => res.text())
.then(rep => {
    data = JSON.parse(rep.substr(47).slice(0,-2)); 
    // console.log(data)
    console.log(data.table.rows[1].c[2].v)
    
    length = data.table.rows.length;
    console.log("This is length ", length)

        table = document.createElement("table");
        table.border = "1";
        Head = document.createElement("thead");

        //Add the header row.
        var row = table.insertRow(-1);

        //Add the header cells.
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = "#";
        row.appendChild(headerCell);


        var headerCell = document.createElement("TH");
        headerCell.innerHTML = "Event Name";
        row.appendChild(headerCell);

        headerCell = document.createElement("TH");
        headerCell.innerHTML = "Students";
        row.appendChild(headerCell);

        headerCell = document.createElement("TH");
        headerCell.innerHTML = "Ranked";
        row.appendChild(headerCell);

        headerCell = document.createElement("TH");
        headerCell.innerHTML = "Award";
        row.appendChild(headerCell);

        // Head.appendChild(row);
   
   
    //function for loading pagination functionality
    function loadMyPagination() {
    prepareList();
    loadMyPaginationList();
    }
    window.onload = loadMyPagination;

}
 
)



//function for creating how many how many number per each page
function getCountOfPages() {
    countOfPages=Math.ceil(length / countPerEachPage);
    return countOfPages;
    }


    //function for moving to next page
    const getNextPage=()=> {
    presentPage += 1;
    loadMyPaginationList();
   
    }
    //function for moving previous page
    function getPreviousPage() {
    presentPage -= 1;
    loadMyPaginationList();
   
    }
    //function for moving to first page
    function getFirstPage() {
        presentPage = 0;
        loadMyPaginationList();
        document.getElementById("first").disabled;

        var element = document.getElementById("first");
            element.style.display = "none";
        var select = document.getElementById("select");
        select.style.display = "none";

    }
    //function for moving last page
    function getLastPage() {
    presentPage = countOfPages;
    loadMyPaginationList();
    }

     //function for creating how to move between the pages
     function loadMyPaginationList() { 
        document.getElementById("DevTable").innerHTML = "";     
        createPageList();
        addPageList = countList.slice(currentStartingPoint, currentEndingPoing);
       
        validatePageCount();
        }

        //check how many students
         function countOfstudents(){
            countNumber=0
            
            for(j=0; j<length; j++){
                // console.log(data.table.rows[j].c[6].v)
                let compare =data.table.rows[j].c[5].v
                
                
                if(compare == getCode()){
        
                    // console.log("The following data from excel : ",data.table.rows[j].c[6].v)
                    countNumber=countNumber+1;
                    // console.log("This is the number", countNumber)
                }
         }
         return countNumber;
        }
        //button



        CheckListbutton=document.getElementById("first")
        CheckListbutton.addEventListener("click", function(){
            if(getCode()=="" && CheckListbutton.disabled==false){
                document.getElementById("error").innerHTML="you need first to Select the year!!"
                return false
            }
            if(getCode()!="" && CheckListbutton.disabled==false){
            CheckListbutton.disabled=true
            
            }
        })
    
   // get the number of the students

    //function for adding numbers to each page
    function createPageList() {
        
        if(countOfstudents()==0){
            console.log(code.innerHTML)
            document.getElementById("error").innerHTML=`No data we have for ${code.value}`
                // return false 
        }
        else{
        // document.getElementById("DevTable").innerHTML = "";

        let index;
       
        initialStudent=0;
        let tatal =countOfstudents()

        var tbody = document.createElement("tbody");



        // console.log("This is the cound=t number of the students", tatal);
        for (i = 0; i<length; i++) {
                //Add the data row.
               
                // var row = document.createElement("tr");
              
                let compare =data.table.rows[i].c[5].v
                

                code =document.getElementById('code').innerHTML
                // console.log("The data from excel : ",data.table.rows[i].c[6].v)
                if(compare == getCode())
                {
                    initialStudent +=1;
                    // keep the value for making the list
                    index =i 
                // Add the data cells.
                // var cell = row.insertCell(-1);
                datas=initialStudent.toString()

                var row = table.insertRow(-1);
                var headerCell = document.createElement("td");
                headerCell.setAttribute('data-label',"#");
                headerCell.innerHTML = datas
                row.appendChild(headerCell);

                console.log("CHECKING THE ERROR!");
console.log("checking the error:",data.table.rows[i].c[1].v);
console.log("checking the error:",data.table.rows[i].c[3].v);
console.log("Checking the IMO logs",data.table.rows[i].c[2].v);



                var headerCell = document.createElement("td");
                headerCell.setAttribute('data-label',"Event Name");
                headerCell.innerHTML = data.table.rows[i].c[1].v;
                row.appendChild(headerCell);

                headerCell = document.createElement("td");
                headerCell.setAttribute('data-label',"Students");
                headerCell.innerHTML = data.table.rows[i].c[2].v;
                row.appendChild(headerCell);

                headerCell = document.createElement("td");
                headerCell.setAttribute('data-label',"Ranked");
                headerCell.innerHTML = data.table.rows[i].c[3].v;
                row.appendChild(headerCell);


                headerCell = document.createElement("td");
                headerCell.setAttribute('data-label',"Award");
                headerCell.innerHTML = data.table.rows[i].c[4].v;
                // headerCell.innerHTML = 'xx';
                row.appendChild(headerCell);
                var headerCell = document.createElement("td");
                headerCell.classList.add('empty');
                row.appendChild(headerCell);

                        }

                    }
                   let style= document.getElementById("school");
                   style.classList.remove("remove");
                    document.getElementById("school").style.color="black";
                    

                

                    // school informations
                    // document.getElementById("schoolname").innerHTML=data.table.rows[index].c[12].v;
                    // document.getElementById("teachername").innerHTML=data.table.rows[index].c[9].v;
                    // document.getElementById("districtname").innerHTML=data.table.rows[index].c[7].v;
                    // document.getElementById("sectorname").innerHTML=data.table.rows[index].c[8].v;
                    document.getElementById("snumber").innerHTML=getCode()
                    document.getElementById("snumberIMO").innerHTML=getCode()
                    var dvTable = document.getElementById("DevTable");
                    dvTable.innerHTML = "";
                    dvTable.appendChild(table);
                    findTrs()
        // document.getElementById("countList").innerHTML = document.getElementById("countList").innerHTML+ addPageList[p] + "<br/>";
    

        }
        // close of else

        
    }

    function findTrs(){

    let trs=document.querySelectorAll("tr");
    trs =Array.from(trs);

    // console.log("These are trs",trs);
    }

    // getting the size of table.

//  redrecting a link after click:




        function cleaning(){
            // loadMyPaginationList();
            location.reload()
            document.getElementById("DevTable").innerHTML=" "
            document.getElementById("school").innerHTML=" "
            console.log(code)
         }
        //function for validating real time condition like if move to last page, last page disabled etc
        function validatePageCount() {
       
        // document.getElementById("next").disabled = presentPage == countOfPages ? true : false;
        // document.getElementById("previous").disabled = presentPage == 1 ? true : false;
        // document.getElementById("first").disabled = presentPage == 1 ? true : false;
        // document.getElementById("last").disabled = presentPage == countOfPages ? true : false;
        }

        
        document.getElementById("snumberIMOs").addEventListener("click",

            ()=>{
                let link1="https://www.imo-official.org/team_r.aspx?code=RWA&year="
                let link2 =`${getCode()}`
                let combinedLink = link1+link2;
                window.location.href = combinedLink;
            }
        )