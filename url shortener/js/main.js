var links = [];

function getShortUrl(){
    let id = (links.length == 0 ? 1: links[links.length - 1].id + 1);
    let link = document.getElementById("input_url").value;
    let protocol_ok = link.startsWith("http://") || link.startsWith("https://") || link.startsWith("ftp://");
    if(!protocol_ok){
        link = "https://"+ link;
    }
    let newLink = getRandomUrl();
    links.push({"id":id, "link":link, "newLink":newLink});
}

function getRandomUrl(){
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newUrl = window.location.href;
    for(let i = 0; i < 5; i++)
        newUrl += possible.charAt(Math.floor(Math.random() * possible.length));
    return newUrl;
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
