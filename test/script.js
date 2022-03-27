var data1 = [{
    fname: 'bob',
    addr1: '123 Street St'
},{
    fname: 'Betty',
    addr1: "999 Road Rd"
},{
    fname: 'Allison',
    addr1: '444 Lane Ln'
}
];

var list = $(document).find(".list1");

$(this).find(".choices").on("click", function () 
	{ var people = data1[count];
        if(count < count.length){
           count++;
        }
    })

    function displayinfo() {
        if (!data1) {
            data1 = 0
            $('<li class="fname w-75" value=' + data1 + '>First Name: ' + data1.fname  + '</li>').appendTo(list);
            $('<li class="fname w-75" value=' + data1 + '>Address: ' + data1.addr1 + '</li>').appendTo(list);
            console.log(data1.indexOf());
        }
        else {
            data1 = data1[count]
            $('<li class="fname w-75" value=' + data1 + '>First Name: ' + data1.fname  + '</li>').appendTo(list);
            $('<li class="fname w-75" value=' + data1 + '>Address: ' + data1.addr1 + '</li>').appendTo(list);
            console.log('noway')
        }
    }
displayinfo()

    

    document.getElementById('name').innerHTML = 'Name: ' + stn.name;          //this is what is to be displayed when the button is clicked
        document.getElementById('address').innerHTML = 'Address: ' + stn.address.address + " " + stn.address.city + ", " + stn.address.state;
        document.getElementById('gpa').innerHTML = 'GPA: ' + stn.gpa[0] +", " + stn.gpa[1] + ", " + stn.gpa[2];
        document.getElementById('date').innerHTML = 'Date: ' + d.toLocaleDateString();
        document.getElementById('gpaavg').innerHTML = 'Average GPA: ' + gpas;