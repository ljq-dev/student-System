(function (){
    var pie = {
        option: {
            title: {
                text: '',
                subtext:'纯属虚构',
                left:'center',
            },
            legend: {
                data: [],
                orient:'vertical',  //竖着排
                left:'left',
                top: '10%'
            },
            series: {
                name: '',
                type: 'pie',
                radius:'55%',
                center:['50%','60%'],
                data: []
            }
        },
        getData(){
            var self = this;
            var data = $.ajax({
                url: 'https://open.duyiedu.com/api/student/findAll?appkey=jinqun_1580882594891',
                success: function (res){
                    console.log(res);
                    self.echart1(JSON.parse(res).data);
                    self.echart2(JSON.parse(res).data);
                }
            })
        },
        echart1(res){
            /**{"address":"旮旯角落","appkey":"jinqun_1580882594891",
             * "birth":1998,"ctime":1582589649,"email":"1322027512@qq.com",
             * "id":46873,"name":"金鱼","phone":"12456789082","sNo":"1000122",
             * "sex":1,"utime":1582766943}, */
            var legendData = [],
                seriesData = [],
                obj = {};
            res.forEach(el=>{
                if(!obj[el.address]){
                    obj[el.address] = 1;
                }else{
                    obj[el.address] ++;
                }
            })
            for(var prop in obj){
                legendData.push(prop);
                seriesData.push({
                    value: obj[prop],
                    name: prop
                })
            }
            var mychart1 = echarts.init(document.querySelector('#echart1'));
            this.option.title.text  = '渡一教育学生地区分布统计';
            this.option.legend.data = legendData;
            this.option.series.name = '地区分布';
            this.option.series.data = seriesData;
            mychart1.setOption(this.option);
        },
        echart2(res){
            /**{"address":"旮旯角落","appkey":"jinqun_1580882594891",
             * "birth":1998,"ctime":1582589649,"email":"1322027512@qq.com",
             * "id":46873,"name":"金鱼","phone":"12456789082","sNo":"1000122",
             * "sex":1,"utime":1582766943}, */
            var legendData = ['男', '女'],
                seriesData = [],
                obj = {};
            res.forEach(el=>{
                if(!obj[el.sex]){
                    obj[el.sex] = 1;
                }else{
                    obj[el.sex] ++;
                }
            })
            seriesData = [
                {name: '男', value: obj[0]},
                {name: '女', value: obj[1]}
            ]
            console.log(legendData, seriesData);
            var mychart2 = echarts.init(document.querySelector('#echart2'));
            this.option.title.text  = '渡一教育学生性别统计';
            this.option.legend.data = legendData;
            this.option.series.name = '性别分布';
            this.option.series.data = seriesData;

            mychart2.setOption(this.option);
        }
    }
    pie.getData();
}())