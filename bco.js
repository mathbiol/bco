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
            that.div=BCO.UI(document.getElementById('bcoDiv'))
        }
    })
    

}

// BCO fun 

BCO.UI=function(div){ // creates UI in target div
    console.log('bcoDiv found, assembling UI')
    var h = '<h3 style="color:maroon">Experimenting with Biocompute Objects (BCO) <a href="https://github.com/mathbiol/bco" target="_blank"><i class="fa fa-github-alt" aria-hidden="true"></i></a></h3><hr>'
    h +='<div id="bcoCompDiv"></div>' // where the computation will happen
    div.innerHTML=h

    // GWU examples
    var gwu = {
        'SNP detection':'https://mathbiol.github.io/bco/BCOexamples/snpDetection.json',
        'Metagenomics':'https://mathbiol.github.io/bco/BCOexamples/metagenomics.json',
        'Huntington Disease':'https://mathbiol.github.io/bco/BCOexamples/huntingtonDisease.json.json'
    }
    h = 'Parent BCO: <input id="parentURLinput" size=50><br>'
    h += 'or pick one from <a href="https://hive.biochemistry.gwu.edu/htscsrs/examples" target="_blank">GWU</a>:<br>'
    bcoCompDiv.innerHTML=h
    var sel = document.createElement('select')
    bcoCompDiv.appendChild(sel)
    Object.getOwnPropertyNames(gwu).forEach(function(p){
        var op = document.createElement('option')
        op.textContent=p
        sel.appendChild(op)

    })
    





    return div
}

b = new BCO(9)