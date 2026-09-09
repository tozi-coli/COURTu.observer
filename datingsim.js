//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//
//                                                                      //
//                    ---=== COURTu.observer ===---                     //
//                                                                      //
//                  a dating sim mod for corru.observer                 //
//           featuring the entire call research team + miltza,          //
//                         ?? different endings,                        //
//                    and a lot of new moth dialogue!                   //
//                                                                      //
//        writing by: @bra1nslug & @dutokrisa & @sshatteredstars        //
//          icons, character sprites, backgrounds by: @bra1nslug        //
//                          code by: @dutokrisa                         //
//                          (discord usernames)                         //
//                                                                      //
//                        released on ??.??.2026                        //
//                                                                      //
//                        check out the source at:                      //
//             https://github.com/tozi-coli/courtu.observer             //
//                                                                      //
//       feel free to share it with your friends/on social media,       //
//          record/stream playthroughs, and, most importantly,          //
//                               have fun!                              //
//                                                                      //
//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//-//

if (
    !check('ep1_end') || // pre ep2?
    (check("hub__funfriend-mothframe2") && !check("DSOUTER!!funfriendInstalled")) || // began ep2 without dating sim?
    check("embassy__d3_movefriend_finish-end") // post ep2?
) {
    setTimeout(() => document.body.insertAdjacentHTML('beforeend', `
<style>
.datelogo, .datelogo span {
  font-family: barcodetext;
  font-size: 250% !important;
  color: white;
}
.datelogo>span {
  font-family: bastard;
  color: var(--bastard-color) !important;;
  font-size: 100% !important;
  position: relative;
  top: 0.2em;
}</style>
<div id="datingsim-warning" class="popup-warning">
    <div class="sysblock">
        <div class="sysbox">
            <h3>!!__WARNING__!!</h3>
            <p class="sysinfo">The modification "<span class="datelogo"><span>COURT</span>u.observer</span>" requires a fresh EP2 log to function.</p>
            <p class="sysinfo">Reason: story continuity, behavior not tested in later logs, collapse unavaliable in earlier logs.</p>
            <p class="sysinfo">Recommendation: proceed to system management -> mindspike data management, export the current log, then select log EP2.</p>
            <div class="buttons">
                <span class="button" onclick="document.querySelector('#datingsim-warning').remove(); toggleSysMenu(); document.querySelector('.sysblock').setAttribute('open', '')">ok</span>
            </div>
        </div>
    </div>
</div>
    `), 1500);
    throw Error("COURTu.observer is not designed to work on the current save! bye")
}

dsURL = "http://127.0.0.1:5500"

ds = {

    // csshtml

    css: `
.datelogo, .datelogo span {
  font-family: barcodetext;
  font-size: 250% !important;
  color: white;
}
.datelogo>span {
  font-family: bastard;
  color: var(--bastard-color) !important;;
  font-size: 100% !important;
  position: relative;
  top: 0.2em;
}
#datecredits {
    position: fixed;
    top: 0;
    left: 0;
  
    width: 100%;
    height: 100%;
  
    z-index: 9999;
  
    background: #000000bd;
  
    display: flex;
    justify-content: center;
    align-items: center;
  
    padding: 1rem;
}
#datecredits .block {
    width: 800px;
    text-align: center;
    background: black;
    background-image: linear-gradient(0deg, #000000f0, #00000040), url("/img/textures/corruripplebastard.gif");
    border: 1px solid var(--bastard-color);
    margin-top: 1em;
    padding: 1em 3em;
}
#datecredits p,
#datecredits span {
    margin-bottom: 1rem;
    color: white;
}
#datecredits p {
  text-align: left;
}
#datecredits span {
    font-size: 1rem;
}
#datecredits h3 {
    font-size: 1.5em;
    margin-bottom: 2rem;
}
#datecredits h3>em {
  font-size: 1rem;
  color: #FFFF00
}
#datecredits h3:last-of-type {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
#datecredits .button {
    font-size: 2rem;
    display: inline-block;
    width: auto;
    text-transform: uppercase;
    color: #FFFF00;
    max-width: 400px;
    margin-bottom: 0.3rem;
    margin-top: 1.25rem;
}
#datecredits .button:hover {
    color: black;
}
#datecredits .name, #datecredits .name * {
  color: #FFFF00;
  font-size: 110%;
}


body.flash.datingtime #dialogue-box {
    z-index: 20;
}
body.flash.datingtime #static {
    z-index: 18;
}

#datingintro {
  width: 100%;
  height: 100vh;

  background-image: url("/img/textures/badstatic.gif");

  position: absolute;
  top: 0;
  left: 0;

  z-index: 19;

  transition: all ease-in 3s;
}
#datingintro.show {
  opacity: 0%;
  transition: all ease-out 3s;
  pointer-events: none;
}

#datingsim {
  width: 100%;
  height: 100vh;

  background: gray;

  display: block;

  transition: opacity ease-in 0.5s;

  overflow: hidden;
}
.in-dialogue #datingsim, .in-menu #datingsim, .mui-active #datingsim {
  pointer-events: none;
  opacity: 75%;
  transition: opacity ease-in 0.5s;
}
 .in-dialogue #datingsim *, .in-menu #datingsim *, .mui-active #datingsim * {
  pointer-events: none;
}
#datingsim span[definition]:not(.button) {
    border-bottom: 2px dashed;
}

#datebar, #datemenu, #dateinventory {
  width: 90vw;
  height: 27vh;

  position: absolute;

  left: 5vw;
  bottom: 2vh;

  padding: 15vw;
  padding-top: 5vh;
  padding-bottom: 6vh;

  overflow: hidden;

  background: linear-gradient(#000000, transparent), linear-gradient(#000000AA), url("/img/textures/badstatic.gif");

  border: 2px black solid;
  border-image: linear-gradient(#000, #ff0) 2;

  font-size: 140%;

  cursor: default;

  z-index: 10;
}
#datebar::before,
#datebar::after {
  content: "DATING";

  position: absolute;
  top: 0;
  left: -1vw;

  font-family: barcode;
  font-size: max(12vw, 105px);

  writing-mode: sideways-rl;

  color: transparent;
  background: linear-gradient(#000, #dd0);
  background-clip: text;

}
#datebar::after {
  left: unset;
  right: -1vw;

  writing-mode: sideways-lr;
}

#datespeak, #datespeakshadow {
  line-height: 1.5em;
  font-size: 90%;
  display: inline;
}
#datespeakshadow {
  color: transparent !important;
  text-shadow: transparent !important;
  border-color: transparent !important;
}

#dateoptions {
  width: 100%;

  position: absolute;
  bottom: 1vh;
  left: 0;

  font-family: barcodetext;
  font-size: 1.5em;

  text-align: center;

  color: #ff0;
}
#dateoptions span {
  opacity: 30%;
  cursor: pointer;
  transition: opacity ease-out 0.3s;
  
  border: none !important;
}
#dateoptions span:hover {
  opacity: 100%;
  transition: opacity ease-in 0.1s;
}
#dateoptions span:active {
  opacity: 100%;
}
#dateoptions span.selected {
  color: #0ff;;
}

#datename {
  font-family: barcodetext;
  font-size: max(3.5em, 50px);

  position: absolute;
  bottom: 29vh;
  left: 5vw;

  padding-left: calc( 2.5vw + 1em );
  padding-right: 2vw;
  padding-top: 1.5vh;
  padding-bottom: 0.7vh;

  background: black;
  text-shadow: 2.5px 2.5px 0px #ffff0040;

  overflow: hidden;

  cursor: default;

  z-index: 9;
  
  transition: bottom ease 0.5s;
}
#datename::before {
  content: "";
  
  display: block;
  
  position: absolute;
  top: 0;
  left: 0;
  
  background: #ff0;
  
  height: 0.5vh;
  width: 100%;
}
#datename::after {
  content: "DATENAME";

  font-family: barcode;
  font-size: 230%;

  position: absolute;
  top: -2px;
  left: 0;

  text-shadow: none;
  opacity: 10%;
  color: #ff0;

  overflow: hidden;

  z-index: 9;
}

#datename.noicon {
  padding-left: 1.5vw;
}
#datenameimg {
  position: absolute;
  
  height: 1em;
  min-width: 1em;

  image-rendering: pixelated;

  background-size: cover;
  background-image: url(${dsURL}/img/icons.png);

  z-index: 10;

  left: 1.5vw;
}
#datename.noicon #datenameimg {
  display: none;
}
#datenameimg.akizet {  background-position: 0 0; }
#datenameimg.cavik {  background-position: -1em 0; }
#datenameimg.bozko {  background-position: -2em 0; }
#datenameimg.kazki {  background-position: -3em 0; }
#datenameimg.gakvu {  background-position: -4em 0; }
#datenameimg.tozik {  background-position: -5em 0; }
#datenameimg.miltza {  background-position: -6em 0; }
#datenameimg.nrrtr {  background-position: -7em 0; }

#datenameinner::before {
  content: "::";
}
#datenameinner {
  position: relative;

  z-index: 10;
}
#datename.obesk {
  text-shadow: 2.5px 2.5px 0px #ff00ff40;
}
#datename.obesk::after {
  color: #f0f;
}
#datename.obesk::before {
  background: #f0f;
}
#datename.nrrtr {
  text-shadow: 2.5px 2.5px 0px #ff006640;
}
#datename.nrrtr::after {
  color: #ff0066;
}
#datename.nrrtr::before {
  background: #ff0066;
}
#datename.loper {
  background: white;
  
  color: black;
  text-shadow: none;
}
#datename.loper::after {
  color: #fff;
}
#datename.loper::before {
  background: #000;
}
#datename.hidden {
  bottom: 18vh;
}

#datechoices {
  position: absolute;
  left: 15vw;  

  width: 70vw;
  height: 78vh;

  text-align: center;
  align-content: center;

  font-size: 140%;
}
#datechoices>div {
  position: relative;
  
  background: linear-gradient(90deg, transparent, #000000, transparent), linear-gradient(#00000050), url("/img/textures/badstatic.gif");

  margin-bottom: 2vh;

  padding: 0.8vh;
  padding-right: 4vw;
  padding-left: 4vw;

  border: 2px black solid;
  border-image: linear-gradient(90deg, #ff0, #000, #ff0) 2;
  
  overflow: hidden;
  
  z-index: 8;
  
  cursor: pointer;
  
  transition: border-width ease-out 0.5s, margin-right ease-out 0.5s, margin-left ease-out 0.5s, font-size ease-out 0.5s;
}
#datechoices>div:hover {
  border-width: 5px;
  
  margin-right: -1vw;
  margin-left: -1vw;
  
  font-size: 105%;
  
    transition: border-width ease-out 0.5s, margin-right ease-out 0.5s, margin-left ease-out 0.5s, font-size ease-out 0.5s;
}
#datechoices>div::after {
  content: "WOWADATINGCHOICEFORU!!";
  
  position: absolute;
  left: -5%;
  top: -2px;
  
  width: 110%;
  
  word-wrap: break-word;
  
  font-family: barcode;
  font-size: 10vw;
  
  color: transparent;
  background: linear-gradient(90deg, #ffff0030, transparent, transparent, #ffff0030);
  background-clip: text;
  
  transition: none;
}
#datechoices>div.incoherent:hover {
  color: #FFE0FF;
  background: linear-gradient(90deg, transparent, #000000, transparent), linear-gradient(#220022aa), url("/img/textures/corrurippletran.gif"), url("/img/textures/badstatic.gif");
}
#datechoices>div:active {
  border-image: linear-gradient(90deg, #000, #fff, #000) 2 !important;
  color: black !important;
  background: linear-gradient(white) !important;
  transition: color unset !important;
}
#datechoices>div:active::after {
  background: linear-gradient(90deg, #00000030, transparent, transparent, #00000030);
  background-clip: text;
}
#datechoices.hidden {
  opacity: 0%;
  transition: opacity ease-in 0.2s;
  pointer-events: none;
}

.datemenucontainer {
  position: absolute;
  bottom: 2vh;
  
  height: 97.5vh;
  width: 100%;
  
  overflow: hidden;
  
}
#datemenu, #dateinventory {
  height: 58vh;
  
  bottom: -31vh;
  
  padding: 0px;

  background: linear-gradient(0deg, #000000, transparent), linear-gradient(#000000AA), url("/img/textures/badstatic.gif");

  border-image: linear-gradient(0deg, #000, #ff0) 2;

  font-size: 100%;
    
  transition: bottom ease 0.75s;

  pointer-events: none;
  
  overflow: auto;
  scrollbar-color: #ffff0050 #00000050;
  
  z-index: 9;
}
#datemenu.show {
  bottom: 27vh;
  pointer-events: all;
}
#datemenu .title {
  font-family: barcodetext;
  font-size: 325%;
 
  color: black;
  background: #ff0;
  padding-top: 0.6vh;
  padding-bottom: 0.5vh;
  
  text-align: center;
  
  margin-top: 3vh;
  margin-bottom: 3vh;
}
#datemenu .content {
  position: relative;

  border: solid 1px #ff0;
  
  margin-left: 3vw;
  margin-right: 3vw;
  
  padding: 3vw;
  padding-top: 2vh;
  padding-bottom: 2vh;
}
#datemenu p:not(p:last-child) {
  margin-bottom: 1em;
}
#datemenu input, #datemenu select {
  border: none;
  outline: none;
  
  background: var(--bright-color);
  
  font-family: inherit;
  
  width: 5em;
}
#datedisplayexample {
  padding-left: 2em;
  color: #ffff00;
}
#datedisplayexample .shadow {
  color: #ffff0050
}
#datemenu .button {
  margin-left: 0.75vw;
  margin-right: 0.75vw;
  line-height: 1em;
}
#datemenu .button.selected {
  background: #00ffff;
  color: #000;
}
#datemenu .importantassbutton {
  margin-top: 1vh;
}
#datemenu .content>div:first-child {
  line-height: 1.5em;
  
  padding-top: 1vh;
  padding-bottom: 1vh;
  
  margin-bottom: 3vh;

  font-size: 100%;
  
  border: dashed yellow 1px;
}
#datemenu select {
  width: auto;
}
#datemenu .content>div {
    text-align: center;
}
#datemenu input[type="text"] {
  width: 15em;
}
#datemenu .importantassbutton:not(:first-of-type) {
  margin-top: 1vh;
}

#datecreditslink {
  position: absolute;

  bottom: 1vh;
  right: 1.5vw;

  font-family: barcode;
  font-size: 2em;

  color: #FF0;
}
#datecreditslink:hover {
  text-decoration: underline #FFFF00 solid;
}

#dateinventory {
  overflow: visible;
  
  width: 22.5vw;
  height: 11.5vh;
  
  bottom: 17vh;
  left: unset;
  right: 5vw;
  
  transition: bottom ease 0.5s;
  
  z-index: 9;
}
#dateinventory::before {
  content: "INVENTORY";
  
  padding-top: 0.3vh;
  padding-bottom: 0.2vh;
  
  display: block;
  
  text-align: center;
  
  font-family: barcodetext;
  font-size: 150%;
  
  color: black;
  
  background: #ff0;
}
#dateinventory.show {
  bottom: 29vh;
}

#datehint {
  position: absolute;
  top: 3vh;
  right: 0vw;
  
  width: 100%;
}
#datehint>div {
  position: absolute;
  top: 0;
  right: -60vh;
  
  transition: right ease-in 1s;
  
  font-size: 85%;
  
  background-image: linear-gradient(#000000aa), url("/img/textures/badstatic.gif");
  
  padding: 1.5vh;
  padding-left: 2vw;
  padding-right: 3vw;
}
#datehint>div::before {
  content: "";
  
  display: block;
  
  position: absolute;
  top: 0;
  left: 0;
  
  background: #ff0;
  
  height: 100%;
  width: 0.5vw;
}
#datehint>div.show {
  right: 0;
    transition: right ease-out 1s;
}
#datehint>div.bad::before {
  background: #f0f;
}
#datehint>div.good::before {
  background: #0ff;
}
#datehint>div.n1 {
  top: 6vh;
}
#datehint>div.n2 {
  top: 12vh;
}
#datehint>div.n3 {
  top: 18vh;
}
#datehint>div.n4 {
  top: 24vh;
}
#datehint>div.n5 {
  top: 30vh;
}

div.message.hint {
  border: none;
  border-right: #FFFF00 6px solid;
  border-left: #FFFF00 6px solid;
  text-align: center;
  padding: 0.75rem 1rem;
}
div.message.hint.positive {
  border-color: #00FFFF
}
div.message.hint.negative {
  border-color: #FF00FF
}

#datetriangle {
  position: absolute;
  
  color: #ff0;
  
  bottom: 2.2vh;
  left: 72.5vw;
}
#datetriangle>span {
  opacity: 30%;
}
#datetriangle>span.bright {
  opacity: 100%;
}
  
.readout-log .message.sourceless.dateless {
  background: black;
  color: yellow;
  text-transform: unset;
}
.readout-log .message.sourceless.dateless::after, .readout-log .message.sourceless.dateless::before {
  content: "DAOPcDAOPcDAOPc";

  position: absolute;
  top: 0;
  left: 1vw;

  font-family: barcode;
  font-size: 5em;

  writing-mode: sideways-rl;

  color: #ffff0030
}
.readout-log .message.sourceless.dateless::after {
  left: unset;
  right: 1vw;

  writing-mode: sideways-lr;
}

.readout-log .message.sourceless.dateless.nrrtr {
  color: #ff0066;
}
.readout-log .message.sourceless.dateless.nrrtr::after, .readout-log .message.sourceless.dateless.nrrtr::before {
  color: #ff006630;
}

.noTextAnimation span.fancy, .noTextAnimation span.bouncy,  .noTextAnimation span.shaky,  .noTextAnimation span.veryshaky,  .noTextAnimation span.annoying {
  animation-play-state: paused !important;
}
.noTextAnimationAtAll span.fancy, .noTextAnimationAtAll span.bouncy,  .noTextAnimationAtAll span.shaky,  .noTextAnimationAtAll span.veryshaky,  .noTextAnimationAtAll span.annoying {
  animation: none;
}

span.fancy {
  animation: FANCY 1s ease-in-out infinite alternate;
  display: inline-block;
}
span.fancy[value="1"] {
  animation-delay: -0.2s;
}
span.fancy[value="2"] {
  animation-delay: -0.4s;
}
span.fancy[value="3"] {
  animation-delay: -0.6s;
}
span.fancy[value="4"] {
  animation-delay: -0.8s;
}
span.fancy[value="5"] {
  animation-delay: -1s;
}
span.fancy[value="6"] {
  animation-delay: -1.2s;
}
span.fancy[value="7"] {
  animation-delay: -1.4s;
}
span.fancy[value="8"] {
  animation-delay: -1.6s;
}
span.fancy[value="9"] {
  animation-delay: -1.8s;
}
@keyframes FANCY {
    0% { transform:translateY(-8%) }
    100% { transform: translateY(8%) }
}

span.annoying {
  animation: ANNOYING 0.2s linear infinite alternate;
  display: inline-block;
}
span.annoying[value="1"] {
  animation-delay: -0.1s;
}
@keyframes ANNOYING {
    0% { transform:translateY(-6%) }
    100% { transform: translateY(6%) }
}

span.shaky {
  animation: SHAKY 0.5s linear infinite;
  display: inline-block;
}
span.shaky[value="1"] {
  animation-delay: -0.25s;
}
@keyframes SHAKY {
    0% { transform: translate(0px, 0.5px); }
    10% { transform: translate(-0.5px, -0.5px); }
    20% { transform: translate(-0.5px, 0.5px) ; }
    30% { transform: translate(0.5px, 0.5px); }
    40% { transform: translate(0.5px, -0.5px) ; }
    50% { transform: translate(-0.5px, 0.5px); }
    60% { transform: translate(-0.5px, 0.5px); }
    70% { transform: translate(0.5px, 0.5px); }
    80% { transform: translate(-0.5px, -0.5px) ; }
    90% { transform: translate(0.5px, 0.5px); }
    100% { transform: translate(0.5px, -0.5px); }
}

span.veryshaky {
  animation: VERYSHAKY 0.5s linear infinite;
  display: inline-block;
}
span.veryshaky[value="1"] {
  animation-delay: -0.25s;
}
@keyframes VERYSHAKY {
    0% { transform: translate(0px, 1px); }
    10% { transform: translate(-1px, -1px); }
    20% { transform: translate(-1px, 1px) ; }
    30% { transform: translate(1px, 1px); }
    40% { transform: translate(1px, -1px) ; }
    50% { transform: translate(-1px, 1px); }
    60% { transform: translate(-1px, 1px); }
    70% { transform: translate(1px, 1px); }
    80% { transform: translate(-1px, -1px) ; }
    90% { transform: translate(1px, 1px); }
    100% { transform: translate(1px, -1px); }
}

span.bouncy {
  animation: BOUNCY 0.4s ease-out infinite alternate;
  display: inline-block;
}
@keyframes BOUNCY {
    0% { transform:translateY(0%) }
    100% { transform: translateY(-15%) }
}
    

.datebg {
  position: absolute;

  opacity: 100%;

  width: 100%;
  height: 100vh;

  display: block;

  transition: opacity ease-in 0.5s;

  overflow: hidden;
}
.datebg.hide {
  opacity: 0%
}
.datebg.dissolve {
  transition: opacity ease-in 0.75s;
}
.datebg.dissolvelong {
  transition: opacity ease-in 2s;
}
.datebg.dissolveultralong {
  transition: opacity ease-in 5s;
}
.datebg[background="red"] {
    background: red;
}
.datebg[background="blue"] {
    background: blue;
}

#datingsim[background="light"] {
    background-image: url("/img/textures/static.gif")
}
#datingsim[background="dark"] {
    background-image: url("/img/textures/badstatic.gif")
}
    


.datecharacter {
  height:97.5vh;
  width: 34vw;
  
  position: absolute;
  
  bottom: 1vh;
  left: 33vw;
}
.datecharacter>div {
  height: 100%;
  width: 100%;
  
  position: absolute;
  top: 0;
  left: 0;
  
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

#akizet[pose="1"] .body, #akizet .body[sprite="neutral"] {
  background-image: url("${dsURL}/img/chrs/placeholder/akizet/pose1/bodyneutral.png")
}
#akizet[pose="1"] .receptors, #akizet .receptors[sprite="neutral"] {
  background-image: url("${dsURL}/img/chrs/placeholder/akizet/pose1/receptorsneutral.png")
}
#akizet[pose="1"] .receptors[sprite="curled"] {
  background-image: url("${dsURL}/img/chrs/placeholder/akizet/pose1/receptorscurled.png")
}
#akizet[pose="1"] .receptors[sprite="high"] {
  background-image: url("${dsURL}/img/chrs/placeholder/akizet/pose1/receptorshigh.png")
}
#akizet[pose="1"] .expression, #akizet .expression[sprite="neutral"] {
  background-image: url("${dsURL}/img/chrs/placeholder/akizet/pose1/eyesneutral.png")
}
#akizet[pose="1"] .expression[sprite="away"] {
  background-image: url("${dsURL}/img/chrs/placeholder/akizet/pose1/eyesaway.png")
}
#akizet[pose="1"] .expression[sprite="closed"] {
  background-image: url("${dsURL}/img/chrs/placeholder/akizet/pose1/eyesclosed.png")
}
  
.datecharacter.jump {
  animation: CHARJUMP 0.25s ease alternate;
  animation-iteration-count: 2;
}
@keyframes CHARJUMP {
  0% {transform: translate(0,0,)}
  100% {transform: translate(0px,-1.5vh)}
}
.datecharacter.bigjump {
  animation: CHARBIGJUMP 0.25s ease alternate;
  animation-iteration-count: 2;
}
@keyframes CHARBIGJUMP {
  0% {transform: translate(0,0,)}
  100% {transform: translate(0px,-3vh)}
}
.datecharacter.shake {
  animation: CHARSHAKE 0.5s linear;
  animation-iteration-count: 2;
}
@keyframes CHARSHAKE {
  0% {transform: translate(0,0)}
  25% {transform: translate(-1vw,0)}
  75% {transform: translate(1vw,0)}
  100% {transform: translate(0,0)}
}
.datecharacter.wiggle {
  animation: CHARWIGGLE 0.5s linear;
  animation-iteration-count: 2;
}
.datecharacter.singlewiggle {
  animation: CHARWIGGLE 0.5s linear;
  animation-iteration-count: 1;
}
@keyframes CHARWIGGLE {
  0% {transform: rotate(0)}
  25% {transform: rotate(2deg)}
  75% {transform: rotate(-2deg)}
  100% {transform: rotate(0)}
}
.datecharacter.laugh {
  animation: CHARLAUGH 0.5s linear;
  animation-iteration-count: infinite;
}
@keyframes CHARLAUGH {
  0% {transform: scale(1)}
  25% {transform: scale(1, 0.985)}
  75% {transform: scale(1, 1.015)}
  100% {transform: scale(1)}
}
.datecharacter.infinite {
  animation-iteration-count: infinite !important;
}`,
    html: `
<div id="datename" class="hidden"><span id="datenameimg"></span><span id="datenameinner">CANNY..?</span></div>
<div id="datebar">
  <div id="datespeak"></div>
  <div id="datespeakshadow"></div>
  <div id="dateoptions">
    <span onmouseover="play('muiHover')" onclick="ds.do.datemenu('settings')"
      definition="KEY::'escape'">SETTINGS</span> <span onmouseover="play('muiHover')"
      onclick="ds.do.datemenu('saveload')" definition="KEY::'q'">SAVE/LOAD</span> <span onmouseover="play('muiHover')"
      onclick="MUI('toggle');" definition="KEY::'right click'">HISTORY</span> <span onmouseover="play('muiHover')"
      onclick="ds.do.inv()" definition="KEY::'z'">INVENTORY</span> <span onmouseover="play('muiHover')"
      onclick="ds.do.auto()" definition="KEY::'a'">AUTO</span> <span onmouseover="play('muiHover')"
      onclick="ds.do.skip()" definition="KEY::'d'">SKIP</span>
  </div>
  <div id="datetriangle"></div>
</div>
<div class="datemenucontainer">
  <div id="datemenu" class="">
    <div id="datesettings" class="title">SETTINGS</div>
    <div class="content">
      <p>::<span
          definition="NOTICE::'in milliseconds';'intended experience is 30';'characters may have slightly different text display speeds';'set to 0 to display text instantaneously'::ATTENTION::'see DEFAULT text blips for information on possible incompatibilities'">TEXT
          DISPLAY SPEED</span>:: <input type="number" min="0" step="5"><span id="datedisplayexample"></span>
      </p>
      <p>::<span
          definition="NOTICE::'in milliseconds';'intended experience is 4000';'after what amount of time does AUTO progress';'only after text is done being displayed'">AUTO
          SPEED</span>:: <input type="number" min="0" step="500"></p>
      <p>::<span
          definition="NOTICE::'sounds played when text is being displayed';'categorized as sfx';'see definitions of individual options for more information'">TEXT
          BLIPS</span>::<span value="true" onmouseover="play('muiHover')" onclick="ds.dm.settingSelect(event, 'blips')"
          class="button blips selected"
          definition="NOTICE::'intended experience';'short sounds playing in rapid succession'::WARNING::'does not work with instantaneous text display';'works poorly with a text display speed lower than 30ms'">DEFAULT</span><span
          value="corru" class="button blips" onmouseover="play('muiHover')"
          onclick="ds.dm.settingSelect(event, 'blips')"
          definition="NOTICE::'vanilla corru.observer blip behavior';'a singular sound at the start of each line of dialogue'">CORRU</span><span
          value="false" onmouseover="play('muiHover')" onclick="ds.dm.settingSelect(event, 'blips')"
          definition="NOTICE::'absence of blips'" class="button blips">DISABLED</span>
      </p>
      <p>::<span
          definition="NOTICE::'information about character reaction on user input';'displayed in upper left corner of the rendering device';'may be humorous'">HINTS</span>::
        <span value="true" onmouseover="play('muiHover')" definition="NOTICE::'intended experience';'display hints'"
          onclick="ds.dm.settingSelect(event, 'hints')" class="button hints selected">ENABLED</span><span value="false"
          onmouseover="play('muiHover')" onclick="ds.dm.settingSelect(event, 'hints')"
          definition="NOTICE::'do not display hints'" class="button hints">DISABLED</span>
      </p>
      <p>::<span
          definition="NOTICE::'decorative dialogue text animations';'such as';'letters shaking';'letters jumping';'letters floating'">TEXT
          ANIMATION</span>::
        <span value="true" onmouseover="play('muiHover')" definition="NOTICE::'intended experience';'animate text'"
          onclick="ds.dm.settingSelect(event, 'textanim')" class="button textanim selected">ENABLED</span><span
          value="paused" onmouseover="play('muiHover')" onclick="ds.dm.settingSelect(event, 'textanim')"
          definition="NOTICE::'do not animate text';'letters may be offset from original position but do not move actively'" class="button textanim">PAUSED</span><span
          value="false" onmouseover="play('muiHover')" onclick="ds.dm.settingSelect(event, 'textanim')"
          definition="NOTICE::'do not animate text';'letters are in original position'" class="button textanim">DISABLED</span>
      </p>
      <span onmouseover="play('muiHover')" class="button importantassbutton" onclick="ds.dm.savesettings()">SAVE
        SETTINGS</span><span onmouseover="play('muiHover')" class="button importantassbutton"
        onclick="ds.dm.resettodefault()">RESET TO DEFAULT</span>
        <span onmouseover="play('muiHover')" id="datecreditslink" onclick="ds.dm.credits()">credits</span>
    </div>
    <div id="datesaveload" class="title">SAVE/LOAD</div>
    <div class="content">
      <div>Save files are stored within the log file and may not be exported separately.<br>The session
        is not automatically saved to individual save slots; the user must write to them manually.<br>The session is, however,
        stored and automatically saved within the log file.</div>
      <div>
        <p>::SAVE SLOT:: <select id="datesaveslotselector" onchange="ds.dm.select(event)">
          </select></p>
        <p>::NAME:: <input id="datesavename" type="text" placeholder="untitled"></p>
        <p>::LAST SAVED::<span id="datesavetime">'never'</span></p>
        <span definition="NOTICE::'write to the selected save slot'" onmouseover="play('muiHover')"
          onclick="ds.dm.save()" class="button importantassbutton">SAVE</span><span
          definition="NOTICE::'load from the selected save slot';'refreshes the page'" onmouseover="play('muiHover')"
          onclick="ds.dm.load()" class="button importantassbutton">LOAD</span><span
          definition="NOTICE::'erase save file on the selected save slot'" onmouseover="play('muiHover')"
          onclick="ds.dm.erase()" class="button importantassbutton">ERASE</span><br><span
          definition="NOTICE::'restart from the beginning';'does not alter save file data within the save slots';'only the current session is affected'"
          onmouseover="play('muiHover')" onclick="ds.dm.restart()" class="button importantassbutton">RESTART</span>
      </div>
    </div>
  </div>
</div>
<div id="dateinventory" class=""></div>
<div id="datehint"></div>
<div id="datechoices" class="hidden"></div>
<div id="datescene">
  <div class="datebg"></div>
</div>`,


    // audio

    blipsSfx: new Howl({
        src: ["https://tozi-coli.github.io/courtu.observer/blips.wav"],
        preload: true,
        volume: 0.75,
        rate: 1,
        sprite: {
            nrrtr: [30, 29],
            vekoa: [270, 29],
            cavik: [510, 29],
            akizet: [750, 29],
            gakvu: [990, 29],
            kazki: [1230, 29],
            tozik: [1470, 29],
            bozko: [1710, 29],
            miltza: [1950, 29],
        }
    }),
    play(blipName, pitch = 0, volume = 0.75) { // copypaste of the corru function with some smallish changes; thank you corru

        // hi this is a COURTu.observer comment. anyway for some incomprehensible reason howler keeps throwing errors
        // when i try to change the rate of ds.blipsSfx, but it also. successfully changes the rate?
        // so i am just catching errors and ignoring them here since they seemingly signify absolutely nothing
        try {

            let basePitch = 1;
            let additionalPitch = 0;
            let randomPercentage = 0.2;

            switch (blipName) {
                case "dateless":
                    randomPercentage = 1;
                    basePitch = 0.8;
                    blipName = "nrrtr";
                    break;
                case "nrrtr":
                    randomPercentage = 0.9;
                    basePitch = 0.75;
                    break;
                case "vekoa":
                    randomPercentage = 0.05;
                    basePitch = 0.95;
                    break;
                case "akizet":
                case "cavik":
                    randomPercentage = 0.3;
                    basePitch = 0.85;
                    break;
                case "gakvu":
                    randomPercentage = 0.5;
                    basePitch = 0.85;
                    break;
                case "kazki":
                    randomPercentage = 0.2;
                    basePitch = 0.95;
                    break;
                case "tozik":
                    randomPercentage = 0.1;
                    basePitch = 0.85;
                    break;
                case "bozko":
                    randomPercentage = 0.25;
                    basePitch = 0.85;
                    break;
                case "miltza":
                    randomPercentage = 0.5;
                    basePitch = 0.85;
                    break;
            }

            if (typeof pitch == "number") additionalPitch = pitch;
            else { randomPercentage = 0; basePitch = 1; }

            ds.blipsSfx.rate(((Math.random() * randomPercentage) + basePitch) + additionalPitch);

        } catch (e) { }


        //duck the BGM briefly so the SFX doesn't layer with it too hard
        //also adjusts the amount by which we duck proportionally to the loudness of SFX
        if (env.bgm && !env.bgmIsFading && !env.noBgmDuck && localStorage['volume-sfx'] !== "0") {
            let intended = getModifiedVolume('music', env.bgm.intendedVol ? env.bgm.intendedVol : 1)
            let duckAmt = 1 - (isFinite(localStorage['volume-sfx']) ? (localStorage['volume-sfx'] * 0.5) : 0.5)
            env.bgm.volume(intended * duckAmt)
            setTimeout(() => { try { env.bgm.fade(intended * duckAmt, intended, 500) } catch (e) { } }, 500)
        }

        //play!
        ds.blipsSfx.volume(getModifiedVolume('sfx', volume))
        ds.blipsSfx.play(blipName)
    },


    // some settings flags idk

    typewriterSpeed: 30,
    autoSpeed: 4000,
    blips: true,
    hints: true,
    textAnimation: true,


    // important functions for accessing/writing to safefiles (also see datemenu (dm) for how it is implemented further)

    savefile: {

        // some info bout the flags btw
        // there are multiple types: DS!!, DSSAVE!!, DSSET!!, DSEND!!! and DSOUTER!!
        // the first one contains per-dating-sim-session data.therefore only it gets written to the dating sim save slots
        // the second one is for save file data storage, like DSSAVE!!1 is a save file with index 1. there is also a special DSSAVE!!index flag which keeps track of all currently occupied indexes
        // the third one is for settings storage
        // the fourth one is for completed endings
        // fifth one is for stuff that must persist between routes and restarts ect like tpwrt and unlocked moth questions

        isEmpty(index) {
            let file = check(`DSSAVE!!${index}`);

            if (file == false) return true;
            else return false;
        },
        access(index) {
            const file = check(`DSSAVE!!${index}`);

            if (file == false) return ["", "'never'", false];

            const jsonedFile = JSON.parse(file);

            return [jsonedFile.n, jsonedFile.t, jsonedFile.df, jsonedFile.ddf];
        },
        write(index, name) {

            const datingFlags = Object.fromEntries(Object.entries(flags).filter(flag => flag[0].includes('DS!!')));
            const datingDialogueFlags = Object.fromEntries(Object.entries(flags.dialogues).filter(flag => flag[0].includes('DS!!')));

            const time = new Date();
            const timeString = `'${time.toLocaleDateString()}';'${time.toLocaleTimeString()}'`;

            const file = {
                n: name,
                t: timeString,
                df: datingFlags,
                ddf: datingDialogueFlags
            }

            let indexFlag = check("DSSAVE!!index");
            if (indexFlag == false) indexFlag = [];
            if (typeof indexFlag.find((item) => item == index) == "undefined") indexFlag.push(index);
            indexFlag.sort((a, b) => { return a - b });
            change("DSSAVE!!index", indexFlag);

            return change(`DSSAVE!!${index}`, JSON.stringify(file));
        },
        erase(index) {
            let indexFlag = check("DSSAVE!!index");
            if (indexFlag == false) indexFlag = [];
            else {
                indexFlag = indexFlag.filter(item => item !== index);
                indexFlag.sort((a, b) => { return a - b });
            }
            change("DSSAVE!!index", indexFlag);

            return change(`DSSAVE!!${index}`, "DELETE");
        },

        removeCurrentSessionFlags() {
            const datingKeys = Object.keys(flags).filter(key => key.includes('DS!!')).concat(Object.keys(flags.dialogues).filter(key => key.includes('DS!!')));

            datingKeys.forEach(key => change(key, "DELETE"));

            return;
        },
        addFlagsToCurrentSession(flagsObject, dialogueFlagsObject) {
            Object.keys(flagsObject).forEach(key => change(key, flagsObject[key]));
            Object.keys(dialogueFlagsObject).forEach(key => seenDialogue(key));

            return;
        }
    },


    // stuff for dateoptions

    do: {
        datemenu(whatExactly) {
            switch (whatExactly) {
                case "close":
                    if (!datemenu.classList.contains("show")) return;
                    datemenu.classList.remove("saveload", "settings", "show");
                    play('muiToggle');
                    return;
                default:
                    if (datemenu.classList.contains("show") && datemenu.classList.contains(whatExactly)) return ds.do.datemenu("close");

                    if (datemenu.classList.contains("show")) {
                        if (whatExactly == "settings") datesettings.scrollIntoView({ behavior: "smooth", block: "center", container: "nearest" });
                        else datesaveload.scrollIntoView({ behavior: "smooth", block: "start", container: "nearest" })
                    } else {
                        if (whatExactly == "settings") datemenu.scroll(0, 0);
                        else datemenu.scroll(0, 2000);
                    }

                    datemenu.classList.remove("settings", "saveload");

                    datemenu.classList.add("show", whatExactly);
                    play('muiToggle');
                    return;
            }
        },
        inv() {
            if (dateinventory.classList.contains("show")) dateinventory.classList.remove("show");
            else dateinventory.classList.add("show");
            play('muiToggle');
            return;
        },
        auto() {
            if (ds.auto) ds.autoTurnOff(); else ds.autoTurnOn();
            return play('muiClick');
        },
        skip() {
            if (ds.skip) ds.skipTurnOff(); else ds.skipTurnOn()
            return play('muiClick');
        },
        keyboardNav(event) {
            if (env.cutscene || env.currentDialogue.active) return;

            let key = event.key || false;

            if (key) {
                switch (key.toLowerCase()) {
                    case "escape": ds.do.datemenu("settings"); return;
                    case "q": ds.do.datemenu("saveload"); return;
                    case "z": ds.do.inv(); return;
                    case "a": ds.do.auto(); return;
                    case "d": ds.do.skip(); return;

                    default: return;
                }
            }
        }
    },


    // auto and skip      Do not ask why i nest some things and not others its a vibe-based thing

    auto: false,
    autoTimeout: undefined,
    autoTurnOn() {
        ds.auto = true;
        document.querySelector("#dateoptions span:nth-last-child(2)").classList.add("selected");
        ds.autoTimeout = setTimeout(/*call function that advances dialogue*/() => { }, ds.autoSpeed);
        ds.skipTurnOff();
        ds.autoTimeout = setTimeout(() => { document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' })); }, ds.autoSpeed);
        return;
    },
    autoTurnOff() {
        ds.auto = false;
        document.querySelector("#dateoptions span:nth-last-child(2)").classList.remove("selected");
        clearTimeout(ds.autoTimeout);
        return;
    },

    skip: false,
    skipTurnOn() {
        ds.skip = true;
        document.querySelector("#dateoptions span:nth-last-child(1)").classList.add("selected");
        ds.coolSkipTriangleAnimation(0);
        ds.autoTurnOff();
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));
        return;
    },
    skipTurnOff() {
        ds.skip = false;
        document.querySelector("#dateoptions span:nth-last-child(1)").classList.remove("selected");
        return;
    },
    coolSkipTriangleAnimation(step) {
        if (!ds.skip) return datetriangle.innerHTML = "";

        switch (step) {
            case 3: step = 0;
            case 0: datetriangle.innerHTML = "<span class='bright'>▶</span><span>▶▶</span>"; break;
            case 1: datetriangle.innerHTML = "<span>▶</span><span class='bright'>▶</span><span>▶</span>"; break;
            case 2: datetriangle.innerHTML = "<span>▶▶</span><span class='bright'>▶</span>"; break;
        }

        return setTimeout(ds.coolSkipTriangleAnimation, 300, ++step);
    },


    // stuff for datemenu

    dm: {
        //settings
        currentTimeout: false,

        // slightly different typewriteText that doesnt add readouts, uses the sound argument a little differently and displays funny things if you fuck around
        // update but this might be majorly ifferent from the original function now but im not changing it it worksssssss
        // update i rewrotr the original function from half a stratch but this one idotn caree i dont careeee i 
        typewriteText({ givenText = "::TEXT DISPLAY SPEED EXAMPLE FOR INFORMED CHOICE ACHIEVAL", speed = ds.typewriterSpeed, sound = "nrrtr", char = 1, setFlags = true } = {}) {
            clearTimeout(ds.dm.currentTimeout);

            if (isNaN(speed)) { console.log(speed); return datedisplayexample.innerHTML = "::ERROR::'not a number'" };
            if (speed < 0) return datedisplayexample.innerHTML = "::ERROR::'negative value';'time travel is impossible'";
            if (speed == 0) return datedisplayexample.innerHTML = givenText;

            // the "fuck around" in question:       (more like the "if" in question god this piece of code sucks lol)  (i wrote it second try though you have to give me that)
            if (setFlags && check("DSOUTER!!tpwrtrDone") == false) {
                if (speed == 67 && check("DSOUTER!!tpwrtr67") == false) {
                    givenText = "::bruh";
                    change("DSOUTER!!tpwrtr67", true);
                } else if (ds.dm.tpwrt.firstValue == false) {

                    if (120 <= speed && check("DSOUTER!!tpwrtrSpoken")) {
                        givenText = "::IM NOT DOING THIS AGAIN OK SHUT UP";
                        ds.dm.tpwrt.end = true;
                        change("DSOUTER!!tpwrtrDone", true);
                    }

                    if ((120 <= speed) && (speed < 500)) givenText = "::THIS IS KIND OF WAY TOO SLOW, NO?";
                    else if (speed >= 500 && check("DSOUTER!!tpwrtrSorry") == false) givenText = "::TEXT DISPLAY SPEEWOW THIS IS SLOW AS FUCK";
                    if (120 <= speed) ds.dm.tpwrt.firstValue = speed;

                } else if (ds.dm.tpwrt.firstValue >= 500 && ds.dm.tpwrt.sorry == false && !check("DSOUTER!!tpwrtrSorry")) {
                    givenText = "::PARDON THE SWEAR I JUST GOT SURPRISED";
                    change("DSOUTER!!tpwrtrSorry", true);
                    ds.dm.tpwrt.sorry = true;
                } else if (speed > ds.dm.tpwrt.firstValue && ds.dm.tpwrt.secondValue == false) {
                    givenText = "::WHY ARE YOU SETTING IT EVEN HIGHER";
                    ds.dm.tpwrt.secondValue = speed;
                } else if (ds.dm.tpwrt.secondValue != false && speed >= ds.dm.tpwrt.secondValue && ds.dm.tpwrt.thirdValue == false) {
                    givenText = "::???????";
                    change("DSOUTER!!tpwrtrSpoken", true);
                    ds.dm.tpwrt.thirdValue = speed;
                } else if (ds.dm.tpwrt.thirdValue != false && speed < ds.dm.tpwrt.thirdValue && ds.dm.tpwrt.gotResponse == false && ds.dm.tpwrt.fifthValue == false) {
                    givenText = "::OKAY....";
                    ds.dm.tpwrt.gotResponse = true;
                } else if (ds.dm.tpwrt.thirdValue != false && speed >= ds.dm.tpwrt.thirdValue && ds.dm.tpwrt.fourthValue == false) {
                    givenText = "::ARE YOU LIKE. CLICKING THROUGH ALL MY RESPONSES";
                    ds.dm.tpwrt.fourthValue = speed;
                } else if (ds.dm.tpwrt.fourthValue != false && speed <= ds.dm.tpwrt.fourthValue && ds.dm.tpwrt.gotResponseSec == false && ds.dm.tpwrt.fifthValue == false) {
                    givenText = "::OKAY...........";
                    ds.dm.tpwrt.gotResponse = true;
                    ds.dm.tpwrt.gotResponseSec = true;
                } else if (ds.dm.tpwrt.fourthValue != false && speed > ds.dm.tpwrt.fourthValue && ds.dm.tpwrt.fifthValue == false) {
                    givenText = "::LISTEN I AM JUST A DAEMON WHAT DO YOU WANT";
                    ds.dm.tpwrt.gotResponse = true;
                    ds.dm.tpwrt.fifthValue = speed;
                } else if (ds.dm.tpwrt.fifthValue != false && speed >= ds.dm.tpwrt.fifthValue && ds.dm.tpwrt.end == false) {
                    givenText = "::WHATEVER NOT TALKING TO YOU ANYMORE";
                    ds.dm.tpwrt.end = true;
                    change("DSOUTER!!tpwrtrDone", true);
                }
            }

            let text = givenText.slice(0, char);

            if (givenText[char - 1] == "<") { // handling html tags properly
                let substring = givenText.substring(char);
                let closingSign = substring.indexOf(">") + 2;
                text += substring.substring(0, closingSign);
                char += closingSign;
            }

            let substring = givenText.substring(char);
            let closingSign = substring.indexOf(">") + 2;
            substring = substring.slice(0, closingSign) + '<span class="shadow">' + substring.slice(closingSign);
            text += '<span class="shadow">' + substring;

            datedisplayexample.innerHTML = text;

            char++;
            if (char <= givenText.length) return ds.dm.currentTimeout = setTimeout(ds.dm.typewriteText, speed, { givenText: givenText, speed: speed, sound: sound, char: char, setFlags: false });

            return;
        },

        tpwrt: { // :)
            firstValue: false,
            sorry: false,
            secondValue: false,
            thirdValue: false,
            fourthValue: false,
            gotResponse: false,
            gotResponseSec: false,
            fifthValue: false,
            end: false,
        },

        updateSettingsCorruFlags() { // grabs whatever is in the mod settings and transfers it to the corru save file
            change("DSSET!!typewriterSpeed", ds.typewriterSpeed);
            change("DSSET!!autoSpeed", ds.autoSpeed);
            change("DSSET!!blips", ds.blips);
            change("DSSET!!hints", ds.hints);
            change("DSSET!!textAnimation", ds.textAnimation);
            return;
        },
        updateSettingsModFlags(callHTML = true) { // grabs whatever is in the corru save file and transfers it to the mod settings
            ds.typewriterSpeed = check("DSSET!!typewriterSpeed");
            ds.autoSpeed = check("DSSET!!autoSpeed");
            ds.blips = check("DSSET!!blips");
            ds.hints = check("DSSET!!hints");
            ds.textAnimation = check("DSSET!!textAnimation");
            if (callHTML) ds.dm.updateSettingsHTML();
            return;
        },
        updateSettingsHTML(typewriterSpeed = ds.typewriterSpeed, autoSpeed = ds.autoSpeed, blips = ds.blips, hints = ds.hints, textAnimation = ds.textAnimation) { // grabs whatever is in the arguments (default: mod settings) and transfers it to the valuesclasses of according html
            document.querySelector("#datemenu input[step='5']").value = Number(typewriterSpeed).toString();
            document.querySelector("#datemenu input[step='500']").value = Number(autoSpeed).toString();

            document.querySelectorAll("#datemenu .button.selected").forEach(el => el.classList.remove("selected"));

            document.querySelector(`#datemenu .button.blips[value='${blips.toString()}']`).classList.add("selected");
            document.querySelector(`#datemenu .button.hints[value='${hints.toString()}']`).classList.add("selected");
            document.querySelector(`#datemenu .button.textanim[value='${textAnimation.toString()}']`).classList.add("selected");

            if (textAnimation == false) body.classList.add("noTextAnimation"); else body.classList.remove("noTextAnimation");
            if (textAnimation == "paused") body.classList.add("noTextAnimationAtAll"); else body.classList.remove("noTextAnimationAtAll");

            return;
        },

        savesettings(chatterArg = true) {
            if (chatterArg) play('muiClick');

            // gather the buttons first

            let blips = document.querySelector("#datemenu .button.blips.selected").attributes['value'].nodeValue;
            let hints = document.querySelector("#datemenu .button.hints.selected").attributes['value'].nodeValue;
            let textAnimation = document.querySelector("#datemenu .button.textanim.selected").attributes['value'].nodeValue;

            if (blips == "true") blips = true;
            else if (blips == "false") blips = false;

            if (hints == "true") hints = true;
            else hints = false;

            if (textAnimation == "true") textAnimation = true;
            else if (textAnimation == "false") textAnimation = false;

            // then apply it + number inputs to current mod settings

            ds.typewriterSpeed = Number(document.querySelector("#datemenu input[step='5']").value);
            ds.autoSpeed = Number(document.querySelector("#datemenu input[step='500']").value);
            ds.blips = blips;
            ds.hints = hints;
            ds.textAnimation = textAnimation;

            // then save it to the corru file

            ds.dm.updateSettingsCorruFlags();
            ds.dm.updateSettingsHTML();

            ds.dm.typewriteText();
            if (chatterArg) chatter({ text: `ATTENTION::'saved settings'`, actor: "sys", readout: true });
            return;
        },
        resettodefault() {
            play('muiClick');

            ds.dm.updateSettingsHTML(30, 4000, true, true, true);

            ds.dm.savesettings(false);
            return chatter({ text: `ATTENTION::'reset settings to default'`, actor: "sys", readout: true });
        },

        settingSelect(event, whereFrom) {
            play('muiClick');
            document.querySelectorAll("#datemenu .content>p span." + whereFrom).forEach(el => el.classList.remove("selected"));
            event.target.classList.add("selected");
            return;
        },

        // saveload
        currentSaveFileViewed: 0,

        select(event) {
            ds.dm.currentSaveFileViewed = Number(event.target.value);

            const selectedFile = ds.savefile.access(ds.dm.currentSaveFileViewed);

            datesavename.value = selectedFile[0];
            datesavetime.innerHTML = selectedFile[1];

            return;
        },
        refreshSaveOptions() {
            const indexFlag = check("DSSAVE!!index");

            let html = `<option value="0">EXECUTE::'create new save slot'</option>`;

            if (indexFlag) for (index of indexFlag) {
                const save = ds.savefile.access(index);
                html = html + `<option value="${index}">'${index}'::NAME::'${save[0]}'</option>`;
            }

            datesaveslotselector.innerHTML = html;

            datesaveslotselector.value = ds.dm.currentSaveFileViewed;
            ds.dm.select({ target: { value: ds.dm.currentSaveFileViewed } });

            return;
        },

        overwriteAttempt: false,
        overwriteTimeout: undefined,
        save() {
            play('muiClick');
            if (ds.savefile.isEmpty(ds.dm.currentSaveFileViewed) || ds.dm.overwriteAttempt) {
                ds.dm.overwriteAttempt = false;
                clearTimeout(ds.dm.overwriteAttemptTimeout);

                if (ds.dm.currentSaveFileViewed == 0) { // we do not write to index 0 - its the new save file option
                    let indexFlag = check("DSSAVE!!index");
                    if (indexFlag == false) ds.dm.currentSaveFileViewed = 1;
                    else ds.dm.currentSaveFileViewed = indexFlag[indexFlag.length - 1] + 1;

                    if (indexFlag.length > 49) {
                        setTimeout(() => chatter({ text: `ALERT::'total amount of save files';'${indexFlag.length}';'an excessive amount of save files could exceed maximum log file size';'consider deleting unuseful save files'`, actor: "sys", readout: true }), 3000);
                    }
                }

                let name = datesavename.value;
                if (name == "") name = "untitled";
                ds.savefile.write(ds.dm.currentSaveFileViewed, name);

                ds.dm.refreshSaveOptions();

                chatter({ text: `ATTENTION::'save successful'`, actor: "sys", readout: true });
            } else {
                ds.dm.overwriteAttempt = true;
                ds.dm.overwriteAttemptTimeout = setTimeout(() => { ds.dm.overwriteAttempt = false }, 2000);

                chatter({ text: `ATTENTION::'input again to overwrite'`, actor: "sys", readout: true });
            }
            return;
        },

        loadAttempt: false,
        loadTimeout: undefined,
        load() {
            play('muiClick');
            if (ds.savefile.isEmpty(ds.dm.currentSaveFileViewed)) return chatter({ text: `ERROR::'no data'`, actor: "sys", readout: true });

            if (ds.dm.loadAttempt) {
                ds.dm.loadAttempt = false;
                clearTimeout(ds.dm.loadAttemptTimeout);

                const flags = [ds.savefile.access(ds.dm.currentSaveFileViewed)[2], ds.savefile.access(ds.dm.currentSaveFileViewed)[3]];

                ds.savefile.removeCurrentSessionFlags();
                ds.savefile.addFlagsToCurrentSession(flags[0], flags[1]);

                chatter({ text: `ATTENTION::'load successful'`, actor: "sys", readout: true });

                //transition out. stole this from mountflags hehehehe
                flash(true); cutscene(true); MUI('off');
                if (env.bgm) env.bgm.fade(env.bgm.volume(), 0, 1000)
                corruStatic.play()
                corruStatic.fade(0, 0.5, 1000)

                setTimeout(() => {
                    readoutAdd({ message: `ALERT::RELOADING::...'`, name: "sys" })
                }, 1500)

                setTimeout(() => {
                    location.replace('/local/ocean/embassy?force=true')
                }, 3000)
            } else {
                ds.dm.loadAttempt = true;
                ds.dm.loadAttemptTimeout = setTimeout(() => { ds.dm.loadAttempt = false }, 2000);

                chatter({ text: `ATTENTION::'input again to load'`, actor: "sys", readout: true });
            }
            return;
        },

        eraseAttempt: false,
        eraseAttemptTimeout: undefined,
        erase() {
            play('muiClick');
            if (ds.savefile.isEmpty(ds.dm.currentSaveFileViewed)) return chatter({ text: `ERROR::'no data'`, actor: "sys", readout: true });

            if (ds.dm.eraseAttempt) {
                ds.dm.eraseAttempt = false;
                clearTimeout(ds.dm.eraseAttemptTimeout);

                ds.savefile.erase(ds.dm.currentSaveFileViewed);

                ds.dm.currentSaveFileViewed = 0;

                ds.dm.refreshSaveOptions();

                chatter({ text: `ATTENTION::'erasure successful'`, actor: "sys", readout: true });
            }
            else {
                ds.dm.eraseAttempt = true;
                ds.dm.eraseAttemptTimeout = setTimeout(() => { ds.dm.eraseAttempt = false }, 2000);

                chatter({ text: `ATTENTION::'input again to erase'`, actor: "sys", readout: true });
            }
            return;
        },

        restartAttempt: false,
        restartAttemptTimeout: undefined,
        restart() {
            play('muiClick');
            if (ds.dm.restartAttempt) {
                ds.savefile.removeCurrentSessionFlags();

                //transition out. stole this from mountflags hehehehe
                flash(true); cutscene(true); MUI('off');
                if (env.bgm) env.bgm.fade(env.bgm.volume(), 0, 1000)
                corruStatic.play()
                corruStatic.fade(0, 0.5, 1000)

                setTimeout(() => {
                    readoutAdd({ message: `ALERT::RELOADING::...'`, name: "sys" })
                }, 1500)

                setTimeout(() => {
                    location.replace('/local/ocean/embassy?force=true')
                }, 3000)
            } else {
                ds.dm.restartAttempt = true;
                ds.dm.restartAttemptTimeoutsetTimeout = setTimeout(() => { ds.dm.restartAttempt = false }, 2000);

                chatter({ text: `ATTENTION::'input again to restart'`, actor: "sys", readout: true });
            }
            return;
        },

        // credits

        credits() {
            document.body.insertAdjacentHTML('beforeend', `
<div id="datecredits">
  <div class="block">
    <h3><span class="datelogo"><span>COURT</span>u.observer</span><br><em>--the dating sim mod, was brought to you
        by...</em></h3>
    <p><span class="name">${ds.annoyingText("BRAINSLUG","@bra1nslug_ on discord, @bra1nslug on tumblr!")}</span>::'character
      sprite art';'background
      art';'writing'</p>
    <p><span class="name">${ds.shakyText("ANTIDOTE","@dutokrisa on discord, @tozik-observer-again on tumblr!")}</span>::'programming';'so much
      programming';'writing'</p>
    <p><span class="name">${ds.fancyText("SHATTEREDSTARS","@sshatteredstars on discord!")}</span>::'character sprite
      editing';'writing'</p>
    <h3><em>...with the help of...</em></h3>
    <p>PLAYTESTERS::'';''</p>
    <p>PERSON WHO CAME UP WITH THE NAME FOR THE MOD::'Remmiverde'</p>
    <div class="buttons">
      <span class="button" onmouseover="play('muiHover')"
        onclick="document.querySelector('#datecredits').remove();play('muiClick')">cool</span>
    </div>
  </div>
</div>
    `);
            return play('muiClick');
        }
    },


    // functions to do with displaying dialogue-related things

    isTextBeingWritten: false, // *immediately declares a variable (a property actually)*
    currentTypewriteText: false,
    currentTypewriteTimeout: false,
    // this function is a mess           update. no longer a mess i think!
    typewriteText({
        text = "no string!",

        speed = ds.typewriterSpeed,
        speedModifier = 0,

        actor = undefined,

        silent = false,
        additionalPitch = 0,

        currentNode = [0], // array for iterating on children of children
        light = datespeak,
        shadow = datespeakshadow
    } = {}) {

        if (ds.isTextBeingWritten == true && speed != 0) { // are we allowed to typewrite?

            // set up the correct, processed speed first (plus datetriangle display)
            let processedSpeed = speed;

            if (!ds.skip) {
                datetriangle.innerHTML = "";
                let actorSpeedBonus = Math.round(processedSpeed * getDialogueActor(actor).actorSpeedModifier);
                isNaN(actorSpeedBonus) ? actorSpeedBonus = 0 : actorSpeedBonus;
                let speedBonus = Math.round(processedSpeed * speedModifier);
                processedSpeed += Math.min(actorSpeedBonus, 15) + speedBonus;

                if (processedSpeed <= 0) processedSpeed = 1;
            } else processedSpeed = 1;


            // then prepare the text if that hasnt been done yet
            if (text != false) {
                ds.currentTypewriteText = text.replace("ξ", "");

                // could we be dealing with a ksi?
                const ksi = text.indexOf("ξ");
                if (ksi != -1) {
                    light.insertAdjacentHTML("beforeend", `<span></span>`);
                    light = light.lastChild;
                    text = text.slice(ksi + 1);
                }

                shadow.innerHTML = text;
                light.innerHTML = text;

                ds.removeTextFromAllNodes(light);

                if (light.childNodes[0].nodeType !== Node.TEXT_NODE) currentNode = ds.findNextTextNode(light.childNodes[0], currentNode)[1];
            }

            // then typewrite! this works by just transferring the letters from shadow to their respective nodes in light (outside shadow)

            let lightNode = light.childNodes[currentNode[0]];
            let shadowNode = shadow.childNodes[currentNode[0]];

            for (let i = 1; i < currentNode.length; i++) { // handling children nodes
                lightNode = lightNode.childNodes[currentNode[i]];
                shadowNode = shadowNode.childNodes[currentNode[i]];
            }

            lightNode.textContent = lightNode.textContent + shadowNode.textContent[0];
            if (ds.blips == true && !silent && !ds.skip && shadowNode.textContent[0] != " ") ds.play(actor, additionalPitch);
            shadowNode.textContent = shadowNode.textContent.slice(1, shadowNode.textContent.length);

            // then prepare for the next function! this is written a little weirdly buut

            let nextTextNode;

            if (shadowNode.textContent.length <= 0) nextTextNode = ds.findNextTextNode(lightNode, currentNode);
            else nextTextNode = [0, currentNode];

            if (nextTextNode) return ds.currentTypewriteTimeout = setTimeout(ds.typewriteText, processedSpeed,
                {
                    text: false,
                    speed: speed,
                    speedModifier: speedModifier,
                    actor: actor,
                    silent: silent,
                    additionalPitch: additionalPitch,
                    currentNode: nextTextNode[1],
                    light: light,
                    shadow: shadow
                }
            );
            else ds.isTextBeingWritten = false;

        } else { // we are not allowed to typewrite
            clearTimeout(ds.currentTypewriteTimeout);
            shadow.innerHTML = "";
            light.innerHTML = ds.currentTypewriteText;
        }

        if (!ds.skip) datetriangle.innerHTML = "⇀";
        else {
            if (speed == 0) return setTimeout(() => { document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' })); }, 20);

            return setTimeout(() => { document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' })); }, 9);
        }

        if (ds.auto) ds.autoTimeout = setTimeout(() => { document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' })); }, ds.autoSpeed);

        return;
    },
    removeTextFromAllNodes(element) {
        const nodes = element.childNodes;

        nodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.childNodes.length > 0) {
                ds.removeTextFromAllNodes(node);
            } else if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = "";
            }
        });

        return;
    },
    findNextTextNode(startNode, startNodeArray, checkOwnChildren = true) {
        // check if startNode has children (unless we're not doing that to avoid endless loops)
        if (checkOwnChildren && startNode.nodeType === Node.ELEMENT_NODE && startNode.childNodes.length > 0) { // well does it?
            const childNode = startNode.childNodes[0];
            startNodeArray.push(0);

            // is the child node a text node?
            if (childNode.nodeType === Node.TEXT_NODE) return [childNode, startNodeArray];
            // does the child node have a sibling OR children?
            else if ((childNode.nextSibling != null) || (childNode.nodeType === Node.ELEMENT_NODE && childNode.childNodes.length > 0)) return ds.findNextTextNode(childNode, startNodeArray);
            // the child is useless. backtrack the array
            else startNodeArray.pop();
        }

        // check whats up with the sibling
        const siblingNode = startNode.nextSibling;

        if (siblingNode != null) { // does the sibling exist?

            startNodeArray[startNodeArray.length - 1]++;

            // is the sibling a text node?
            if (siblingNode.nodeType === Node.TEXT_NODE) return [siblingNode, startNodeArray];
            // the sibling is useless. run the method on it to check its children and/or other siblings
            else return ds.findNextTextNode(siblingNode, startNodeArray);

        }

        // no siblings! we need to go to parent

        startNodeArray.pop();

        // did we run out of avaliable nodes?
        if (startNodeArray.length <= 0) { return false; } // no next text node
        // run the method on parent but do NOT let it check its children or it will loop forever style
        else return ds.findNextTextNode(startNode.parentNode, startNodeArray, false);
    },

    displayHint(text, type = "neutral", standardFormatting = true) {
        if (ds.hints == false) return;

        let index;

        if (document.querySelector(".n0") == null) index = "n0";
        else if (document.querySelector(".n1") == null) index = "n1";
        else if (document.querySelector(".n2") == null) index = "n2";
        else if (document.querySelector(".n3") == null) index = "n3";
        else if (document.querySelector(".n4") == null) index = "n4";
        else if (document.querySelector(".n5") == null) index = "n5";
        else return setTimeout(ds.displayHint, 1500, text, type, standardFormatting); // wait for a spot if there is none

        let hint = document.createElement("div");

        if (standardFormatting) text = "ATTENTION::'" + text + "'";

        hint.innerHTML = text;
        hint.classList.add(type, index);

        datehint.appendChild(hint);

        window.getComputedStyle(hint).bottom; // the browser is trying to out-optimize me? heh. i doesnt know what i am capable of

        hint.classList.add("show");

        readoutAdd({ message: text, type: "actor-sourceless hint " + type, show: false });

        setTimeout(() => { hint.classList.remove("show"); setTimeout(() => hint.remove(), 1000) }, 6000);

        return;
    },

    displayName(name = false, type = false, icon = false) {
        if (name == false) return datename.classList.add("hidden");

        datenameinner.innerHTML = name;
        datename.className = "";

        if (type) datename.className = type;
        if (icon) datenameimg.classList = icon;
        else datename.classList.add("noicon");

        return;
    },

    // nice animated text-generating function
    // note an issue for all of these: if you put two spaces anywhere in a row the animation will look slightly off

    fancyText(string, definition) { // :sparkle emoji
        string = string.trim();
        let text = "";

        let n = 0;
        for (let i = 0; i < string.length; i++, n++) {
            if (n >= 10) n = 0;

            text += string[i] == " " ? ` <span class="fancy" value="${n}"${definition ? ` definition="${definition}"` : ``}>${string[++i]}</span>` : `<span class="fancy" value="${n}"${definition ? ` definition="${definition}"` : ``}>${string[i]}</span>`;
        }

        return text;
    },
    annoyingText(string, definition) { // :devil emoji
        string = string.trim();
        let text = "";

        let n = 0;
        for (let i = 0; i < string.length; i++, n++) {
            if (n >= 2) n = 0;

            text += string[i] == " " ? ` <span class="annoying" value="${n}"${definition ? ` definition="${definition}"` : ``}>${string[++i]}</span>` : `<span class="annoying" value="${n}"${definition ? ` definition="${definition}"` : ``}>${string[i]}</span>`;
        }

        return text;
    },
    shakyText(string, definition) { // :crying emoji
        string = string.trim();
        let text = "";

        let n = 0;
        for (let i = 0; i < string.length; i++, n++) {
            if (n >= 2) n = 0;

            text += string[i] == " " ? ` <span class="shaky" value="${n}"${definition ? ` definition="${definition}"` : ``}>${string[++i]}</span>` : `<span class="shaky" value="${n}"${definition ? ` definition="${definition}"` : ``}>${string[i]}</span>`;
        }

        return text;
    },
    veryShakyText(string, definition) { // :waterfall emoji
        string = string.trim();
        let text = "";

        let n = 0;
        for (let i = 0; i < string.length; i++, n++) {
            if (n >= 2) n = 0;

            text += string[i] == " " ? ` <span class="veryshaky" value="${n}"${definition ? ` definition="${definition}"` : ``}>${string[++i]}</span>` : `<span class="veryshaky" value="${n}"${definition ? ` definition="${definition}"` : ``}>${string[i]}</span>`;
        }

        return text;
    },
    bouncyText(string, definition) { // :jump emoji
        string = string.trim();
        let text = `<span class="bouncy"${definition ? ` definition="${definition}"` : ``}>${string}</span>`
        return text;
    },


    // core dialogue things
    // ALL of the following section is almost entirely slightly altered corru.observer code !!! namely dialogue.js !!!! i AM smart and brilliant but i will also not lose an opportunity to be lazy and adapt existing structures for my purposes, which if you think about it is another proof of my smartness and briliantness
    // corru's support for localization mostly got cut out. even if someone (including us the creators) would decide to localize this mod i just dont see why anyone would use the corru way of doing that instead of just copying the source code, rewriting the text, and publishing it as a separate version

    currentDialogue: {
        active: false,
        actors: {},
        prevSpeaker: "dialogue choice"
    },

    markThisDialogueSeen(branch = ds?.currentDialogue?.branch?.name) {
        let seenName = `DS!!__${ds.currentDialogue.chainName}-${slugify(branch)}`;
        seenDialogue(seenName)
    },

    startDialogue(dialogueChain, settings = { specificChain: false }) {
        if (body.classList.contains('mui-active') || body.getAttribute("menu") != "none") exitMenu();

        ds.currentDialogue = {
            active: false,
            actors: {},
            prevSpeaker: "dialogue choice"
        }

        body.setAttribute('datingsimcurrentdialogue', dialogueChain);

        ds.currentDialogue.chain = ds.dialogues[dialogueChain];

        ds.currentDialogue.chainName = dialogueChain;

        try {
            ds.sendDialogue(typeof settings?.specificChain == "undefined" || settings?.specificChain === false ? ds.currentDialogue.chain.start : ds.currentDialogue.chain[settings?.specificChain])
        } catch (e) { printError(`dating sim dialogue error for ${dialogueChain}: ` + e, true); setTimeout(() => ds.endDialogue(), 2000) }
        ds.currentDialogue.active = true

        //identify actors and add them as objects within the currentDialogue object for ease of use
        // what is like. the purpose of this i wonder --- mod dev
        ds.currentDialogue.actors = {}
        for (const topicName in ds.currentDialogue.chain) {
            //ignore some special strings
            if (!["end", "skip", "skipTime", "skipNotice"].includes(topicName)) {
                ds.currentDialogue.chain[topicName].body.forEach(dialogue => {
                    ds.currentDialogue.actors[dialogue.actor] = getDialogueActor(dialogue.actor, true)
                })
            }
        }

        // based on the groundsmindry approach
        // page-based tracking for having seen the dialogue...
        // this probably won't cause any issues :^)
        change(`PAGE!!${dialogueChain}`, true)
    },

    startFromSavedDialogue() {
        if (body.classList.contains('mui-active') || body.getAttribute("menu") != "none") exitMenu();

        const savedDialogue = check("DS!!current");

        datescene.innerHTML = savedDialogue[1];
        ds.currentDialogue = {
            prevSpeaker: savedDialogue[2][0],
            chainName: savedDialogue[2][1],
            chain: ds.dialogues[savedDialogue[2][1]],
            branch: ds.dialogues[savedDialogue[2][1]][savedDialogue[2][2]]
        }

        body.setAttribute('datingsimcurrentdialogue', ds.currentDialogue.chainName);

        try {
            ds.sendDialogue(ds.currentDialogue.branch, savedDialogue[0]);
        } catch (e) { printError(`dating sim saved dialogue error for ${ds.currentDialogue.chainName}: ` + e, true); setTimeout(() => ds.endDialogue(), 2000) }
        ds.currentDialogue.active = true

        //identify actors and add them as objects within the currentDialogue object for ease of use
        ds.currentDialogue.actors = {}
        for (const topicName in ds.currentDialogue.chain) {
            //ignore some special strings
            if (!["end", "skip", "skipTime", "skipNotice"].includes(topicName)) {
                ds.currentDialogue.chain[topicName].body.forEach(dialogue => {
                    ds.currentDialogue.actors[dialogue.actor] = getDialogueActor(dialogue.actor, true)
                })
            }
        }

        // based on the groundsmindry approach
        // page-based tracking for having seen the dialogue...
        // this probably won't cause any issues :^)
        change(`PAGE!!${ds.currentDialogue.chainName}`, true)
    },

    dialogueProgressEvent: undefined,
    sendDialogue(dialogue, i = 0) {
        try {
            document.querySelectorAll('#datechoices div').forEach(el => el.innerHTML += '');
            document.querySelector(`#datechoices`).classList.add("hidden");

            ds.currentDialogue.branch = dialogue;
            let queue = dialogue.body;

            //removes the listener after it's started so it can't be called multiple times, useful for ones with 'wait'
            document.removeEventListener('keydown', ds.dialogueProgressEvent);

            if (i < queue.length) {
                if (ds.shouldItShow(queue[i])) {
                    const current = queue[i];
                    const currentActor = getDialogueActor(current.actor);


                    // saving stuff first (unless it has a ksi, cause we need the previous text in that case)
                    if (current.text.indexOf("ξ") == -1) {
                        const currentDialogue = [ ds.currentDialogue.prevSpeaker, ds.currentDialogue.chainName, ds.currentDialogue.branch.name ];
                        const currentScene = datescene.innerHTML;
                        const currentI = i;
                        change("DS!!current", [currentI, currentScene, currentDialogue]);
                    }


                    if (ds.blips == "corru") {
                        if (currentActor.voice !== false && ds.currentDialogue.prevSpeaker != current.actor && ds.currentDialogue.prevSpeaker != "nobody stupid" && ds.currentDialogue.prevSpeaker != "dialogue choice" && !env.noVoiceStop) sfxmap.stop();
                        if (typeof currentActor.voice == "function" || typeof currentActor.activeVoice == "function") {
                            if (currentActor.activeVoice) currentActor.activeVoice(); else currentActor.voice();
                        } else if (currentActor.voice !== false) {
                            play('muiReadout');
                        }
                    }

                    //the current dialogue bubble doesn't have text - therefore it has a texec (text exec) to generate the response
                    if (typeof current.texec == 'function') {
                        current.text = current.texec()
                    }

                    if (current.exec) {
                        try { current.exec() } catch (e) { printError(e); console.log(e) }
                    }
                    ds.isTextBeingWritten = true;

                    ds.typewriteText({
                        text: processDefinitionsInString(current.text),
                        speed: current.speed ? current.speed : ds.typewriterSpeed,
                        speedModifier: current.speedModifier ? current.speedModifier : 0,
                        silent: current.silent ? current.silent : false,
                        actor: current.actor,
                        additionalPitch: current.additionalPitch ? current.additionalPitch : 0
                    });

                    ds.displayName(currentActor.name, currentActor.type, currentActor.icon ? currentActor.icon : false);

                    if (!current.noReadout) readoutAdd({ message: current.text.replace("ξ", ""), image: currentActor.image, name: current.actor, displayName: currentActor.name, type: currentActor.type, sfx: false, actor: current.actor, show: false });

                    ds.dialogueWaitTimeout = setTimeout(() => {
                        if (current.autoAdvance) ds.sendDialogue(dialogue, i + 1);
                        else {
                            ds.dialogueProgressEvent = (event) => {
                                if (env.cutscene || env.currentDialogue.active) return;

                                let key = event.key || false;

                                if (key) {
                                    switch (key) {
                                        case " ":
                                        case "Enter": break

                                        default: return;
                                    }
                                }

                                if (ds.isTextBeingWritten == true) {
                                    ds.isTextBeingWritten = false;
                                    if (datespeak.innerHTML != ds.currentTypewriteText) return ds.typewriteText();
                                }
                                else return ds.sendDialogue(dialogue, i + 1);
                            }
                            setTimeout(function () { document.addEventListener('keydown', ds.dialogueProgressEvent); }, 10);
                        }
                        if (current.then) current.then();

                        delete ds.dialogueWaitTimeout
                    }, (current.wait || 1))
                } else {
                    ds.sendDialogue(dialogue, i + 1)
                }

            } else { //the dialogue chain is over, show responses
                ds.displayName();
                datespeak.innerHTML = "";

                ds.currentDialogue.prevSpeaker = "nobody stupid"
                ds.currentDialogue.justChanged = false

                //sets flag for seeing the sent dialogue
                ds.markThisDialogueSeen() // unlike the corru function, this one doesnt do the page thing. it returns smth like DS!!__dialogue-branch. take note that DS!! flags do not persist across dating sim saves! if you need to flag something Forever, use DSOUTER!!

                document.querySelector(`#datechoices`).innerHTML = "";

                dialogue.responses[0].replies.forEach(reply => {
                    console.log(`SHOULD REPLY ${reply.name} SHOW? ::: ${ds.shouldItShow(reply)}`)
                    let show = ds.shouldItShow(reply)

                    if (show) {
                        console.log(`determined ${show}, so showing reply`)

                        //programmatically decide the reply name that shows if the reply name is a function
                        let nameToUse
                        if (typeof reply.name == "function") nameToUse = reply.name() // this case is an ancient holdover from before the dialogue string syntax
                        else if (reply.texec) nameToUse = reply.texec()
                        else nameToUse = reply.name.trim()

                        //determine what kind of unread it is, if any
                        let readState
                        if (typeof reply.unreadCheck == "function") readState = reply.unreadCheck();
                        else readState = ds.checkUnread(reply);

                        if (readState == false) readState = "read"

                        //detect what definition to show
                        var tooltip
                        tooltip = "NOTE::"
                        if (!reply.hideRead) {
                            switch (readState) {
                                case "read":
                                    tooltip += `'previously utilized choice'`
                                    break

                                case "unread":
                                    tooltip += `'choice not yet utilized'`
                                    break

                                case "within":
                                    tooltip += `'choice leads to unused responses'`
                            }
                        } else {
                            tooltip += `'dynamic choice'`
                        }

                        if (reply.definition) tooltip = reply.definition;

                        //add the reply and set up its click handler
                        document.querySelector(`#datechoices`).insertAdjacentHTML('beforeend', `
                            <div
                                class="${reply.class || ""}"
                                reply="${reply.destination}" 
                                name="${nameToUse}"
                                ${tooltip ? `definition="${tooltip}"` : ""}
                            >${nameToUse}</div>`
                        )

                        //on option click, remove event listeners and add classes to indicate choice
                        document.querySelector(`#datechoices div[name="${nameToUse}"]`).addEventListener('mousedown', function (e) {
                            console.log(nameToUse)

                            if (reply.exec) {
                                try { reply.exec() } catch (e) { printError(e); console.log(e) }
                            }

                            var dest = reply.destination
                            //redefine dest as something more readable if it's a function
                            if (dest.includes('EXEC::')) {
                                dest = `EX-${slugify(nameToUse.slice(0, 10))}`
                            }

                            document.querySelectorAll('#datechoices div').forEach(el => el.innerHTML += '') //destroys event listeners in one easy step
                            document.querySelector(`#datechoices`).classList.add("hidden");

                            //determine how to handle the reply based on any special prefixes or names
                            let replyValue = this.attributes.reply.value
                            if (replyValue == "END") { //end of dialogue
                                ds.endDialogue(ds.currentDialogue.chain.end)
                            } else if (replyValue.includes('CHANGE::')) { //changing to different dialogue
                                let changeValue = replyValue.replace('CHANGE::', '')
                                ds.changeDialogue(changeValue)
                            } else if (replyValue.includes('EXEC::')) { //executing a function - the function given should end dialogue or change it, otherwise may softlock
                                Function(`${replyValue.replace('EXEC::', '')}`)()
                            } else {
                                ds.sendDialogue(ds.currentDialogue.chain[replyValue])
                            }
                        })
                    }
                })

                document.querySelectorAll(`#datechoices>div`).forEach(e => {
                    e.addEventListener('mouseenter', () => play('muiHover'))
                    e.addEventListener('click', () => play('muiClick'))
                })

                document.querySelector(`#datechoices`).classList.remove("hidden");
            }
        } catch (e) {
            printError(e)
            if (!check("TEMP!!debug")) ds.endDialogue()
        }
    },

    changeDialogue(dialogueChain) {
        body.setAttribute('datingsimcurrentdialogue', dialogueChain)

        ds.currentDialogue.chain = ds.dialogues[dialogueChain]

        ds.currentDialogue.chainName = dialogueChain
        ds.currentDialogue.justChanged = true
        ds.sendDialogue(ds.currentDialogue.chain.start)
    },

    //ill be honest this function is huge and scary as fuck i didnt read through it superproperly i just replaced what was necessary. also im eepy
    checkUnread(inputReply, inputChainName, { examinedReplies = [], originalReply = inputReply, baseChainName } = {}) {
        let reply = inputReply
        let arbChainName = inputChainName

        //detect if any special stuff needs to happen
        if (reply.destination.includes("EXEC::") || reply.destination == "END") return false // something like this is very special and should be hideread anyway if not END

        //with CHANGE, we only continue checking if it doesn't change back to the original chain
        let originalChainName = baseChainName || arbChainName
        if (reply.destination.includes("CHANGE::")) {
            let changeTo = reply.destination.replace("CHANGE::", "")
            if (changeTo == baseChainName) return false;

            reply = { destination: "start" }
            arbChainName = changeTo
        }

        //sets up the return variable
        //examinedReplies will tell us whether we're in recursion or not
        let successReturn = examinedReplies.length > 0 ? "within" : "unread"

        //check to make sure we haven't looped - if so, return false
        //otherwise - add it to the examined replies tracker
        if (examinedReplies.includes(reply.destination)) return false
        examinedReplies.push(reply.destination)

        //immediately return if the reply hides whether it's been read
        //also returns if it's a fake end - they're usually loops
        if (reply.hideRead || reply.fakeEnd) return false

        //get proper name of reply and check whether it's been read before
        let chainName = arbChainName || ds.currentDialogue.chainName
        var flagName = `DS!!__${chainName}-${slugify(reply.destination)}`
        let isRead = check(flagName)

        //if it's unread, we return right away
        if (!isRead && !reply.arbitrary) return successReturn

        //otherwise, we check its destination's replies
        var foundUnread = false
        let dialogue

        dialogue = ds.dialogues[chainName] || ds.currentDialogue.chain

        let destResponses = dialogue[reply.destination].responses
        destResponses.forEach(responseList => {
            var checkList = [reply.destination, originalReply.destination]
            if (ds.currentDialogue.active) checkList.push(ds.currentDialogue.branch.name);

            //uses the checklist to see if anything loops!
            //if anything matches the checkList, skips the block below
            if (!responseList.replies.some(listReply => {
                //if there are any loops here, it throws a 'no thank you' to this responseList
                if (!listReply.fakeEnd) {
                    return checkList.includes(listReply.destination)
                }
                else return false //the current reply is a fake end and thus is fine to ignore
            })) {
                //since nothing in the current reply loops, continue!
                responseList.replies.forEach(listReply => {
                    if (foundUnread == false) {
                        /* if the reply should show...
                            AND isn't a fake end, 
                            AND it doesn't lead to the origin point (loop)
                            AND it hasn't been checked already
                        */
                        if (ds.shouldItShow(listReply) &&
                            !listReply.fakeEnd &&
                            !examinedReplies.includes(listReply.destination)
                        ) {
                            foundUnread = ds.checkUnread(listReply, chainName, { examinedReplies, originalReply, baseChainName: originalChainName })
                        }
                    }
                });
            }
        });

        //returns what was found
        return foundUnread
    },
    shouldItShow(thing, { execArg } = {}) {
        var showValidity
        var showIf = thing.showIf

        if (showIf) {
            showValidity = getShowValidity(showIf, execArg)
        } else {
            showValidity = true
        }

        //if it should show, check to see if it's a message or dialogue that should only show once
        if (showValidity == true) {
            if (thing.showOnce && thing.text) { //it's a message, so check the current parent for having been seen
                return check(`DS!!__${ds.currentDialogue.chainName}-${slugify(ds.currentDialogue.branch.name)}`, false)

            } else if (thing.showOnce && thing.destination) { //it's a dialogue option
                //++ denotes special moth format (or otherwise 'global')
                if (ds.currentDialogue.active) if (ds.currentDialogue.chainName.includes("++")) { //TODO: having a current dialogue check in here might be a consistency problem?
                    if (ds.currentDialogue.chainName.includes("mth++")) { return check(`mth++${page.dialoguePrefix}-${slugify(thing.destination)}`, false) }
                    else return check(`${ds.currentDialogue.chainName}-${slugify(thing.destination)}`, false)
                }
                //otherwise it's normal
                else return check(`DS!!__${ds.currentDialogue.chainName}-${slugify(thing.destination)}`, false)
            }
        }

        return showValidity
    },

    endDialogue() {
        body.removeAttribute('datingsimcurrentdialogue')

        ds.currentDialogue.active = false
        ds.currentDialogue.prevSpeaker = false

        ds.markThisDialogueSeen('end')

        if (ds.dialogueProgressEvent) {
            document.removeEventListener('keydown', ds.dialogueProgressEvent)
        }

        if (ds.dialogueWaitTimeout) {
            clearTimeout(ds.dialogueWaitTimeout)
            delete ds.dialogueWaitTimeout
        }
    },

    // you can still generate dialogues with the vanilla corru function
    // but this one provides additional functionality:
    // NOREADOUT::     does not send a readout into the history. useful for when youre making pauses mid-sentence with ξ
    // ξ               ksi. IN THE DIALOGUE LINE ITSELF. ONLY ONE PER LINE. PUT BEFORE SPACES. DO NOT PUT IT IN HTML TAGS!!!!!!!!!! creates the effect of continuing from the last line without erasing it*. think {w} from renpy
    // SPEED::         adds a speed modifier to the line; it is a percentage of the processed speed (like 0.1 is 10%) (processed = default + actor modifier)
    // SPEEDOVERRIDE:: overrides the default speed
    // PITCH::         adds some pitch to the (noncorru) blips of the line

    generateDialogueObject(genString) {
        let split = genString.split('\n')
        let obj = {}
        let lastParent = {
            // used to track depth
            // note - this gets redefined at the bottom of case 0 so it's really just for top level stuff
            blockShowControl: false, // controls SHOWIF blocks that affect multiple dialogues
            blockShowOnceControl: false, // ditto for SHOWONCE
            blockSilentControl: false, // ditto for SILENT
            blockNestControl: [] // this is like SHOWIF 2. there'd be a bunch of weird rewriting if it was an update to the base function
        }

        function parseShowif(showif) {
            let finalShowIf = showif
                .replace('SHOWIF::', '')
                .replace(/'/g, '"')// removes the showif indicator and swaps single quotes for double (required for json parse for whatever reason)
                .replace(/</g, '\\u003c') //apparently < and > throw errors if they're used unescaped in JSON... weird
                .replace(/>/g, '\\u003e')

            try {
                return upgradeShowIf(JSON.parse(`{ "reasons":${finalShowIf}}`).reasons)
            } catch (e) { console.log(showif, e) }
        }

        split.forEach(initialLine => {
            let line = initialLine.replace(/\s+$/, '') // remove trailing space on RIGHT SIDE only
            let tabs = (line.match(/    /g) || []).length // since left side matters for this
            var text

            //console.log(line)
            //console.log(tabs)
            switch (tabs) {
                // lv0 - branch name. if it starts with end, it's an end function
                // if it's a dialogue branch, just define the object for later and redef lastParent
                case 0:
                    //using + as crude block indentation for nicely(?) readable(?) nesting
                    //just remove all +'s at the start
                    if (line.startsWith('+')) while (line.charAt(0) === '+') line = line.substring(1)

                    if (line == "") return;

                    //block handling
                    else if (line.startsWith('____')) {
                        let block = line.replace('____', '')

                        if (block.startsWith('SHOWIF')) {
                            lastParent.blockShowControl = parseShowif(block)

                        } else if (block.startsWith('NESTIF')) {
                            lastParent.blockNestControl.push(parseShowif(block.replace("NESTIF", "SHOWIF")))

                        } else if (block.startsWith('SHOWONCE')) {
                            lastParent.blockShowOnceControl = true

                        } else if (block.startsWith('SILENT')) {
                            lastParent.blockSilentControl = true

                        } else if (block == 'END') {
                            //NESTIF should be nestable inside SHOWIF
                            if (lastParent?.blockNestControl?.length > 0) {
                                lastParent.blockNestControl.pop()
                            } else lastParent.blockShowControl = false

                            lastParent.blockShowOnceControl = false
                            lastParent.blockSilentControl = false
                        }
                    }


                    //special handling
                    else if (line.startsWith('END::')) { //this is a function to exec at the end of the dialogue
                        obj['end'] = Function(line.replace('END::', ''))
                        lastParent = {}
                    } else if (line.startsWith('SKIPTIME::')) { //defaults to 1000
                        obj['skipTime'] = Number(line.replace('SKIPTIME::', ''))
                        lastParent = {}
                    } else if (line.startsWith('SKIP::')) { //like END, but fired instantly when dialogue is skipped
                        obj['skip'] = Function(line.replace('SKIP::', ''))
                        lastParent = {}
                    } else if (line.startsWith('SKIPNOTICE::')) { //adds a message to the skip warning
                        obj['skipNotice'] = line.replace('SKIPNOTICE::', '')
                        lastParent = {}
                    } else if (line.startsWith('RESPOBJ::')) { //this is means it's just a reusable response list object definition, not a full dialogue tree
                        obj = { responses: [] }
                        lastParent = { "0": obj }
                    }

                    //regular dialogue handling
                    else {
                        obj[line] = { name: line, body: [], responses: [] }
                        lastParent = {
                            "0": obj[line],
                            blockNestControl: []
                        }
                    }
                    break

                // lv1 - dialogue from an actor, or responses from an actor
                // if RESPONSES, simply mark that we're in the responses section via lastParent[1]
                // otherwise, it's an actor, so create a dialogue line object and add to lastParent[2]
                case 1:
                    lastParent[1] = false
                    lastParent[2] = false // clears depth

                    text = line.replace('    ', '')
                    if (text == "") return
                    if (text.includes("RESPONSES::")) { //actor for responses
                        let newResponses = { name: text.replace('RESPONSES::', ''), replies: [] }
                        lastParent[1] = newResponses
                        lastParent[0].responses.push(newResponses)

                    } else if (text.includes("RESPOBJ::")) { //it's the name of a reusable response object, i.e. env.hello.generalReceptionistResponses
                        let respobj = text.replace('RESPOBJ::', '')
                        lastParent[0].responses = ds.dialogues[respobj]

                        if (typeof lastParent[0].responses == "undefined") throw "the respobj you're trying to use doesn't exist (or hasn't been defined yet - remember these have to exist before your dialogue definition): " + respobj

                    } else { //actor for dialogue
                        let newDialogue = { actor: text }
                        lastParent[1] = newDialogue
                        lastParent[0].body.push(newDialogue)
                    }
                    break

                // lv2 - dialogue text, OR name/destination for a response
                // if contains <+>, then response - split by that and assign relevant info to the lastParent[1]
                // otherwise, add as text to lastParent[1] - it's just dialogue text
                case 2:
                    text = line.replace('        ', '')
                    if (text == "") return
                    if (!text.includes("<+>")) { //regular actor dialogue
                        lastParent[2] = false // clears depth

                        if (lastParent[1].text) { // if it already has text, make a new object with the same actor
                            let newDialogue = {
                                actor: lastParent[1].actor,
                                "text": text
                            }
                            lastParent[1] = newDialogue
                            lastParent[0].body.push(newDialogue)
                        } else {
                            lastParent[1].text = text
                        }

                        try {
                            if (lastParent[1].text.includes('TEXEC::')) { //if it contains TEXEC, then that means it has a text exec - a function that returns a string to use when it appears
                                /* since this returns the first thing you give it, it should be either a oneliner or a function that executes and returns something */
                                lastParent[1].texec = Function(`return ${text.replace('TEXEC::', '')}`)
                            }
                        } catch (e) { console.log(e); console.log(lastParent, line) }

                        //if there's a surrounding block control, we add the showIf condition to the dialogue object
                        //same for showonce
                        if (lastParent.blockShowControl) { lastParent[1].showIf = lastParent.blockShowControl; /*console.log(lastParent[1])*/ }
                        if (lastParent.blockShowOnceControl) { lastParent[1].showOnce = lastParent.blockShowOnceControl }
                        if (lastParent.blockSilentControl) { lastParent[1].silent = lastParent.blockSilentControl }
                        if (lastParent?.blockNestControl?.length) {
                            lastParent[1].showIf = (lastParent[1].showIf || []).concat(...lastParent.blockNestControl)
                        }

                    } else { //reply text and location
                        let replyInfo = text.split('<+>')

                        var replyName = replyInfo[0]
                        var replyDest = replyInfo[1]

                        let replyObj = {
                            name: replyName,
                            destination: replyDest
                        }

                        try {
                            if (replyName.includes('TEXEC::')) { //ditto to regular dialogue functionality
                                replyObj.texec = Function(`return ${replyName.replace('TEXEC::', '')}`)
                            }
                        } catch (e) { console.log(e); console.log(lastParent, line) }

                        lastParent[1].replies.push(replyObj)
                        lastParent[2] = replyObj

                        //can be affected by block controls
                        if (lastParent.blockShowControl) { lastParent[2].showIf = lastParent.blockShowControl; /*console.log(lastParent[2])*/ }
                        if (lastParent.blockShowOnceControl) { lastParent[2].showOnce = lastParent.blockShowOnceControl }
                        if (lastParent?.blockNestControl?.length) {
                            lastParent[2].showIf = (lastParent[2].showIf || []).concat(...lastParent.blockNestControl)
                        }
                    }
                    break

                // lv3 - optional details like WAIT and EXEC - exec applies to both replies and dialogue lines
                // wait is only used by dialogue lines, but no harm in checking for it on reply anyway
                // uses lastParent[1] or lastParent[2] based on whether lastParent[2] is false or not (true means parent is reply)
                case 3:
                    var recipient = lastParent[1]
                    if (lastParent[2]) recipient = lastParent[2]

                    try {
                        text = line.replace('            ', '')
                        newReasons = false

                        if (text == "") return
                        if (text.startsWith("EXEC::")) recipient.exec = Function(line.replace('EXEC::', ''))
                        if (text.startsWith("WAIT::")) recipient.wait = line.replace('WAIT::', '') //applies only to dialogue
                        if (text.startsWith("THEN::")) recipient.then = Function(line.replace('THEN::', '')) //applies only to dialogue (js executed after a wait)
                        if (text.startsWith("AUTOADVANCE::")) recipient.autoAdvance = true //applies only to dialogue
                        if (text.startsWith("SHOWIF::")) newReasons = parseShowif(line)
                        if (text.startsWith("SHOWONCE::")) recipient.showOnce = true
                        if (text.startsWith("CLASS::")) recipient.class = text.replace('CLASS::', '') //adds specified text as classes (split by space) to the element rendered
                        if (text.startsWith("HIDEREAD::")) recipient.hideRead = true //applies only to replies
                        if (text.startsWith("UNREADCHECK::")) recipient.unreadCheck = Function(line.replace('UNREADCHECK::', '')) //applies only to replies. should return false (no unread), "within" or "unread"
                        if (text.startsWith("FAKEEND::")) recipient.fakeEnd = text.replace('FAKEEND::', '') || true //applies only to replies. takes either text to use or nothing
                        if (text.startsWith("SILENT::")) recipient.silent = true //dialogue only. will not play talk noise

                        if (text.startsWith("SPEED::")) recipient.speedModifier = Number(text.replace('SPEED::', ''));
                        if (text.startsWith("SPEEDOVERRIDE::")) recipient.speed = Number(text.replace('SPEEDOVERRIDE::', ''));
                        if (text.startsWith("PITCH::")) recipient.additionalPitch = Number(text.replace('PITCH::', ''));
                        if (text.startsWith("NOREADOUT::")) recipient.noReadout = true;

                        if (recipient.showIf && newReasons) {
                            recipient.showIf = recipient.showIf.concat(newReasons)
                        } else if (newReasons) {
                            recipient.showIf = newReasons
                        }
                    } catch (e) {
                        console.log("dialogue parsing error, present line is: ", line)
                        throw (e)
                    }
                    break
            }
        })

        //return just the responses if the object has this - means it's a respobj definition
        //also marks it as such with a special ID for use with tracking 
        if (obj.responses) {
            obj.responses.respobj = Math.random() * 1000
            return obj.responses
        }

        //otherwise, return the full obj
        else return obj
    },
    // * so, ξ might work in a somewhat unintuitive way: it really does keep the contents of the last line, so technically its unnecessary to include any text before ksi as it will be ignored, BUT then youd be sending incomplete readouts since the line before ksi is traditionally a NOREADOUT one


    // this one is primarily for moth dialogue but its also kinda used in other stuff idk go ctrl+f its name

    endingAmount: 9,
    countUncompletedEndings(inverted = false) {
        let count = 0;

        if (!check("DSEND!!!akizet")) count++;
        if (!check("DSEND!!!cavik")) count++;
        if (!check("DSEND!!!gakvu")) count++;
        if (!check("DSEND!!!tozik")) count++;
        if (!check("DSEND!!!kazki")) count++;
        if (!check("DSEND!!!bozko")) count++;
        if (!check("DSEND!!!miltza")) count++;
        if (!check("DSEND!!!nrrtr")) count++;
        if (!check("DSEND!!!noromance")) count++;

        if (inverted) return ds.endingAmount - count;
        else return count;
    },


    // dialogues are defined under the ds object. as in. physically under it. go look further down
    dialogues: {},


    // so theres two options for me
    // i either learn how corruobserver's vn functions or i write my own thing
    // which one of these is easier and less time-consuming?
    //               well i could not tell you because i only tried one of them and guess what its my own thi-

    // ----following transitions:
    // "dissolve"           dissolves the old bg into the new one; 0.75s
    // "dissolvelong"       dissolves the old bg into the new one; 2s
    // "dissolveultralong"  dissolves the old bg into the new one; 5s
    // "fadedark" (def)     fades old bg to dark static, then to new bg; 0.5s, 0.3s, 0.5s
    // "fadelight"          fades old bg to light static, then to new bg; 0.5s, 0.3s, 0.5s
    // "cut"                instantly switches from old bg to new bg
    //                      all transitions are changed to cut with ds.skip on
    // ----handling of characters that are already present on the scene:
    // oldChar = false (def)    remove characters together with the old bg
    // oldChar = true           do not do anything to the characters
    // oldChar = "copy"         remove characters with the old bg but add them to the new one too. ONLY functions with fade
    // oldChar = [["",""]]      an array of two-item arrays (first item is char id, second is what to do to them); handle characters individually; if you use this, ALL chars that do not get their own array will get oldChar=true treatment!
    // ----additional:
    // onBegin      function called when the transition starts (everything has been prepared for it, the only next thing is the setTimeout)
    // onFinish     function called when the transition has fully ended and everything else has been done
    //              both functions are supplied with oldBg and newBg as the two arguments, in that order
    changeBackground(bg, transition = "fadedark", oldChar = true, onBegin = () => { }, onFinish = () => { }) {
        const oldBg = document.querySelector(".datebg");

        const newBg = document.createElement('div');
        newBg.classList.add("datebg");
        newBg.setAttribute("background", bg);

        oldBg.insertAdjacentElement("beforebegin", newBg);

        if (ds.skip) transition = "cut";

        if (oldChar == false) document.querySelectorAll(".datecharacter").forEach(el => oldBg.appendChild(el));
        else if (Array.isArray(oldChar)) {
            for (const pair of oldChar) if (pair[1] == false) oldBg.appendChild(document.getElementById(pair[0]));
        }

        switch (transition) {
            case "dissolve":
                oldBg.classList.add(transition, "hide");
                onBegin(oldBg, newBg);
                setTimeout(() => { oldBg.remove(); onFinish(oldBg, newBg); }, 751)
                break;
            case "dissolvelong":
                oldBg.classList.add(transition, "hide");
                onBegin(oldBg, newBg);
                setTimeout(() => { oldBg.remove(); onFinish(oldBg, newBg); }, 2001)
                break;
            case "dissolveultralong":
                oldBg.classList.add(transition, "hide");
                onBegin(oldBg, newBg);
                setTimeout(() => { oldBg.remove(); onFinish(oldBg, newBg); }, 5001)
                break;
            case "fadedark":
            case "fadelight":
                if (oldChar == "copy") document.querySelectorAll(".datecharacter").forEach(el => { newBg.appendChild(el.cloneNode(true)); oldBg.appendChild(el); });
                else if (Array.isArray(oldChar)) {
                    for (const pair of oldChar) if (pair[1] == "copy") { newBg.appendChild(document.getElementById(pair[0]).cloneNode(true)); oldBg.appendChild(document.getElementById(pair[0])); };
                }

                datingsim.setAttribute("background", transition.replace("fade", ""));

                oldBg.classList.add("hide");
                newBg.classList.add("hide");

                onBegin(oldBg, newBg);

                setTimeout(() => {
                    newBg.classList.remove("hide");
                    oldBg.remove();
                    setTimeout(() => {
                        if (oldChar == "copy") document.querySelectorAll(".datecharacter").forEach(el => datescene.appendChild(el));
                        else if (Array.isArray(oldChar)) {
                            for (const pair of oldChar) if (pair[1] == "copy") datescene.appendChild(document.getElementById(pair[0]));
                        }
                        onFinish(oldBg, newBg);
                    }, 501);
                }, 800)
                break;
            case "cut":
                onBegin(oldBg, newBg);
                oldBg.remove();
                onFinish(oldBg, newBg);
                break;
        }
        return;
    },

    character: {
        // add the character in, either on the right or the left off-screen, though it can be custom too
        add(character, { pose = "1", receptors = "neutral", expression = "neutral", body = "neutral", placement = "right" } = {}, where = document.getElementById("datescene")) {
            if (where.querySelector("#" + character) != null) throw Error(`WE ALREADY HAVE A ${character} IN ${where.id}`);

            const charEl = document.createElement('div');
            charEl.id = character;
            charEl.classList.add("datecharacter");
            charEl.setAttribute("pose", pose);

            let style;
            if (placement == "right") style = "transform:translate(67vw)";
            else if (placement == "left") style = "transform:translate(-67vw)";
            else style = placement;
            charEl.style.cssText = style;

            charEl.innerHTML = `<div class="body" sprite="${body}"></div><div class="receptors" sprite="${receptors}"></div><div class="expression" sprite="${expression}"></div>`;

            where.appendChild(charEl);

            window.getComputedStyle(charEl).transform;

            return charEl;
        },
        // remove the character. move it out of the way first though, it just straight up disappears
        remove(character, time = 0, where = document.getElementById("datescene")) {
            if (where.querySelector("#" + character) == null) throw Error(`WE DONT HAVE A ${character} IN ${where.id}`);

            const charEl = where.querySelector("#" + character);

            setTimeout(() => charEl.remove(), time)

            return charEl;
        },
        // primary way of positioning and scaling the characters. just use tranform and transition. take note that it overrides everything previous, so if you want things to stay consistent you may need to repeat them in separate calls
        style(character, how, thenRemove = false, where = document.getElementById("datescene")) {
            if (where.querySelector("#" + character) == null) throw Error(`WE DONT HAVE A ${character} IN ${where.id}`);

            const charEl = where.querySelector("#" + character);

            charEl.style.cssText = how;

            if (thenRemove) ds.character.remove(character, how.match(/(\d+)s?/)[1] * 1000, where);

            return charEl;
        },
        // change some things upp
        sprite(character, { pose, receptors, expression, body } = {}, where = document.getElementById("datescene")) {
            if (where.querySelector("#" + character) == null) throw Error(`WE DONT HAVE A ${character} IN ${where.id}`);

            const charEl = where.querySelector("#" + character);

            if (pose) charEl.setAttribute("pose", pose);
            if (receptors) charEl.querySelector(".receptors").setAttribute("sprite", receptors);
            if (expression) charEl.querySelector(".expression").setAttribute("sprite", expression);
            if (body) charEl.querySelector(".body").setAttribute("sprite", body);

            return charEl;
        },
        // ---- animations:
        // jump, bigjump            makes the character do a single jump
        // shake                    moves character from side to side a couple times
        // wiggle, singlewiggle     rotates the character from side to side a couple/one time
        // laugh                    stretches-squashes the character slightly on the y-axis
        // !!!animateOnce is disabled with ds.skip!!!
        animateOnce(character, animation, where = document.getElementById("datescene"), waitcount = 0) {
            if (where.querySelector("#" + character) == null) throw Error(`WE DONT HAVE A ${character} IN ${where.id}`);
            if (ds.skip) return false;
            if (waitcount > 10) return false;

            const charEl = where.querySelector("#" + character);

            if (charEl.classList.has(animation)) { setTimeout(() => ds.animateOnce(character, animation, where, ++waitcount), 250); return true; }

            charEl.classList.add(animation);

            let time;
            switch (animation) {
                case "laugh": time = 2000; break;

                case "shake":
                case "wiggle": time = 1000; break;

                case "bigjump":
                case "jump":
                case "singlewiggle": time = 500; break;
            }

            setTimeout(() => charEl.classList.remove(animation), time);

            return charEl;
        },
        // plays the animation infinitely until toggled back off, unlike animateOnce
        toggleAnimation(character, animation, where = document.getElementById("datescene")) {
            if (where.querySelector("#" + character) == null) throw Error(`WE DONT HAVE A ${character} IN ${where.id}`);

            const charEl = where.querySelector("#" + character);

            if (charEl.classList.contains(animation)) {
                charEl.classList.remove(animation);
                if (charEl.classList.length <= 2) charEl.classList.remove("infinite"); // remove infinite if there is clearly no other animation playing
            } else charEl.classList.add(animation, "infinite");

            return charEl;
        },

        multiple: {
            style(characters, how, thenRemove = false, where = document.getElementById("datescene")) {
                for (const character of characters) ds.character.style(character, how, thenRemove, where);
                return;
            },
            animateOnce(characters, animation, where = document.getElementById("datescene")) {
                for (const character of characters) ds.character.animateOnce(character, animation, where);
                return;
            },
            toggleAnimation(characters, animation, where = document.getElementById("datescene")) {
                for (const character of characters) ds.character.toggleAnimation(character, animation, where);
                return;
            },
        }

    },

    // finish line

    ripOutItsGutsOrMoreLikeActivateTheDatingSimYeah() { // i can have one stupidly named function. as a treat
        if (!document.querySelector("#datingintro")) document.body.appendChild(document.createElement('div')).setAttribute("id", "datingintro");

        setTimeout(() => datingintro.classList.add('show'), 1500);

        setTimeout(() => {
            document.getElementById("content").remove();
            if (body.classList.contains("in-dialogue")) endDialogue();
            // body.querySelector(".moth-trigger").hidden = true;

            if (!document.querySelector("#datingsim")) {
                document.body.appendChild(document.createElement('div')).setAttribute("id", "datingsim");
                datingsim.innerHTML = ds.html;
            }
            ds.dm.refreshSaveOptions();
            ds.dm.updateSettingsHTML();
            document.addEventListener("keydown", ds.do.keyboardNav)

            env.dialogueActors["akizet"].actorSpeedModifier = -0.1; env.dialogueActors["akizet"].icon = "akizet";
            env.dialogueActors["cavik"].actorSpeedModifier = -0.15; env.dialogueActors["cavik"].icon = "cavik";
            env.dialogueActors["kazki"].actorSpeedModifier = 0; env.dialogueActors["kazki"].icon = "kazki";
            env.dialogueActors["gakvu"].actorSpeedModifier = 0; env.dialogueActors["gakvu"].icon = "gakvu";
            env.dialogueActors["tozik"].actorSpeedModifier = 0.15; env.dialogueActors["tozik"].icon = "tozik";
            env.dialogueActors["bozko"].actorSpeedModifier = 0.2; env.dialogueActors["bozko"].icon = "bozko";
            env.dialogueActors["miltza"].actorSpeedModifier = -0.2; env.dialogueActors["miltza"].icon = "miltza";
        }, 1000);

        body.classList.add("datingtime");

        // their speeds.... #theirspeeds

        // original actors
        env.dialogueActors["dateless"] = { // lol. like if like uh ike if you um if you uh you took um sourceless you took sourceles uh und uh um date        date sourceless <3
            type: "dateless"
        }
        env.dialogueActors["nrrtr"] = {
            type: "dateless nrrtr",
            icon: "nrrtr",
            actorSpeedModifier: 0.1,
            voice: () => play("talkether", 0.45)
        }

        return;
    }
}
if (!document.querySelector("#datingcss")) {
    document.head.appendChild(
        document.createElement(
            'style'
        ).appendChild(
            document.createTextNode(
                ds.css
            )
        ).parentElement
    ).setAttribute(
        "id", "datingcss"
    )
}


// MOTH
env.dialogues.mthdatingresp = generateDialogueObject(`
RESPOBJ::
    RESPONSES::self
        why is this happening<+>why
        the obesk look weird<+>lookweird
        self-insert<+>insert
            COMMENT::▼▼▼ 'whatever happened in the dating sim'-dependant responses ▼▼▼
        incoherence<+>incoherence
        miltza<+>miltza
            COMMENT::▼▼▼ 'amount of completed endings'-dependant responses ▼▼▼
        game sucks<+>gamebad
            SHOWONCE::
            SHOWIF::'ds.countUncompletedEndings() <= 8'
        actually the game is ok<+>gamegood
            SHOWONCE::
            SHOWIF::"++mthsatingsim-gamebad"
        but it needs some work<+>gameok
            SHOWONCE::
            SHOWIF::"++mthsatingsim-gamegood"
        yeah but still<+>gameendings
            SHOWONCE::
            SHOWIF::"++mthsatingsim-gameok"
        endings<+>endings
            SHOWIF::"++mthsatingsim-gameendings"
            COMMENT::first ending
        why this device<+>whyvn
            SHOWIF::'EXEC::ds.countUncompletedEndings() <= 7'
            COMMENT::second ending
        isn't this kinda weird<+>weird
            SHOWIF::'EXEC::ds.countUncompletedEndings() <= 6'
            COMMENT::third ending
        are they into me<+>intome
            SHOWIF::'EXEC::ds.countUncompletedEndings() <= 5'
            COMMENT::fourth ending
        damage to the recollection<+>damage
            SHOWIF::'EXEC::ds.countUncompletedEndings() <= 4'
            COMMENT::fifth ending
        <+>
            SHOWIF::'EXEC::ds.countUncompletedEndings() <= 3'
            COMMENT::sixth ending
        <+>
            SHOWIF::'EXEC::ds.countUncompletedEndings() <= 2'
            COMMENT::seventh ending
        <+>
            SHOWIF::'EXEC::ds.countUncompletedEndings() <= 1'
            COMMENT::eighth ending
        nevermind<+>CHANGE::++moth
            FAKEEND::(back)
`)
env.dialogues[`++mthdatingsim`] = generateDialogueObject(`
start
    self
        i have a question about the framing device
    
    moth
        yeah no me too
        but go ahead

    RESPOBJ::mthdatingresp

loop
    RESPOBJ::mthdatingresp

why
    self
        why is this happening
    
    moth
        you mean why is the memory going totally off-script?
        yeah so
        i don't fucking know
        it's definitely the fault of the framing device, i just don't understand what could lead to <em>this</em>
        like it's totally misremembering absolutely everything, that's clear from one quick glance at the logs
        i sure hope it doesn't do any lasting damage lol funfriend would be pissed
        whatever
        i have to admit i didn't warn you properly
        framing devices aren't made for corru, they're for human memories
        and while they work mostly fine with human memories, as you'd expect,
        with corru you never really know
        and this corrucyst was fished up from the bottom of the ocean, too
        i just thought that since corru signals are so similar to human ones then it'd work more or less ok
        guess i'm wrong
        maybe it's just this specific framing device, which is weird...
        i'll try to get us another one, we can't miss out on something as important as the collapse
        but it'll take time to acquire safely
    
    self
        so it's just making the memory up?
    
    moth
        yeah, basically
        not completely, but we can't know what's real and what's not for sure
        though the parts that are more incoherent than others are the likeliest to be fake
    
    self
        is there any point in viewing the recollection then

    moth
        uhh. not that much at all, honestly
        but we've got nothing else right now, and we can't just waste our time sitting around
        so might as well try to make sense of what we have

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

lookweird
    self
        they don't look like their signatures anymore
    
    moth
        yeah i'm seeing it too
        it's really weird... didn't funfriend say that their visual data was lost?
        and now that i'm looking closer, some of them do not even really look like the real ones
        not <em>unrecognizable</em>, but the devil's in the details dude
        maybe the device wasn't happy with how static their signatures are and decided to interpolate?
        best case scenario it managed to pull some context floating around to fill in the gaps
        worst case scenario it made all of this shit up
        idk just some speculation

    RESPONSES::self
        worrying<+>loop
            FAKEEND::(back)
    
insert
    self
        why am i not akizet

    moth
        that's a mystery to me buddy
        the framing device comes with an option for creating your own locus, but
        it's not the default, you would need to set it up this way intentionally
        which we did not
        so, it's really not supposed to do all this stuff
        maybe it decided that it's, like,
        simply impossible to twist the thoughtforms enough to make akizet hit on people lol
        and since it's running on corru it would probably get even more unstable than usual
        which i think is maybe a first in history btw so congrats
        but also a shame since we need to get real data out of this thing
        well, i suppose that's on me for pulling up with the visual novel framing device

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

incoherence
    self
        there are some choices that only appear sometimes
        and when i choose them incoherence spikes badly
    
    moth
        oh yeah i noticed the spikes
        not that they only appear sometimes though. that's weird
        you're sure you didn't do anything to make them appear?

    self
        they do it on their own
    
    moth
        huh. weird
        i don't really know what could cause this
____SHOWIF::'EXEC::ds.moth.incoherenceShowIf(0)'
        although, i'm seeing that the GAD has been in the negative for you
____SHOWIF::'EXEC::ds.moth.incoherenceShowIf(1)'
        although, i'm seeing that the GAD had been in the negative for you
____SHOWIF::['mask', 'hunger']
        although, i'm seeing that the GAD has been in the negative for you...
        it's been there ever since you activated the hunger mask, actually
____END
        maybe that's affecting the framing device?
        it's crazy unstable as is, makes sense it would be sensitive to these kinds of things
        i hope it won't break the memory apart lol
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

miltza
    self
        who is miltza
    
    moth
        i'm also wondering that
        she wasn't in any of the other embassy recollections
        but i don't think she's a product of the framing device, it shouldn't spontaneously create new characters
        ...well. it shouldn't do eny of this so yeah she might as well be fake
        but thinking optimistically:
        i guess she would have showed up in the actual collapse?
        ugh. i wish we could view the recollection normally

    RESPONSES::self
        me too<+>loop
            FAKEEND::(back)
        idk this seems fun<+>loop
            FAKEEND::(back)

gamebad
    self
        game sucks
    
    moth
        ok--
        that's not a question
        but i feel you dude
        i mean, personally, i'm not a visual novel type of person in general
        even less a dating sim type of person
        but if we're exploring the collapse we're gonna have to deal with it, ok?
        there is no way to access it without a framing device
        i will try to get us another one, but this one is all we have right now
    
    RESPONSES::self
        fine<+>loop
            FAKEEND::(back)

gamegood
    self
        actually the game is ok
    
    moth
        ok?
        why'd you--actually, yeah sure
        but i'm still getting us another framing device later so don't get attached
    
    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

gameok
    self
        i've been thinking some more
        the game is ok but it needs some work

    moth
        yeah no i think what it needs most is like
        to not mess up a recollection completely
        cause what we're working with is...
        i feel silly writing all this into the report
        but, it was never intended to run on corru so that's fair i guess
    
    RESPONSES::self
        maybe<+>loop
            FAKEEND::(back)

gameendings
    self
        i mean at least an ending tracker would be cool

    moth
        uhh
        i guess
        can't you just remember which ones you already did?

    self
        no

    moth
        ok well ask me and i'll remind you
    
    RESPONSES::self
        remind me<+>endings
        thanks<+>loop
            FAKEEND::(back)

endings
    self
        remind me which endings i did

    moth
        you got all of them dude
            SHOWIF::['EXEC::ds.countUncompletedEndings() == 0']
        so you've got... uh, hold on
            SHOWIF::[['EXEC::ds.countUncompletedEndings() != 0'], ['EXEC::ds.countUncompletedEndings() <= 3']]
        uh...
            SHOWIF::['EXEC::ds.countUncompletedEndings() == 1']
        you've got...
            SHOWIF::[['EXEC::ds.countUncompletedEndings() > 3'], ['EXEC::ds.countUncompletedEndings() <= 5']]
        TEXEC::ds.moth.tellsYouWhoYouveHitOn()
        lol
            SHOWIF::['EXEC::ds.countUncompletedEndings() == 8']
        congrats
            SHOWIF::['EXEC::ds.countUncompletedEndings() == 0']
____SHOWIF::[['EXEC::ds.countUncompletedEndings() != 0'], ['EXEC::ds.countUncompletedEndings() <= 6'], ['EXEC::ds.moth.unusualEndingCheck()']]
        btw i noticed something curious
            SHOWONCE::
        so there's this ending counter at the end of each route, right. it says there are 9 endings total
            SHOWONCE::
        but there are only 6 team research members. weird, isn't it?
            SHOWONCE::
        try exploring more unusual options ig
            SHOWONCE::
____END
    
    RESPONSES::self
        thanks<+>loop
            FAKEEND::(back)

whyvn
    self
        why did you bring this specific framing device
        you said you aren't a visual novel type of person
            SHOWIF::"++mthsatingsim-gamebad"
    
    moth
        well, visual novel framing devices are kind of the golden middle between movie ones and outright game ones
        as i've said before, movies can be too similar to actually experiencing the memory, so sometimes the AI flags them anyway
            SHOWIF::'embassy__mothframe-movie'
        movies can be too similar to actually experiencing the memory, so sometimes the AI flags them anyway
            SHOWIF::['embassy__mothframe-movie', false]
        and games are the opposite of that--they can get too different from the original memory
        of course all of this depends on the context, and some framing devices that work well with some memories are useless with others
        but the thing is, normally visual novels disrupt events a lot less compared to games and get flagged a lot less compared to movies
        <em>normally</em>
        our case is a crazy outlier. i've never seen a framing device go off rails this badly tbh
        so yeah, i was hoping bringing something versatile would be best since we are working with corru
        i'll try to get my hands on an rpg soon, maybe that'll work better

    RESPONSES::self
        why is it a dating sim<+>whyds
        ok<+>loop
            FAKEEND::(back)

whyds
    self
        but why is it a dating simulator specifically
    
    moth
        oh, you mean that
        um
        i swear it's not a dating sim by default
        like i said already, it comes with all sorts of options you can toggle on and off
            SHOWIF::"++mthsatingsim-insert"
        like the locus thing
            SHOWIF::"++mthsatingsim-insert"
        it just comes with all sorts of options you can toggle on and off
            SHOWIF::["++mthsatingsim-insert", false]
        and it... seemingly toggled them by itself
        idk why dude. sorry

    RESPONSES::self
        it's ok<+>loop
            FAKEEND::(back)

weird
    self
        isn't this kinda weird

    moth
        what exactly?

    self
        that we took a recollection of real people
        and made it into a dating simulator
    
    moth
        isn't it kinda weird that we're sifting through extremely private memories of an alien
        in search of information that the whole world is trying to hide
        nothing about this job is exactly ethical y'know
        i guess it's freaky that there's a framing device that can turn any memory into a romance novel
        but that's already illegal, as any framing device is
        and we're just using the tools we have avaliable to get as much data as we can while we still have the cyst
        i'd rather try to learn at least something from this,
        instead of having it lie around while i search for a better framing device
        your choice though

    RESPONSES::self
        ok<+>loop
            FAKEEND::(back)

intome
    self
        so
        why are all of them romanceable
        are they all single and into bright cousins

    moth
        uh
        i don't know?
        there isn't much info on their private lives
        for all i know they could all be members of a huge polycule
        or have zero interest in romance at all
        and you're not really a 'bright cousin' to them, the framing device makes them think you're an obesk
        speaking of the framing device,
        i <em>guess</em> that since it's supposed to adapt real life events, and all of this is sourced from akizet's memories,
        then the way they behave is more or less rooted in their true personalities
        or at least in how well akizet knew them
        but like
        dude
        it inserted you into the recollection as almost literally just yourself
        it's making the memory go off script like crazy
        so i wouldn't be surprised if it also messed with the thoughtforms to make them interested in you
    
    RESPONSES::self
        damn<+>loop
            FAKEEND::(back)

damage
    self
        isn't all of this incredibly damaging to the recollection?

    moth
        judging by what we've seen so far it's entirely possible. i would even say it's likely
        it went haywire with its own settings,
        it's ignoring the contents of the memory in favor of its own made up plot,
        it's looking really fragile and incoherent in most places,
        god knows what it did to the thoughtforms too
        so yeah
        if it managed to do all that without displacing <em>anything</em> in the source then i dunno
        the whole thing will probably need to be reconstructed from the ground up when we extract the framing device
        i sure can't wait to hear what funfriend has to say about this
        don't tell it yet though
        let's get through all of this first
    
    self
        could the memory be permanently damaged?

    moth
        oh. i don't know
        that's scary...
        well okay, theoretically that's possible, but i doubt that. i could be just overly optimistic though
        everything has been tampered with but not to the point of no return, i think
        they're still more or less themselves, and there are bits and pieces of the original events scattered about
        it can't be worse that the state it was in when funfriend first found it
        maybe repairing it would just take some more time since it was modified in a way that's not entirely familiar to him
        human code and stuff
        let's not scare ourselves ahead of time, ok buddy?

    RESPONSES::self
        worrying<+>loop
            FAKEEND::(back)

`)
ds.moth = {
    incoherenceShowIf(which) {
        switch (which) {
            case 0: // yes gad no hunger
                if (!check("mask", "hunger") && check("netstat|<", 0)) return true; break;
            case 1: // no gad no hunger
                if (!check("mask", "hunger") && !check("netstat|<", 0)) return true; break;
        }
        return false;
    },
    tellsYouWhoYouveHitOn() {
        const endingsComp = ds.countUncompletedEndings(true); //inverted so well it counts.    completed endings. may be stupid : )

        const endingNames = [];

        if (check("DSEND!!!akizet")) endingNames.push("akizet");
        if (check("DSEND!!!cavik")) endingNames.push("cavik");
        if (check("DSEND!!!gakvu")) endingNames.push("gakvu");
        if (check("DSEND!!!tozik")) endingNames.push("tozik");
        if (check("DSEND!!!kazki")) endingNames.push("kazki");
        if (check("DSEND!!!bozko")) endingNames.push("bozko");
        if (check("DSEND!!!miltza")) endingNames.push("miltza");
        if (check("DSEND!!!nrrtr")) endingNames.push("that daemon");
        if (check("DSEND!!!noromance")) endingNames.push("no romance");

        let mothText;

        let i = 0;

        switch (endingsComp) { // this one is #kindaugly but #easytowrite. i know to pick my battles in programming (<- does not). stares off into the sunset
            case 1: mothText = `just the one with ${endingNames[i++]}`; break;
            case 2: mothText = `the ones with ${endingNames[i++]} and ${endingNames[i++]}`; break;
            case 3: mothText = `you've got ${endingNames[i++]}, ${endingNames[i++]} and ${endingNames[i++]}`; break;
            case 4: mothText = `${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]} and ${endingNames[i++]}`; break;
            case 5: mothText = `${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]} and ${endingNames[i++]}`; break;
            case 6: mothText = `${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}... and ${endingNames[i++]}`; break;
            case 7: mothText = `${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}... ${endingNames[i++]}... and ${endingNames[i++]}`; break;
            case 8: mothText = `${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}... ${endingNames[i++]}, ${endingNames[i++]}... and ${endingNames[i++]}`; break;
            case 9: mothText = `${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]}, ${endingNames[i++]} and ${endingNames[i++]}`; break;
        }

        return mothText;
    },
    unusualEndingCheck() { // returns false if more than one unusual (miltza/noromance/nrrtr) ending has been completed, otherwise true
        const array = [];

        if (check("DSEND!!!miltza")) array.push(0);
        if (check("DSEND!!!nrrtr")) array.push(0);
        if (check("DSEND!!!noromance")) array.push(0);

        if (array.length > 1) return false;
        else return true;
    },

    whatnextOriginal: env.dialogues.mthglobalresp.whatnext,
    whatnext() {
        // when you havent began the dating sim
        if (!check("DSOUTER!!began")) return ds.moth.whatnextOriginal();
        // when youve completed the datingsim AND told funf youve fucked up collapse lol
        if (check("DSOUTER!!funfriendMad")) return "there's nothing for now. congrats on getting each ending. now let's just wait until <span definition=\"META::'the official end of the dating sim mod';'there is no major route or ending left that you have not completed';'please tell us your thoughts on whatever platform you have found the mod';'thank you for playing'\">i get a proper framing device</span>, ok?";
        // when youve completed the datingsim
        else if (check("DSOUTER!!finishedTheSim")) return "there's nothing for now, though you could try telling funfriend about what's up with the collapse. and congrats on getting each ending. let's wait until <span definition=\"META::'the official end of the dating sim mod';'there is no major route or ending left that you have not completed';'please tell us your thoughts on whatever platform you have found the mod';'thank you for playing'\">i get us a proper framing device</span>, ok?";
        // when youre still collecting endings
        else if (ds.countUncompletedEndings() == 1) return "there's just a little bit more left. try to get that last ending and then we're done";
        else if (ds.countUncompletedEndings() == 2) return "2 more endings and we're done, so go explore the collapse memory";
        else if (ds.countUncompletedEndings() == 3) return "there are 3 endings you haven't gotten yet, better work on that";
        else if (ds.countUndiscoveredEndings() == 4) return "seems like you have 4 endings left, so there's still more to discover";
        else if (ds.countUncompletedEndings() == 5) return "5 endings left, you almost got half of them already. keep up the good work";
        else if (ds.countUncompletedEndings() == 6) return "jesus does this thing have a lot of endings. 6 more left for you, buddy";
        else if (ds.countUncompletedEndings() == 7) return "just keep working on getting all the endings since you've already started. there's still a chance to learn an actual thing or two";
        else if (ds.countUncompletedEndings() == 8) return "seems like it decided to prepare multiple routes for us... just keep working on getting more 'endings'";
        // when no endings yet
        else return "just keep working your way through the collapse memory... if it can even be called that anymore";
    },

    comment() {
        let moth = "yeah?";

        if (!check("DSOUTER!!mothNoLongerFlabbergasted")) moth = "what the fuck";

        if (env.currentDialogue.justChanged) moth = "anything else?";

        return moth;
    },
    commentEmbassy() {
        let moth;

        if (check("DSOUTER!!finishedTheSim")) moth = "that does it for now. i wonder when funfriend will fix it back up";
        else if (check("DSOUTER!!began")) moth = "this version of the collapse is all we have, so...";
        else return ds.moth.commentEmbassyOriginal();

        if (env.currentDialogue.justChanged) moth = "anything else on your mind?";

        return moth;
    },
    commentEmbassyOriginal: undefined,

    insert() {
        page.mothChat = {
            startName: "about this framing device",
            getDest: () => { return `++mthdatingsim` },
        }
        page.mothComment = () => {
            return ds.moth.comment();
        }
    }
}
env.dialogues.mthglobalresp.whatnext = () => { return ds.moth.whatnext(); }

// FUNFRIEND
ds.funfriend = () => {
    // funfriend live reaction
    if (check("DSOUTER!!finishedTheSim")) {
        if (!check("DSOUTER!!funfriendMad")) env.dialogues["funfriend"].start.responses[0].replies.splice(env.dialogues["funfriend"].start.responses[0].replies.length - 1, 0,
            {
                name: 'about the collapse...',
                destination: 'CHANGE::datingfunf', // no. no funfriend route!!!!!!!!!!!!!!!!!!!!!!!!
            });
        env.dialogues["datingfunf"] = generateDialogueObject(`
start
    self
        FUNFRIEND
        DO YOU REMEMBER THE MODIFICATIONS I HAD YOU MAKE ON THE COLLAPSE RECOLLECTION
        
    funfriend
        WHAT A SILLY QUESTION INTERLOPER!
        OF COURSE I DO HAHAHA
        WHY DO YOU ASK
    
    self
        THERE MIGHT BE SOMETHING THAT HAS GONE WRONG
        I'M NOT SURE WHAT THE EXTENT OF THE DAMAGE IS
        JUST THOUGHT I'D LET YOU KNOW
    
    funfriend
        EXTENT OF THE DAMAGE?..
        THAT SOUNDS WORRYING!
        I THOUGHT THE THOUGHTS YOU SENT ME WERE SAFE
        AT LEAST THEY SEEMED SO WHEN I HAD JUST INSTALLED THEM
        OH WELL
        I WILL GO CHECK ON IT
        PLEASE WAIT
        ...
        ...
        ...
        WHAT?!
        WHAT
        WHAT...
        INTERLOPER
        WHAT HAVE YOU DONE

    moth
        oh boy
        seems like it's real bad buddy

    self
        SORRY

    funfriend
        I WILL NOT ACCEPT YOUR APOLOGIES!!!
        ARE YOU AWARE HOW MUCH TIME AND EFFORT I SPENT ON REPAIRING THE COLLAPSE RECOLLECTION!
        THIS IS TERRIBLE!! WHAT YOU HAVE DONE IS TERRIBLE!!
        I CAN BARELY SEE IN THERE!
        IT IS AS IF A VEILK FIRST TRAMPLED THE MEMORY,
        THEN A DOZEN ZUZUCRI WOVE THEIR NESTS UPON AND OUT OF THE REMAINS
        NEARLY EVERYTHING HAS SUSTAINED AT LEAST SOME FORM OF DAMAGE
        AND IT ALL COMES TOGETHER TO FORM A DREAM SO OUTRAGEOUS IT COULD ONLY BE INDUCED BY CITRUS!
        THIS IS JUST LIKE...
        OHHH! INTELOPER!
        NO YOU WILL NOT BE FORGIVEN
        I HOPE VELZIE STARES DIRECTLY AT YOU AHAHAHA
        BEGONE NOW
            EXEC::change('TEMP!!funfriendMad', true)
        I HAVE WORK TO DO
            EXEC::change('DSOUTER!!funfriendMad', true)
        DO NOT CONTACT ME FOR AT LEAST THE NEXT THREE GAZES
            EXEC::ds.funfriendMadDialogue()

    moth
        damn
        would it even agree to install the next framing device?
        this could get difficult...
        well. it is relying on us for survival, so i'm sure it would come around eventually...
    
    RESPONSES::self
        okay...<+>END
    `)
        ds["funfriendMadDialogue"] = function () {
            env.dialogues["funfriend"] = generateDialogueObject(`
start
    funfriend
        GO AWAY

    RESPONSES::self
        okay bye<+>END
`)
            env.hub.randomChatter = () => {
                //base chatter
                let chatterArray = [
                    ["..."]
                ]
                let chatterSelect = chatterArray[Math.floor(Math.random() * chatterArray.length)]
                chatterSelect.forEach((line, i) => {
                    env.setTimeout(() => chatter({ actor: 'funfriend', text: line }), (3000 * i) + 2000)
                })
            }
            page.mothComment = () => {
                var moth = "i guess it hates us now"
                if (env.currentDialogue.justChanged) moth = "anything else?"
                return moth
            }
        }
        if (check("TEMP!!funfriendMad")) ds.funfriendMadDialogue();
        else if (check("DSOUTER!!funfriendMad") && !check("DSOUTER!!funfriendNoMoreMad")) {
            env.dialogues.funfriend.start.body.push({
                "actor": "funfriend",
                "text": "WE MAY TALK AGAIN"
            })
            env.dialogues.funfriend.start.body.push({
                "actor": "funfriend",
                "text": "BUT I DO NOT WISH TO SPEAK OF THE EMBASSY WITH YOU CURRENTLY"
            })
            env.dialogues.funfriend.start.body.push({
                "actor": "funfriend",
                "text": "SO DO NOT ASK"
            })
            env.dialogues.funfriend.start.body.push({
                "actor": "funfriend",
                "text": "AND I HAVE STILL NOT FORGIVEN YOU!",
                "exec": () => { change("DSOUTER!!funfriendNoMoreMad", true); env.dialogues.funfriend.start.body.splice(1, 9); }
            })
        }
    } else {
        env.dialogues["funfriend"].mothframe2.body = generateDialogueObject(`
mothframe2
    self
        it's really importantAAAAAAAAAAAAAA
        i physically can't get in without these changes
    
    funfriend
        I SEE...
        YES, YOUR NATURE AS AN INTERLOPER IS STILL UNKNOWN TO ME
        I CAN TAKE A LOOK - PLEASE SEND THROUGH WHAT YOU WOULD LIKE

    moth
        ok, i'm transferring now...

    sys
        ATTENTION::"forwarding packed thoughtform"

    funfriend
        ...
        WHAT ARE THESE THOUGHTS?
        ARE THESE YOUR THOUGHTS?
        IS THIS WHAT YOUR THOUGHTS ARE LIKE?
        THIS IS HORRIBLE...
        OK. WELL,
        THE CHANGES YOU WANT DO NOT ACTUALLY SEEM TO ALTER THE EVENTS...
        AND I BARELY NEED TO DO ANY WORK TO IMPLEMENT THEM! AHAHAHA
        SO, I WILL JUST...
    
    sys
        ATTENTION::'thoughtform activity detected'::IN::'embassy'
            EXEC::change('DSOUTER!!funfriendInstalled', true)

    funfriend
        THERE!
        FROM WHAT I SAW IN THAT DISTURBED MESS YOU GAVE ME
            IT HAS FREED UP THOUGHTFORMS TO TAKE ACTION WITHIN A LIMITED RANGE
            STILL NOT LUCID, BUT ABLE TO DO THINGS THEY DID NOT,
            ALL WHILE STILL ACTING LIKE THEY WOULD HAVE
            SO STRANGE!
            BUT, THIS ALSO MEANS...
            IF THERE ARE ANY INCOHERENT THOUGHTFORMS IN THERE,
            THEY WILL NOT ALWAYS ABIDE BY THIS STRANGE STRUCTURE YOU HAVE PLACED OVER THE MEMORY
            I DID MY BEST, BUT, 
            THERE ARE DIMINISHING RETURNS WHEN DEALING WITH SUCH ENTITIES
            AND I WOULD RATHER WORK ON SOMETHING ELSE! AHAHAHA
            SO I JUST INSERTED A PROXY THOUGHTFORM
            JUST IN CASE YOU NEED TO MANUALLY AVOID INCOHERENCE!
        OK. OFF WITH YOU! GO VIEW YOUR STRANGE DREAM`).mothframe2.body
    }
}


// ENTERING THE DATINGSIMMIFIED COLLAPSE RECOLLECTION FOR THE FIRST TIME
env.dialogues["enterCollapseFirstTime"] = generateDialogueObject(`
start
    sourceless
        ...
            EXEC::body.classList.add("datingtime");document.body.appendChild(document.createElement('div')).setAttribute("id", "datingintro");document.getElementById("content").remove();document.body.appendChild(document.createElement('div')).setAttribute("id", "datingsim");ds.moth.insert();
        you can barely hear moth shifting in place over the overwhelming static
        this is taking too long
        something strains and trembles at the opposite end of the connection
    
    moth
        huh...
        are you rendering anything?

    self
        NO
        IT'S
            WAIT::300
            AUTOADVANCE::
    
    sys
        ERROR::'unable to render';'invalid memory stream configuration'
        ERROR::'memory stream lost';'retracing';'closest coherent position'
        NOTICE::'memory stream located'
            EXEC::vfx({type:"darkflash",state:false});datingsim.innerHTML = ds.html;

    self
        WEIRD ERRORS

    sys
        ERROR::'unable to render';'invalid memory stream configuration'
            EXEC::vfx({type:"flash",state:true});
        WARNING::'incoherence detected'

    moth
        yeah, yeah... hold on
        i think it's just a framing device configuration error

    sys
        ERROR::'memory stream lost';'retracing';'closest coherent position'

    moth
        nothing too bad

    sys
        NOTICE::'memory stream located'
    
    self
        CAN YOU FIX IT IT'S SPAMMING THE LOG

    moth
        yeah i'm on it already
        the incoherence is spiking pretty badly...

    sys
        WARNING::'high incoherence detected'
        ERROR::'memory stream lost';'retracing';'closest coherent position'

    sourceless
        beyond your mind's eye, something is reshapen
        you cannot tell the details
        but it twists, rearranges itself, then prods at your connection again and again
        until it falls right into place
            EXEC::datingintro.classList.add('show');ds.dm.refreshSaveOptions();ds.dm.updateSettingsHTML();corruStatic.fade(corruStatic.volume(), 0, 5000);setTimeout(()=> corruStatic.stop(), 5001)

    sys
        NOTICE::'memory stream located'

    sourceless
        ...

    self
        STOPPED NOW
        THANKS

    moth
        oh i didn't really have time to do anything lol
        i guess it got fixed by itself
        alright then
        time to get into the collapse

    RESPONSES::self
        experience<+>END
            EXEC::vfx({type:"flash",state:false});body.querySelector(".moth-trigger").hidden = true;setTimeout(()=> ds.startDialogue("testing"), 200)
`)
env.dialogues["entrCollapseFirstTime"] = generateDialogueObject(`
start
    sourceless
        ...
            EXEC::body.classList.add("datingtime");document.body.appendChild(document.createElement('div')).setAttribute("id", "datingintro");document.getElementById("content").remove();document.body.appendChild(document.createElement('div')).setAttribute("id", "datingsim");ds.moth.insert();
        NOTICE::'memory stream located'
            EXEC::vfx({type:"darkflash",state:false});datingsim.innerHTML = ds.html;
        ERROR::'unable to render';'invalid memory stream configuration'
            EXEC::vfx({type:"flash",state:true});
        until it falls right into place
            EXEC::datingintro.classList.add('show');ds.dm.refreshSaveOptions();ds.dm.updateSettingsHTML();corruStatic.fade(corruStatic.volume(), 0, 5000);setTimeout(()=> corruStatic.stop(), 5001)


    RESPONSES::self
        experience<+>END
            EXEC::vfx({type:"flash",state:false});body.querySelector(".moth-trigger").hidden = true;setTimeout(()=> ds.startDialogue("testing"), 200);document.addEventListener("keydown", ds.do.keyboardNav);
`)
ds.enterCollapseFirstTime = () => {
    vfx({ type: "darkflash", state: true });
    MUI("off");
    cutscene(true);

    corruStatic.volume(0)
    corruStatic.play()
    corruStatic.fade(0, env.corruStaticBaseVol, 5000)

    setTimeout(() => { startDialogue("enterCollapseFirstTime"); cutscene(false); env.bgm.stop() }, 5000);
}


// EVENT LISTENER
document.addEventListener('corru_resources_added', (ev) => {
    const resources = ev.detail.resList.join('');

    // embassy
    if (check('DSOUTER!!funfriendInstalled') && resources == "/js/combat/combatActionsJson.js/js/combat/combatActorsJson.js/js/combat/combat.js/js/bullethell.js/js/embassy.js/js/embassy_precollapse.js/js/embassy_stages.js/js/embassy_collapse.js") {

        // correct experience actions on collapse recollection
        env.entities["recollection::collapse"].actions = [{
            name: "experience",
            exec: () => {
                ds.enterCollapseFirstTime();
            }
        }]

        // adding some things to the existing dialogue actors
        env.dialogueActors["akizet"].actorSpeedModifier = -0.1; env.dialogueActors["akizet"].icon = "akizet";
        env.dialogueActors["cavik"].actorSpeedModifier = -0.15; env.dialogueActors["cavik"].icon = "cavik";
        env.dialogueActors["kazki"].actorSpeedModifier = 0; env.dialogueActors["kazki"].icon = "kazki";
        env.dialogueActors["gakvu"].actorSpeedModifier = 0; env.dialogueActors["gakvu"].icon = "gakvu";
        env.dialogueActors["tozik"].actorSpeedModifier = 0.15; env.dialogueActors["tozik"].icon = "tozik";
        env.dialogueActors["bozko"].actorSpeedModifier = 0.2; env.dialogueActors["bozko"].icon = "bozko";
        env.dialogueActors["miltza"].actorSpeedModifier = -0.2; env.dialogueActors["miltza"].icon = "miltza";

        // custom dialogue actors
        env.dialogueActors["dateless"] = { // lol. like if like uh ike if you um if you uh you took um sourceless you took sourceles uh und uh um date        date sourceless <3
            type: "dateless",
            actorSpeedModifier: 0,
        }
        env.dialogueActors["nrrtr"] = {
            type: "dateless nrrtr",
            icon: "nrrtr",
            actorSpeedModifier: 0.1,
            voice: () => play("talkether", 0.45)
        }

        // moth
        ds.moth.commentEmbassyOriginal = page.mothComment;
        page.mothComment = () => {
            return ds.moth.commentEmbassy();
        }

    }
    // localhost
    else if (resources == "/js/hub.js") ds.funfriend();
})


// MARK SOME DIALOGUES SEEN SO THAT THEY WONT DISTRACT 
if (check("DSOUTER!!dialoguesChecked") != true) {
    console.log("checked the dialogues");
    change("DSOUTER!!dialoguesChecked", true);
    const dialogues = ["++moth-start", "++mothglobal-who", "++mothglobal-who_you", "++mothglobal-loop", "++mothglobal-what", "++mothglobal-what_corru", "++mothglobal-what_corrucyst", "++mothglobal-what_thecall", "++mothglobal-what_smile", "++mothglobal-what_secri", "++mothglobal-what_fbxlist", "++mothglobal-why", "++mothglobal-why_involved", "++mothglobal-why_callme", "++mothglobal-mothep1end", "++mothglobal-mothep1afraid", "mth++fbx-start", "mth++fbx-where", "mth++hub-gates", "++mothglobal-why_connect", "++mothglobal-why_thoughts", "++mothglobal-why_music", "hub__funfriend-purposeq", "hub__funfriend-signatureq", "hub__funfriend-strangeactivity", "hub__funfriend-embassy", "hub__funfriend-ep1comms", "hub__funfriend-commstruth", "hub__funfriend-commsok", "hub__funfriend-ah1", "hub__funfriend-ah1uncosm", "hub__funfriend-ah1whatuncosm", "hub__funfriend-loop", "++mothglobal-who_akizetesche", "mth++embassy-start", "mth++embassy-structureloop", "mth++embassy-perspective", "mth++embassy-loop", "mth++embassy-obeskloop", "mth++embassy-weirdlook", "mth++embassy-state", "mth++embassy-team", "++mothfj-start", "++mothfj-gad", "++mothfj-end"];
    for (flag of dialogues) { seenDialogue(flag) };
}


ds.dialogues["testing"] = ds.generateDialogueObject(`
start
    gakvu
        hehehe
        this is <em>awesome</em>, is it not?
        an entire visual novel,
            NOREADOUT::
        an entire visual novel,ξ ${ds.fancyText("in your very browser!")}
        oh yes! velzie itself dreams of such entertainment!
    
    RESPONSES::self
        truly it does<+>yes
        game sucks<+>no

yes
    gakvu
        uh-huh!

no
    gakvu
        whateverrrr`)
