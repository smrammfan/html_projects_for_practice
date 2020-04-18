var links = [];

function addShortUrl(){
    let id = (links.length == 0 ? 1: links[links.length - 1].id + 1);
    let link = document.getElementById("input_url").value;
    clearInputBox();
   if(window.Worker){
        var worker = new Worker("js/webWorker.js");
        worker.postMessage({"href":window.location.href, "id":id, "link":link});
        worker.onmessage = function(e){
            links.push(e.data);
            showAllLinks();
            worker.terminate();
            worker = undefined;
        };
    }else {
        document.getElementById("main_table").innerHTML = "<tr><td>Use good browser, please</td></tr>";
    }
}

function showAllLinks(){
    if(links.length == 0){
        document.getElementById("main_table").innerHTML = "<tr><td>There will be your links here</td></tr>";
        return;
    }
    let tableHtmlText = "<tr><th>№</th><th>old Link</th><th>new Link</th><th>Del</th></tr>";
    for(i = 0; i < links.length; i++){
        tableHtmlText +=
         "<tr><td>" + links[i].id + "</td><td><a target= \"_blank\" href = \"" + links[i].link + "\">" + links[i].link 
          +"</a></td><td><a target=\"_blank\" href = \"" + links[i].newLink + "\">" + links[i].newLink +"</a></td><td><button onclick = \"" + "delLink(" + links[i].id + "); showAllLinks()\">Del</button></td></tr>" 
    }
    document.getElementById("main_table").innerHTML = tableHtmlText;
}

function clearInputBox(){
    document.getElementById("input_url").value = "";
}

function delLink(linkId){
   links = links.filter(link => link.id != linkId);
}
