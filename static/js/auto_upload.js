var chart = null

// alert('here')
function upload(){
    var name = String(document.querySelector(".file").files[0].name.split('.').slice(-1)[0])
    var re = /(\.xlsx|\.xls)$/i;
    // console.log(typeof(name))

    if (name != 'xlsx') {
        alert("File extension not supported!");
    }else{
        // console.log("here")
        document.querySelector('.ldn').classList.remove('hidden')
        let form_data = new FormData();
        form_data.append('excel_file', document.querySelector(".file").files[0]);
        form_data.append('name', document.querySelector(".file").files[0].name);
    
        axios.post('', form_data, {
            headers: {
                'Content-Type': "multipart/form-data;"
            }
        })
        .then((res) => {
            document.querySelector('.ldn').classList.add('hidden')
            console.log(res.data)
            // console.log(res.data.plot_data)
            // console.log(JSON.parse(res.data.plot_data))

            // console.log(res.data.N_plot_data)
            // console.log(JSON.parse(res.data.N_plot_data))
            if(res.data.status == true){
                document.querySelector('.bfore').classList.add('hidden')
                document.querySelector('.after').classList.remove('hidden')
                // var data = res.data.data
                
                // var inner = ''
                // for (const item in data) {
                //     inner += `<div class="w-full h-16 rounded-md shadow-md flex flex-row justify-between item-center px-5">
                //     <div class="text-xl my-auto">${data[item]}</div>
                //     <div onclick="handletrain(${item})" class="h-1/2 cursor-pointer my-auto w-20 bg-purple-400 hover:bg-purple-500 transition duration-300 rounded-sm"><p class="m-auto">
                //     <svg role="status" class="inline dd w-5 hidden mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                //         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                //         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                //     </svg>
                //     Train</p>
                //     </div>
                //     </div>`
                // }

                // document.querySelector('.after').innerHTML = inner


            }else{                
                setTimeout(function (){
                    document.querySelector('.erow1').classList.add('hidden')
                    document.querySelector('.erow2').classList.add('hidden')
                }, 3500);
            }
        })
        .catch(err => {
            console.log(err)
        });
    }
}

function get_plot(name){
    let form_data = new FormData();
    form_data.append('name', name);

    axios.post('get_plot', form_data, {
        headers: {
            'Content-Type': "multipart/form-data;"
        }
    })
    .then((res) => {
        document.querySelector('.ldn').classList.add('hidden')
        // console.log(res.data)
        var x01 = res.data.initials.x01.split("$$");
        // var x01 = x01.map(Date)
        
        for(var i = 0; i < x01.length; i++){
            x01[i] = new Date(x01[i])
        }
        
        var y01 = res.data.initials.y01.split("$$");
        var y01 = y01.map(parseFloat)

        var x02 = res.data.initials.x02.split("$$");
        // var x02 = x02.map(Date)
        
        for(var i = 0; i < x02.length; i++){
            x02[i] = new Date(x02[i])
        }

        var y02 = res.data.initials.y02.split("$$");
        var y02 = y02.map(parseFloat)
        
        var x03 = res.data.initials.x03.split("$$");
        // var x03 = x03.map(Date)
        for(var i = 0; i < x03.length; i++){
            x03[i] = new Date(x03[i])
        }
        
        var y03 = res.data.initials.y03.split("$$");
        var y03 = y03.map(parseFloat)
        
        var x04 = res.data.initials.x04.split("$$");
        // var x04 = x04.map(Date)
        for(var i = 0; i < x04.length; i++){
            x04[i] = new Date(x04[i])
        }
        
        var y04 = res.data.initials.y04.split("$$");
        var y04 = y04.map(parseFloat)

        // console.log(x03)


        p01 = x01.length
        d1 = []
        for(var i = 0; i < p01; i++){
            d1[i] = {x: x01[i], y: y01[i]}
        }


        p02 = x02.length
        d2 = []
        for(var i = 0; i < p02; i++){
            d2[i] = {x: x02[i], y: y02[i]}
        }

        p03 = x03.length
        d3 = []
        for(var i = 0; i < p03; i++){
            d3[i] = {x: x03[i], y: y03[i]}
        }

        p04 = x04.length
        d4 = []
        for(var i = 0; i < p04; i++){
            d4[i] = {x: x04[i], y: y04[i]}
        }

        // console.log(d1)
        // console.log(d2)
        // console.log(d3)
        // console.log(d4)








        document.querySelector('.cht').classList.remove('hidden')






        var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Oil trend Analyzer"
            },
            axisX: {
                valueFormatString: "MMM YYYY"
            },
            axisY2: {
                title: "Oil Price",
                // prefix: "$",
                // suffix: "K"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                horizontalAlign: "center",
                dockInsidePlotArea: true,
                itemclick: toogleDataSeries
            },
            data: [{
                type:"line",
                axisYType: "secondary",
                name: "Train Data",
                showInLegend: true,
                markerSize: 0,
                yValueFormatString: "$#,###k",
                dataPoints: d1
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Test Data",
                showInLegend: true,
                markerSize: 0,
                yValueFormatString: "$#,###k",
                dataPoints: d2
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Predicted Test Data",
                showInLegend: true,
                markerSize: 0,
                yValueFormatString: "$#,###k",
                dataPoints: d3
            },
            {
                type: "line",
                axisYType: "secondary",
                name: "Next Year's Trend",
                showInLegend: true,
                markerSize: 0,
                yValueFormatString: "$#,###k",
                dataPoints: d4
            }]
        });
        chart.render();


        function toogleDataSeries(e){
            if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else{
                e.dataSeries.visible = true;
            }
            chart.render();
        }
        
        // if(res.data.status == true){
        //     document.querySelector('.bfore').classList.add('hidden')
        //     document.querySelector('.after').classList.remove('hidden')
        // }else{                
        //     console.log('err')
        // }
    })
    .catch(err => {
        console.log(err)
    });
}


// function tgll(e){
// 	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
// 		e.dataSeries.visible = false;
// 	} else{
// 		e.dataSeries.visible = true;
// 	}
// 	chart.render();
// }

function ex(){
    document.querySelector('.cht').classList.add('hidden')
}