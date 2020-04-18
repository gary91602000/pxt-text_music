/**
 * Functions are mapped to blocks using various macros in comments starting with % (e.g., //% block).
 * //%是做定義使用非備註功能
 * The most important macro "block" specifies that a block should be generated for a **exported** function.
 * block = " "之後的內容是在定義積木的完整樣貌
 */
 
//% block="test_music" color="#AA278D" 
//block積木群組名稱,color積木顏色
namespace test_music {

    // note that Caml casing yields lower case
    // block text with spaces

    //% weight=20
    //% blockId=playtone 
    //% block="playtone | %tfrequency | for | %tms | beat"
    //% tfrequency.shadow="tdevice_note"
    //% tms.shadow="timePicker"
    export function playtone(tfrequency: number, tms: BeatFraction): void {
        music.playTone(tfrequency, music.beat(tms))
    }

    //% weight=20
    //% blockId=ringtone 
    //% block="ringtone | %tfrequency "
    export function ringtone(tfrequency: Note): void {
        music.ringTone(tfrequency)
    }
 
    //% weight=20
    //% blockId=rest 
    //% block="rest | %tms | beat"
    //% tms.shadow="timePicker"
    export function rest(tms: BeatFraction): void {
        music.rest(music.beat(tms))
    }
   
 
    //% weight=20
    //% blockId=beginmelody
    //% block="start melody | %tmelodyarray | repeating | %toptions"
    //% parts="headphone"
    export function beginmelody(tmelodyarray: Melodies = 0 , toptions: MelodyOptions = 1): void {
        music.beginMelody(music.builtInMelody(tmelodyarray), toptions)
    }

 
    //% weight=20
    //% blockId=onevent
    //% block="music on | %tvalue"
    export function onevent(tvalue: MusicEvent = 1 , handler: () => void ): void {
        
    }
 
 
    //% weight=20
    //% blockId=stopmelody 
    //% block="stop melody | %toptions"
    export function stopmelody(toptions: MelodyStopOptions): void {
        music.stopMelody(MelodyStopOptions.All)
    }


 
    //% weight=20
    //% blockId=tdevice_note 
    //% block="%tnote"
    //% shim=TD_ID
    //% color="#ffffff" colorSecondary="#ffffff" colorTertiary="#D83B01"
    //% tnote.fieldEditor="note" 
    //% tnote.defl="262"
    //% tnote.fieldOptions.decompileLiterals=true
    //% useEnumVal=1
    export function noteFrequency(tnote: Note): number {
        return tnote;
    }
}
 
 
}
