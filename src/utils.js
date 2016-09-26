export const loadJSONfromURL = (url, callback)=>{
    var _ = new XMLHttpRequest();
    _.overrideMimeType("application/json");
    _.open('GET', url, true);
    _.onreadystatechange = function () {
        if (_.readyState == 4 && _.status == "200") {
            callback(JSON.parse(_.responseText));
        }
    };
    _.send(null);
};