var ul = document.getElementsByTagName("ul")[0];
// ADD NEW ITEM TO END OF LIST
var li = document.createElement("li");
var textnode = document.createTextNode("cream");
li.appendChild(textnode);
ul.appendChild(li);

// ADD NEW ITEM START OF LIST
li = document.createElement("li");
textnode = document.createTextNode("kale");
li.appendChild(textnode);
ul.insertBefore(li,ul.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
for(var i=0; i < ul.children.length; i++)
{
    ul.children[i].className="cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var h2Object=document.getElementsByTagName("h2")[0];
temporaryElem = document.createElement('span');
temporaryText = document.createTextNode(ul.children.length);
temporaryElem.appendChild(temporaryText);
h2Object.append(temporaryElem);


