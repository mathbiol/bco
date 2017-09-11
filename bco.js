console.log('bco.js loaded')

BCO = function (url){

    this.load=function(url){
        //load bco object from url
        this.url=url
    }

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
    h = 'Type or paste URL of parent BCO: <br><input id="parentURLinput" size=100><br>'
    h += '... or pick one from <a href="https://hive.biochemistry.gwu.edu/htscsrs/examples" target="_blank"><i class="fa fa-arrow-right" aria-hidden="true"></i> GWU <i class="fa fa-arrow-left" aria-hidden="true"></i></a>:<br>'
    h += '<select id="selectParent"></select>'
    h += '<hr>'
    h += '<div id="bcoEditorDiv"></div>'
    bcoCompDiv.innerHTML=h
    Object.getOwnPropertyNames(gwu).forEach(function(p){
        var op = document.createElement('option')
        op.textContent=p
        op.value=p
        selectParent.appendChild(op)
    })
    selectParent.onchange=function(s,m){
        parentURLinput.value=gwu[selectParent.selectedOptions[0].value]
        BCO.bcoEditor(parentURLinput.value)
    }
    // on input url change
    parentURLinput.onchange=function(ip){
       BCO.bcoEditor(ip.target.value)
    }
    if(bco.url){ // if url was provided already
        parentURLinput.value=bco.url
        BCO.bcoEditor(bco.url)
    }
    return div
}

BCO.edit=function(that,p,bc){
    //var attr = that.id.slice(5) // what comes after 'edit'
    var h = '<b style="color:maroon">'+p+'</b> '
    h += '<span id="doneEdit_'+p+'" style="color:green;cursor:pointer" onclick="BCO.doneEdit(this)"><i class="fa fa-check" aria-hidden="true"></i> done</span>'
    h += ' <span id="cancelEdit_'+p+'" style="color:orange;cursor:pointer"><i class="fa fa-reply" aria-hidden="true"></i> cancel</span>'
    h += ' <span id="deleteEdit_'+p+'" style="color:red;cursor:pointer"><i class="fa fa-times" aria-hidden="true"></i> erase</span>'
    h += '<textArea id="textArea_'+p+'" style="vertical-align:top;width:100%;background-color:WhiteSmoke">'+that.parentElement.textContent+'</textArea>'
    var el = that.parentElement // editing literal
    el.innerHTML=h
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

/*
BCO.editParm=function(bc,p){
    var div = document.createElement('div')
    div.id='parameter_'+p
    bcoEditorDiv.appendChild(div)
    var sp = document.createElement('span')
    sp.innerHTML=p
    div.appendChild(sp)
    if(typeof(bc[p])=='object'){
        var spHide = document.createElement('span')
        spHide.innerHTML=' + '
        spHide.style.color='blue'
        spHide.id='hide_'+p
        div.appendChild(spHide)
        var spEdit = document.createElement('span')
        spEdit.innerHTML='<i id="edit_'+p+'" style="color:black" class="fa fa-pencil-square-o" aria-hidden="true"></i><br>'
        div.appendChild(spEdit)
        spEdit.hidden=true
        spEdit.onclick=function(){BCO.edit(this,p,bc)}
        var pr = document.createElement('pre')
        div.appendChild(pr)
        pr.textContent=JSON.stringify(bc[p],null,3)
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
        sp.innerHTML=p+': <span style="color:blue;cursor:pointer">'+bc[p]+' <i id="edit_'+p+'" style="color:black" class="fa fa-pencil-square-o" aria-hidden="true"></i></span>'
        document.getElementById('edit_'+p).onclick=function(){BCO.edit(this,p,bc)}
    }
    sp.style.color='maroon'
}
*/

BCO.bcoEditor=function(bc){
    if(typeof(bc)=='string'){
        bcoEditorDiv.innerHTML='loading '+bc
        $.getJSON(bc)
         .then(function(jsn){
             console.log('editing '+bc)
             jsn.parentURI = parentURLinput.value            
             BCO.bcoEditor(jsn)
         })
    }else{
        //bcoEditorDiv.innerHTML=JSON.stringify(bc,3)
        bcoEditorDiv.innerHTML='' // reseting div content
        Object.getOwnPropertyNames(bc).forEach(function(p){
            var div = document.createElement('div')
            div.id='parameter_'+p
            bcoEditorDiv.appendChild(div)
            var sp = document.createElement('span')
            sp.innerHTML=p
            div.appendChild(sp)
            if(typeof(bc[p])=='object'){
                var spHide = document.createElement('span')
                spHide.innerHTML=' + '
                spHide.style.color='blue'
                spHide.id='hide_'+p
                div.appendChild(spHide)
                var spEdit = document.createElement('span')
                spEdit.innerHTML='<i id="edit_'+p+'" style="color:black" class="fa fa-pencil-square-o" aria-hidden="true"></i><br>'
                div.appendChild(spEdit)
                spEdit.hidden=true
                spEdit.onclick=function(){BCO.edit(this,p,bc)}
                var pr = document.createElement('pre')
                div.appendChild(pr)
                pr.textContent=JSON.stringify(bc[p],null,3)
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
                sp.innerHTML=p+': <span style="color:blue;cursor:pointer">'+bc[p]+' <i id="edit_'+p+'" style="color:black" class="fa fa-pencil-square-o" aria-hidden="true"></i></span>'
                document.getElementById('edit_'+p).onclick=function(){BCO.edit(this,p,bc)}
            }
            sp.style.color='maroon'
                

            4

        })
        setTimeout(function(){
            hide_execution_domain.click()
        },1000)
    }
    
};

BCO.doneEdit=function(that){
    var div = that.parentElement
    var parm = div.id.slice(10)
    debugger
}


//(function(){new BCO()})()

bco = new BCO('https://mathbiol.github.io/bco/BCOexamples/snpDetection.json')