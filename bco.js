console.log('bco.js loaded')

BCO = function (url){

    this.load=function(url){
        //load bco object from url
        this.url=url
    }

    this.dt={}

    ////// ini //////
    var that = this
    if(url){this.load(url)}
    $(document).ready(function(){ // DOM dependent fun 
        if(document.getElementById('bcoDiv')){ // default UI assembly
            that.div=BCO.UI(document.getElementById('bcoDiv'),that)
        }
    })

}

// BCO fun 

BCO.UI=function(div,bco){ // creates UI in target div
    console.log('bcoDiv found, assembling UI')
    var h = '<h2><img id="qrCode" src="qrCode.jpg" hidden=true><br><button id="hideQR" type="button" class="btn btn-primary">QR</button> <a href="http://bit.ly/bcoexec" target="_blank">bit.ly/bcoexec</a></h2><h3 style="color:maroon">Experimenting with<br> Biocompute Objects (BCO) <a href="https://github.com/mathbiol/bco" target="_blank"><i class="fa fa-github-alt" aria-hidden="true"></i><span id="lala" style="font-size:11;vertical-align:middle"> (source)</span></a></h3><hr>'
    h +='<div id="bcoCompDiv"></div>' // where the computation will happen
    div.innerHTML=h
    hideQR.onclick=function(){
        qrCode.hidden=!qrCode.hidden
        if(qrCode.hidden){
            hideQR.className="btn btn-primary"
        }else{
            hideQR.className="btn btn-warning"
        }
    }

    // GWU examples
    var gwu = {
        'SNP detection':'https://mathbiol.github.io/bco/BCOexamples/snpDetection.json',
        'Metagenomics':'https://mathbiol.github.io/bco/BCOexamples/metagenomics.json',
        'Huntington Disease':'https://mathbiol.github.io/bco/BCOexamples/huntingtonDisease.json',
        'metagenomics':'https://mathbiol.github.io/bco/BCOexamples/metagenomics.json',
        'recombinant antihemophilic factor':'https://mathbiol.github.io/bco/BCOexamples/recombinant.json',
        'RNA-seq analysis of ER':'https://mathbiol.github.io/bco/BCOexamples/rnaSeq.json',
        'Quasispecies_analysis_of_HIV-1_viruses':'https://mathbiol.github.io/bco/BCOexamples/hiv.json',
        'Viral taxID 10239 screening':'https://mathbiol.github.io/bco/BCOexamples/viral.json',
        'EGFR mutation detection in Breast Cancer':'https://mathbiol.github.io/bco/BCOexamples/egfr.json'
    }
    h = '<h4 style="color:navy">Type or paste URL of parent BCO (then Enter): </h4><input id="parentURLinput" style="color:blue" size=100>'
    h += '<li>... by loading it from your device, from GitHub, or <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5333212/" target="_blank">by safely retrieving it</a> from your trusted cloud provider:</li>'
    h += '<span id="getFromDropBox"></span> ' 
    h += '<span id="getFromBox" style="cursor:pointer"><img src="pickBox.png" height="24px"></span> '
    h += '<span id="getFromGitHub" style="cursor:pointer"><img src="github.png" height="22px" style="border:solid;border-color:DarkCyan;border-width:1"></span> '
    h += '<label><input type="file" style="font-size:12;color:navy" id="getFromFile"></label> '
    //h += '...'
    //h += '<span id="getFromGDrive" style="cursor:pointer"><img src="gdrive.png" height="24px"></span>, '
    //h += ' Microsoft OneDrive'
    //h += '<span id="getFromPicker" style="cursor:pointer"><img src="https://dev.filestack.com/static/assets/icons/logo-primary.png" height="24px"></span>'
    h += '<li>... or pick one from <a href="https://hive.biochemistry.gwu.edu/htscsrs/examples" target="_blank"><i class="fa fa-arrow-right" aria-hidden="true"></i> GWU <i class="fa fa-arrow-left" aria-hidden="true"></i></a>:</li>'
    h += '<select id="selectParent"></select>'
    h += '<hr style="border-color:maroon">'
    h += '<div id="bcoEditorDiv" style="background-color:azure"></div>'  
    h += '<hr style="border-color:maroon">'
    h += '<div><button id="showEditedBco" style="color:navy;font-weight:bold;background-color:yellow">Show edited BCO structure</button> <button id="copyEditedBco" hidden=true style="color:navy;font-weight:bold;background-color:yellow">Copy to Clipboard</button> <button id="saveToGitHub" hidden=true style="color:navy;font-weight:bold;background-color:yellow">Save to GitHub</button>'
    h += '<pre hidden=true></pre></div>'
    h += '<div><button id="downloadEditedBco" style="color:navy;font-weight:bold;background-color:yellow">Download </button> <span style="color:maroon">with fileName</span> <input style="color:blue"> (only works with <a href="https://www.google.com/chrome/browser/desktop/index.html" target="_blank">Chrome</a> !).</div>'
    bcoCompDiv.innerHTML=h
    Object.getOwnPropertyNames(gwu).forEach(function(p){
        var op = document.createElement('option')
        op.textContent=p
        op.value=p
        selectParent.appendChild(op)
    })
    selectParent.selectedIndex=div.selectedIndex||0 // recalling previous index if any
    selectParent.onchange=function(s,m){
        parentURLinput.value=gwu[selectParent.selectedOptions[0].value]
        //BCO.bcoEditor(parentURLinput.value)
        //bco.div.selectedIndex=selectParent.selectedIndex
        bcoDiv.selectedIndex=selectParent.selectedIndex
        bco = new BCO(parentURLinput.value)
    }
    // on input url change
    parentURLinput.onchange=function(ip){
       bco = new BCO(parentURLinput.value)
    }
    parentURLinput.onkeyup=function(ev){
        if(ev.keyCode==13){ // in case user is trying to reload existing URL
            parentURLinput.onchange()
        }
    }
    if(bco.url){ // if url was provided already
        parentURLinput.value=bco.url
        BCO.bcoEditor(bco.url,bco)
    }
    showEditedBco.onclick=function(){
        var pr = $('pre',this.parentElement)[0]
        if(this.textContent=="Show edited BCO structure"){
            this.textContent="Hide edited BCO structure"
            this.style.backgroundColor="orange"
            pr.hidden=copyEditedBco.hidden=saveToGitHub.hidden=false
            pr.textContent=JSON.stringify(bco.dt,null,3)
            pr.style.color='green'
        }else{
            this.textContent="Show edited BCO structure"
            this.style.backgroundColor="yellow"
            pr.hidden=copyEditedBco.hidden=saveToGitHub.hidden=true
        }
        //debugger
    }
    copyEditedBco.onclick=function(){
        var ta = document.createElement('textarea')
        ta.textContent=JSON.stringify(bco.dt,null,3)
        //ta.hidden=true
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        ta.parentElement.removeChild(ta)
        //debugger
    }
    downloadEditedBco.onclick=function(){
        var bb = new Blob([JSON.stringify(bco.dt,null,3)]);
        var url = URL.createObjectURL(bb);
        var a = document.createElement('a');
        a.href=url;
        var fname = $('input',this.parentElement)[0].value
        if(fname.length>0){
            a.download=fname;

        }else{
            a.download='BCO '+ Date() +'.json'
        }
        a.click() // then download it automatically 
        //return a
    }
    // filePicking - DropBox
    var buttonDrobBox = Dropbox.createChooseButton({
        success: function(files) {
            //console.log("Here's the file link: " + files[0].link)
            parentURLinput.value=files[0].link
            bco = new BCO(parentURLinput.value)
        },
        linkType: "direct",
        extensions: ['.json']
    });
    getFromDropBox.appendChild(buttonDrobBox)
    // filePicking - Box.com
    getFromBox.onclick=function(){
        var boxSelect = new BoxSelect({
            clientId: "ho63k2awp6akn574ruy9wzazhp106y20",
            linkType: "direct",
            multiselect: false
        })
        boxSelect.success(function(files) {
            parentURLinput.value=files[0].url
            bco = new BCO(parentURLinput.value)
            //console.log(response);
        });
        boxSelect.launchPopup()
    }

    getFromFile.onchange=function(ev){
        var reader = new FileReader();
        var file = this.files[0]
        reader.readAsText(file)
        reader.onload=function(){
            console.log(file,this.result)
            var bco = new BCO()
            var bc = JSON.parse(this.result)
            bc.parentURL='file:///~/'+file.name
            BCO.bcoEditor(bc,bco)
            parentURLinput.value=bc.parentURL
        }
    }

    saveToGitHub.onclick=function(){
        
    }

}

BCO.edit=function(that,p,bco){
    var bc=bco.dt
    //var attr = that.id.slice(5) // what comes after 'edit'
    if($('pre',that.parentElement).length==0){
        that=that.parentElement
    }
    //this.bco=bco 
    var h = '<b style="color:maroon">'+p+'</b> '
    h += '<span id="doneEdit_'+p+'" style="color:green;cursor:pointer" onclick="BCO.doneEdit(this)"><i class="fa fa-check" aria-hidden="true"></i> done</span>'
    h += ' <span id="cancelEdit_'+p+'" style="color:orange;cursor:pointer" onclick="BCO.doneEdit(this,\'cancel\')"><i class="fa fa-reply" aria-hidden="true"></i> cancel</span>'
    h += ' <span id="deleteEdit_'+p+'" style="color:red;cursor:pointer" onclick="BCO.doneEdit(this,\'erase\')"><i class="fa fa-times" aria-hidden="true"></i> erase</span>'
    if($('pre',that.parentElement).length>0){ // it's an object
        h += '<textArea id="textArea_'+p+'" style="vertical-align:top;width:100%;background-color:WhiteSmoke">'+$('pre',that.parentElement)[0].textContent+'</textArea>'
    }else{ // it's a literal
        h += '<br><textArea id="textArea_'+p+'" style="vertical-align:top;width:100%;background-color:WhiteSmoke;color:blue">'+that.textContent+'</textArea>'
    }
    var el = that.parentElement // editing literal
    el.innerHTML=h
    el.bco=bco // passing bco instance as reference available in the edit element
    if(typeof(bc[p])=="object"){ // if it's an object we're editing
        var ta = document.getElementById('textArea_'+p)
        ta.style.height=ta.scrollHeight+"px"
        ta.style.color="blue"
        ta.onkeyup=function(){
            this.style.height=this.scrollHeight+"px"
        }
    }
    // adjust text area to nature of field
    4
}


BCO.editParm=function(bco,p,div){
    var bc=bco.dt
    if(!div){ // first time 
        div = document.createElement('div')
        bcoEditorDiv.appendChild(div)
    }else{ // editing exiting
        div.innerHTML='' // reset existing div
    }
    div.id='parameter_'+p
    var sp = document.createElement('span')
    sp.innerHTML=p
    div.appendChild(sp)
    if(typeof(bc[p])=='object'){
        var spHide = document.createElement('span')
        //spHide.innerHTML=' + '
        spHide.innerHTML=' <i class="fa fa-plus-square" aria-hidden="true"></i>'
        spHide.style.color='navy'
        spHide.id='hide_'+p
        div.appendChild(spHide)
        var spEdit = document.createElement('span')
        spEdit.innerHTML=' <i id="edit_'+p+'" style="color:black" class="fa fa-pencil-square-o" aria-hidden="true"></i><br>'
        div.appendChild(spEdit)
        spEdit.hidden=true
        spEdit.onclick=function(){BCO.edit(this,p,bco)}
        var pr = document.createElement('pre')
        div.appendChild(pr)
        pr.textContent=JSON.stringify(bc[p],null,3)
        pr.style.color="navy"
        pr.style.border=0
        pr.style.backgroundColor='azure'
        pr.style.fontSize='x-small'
        pr.hidden=true
        lala = pr
        spHide.onclick=function(){
            if(this.children[0].className=="fa fa-plus-square"){
                this.children[0].className="fa fa-minus-square"
                this.style.color='orange'
                pr.hidden=spEdit.hidden=false
                //BCO.edit(this)
            } else {
                this.children[0].className="fa fa-plus-square"
                this.style.color='blue'
                pr.hidden=spEdit.hidden=true
            }
        }
    }else{
        sp.innerHTML=p+': <span id=parmName_'+p+' style="color:navy;cursor:pointer">'+bc[p]+' <i id="edit_'+p+'" style="color:black" class="fa fa-pencil-square-o" aria-hidden="true"></i></span>'
        document.getElementById('edit_'+p).onclick=function(){BCO.edit(this,p,bco)}
    }
    sp.style.color='maroon'
}


BCO.bcoEditor=function(bc,bco){
    if(typeof(bc)=='string'){
        bcoEditorDiv.innerHTML='<span style="color:red"> loading ...</span>'//+bc
        $.getJSON(bc)
         .then(function(jsn){
             console.log('editing '+bc)
             //add automated parameters here ...
             if(!jsn.parentURL){
                 jsn.parentURL = parentURLinput.value // ... such as parent provenance
             }else{
                 jsn.parentURL +=', '+parentURLinput.value
             }
             BCO.bcoEditor(jsn,bco)
         })
    }else{
        //bcoEditorDiv.innerHTML=JSON.stringify(bc,3)
        bco.dt=bc // storing teh data in teh instance object
        bcoEditorDiv.innerHTML='' // reseting div content
        Object.getOwnPropertyNames(bc).forEach(function(p){
            BCO.editParm(bco,p) // note bco instance being passed by reference
            //this.bcoJSON=bc
        })
        // create new field
        var newParm=function(bco){
            var newDiv = document.createElement('div')
            newDiv.id='newParmDiv'
            newDiv.innerHTML='<button id="createNewField" class="btn btn-primary">create new field</button> <input id="newFieldName" style="color:maroon"><br>Literal <input type="checkbox" id="newLit" checked> Structure <input id="newStruct" type="checkbox">'
            $('#bcoEditorDiv',bco.div)[0].appendChild(newDiv)
            var newLit = $('#newLit',newDiv)[0]
            var newStruct = $('#newStruct',newDiv)[0]
            newStruct.onchange=function(){newLit.checked=!newStruct.checked}
            newLit.onchange=function(){newStruct.checked=!newLit.checked}
            var createNewField=$('#createNewField',newDiv)[0]
            createNewField.onclick=function(){
                var lala = bco
                var nm = $('#newFieldName',newDiv)[0].value
                if(nm.length>0){
                    if(newStruct.checked){bco.dt[nm]={}}
                    else{bco.dt[nm]=""}
                }
                BCO.editParm(bco,nm)
                newDiv.parentElement.removeChild(newDiv)
                newParm(bco)
            }
            $('#newFieldName',newDiv)[0].onkeyup=function(ev){
                if(ev.keyCode==13){createNewField.click()} // allow enter as an equivalent to button click
            }
            //debugger
        }
        newParm(bco)    
        setTimeout(function(){
            if(document.getElementById('hide_execution_domain')){
                hide_execution_domain.click()
            }
        },1000)
    }
    
};

BCO.doneEdit=function(that,cmd){
    cmd=cmd||'done'
    var div = that.parentElement
    var bco = div.bco
    if(div.id.length==0){ // this is a literal
        div=div.parentElement
        $('textarea',div)[0].value=JSON.stringify($('textarea',div)[0].value)
    }
    var parm = div.id.slice(10)

    switch (cmd){
        case 'done':            
            bco.dt[parm]=JSON.parse($('textarea',div)[0].value) // update bco.dt parm           
            BCO.editParm(bco,parm,div) // reassemble div
            // if it is a structure show <pre>
            if($('pre',div).length>0){
                $('#hide_'+parm,div)[0].click()
            }
            break;
        case 'cancel':
            BCO.editParm(bco,parm,div) // reassemble div
            // if it is a structure show <pre>
            if($('pre',div).length>0){
                $('#hide_'+parm,div)[0].click()
            }
            break;
        case 'erase':
            delete bco.dt[parm]
            div.parentElement.removeChild(div)
    }

            

            
}



//(function(){new BCO()})()

bco = new BCO('https://mathbiol.github.io/bco/BCOexamples/snpDetection.json')
//new BCO('BCOexamples/snpDetection.json')