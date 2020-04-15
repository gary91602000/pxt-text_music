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
    //% block="playtone | %value=device_note | for | %tbeat=device_beat | beat"
    //% tbeat.shadow="timePicker"
    export function playtone(value: Note, tbeat: BeatFraction): void {
        music.playTone(value, music.beat(tbeat))
    }

    //% weight=20
    //% blockId=ringtone 
    //% block="ringtone | %value=device_note"
    export function ringtone(value: Note): void {
        music.ringtone(value)
    }
    
    //% weight=20
    //% blockId=rest 
    //% block="rest | %trest=device_beat | beat"
    //% trest.shadow="timePicker"
    export function rest(trest: BeatFraction): void {
        music.rest(music.beat(tbeat))
    }
      
}
