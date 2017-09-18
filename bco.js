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
    var h = '<h2><img id="qrCode" src="qrCode.jpg" hidden=true><br><button id="hideQR" type="button" class="btn btn-primary">QR</button> <a href="http://bit.ly/bcoexec" target="_blank">bit.ly/bcoexec</a></h2><h3 style="color:maroon">Experimenting with<br> Biocompute Objects (BCO) <a href="https://github.com/mathbiol/bco" target="_blank"><i class="fa fa-github-alt" aria-hidden="true"></i></a></h3><hr>'
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
    h = 'Type or paste URL of parent BCO (then Enter): <br><input id="parentURLinput" size=100><br>'
    h += '... or pick one from <a href="https://hive.biochemistry.gwu.edu/htscsrs/examples" target="_blank"><i class="fa fa-arrow-right" aria-hidden="true"></i> GWU <i class="fa fa-arrow-left" aria-hidden="true"></i></a>:<br>'
    h += '<select id="selectParent"></select>'
    h += '<hr style="border-color:maroon">'
    h += '<div id="bcoEditorDiv"></div>'  
    h += '<hr style="border-color:maroon">'
    h += '<button style="color:navy;font-weight:bold;background-color:yellow">Download edited BCO structure</button> as a new file (use Chrome).'
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
        bco.div.selectedIndex=selectParent.selectedIndex
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
    //return div
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
        spHide.innerHTML=' + '
        spHide.style.color='navy'
        spHide.id='hide_'+p
        div.appendChild(spHide)
        var spEdit = document.createElement('span')
        spEdit.innerHTML='<i id="edit_'+p+'" style="color:black" class="fa fa-pencil-square-o" aria-hidden="true"></i><br>'
        div.appendChild(spEdit)
        spEdit.hidden=true
        spEdit.onclick=function(){BCO.edit(this,p,bco)}
        var pr = document.createElement('pre')
        div.appendChild(pr)
        pr.textContent=JSON.stringify(bc[p],null,3)
        pr.style.color="navy"
        pr.hidden=true
        spHide.onclick=function(){
        if(this.textContent==' + '){
            this.innerHTML=' - '
            this.style.color='red'
            pr.hidden=spEdit.hidden=false
            //BCO.edit(this)
        } else {
            this.textContent=' + '
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
        bcoEditorDiv.innerHTML='loading '+bc
        $.getJSON(bc)
         .then(function(jsn){
             console.log('editing '+bc)
             //add automated parameters here ...
             jsn.parentURL = parentURLinput.value // ... such as parent provenance           
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
            newDiv.innerHTML='<button style="color:navy" id="createNewField">create new field</button> <input id="newFieldName" style="color:maroon"><br>Literal <input type="checkbox" id="newLit" checked> Structure <input id="newStruct" type="checkbox">'
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
            hide_execution_domain.click()
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

// bco = new BCO('https://mathbiol.github.io/bco/BCOexamples/snpDetection.json')
bco = new BCO('BCOexamples/snpDetection.json')