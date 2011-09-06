// ANCHORS .........................................

var options = document.getElementById('options');
var anchorTags = options.getElementsByTagName("a");

function mouseHover() {
	for ( var i=0, j=anchorTags.length; i < j; i++ ) {
		anchorTags[i].style.color = "#009900";
	}
} // mouseHover
function mouseOut() {
	for ( var i=0, j=anchorTags.length; i < j; i++ ) {
		anchorTags[i].style.color = "#990000";
	}
} // mouseOut




// CAT NAMES / SELECT LIST .........................

var catNames = [ "", "Reading", "Writing", "English", "Language", "Social Studies", "Science", "Social Science", "Political Science", "Health Science", "Math", "Performing Arts", "Arts", "Physical Education", "Electives", "Development", "Programming", "Information Technology", "Legal Studies", "Criminal Justice", "Engineering", "Avionics" ], 
	formTag = document.getElementsByTagName("form"),
	makePara = document.createElement("p"),
	labelTxt = document.createTextNode("Category: "),
	makeSelect = document.createElement("select")
;

makeSelect.setAttribute("id", "catName");

var makeCats = function(name) {
	for ( var i=0, j=catNames.length; i < j; i++ ) {
		var makeOption = document.createElement("option");
		var optText = document.createTextNode(catNames[i]);
		makeOption.setAttribute("value", catNames[i]);
		makeOption.appendChild(optText);
		makeSelect.appendChild(makeOption); 
	};
	makePara.appendChild(labelTxt);
	makePara.appendChild(makeSelect);
	var getUL = formTag[0].firstChild;
	var paraSelect = formTag[0].insertBefore(makePara,getUL);
}; // makeCats

makeCats();

//Shows slider bar value as it is moving

function showValue(newValue)
{
	document.getElementById("range").innerHTML=newValue;
}


// GET ITEMS, DISPLAY FORM ..........................

function getItems() {

  		//document.getElementById('main').style.display = "none"; 		
		
		var getListdiv 	= document.getElementById("list");
		
    	for (var i = 0, len = localStorage.length; i  <  len; i++) {
    		var key = localStorage.key(i);
    		var value = localStorage.getItem(key);
    		value = value.split(';');
    		var catName		= value[0];
		    var itemName	= value[1];
		    var itemQty		= value[2];
			var favorite	= value[3];
			var purchaseDate = value[4];
			var notes		= value[5];	
			var newDiv = document.createElement("div");
			for ( var ii = 0, allLength = value.length; ii < allLength; ii++ ) {
				var newParas = document.createElement("p");
				var itemTxt = document.createTextNode(value[ii]);
				newParas.appendChild(itemTxt);
				newDiv.appendChild(newParas);
				getListdiv.appendChild(newDiv);
			}		
			
			// add category image
			var newImg = document.createElement("img");
			var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
			newDiv.appendChild(newImg);	
			
			// add delete single item link
			var deleteLink = document.createElement("a");			
			var setHref = deleteLink.setAttribute("href", "#");
			//var setId = deleteLink.setAttribute("id", key);
			var setOnclick = deleteLink.setAttribute("onclick", "deleteItem(" + key + ");");
			var deleteText = document.createTextNode("delete item");
			deleteLink.appendChild(deleteText);
			newDiv.appendChild(deleteLink);	
			
			// add edit single item link
			var editLink = document.createElement("a");			
			var setEditHref = editLink.setAttribute("href", "#");
			//var setEditId = editLink.setAttribute("id", key);
			var setEditOnclick = editLink.setAttribute("onclick", "editItem(" + key + ");");
			var editText = document.createTextNode("edit item");
			editLink.appendChild(editText);
			newDiv.appendChild(editLink);	
			
			// reveal p#options (edit and clear anchors within)
			var options = document.getElementById('options');
			options.style.display = "block";
			
			var getClear = document.getElementById("clear");
			var setClearclick = getClear.setAttribute("onclick", "clearLocal();");
			
		}
	}
  	


// STORE ITEMS ........................................

document.getElementById('submit').onclick = function (id) {
	var newDate		= new Date();  //save the current date
    var itemId		= newDate.getTime();  // save current date with current time
    var catName		= document.getElementById('catName').value;
    var itemName	= document.getElementById('itemName').value;
    var itemQty		= document.getElementById('itemQty').value;
    var favorite	= document.getElementById('favorite').value;
    var purchaseDate = document.getElementById('purchaseDate').value;
    var notes		= document.getElementById('notes').value;
	var allItems 	= [
		catName, 
		itemName, 
		itemQty, 
		favorite, 
		purchaseDate, 
		notes
	];
	if (catName != "" && itemName != "" && purchaseDate != "") {
    	localStorage.setItem(itemId, allItems.join(';'));		
    } else {
    	alert("all fields required.");
    }
}  //storeItems


// EDIT **SINGLE** ITEMS ...........................

function editItem(id) { 
   		
		var value = localStorage.getItem(id);
		var itemId = id;
		//alert(itemId);
		value = value.split(';');
		var catName		= value[0];
	    var itemName	= value[1];
	    var itemQty		= value[2];
		var favorite	= value[3];
		var purchaseDate = value[4];
		var notes		= value[5];	

		//populates form fields with current localStorage values
		document.getElementById('catName').value = catName;
		document.getElementById('itemName').value = itemName;
		document.getElementById('itemQty').value = itemQty;
		if (favorite == "on") {
			document.getElementById('favorite').setAttribute("checked", "checked");
		}
		document.getElementById('purchaseDate').value = purchaseDate;
		document.getElementById('notes').value = notes;
		
		//alert(editItem);
		//var itemId = document.getElementById(id).getAttribute("id");
	
		// reveal editItem button
		var editItem = document.getElementById('editItem');
		editItem.style.display = "block";
		var submit = document.getElementById('submit');
		submit.style.display = "none";
		document.getElementById('editItem').onclick = function () {
			//alert(itemId);
		    var catName		= document.getElementById('catName').value;
		    var itemName	= document.getElementById('itemName').value;
		    var itemQty		= document.getElementById('itemQty').value;
		    var favorite	= document.getElementById('favorite').value;
		    var purchaseDate = document.getElementById('purchaseDate').value;
		    var notes		= document.getElementById('notes').value;
			var allItems 	= [
				catName, 
				itemName, 
				itemQty, 
				favorite, 
				purchaseDate, 
				notes
			];
			if (catName != "" && itemName != "" && purchaseDate != "") {
		    	localStorage.setItem(itemId, allItems.join(';'));		
		    } else {
		    	alert("all fields required.");
		    }
		    	
			
		};
		
}  //editItem





// DELETE **SINGLE** ITEMS ...........................

function deleteItem(id) { 
	var ask = confirm("Are you sure?");
	if (ask) {
		localStorage.removeItem(id); 
		window.location.reload(); 
	} else {
		alert("Item not removed!");
	}
}



// DELETE **ALL** ITEMS ...............................

function clearLocal() {
	localStorage.clear(); 
	window.location.reload(); 
} //clearLocal







