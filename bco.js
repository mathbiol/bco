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
    var h = '<h3 style="color:maroon">Experimenting with<br> Biocompute Objects (BCO) <a href="https://github.com/mathbiol/bco" target="_blank"><i class="fa fa-github-alt" aria-hidden="true"></i></a></h3><hr>'
    h +='<div id="bcoCompDiv"></div>' // where the computation will happen
    div.innerHTML=h

    // GWU examples
    var gwu = {
        'SNP detection':'https://mathbiol.github.io/bco/BCOexamples/snpDetection.json',
        'Metagenomics':'https://mathbiol.github.io/bco/BCOexamples/metagenomics.json',
        'Huntington Disease':'https://mathbiol.github.io/bco/BCOexamples/huntingtonDisease.json'
    }
    h = 'Type or paste URL of parent BCO: <br><input id="parentURLinput" size=100><br>'
    h += '... or pick one from <a href="https://hive.biochemistry.gwu.edu/htscsrs/examples" target="_blank">GWU</a>:<br>'
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

BCO.bcoEditor=function(bc){
    if(typeof(bc)=='string'){
        bcoEditorDiv.innerHTML='loading '+bc
        $.getJSON(bc)
         .then(function(jsn){
             console.log('editing '+bc)
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
                //spHide.className='btn btn-primary'
                //spHide.type='button'
                spHide.innerHTML=' + '
                spHide.style.color='blue'
                spHide.id='hide_'+p
                div.appendChild(spHide)
                var pr = document.createElement('pre')
                div.appendChild(pr)
                pr.textContent=JSON.stringify(bc[p],null,3)
                pr.hidden=true
                spHide.onclick=function(){
                    if(this.textContent==' + '){
                        this.textContent=' - '
                        this.style.color='red'
                        pr.hidden=false
                    } else {
                        this.textContent=' + '
                        this.style.color='blue'
                        pr.hidden=true
                    }

                    
                    4
                }
            }else{
                sp.innerHTML=p+': <span style="color:blue">'+bc[p]+'</span>'
            }
            sp.style.color='maroon'
                

            4

        })
        setTimeout(function(){
            hide_execution_domain.click()
        },1000)
    }
    
};


//(function(){new BCO()})()

bco = new BCO('https://mathbiol.github.io/bco/BCOexamples/snpDetection.json')