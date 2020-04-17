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
    //% tms.shadow="timePicker"
    export function playtone(tfrequency: Note, tms: BeatFraction): void {
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
    export function beginmelody(tmelodyarray: builtInMelody , toptions: MelodyOptions = 1): void {
        init();
        if (currentMelody != undefined) {
            if (((options & MelodyOptions.OnceInBackground) == 0)
                && ((options & MelodyOptions.ForeverInBackground) == 0)
                && currentMelody.background) {
                currentBackgroundMelody = currentMelody;
                currentMelody = null;
                control.raiseEvent(MICROBIT_MELODY_ID, MusicEvent.BackgroundMelodyPaused);
            }
            if (currentMelody)
                control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background ? MusicEvent.BackgroundMelodyEnded : MusicEvent.MelodyEnded);
            currentMelody = new Melody(tmelodyArray, toptions);
            control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background ? MusicEvent.BackgroundMelodyStarted : MusicEvent.MelodyStarted);
        } else {
            currentMelody = new Melody(tmelodyArray, toptions);
            control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background ? MusicEvent.BackgroundMelodyStarted : MusicEvent.MelodyStarted);
            // Only start the fiber once
            control.inBackground(() => {
                while (currentMelody.hasNextNote()) {
                    playNextNote(currentMelody);
                    if (!currentMelody.hasNextNote() && currentBackgroundMelody) {
                        // Swap the background melody back
                        currentMelody = currentBackgroundMelody;
                        currentBackgroundMelody = null;
                        control.raiseEvent(MICROBIT_MELODY_ID, MusicEvent.MelodyEnded);
                        control.raiseEvent(MICROBIT_MELODY_ID, MusicEvent.BackgroundMelodyResumed);
                        control.raiseEvent(MICROBIT_MELODY_ID, INTERNAL_MELODY_ENDED);
                    }
                }
                control.raiseEvent(MICROBIT_MELODY_ID, currentMelody.background ? MusicEvent.BackgroundMelodyEnded : MusicEvent.MelodyEnded);
                if (!currentMelody.background)
                    control.raiseEvent(MICROBIT_MELODY_ID, INTERNAL_MELODY_ENDED);
                currentMelody = null;
            })
        }
    }
 
 
}
