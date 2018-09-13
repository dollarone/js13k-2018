"use strict"

import Main from './app/main.js'
import './styles/main.css'
import MainLoop from './app/mainloop.js'
import CPlayer from './app/player-small.js'
import Blob from './app/Blob.js'
import Key from './app/key.js'
let song1_sound = document.getElementById("song1")
let clear_sound = document.getElementById("clear")

function startDemo() {
 var song = {
      songData: [
        { // Instrument 0
          i: [
          1, // OSC1_WAVEFORM
          31, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          1, // OSC2_WAVEFORM
          150, // OSC2_VOL
          116, // OSC2_SEMI
          9, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          6, // ENV_ATTACK
          22, // ENV_SUSTAIN
          34, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          69, // LFO_AMT
          3, // LFO_FREQ
          1, // LFO_FX_FREQ
          1, // FX_FILTER
          5, // FX_FREQ
          167, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          77, // FX_PAN_AMT
          6, // FX_PAN_FREQ
          25, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [1,1,2,2,3,3,3,3,3],
          // Columns
          c: [
            {n: [149,,152,,152,159,156,,149,152,156,159,,159,156,,149,152,154,156,149,,149,152,154,159,161,159,152,147,,151],
             f: []},
            {n: [149,,152,,152,159,156,,149,152,156,137,,159,149,149,149,152,154,156,149,,149,152,154,159,161,159,156,147,,151],
             f: []},
            {n: [149,,137,,149,,147,,149,,137,,149,,151,,152,,140,,152,,154,,156,,144,,149,,137],
             f: []}
          ]
        },
        { // Instrument 1
          i: [
          0, // OSC1_WAVEFORM
          255, // OSC1_VOL
          116, // OSC1_SEMI
          1, // OSC1_XENV
          0, // OSC2_WAVEFORM
          255, // OSC2_VOL
          120, // OSC2_SEMI
          0, // OSC2_DETUNE
          1, // OSC2_XENV
          127, // NOISE_VOL
          4, // ENV_ATTACK
          6, // ENV_SUSTAIN
          35, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          0, // LFO_AMT
          0, // LFO_FREQ
          0, // LFO_FX_FREQ
          2, // FX_FILTER
          14, // FX_FREQ
          0, // FX_RESONANCE
          10, // FX_DIST
          32, // FX_DRIVE
          0, // FX_PAN_AMT
          0, // FX_PAN_FREQ
          0, // FX_DELAY_AMT
          0 // FX_DELAY_TIME
          ],
          // Patterns
          p: [1,2,3,3,4,3,4,3,3],
          // Columns
          c: [
            {n: [140,,,,,,140,,140,,,,,,,,140,,,,,,140,,140],
             f: []},
            {n: [140,,,,,,140,,140,,,,,,,,140,,,,,,140,,140,,,,140,140,140],
             f: []},
            {n: [140,,,,,,140,,140,,140,,,,,,140,,,,,,140,,140,,,,,,140],
             f: []},
            {n: [140,,,,,,140,,140,,,,,,140,,140,,,,,,140,,140,,140],
             f: []}
          ]
        },
        { // Instrument 2
          i: [
          0, // OSC1_WAVEFORM
          0, // OSC1_VOL
          140, // OSC1_SEMI
          0, // OSC1_XENV
          0, // OSC2_WAVEFORM
          0, // OSC2_VOL
          140, // OSC2_SEMI
          0, // OSC2_DETUNE
          0, // OSC2_XENV
          60, // NOISE_VOL
          4, // ENV_ATTACK
          10, // ENV_SUSTAIN
          34, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          187, // LFO_AMT
          5, // LFO_FREQ
          0, // LFO_FX_FREQ
          1, // FX_FILTER
          239, // FX_FREQ
          135, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          108, // FX_PAN_AMT
          5, // FX_PAN_FREQ
          16, // FX_DELAY_AMT
          4 // FX_DELAY_TIME
          ],
          // Patterns
          p: [1,2,3,3,3,3,3,3,3],
          // Columns
          c: [
            {n: [,,,,140,,,,,,,,140,,,,,,,,140,,,,,,,,140],
             f: []},
            {n: [,,,,140,,,,,,,,140,,,,,,,,140,,,,,,140,,140,,140],
             f: []},
            {n: [140,,,,140,,,,140,,,,140,,,,140,,,,140,,,,140,,,,140],
             f: []}
          ]
        },
        { // Instrument 3
          i: [
          0, // OSC1_WAVEFORM
          160, // OSC1_VOL
          128, // OSC1_SEMI
          1, // OSC1_XENV
          0, // OSC2_WAVEFORM
          160, // OSC2_VOL
          128, // OSC2_SEMI
          0, // OSC2_DETUNE
          1, // OSC2_XENV
          210, // NOISE_VOL
          4, // ENV_ATTACK
          7, // ENV_SUSTAIN
          41, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          60, // LFO_AMT
          4, // LFO_FREQ
          1, // LFO_FX_FREQ
          2, // FX_FILTER
          255, // FX_FREQ
          0, // FX_RESONANCE
          0, // FX_DIST
          32, // FX_DRIVE
          61, // FX_PAN_AMT
          5, // FX_PAN_FREQ
          32, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [1,1,2,2,2,2,2,2,2],
          // Columns
          c: [
            {n: [,,,,,,,,,,,,140,,,,,,,,,,,,,,,,140],
             f: []},
            {n: [,,,,128,,,,,,,,140,,,,,,,,140,,,,,,,,140],
             f: []}
          ]
        },
        { // Instrument 4
          i: [
          2, // OSC1_WAVEFORM
          100, // OSC1_VOL
          128, // OSC1_SEMI
          0, // OSC1_XENV
          3, // OSC2_WAVEFORM
          201, // OSC2_VOL
          128, // OSC2_SEMI
          0, // OSC2_DETUNE
          0, // OSC2_XENV
          0, // NOISE_VOL
          0, // ENV_ATTACK
          6, // ENV_SUSTAIN
          29, // ENV_RELEASE
          0, // ARP_CHORD
          0, // ARP_SPEED
          0, // LFO_WAVEFORM
          195, // LFO_AMT
          4, // LFO_FREQ
          1, // LFO_FX_FREQ
          3, // FX_FILTER
          50, // FX_FREQ
          184, // FX_RESONANCE
          119, // FX_DIST
          244, // FX_DRIVE
          147, // FX_PAN_AMT
          6, // FX_PAN_FREQ
          84, // FX_DELAY_AMT
          6 // FX_DELAY_TIME
          ],
          // Patterns
          p: [1,2,1,2,4,3,5,4,3],
          // Columns
          c: [
            {n: [113,,,,,,,,,,,,,,,,113],
             f: []},
            {n: [113,,,,,,,,,,,,,,,,113,,,,,,,,111,,,,108],
             f: []},
            {n: [113,,,,,,,,113,,,,,,,,115,,,,,,,,116],
             f: []},
            {n: [113,,,,,,,,113,,,,,,,,115,,,,,,,,116,,,,111],
             f: []},
            {n: [113,,,,,,,,113,,,,,,,,116,,,,,,,,120],
             f: []}
          ]
        },
        { i: [], p: [], c: [] },
        { i: [], p: [], c: [] },
        { i: [], p: [], c: [] },
      ],
      rowLen: 5513,   // In sample lengths
      patternLen: 32,  // Rows per pattern
      endPattern: 8,  // End pattern
      numChannels: 5  // Number of channels
    };


  	// Initialize music generation (player).
  	var player = new CPlayer();
  	player.init(song);
  	var done = false;
	while(!done) {
	 	if (done) {
    		return;
    	}
    	done = player.generate() >= 1;

    	if (done) {
    		var wave = player.createWave();
    		song1_sound.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
    		song1_sound.loop = true
    	}
	}
}
startDemo()

var key = new Key()

window.addEventListener('keyup', function(event) { key.onKeyup(event) }, false)
window.addEventListener('keydown', function(event) { key.onKeydown(event) }, false)

this.game = new Main(key)//, sound)


MainLoop.setUpdate(this.game.update).setDraw(this.game.render)
function stateChange(newState) {
    setTimeout(function () {
    	document.getElementById("i").style.display = "none";
		song1_sound.play()
        MainLoop.start()
    }, 3000);
}
stateChange()
//MainLoop.start()
