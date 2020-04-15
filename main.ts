/**
 * Functions are mapped to blocks using various macros in comments starting with % (e.g., //% block).
 * //%是做定義使用非備註功能
 * The most important macro "block" specifies that a block should be generated for a **exported** function.
 * block = " "之後的內容是在定義積木的完整樣貌
 */
 
//% block="test_music" color="#AA278D" 
//block積木群組名稱,color積木顏色
namespace test_music {
    let pin = DigitalPin.P0;
    
    //% blockId=setPin 
    //% block="set BEAT to pin %tbeat"
    //% tbeat.fieldEditor="gridpicker" 
    //% tbeat.fieldOptions.columns=4
    //% tbeat.fieldOptions.tooltips="false" 
    //% tbeat.fieldOptions.width="300"
    export function setPin(tbeat: BeatFraction): void {
        pin = tbeat;
    }
    
    
    //% weight=20
    //% blockId=playtone 
    //% block="playtone | %value=device_note | for | %tbeat=device_beat | beat"
    //% tbeat.shadow="timePicker"
    
    export function playtone(value: Note): void {
        music.playTone(value, music.beat(pin))
    }		
}
