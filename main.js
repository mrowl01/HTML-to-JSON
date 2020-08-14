var cheerio = require('cheerio');
var fs = require('fs');
var querySelectorAll = require('query-selector');


//needs an 'output' folder to work
//needs link to folder where all the HTML files are stored
//dictonary
const myDictionary = {"1":8,"2":9,"3":10,"4":11,"5":12,"6":13,"7":14,"8":15,"9":16,"10":17,"11":18,"12":19,"13":20,"14":21,"15":22,"16":23,"17":24,"18":25,"19":26,"20":27,"21":28,"22":29,"23":30,"24":31,"25":32,"26":33,"27":34,"28":35,"29":36,"30":37,"31":38,"32":39,"33":40,"34":41,"35":42,"36":43,"37":44,"38":45,"39":46,"40":47,"41":48,"42":49,"43":50,"44":51,"45":52,"46":53,"47":54,"48":55,"49":56,"50":57,"51":58,"52":59,"53":60,"54":61,"56":62,"57":63,"58":64,"59":65,"60":66,"61":67,"62":68,"63":69,"64":70,"65":71,"66":72,"67":73,"68":74,"69":75,"70":76,"71":77,"72":78,"73":79,"74":80,"75":81,"76":82,"77":83,"78":84,"79":85,"80":86,"81":87,"82":88,"83":89,"84":90,"85":91,"86":92,"87":93,"88":94,"89":95,"90":96,"91":97,"92":98,"94":99,"95":100,"96":101,"97":102,"98":103,"99":104,"100":105,"101":106,"102":107,"103":108,"104":109,"105":110,"106":111,"107":112,"108":113,"109":114,"111":115,"112":116,"113":117,"114":118,"115":119,"116":120,"117":121,"118":122,"121":123,"122":124,"123":125,"124":126,"125":127,"126":128,"128":129,"129":130,"130":131,"131":132,"132":133,"134":134,"135":135,"136":136,"137":137,"138":138,"139":139,"140":140,"141":141,"142":142,"143":143,"144":144,"145":145,"146":146,"147":147,"148":148,"149":149,"150":150,"151":151,"152":152,"153":153,"154":154,"155":155,"156":156,"157":157,"158":158,"159":159,"160":160,"162":161,"163":162,"164":163,"165":164,"166":165,"168":166,"170":167,"171":168,"172":169,"173":170,"174":171,"175":172,"176":173,"177":174,"178":175,"179":176,"180":177,"181":178,"182":179,"183":180,"184":181,"185":182,"186":183,"187":184,"188":185,"189":186,"190":187,"191":188,"192":189,"193":190,"194":191,"195":192,"196":193,"197":194,"198":195,"199":196,"200":197,"201":198,"202":199,"203":200,"204":201,"205":202,"206":203,"207":204,"208":205,"209":206,"210":207,"211":208,"212":209,"213":210,"214":211,"215":212,"216":213,"217":214,"218":215,"220":216,"221":217,"222":218,"223":219,"224":220,"225":221,"226":222,"227":223,"228":224,"229":225,"230":226,"231":227,"232":228,"233":229,"234":230,"235":231,"236":232,"237":233,"238":234,"239":235,"240":236,"241":237,"242":238,"243":239,"244":240,"245":241,"246":242,"247":243,"248":244,"249":245,"250":246,"252":247,"253":248,"254":249,"255":250,"256":251,"257":252,"258":253,"259":254,"260":255,"261":256,"262":257,"263":258,"265":259,"266":260,"267":261,"268":262,"270":263,"271":264,"272":265,"273":266,"274":267,"275":268,"276":269,"277":270,"279":271,"280":272,"281":273,"282":274,"283":275,"284":276,"285":277,"286":278,"287":279,"291":280,"292":281,"293":282,"294":283,"295":284,"296":285,"297":286,"298":287,"299":288,"300":289,"301":290,"302":291,"303":292,"304":293,"305":294,"306":295,"307":296,"308":297,"309":298,"310":299,"311":300,"312":301,"313":302,"314":303,"315":304,"316":305,"317":306,"318":307,"319":308,"321":309,"322":310,"323":311,"324":312,"325":313,"326":314,"327":315,"328":316,"329":317,"330":318,"331":319,"332":320,"333":321,"334":322,"335":323,"336":324,"337":325,"338":326,"339":327,"340":328,"341":329,"342":330,"343":331,"344":332,"346":333,"347":334,"348":335,"349":336,"350":337,"351":338,"352":339,"353":340,"354":341,"355":342,"356":343,"357":344,"358":345,"359":346,"360":347,"361":348,"362":349,"363":350,"364":351,"365":352,"366":353,"368":354,"369":355,"370":356,"371":357,"372":358,"373":359,"374":360,"375":361,"376":362,"377":363,"378":364,"379":365,"380":366,"382":367,"383":368,"384":369,"385":370,"386":371,"387":372,"388":373,"389":374,"390":375,"391":376,"392":377,"393":378,"394":379,"395":380,"396":381,"397":382,"398":383,"399":384,"400":385,"401":386,"402":387,"403":388,"404":389,"405":390,"406":391,"407":392,"408":393,"409":394,"410":395,"411":396,"412":397,"413":398,"414":399,"415":400,"416":401};
// process files found in the 'input' folder
fs.readdir('./public/', 'utf8', findHtmlFiles);

let counter = 0;
let myjsonArr= [];
const fileCount = 9;

function findHtmlFiles(err, files) {
    if (files.length) {
        files.forEach(function (fullFilename) {
            var pattern = /\.[0-9a-z]{1,5}$/i;
            var ext = (fullFilename).match(pattern);
            // only process '.htm' and '.html' files
            if (ext[0] == '.htm' || ext[0] == '.html') {
                fs.readFile('./public/' + fullFilename, 'utf8', function (err, data) {
                    if (err)
                        throw err
                    else {
                        // add the file name to prevent collisions
                        // in the output folder
                        var fileData = {
                            file: fullFilename.slice(0, (ext[0].length * -1)),
                            data: data
                        };
                        dataLoaded(null, fileData);
                    }
                });
            }
        });
    }

}

function dataLoaded(err, fd) {
    $ = cheerio.load(fd.data);

    let body = $('.discussion_thread_table').each(function(i){
        if(i === 2){
            return;
        }
        let topicNumber = $(this).find('.data-topicNumber').text();
        let topicTitle = $(this).find('.discussion_subject_main').text().replace(/[\n\r\t]/g,"");
        let topicContent = $(this).find('.discussion_body_cell').find('.discussion_body').first().text();
        let topicDate = $(this).find('.discussion_messageDate').first().text();
        let replyArr = [];
        let replies = $(this).find('.discussion_replies_table').each(function(i){
            if(i == 3){
                return;
            }
            let reply = $(this).find('.discussion_body').text();
            let date = $(this).find('.discussion_messageDate').text();
            let name =  $(this).find('.discussion_name').text();
            replyArr.push({
                name:name? name : 'anon',
                date:date,
                replySubject: "RE: "+ topicTitle,
                replyContent:reply,
                parentTopicNumber: topicNumber,
                parentTitle:topicTitle,
                parentID: myDictionary[topicNumber]
            });
        })
        myjsonArr.push({
            topicNumber: topicNumber,
            topicTitle: topicTitle.replace('Topic:',""),
            topicDate: topicDate ,
            topicContent:topicContent,
            replies: replyArr

        })
    })
    
    counter++;
    let content = JSON.stringify(myjsonArr);
    if(counter === fileCount){
        fs.writeFile('./output/' + 'replies2', content, function (err) {

            console.log('Written html to ' + 'replies');
        });
        return myjsonArr;
    }

}


//old input

// $('div').each(function (i, elem) {

//     var id = $(elem).attr('id'),
//         filename = fd.file + '_' + id + '.html',
//         content = $.html(elem);

//     fs.writeFile('./output/' + filename, content, function (err) {

//         console.log('Written html to ' + filename);
//     });
// });


// var cheerio = require('cheerio');
// var fs = require('fs'); 

// const $ = cheerio.load(fs.readFileSync('public/page1.html'));


// const test = $(C).text();

// console.log(test);
// fs.readFile('public/page1.html', 'utf8', function(err, data) {

//     if (err) throw err;

//     var $ = cheerio.load(data);
// });