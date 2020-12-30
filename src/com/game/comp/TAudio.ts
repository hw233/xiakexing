module rf {
    export var bgmSounds: { [key: string]: InnerAudioContext } = {};
    export var effectSounds: InnerAudioContext;
    export var curBgm: InnerAudioContext;

    // 通过key播放bgm
    export function playBgmKeyByAudio(key: string, single: boolean = true) {
        let audio = gameConfig.audio[key];
        if (!audio) {
            console.error(debug, `音效表不存在${key}`);
            return;
        }
        return playBgmUrlByAudio(audio.url, single, 1);
    }

    // 通过Url播放bgm
    export function playBgmUrlByAudio(url: string, single: boolean = true, vol = 1) {

        let sound = bgmSounds[url];
        if (!sound) {
            bgmSounds[url] = sound = createUrlSound(url, true);
        }

        if (curBgm != sound) {
            if (single) {
                audioGradient(sound, curBgm);
            }
            curBgm = sound;
        } else {
            if (sound["audiocontext"]["state"] != "running") {
                sound.play();
            }
        }

        // console.log("当前播放BGM: ", url);
        sound.volume = vol;
        // changeBgmVol(modelData.setting.bgm);
        return sound;
    }

    // 通过Key播放效果音,默认为通用按钮音效
    export function playEffectKeyByAudio(key: string = "tong_yong_an_niu", vol = 1) {
        let audio = gameConfig.audio[key];
        if (!audio) {
            console.error(debug, `音效表不存在${key}`);
            return;
        }
        return playEffectUrlByAudio(audio.url);
    }

    // 通过Url播放效果音
    export function playEffectUrlByAudio(url: string, vol = 1) {

        // if (effectSounds) {
        //     stopAudio(effectSounds);
        // }
        // console.log("当前播放Effect: ", url);
        effectSounds = playSound(url, false);
        changeEffectVol(modelData.setting ? modelData.setting.yinxiao : 1);
        return effectSounds;
    }

    // 改变Bgm音量
    export function changeBgmVol(vol: number) {
        foreach(bgmSounds, (sound: InnerAudioContext) => {
            if (sound) {
                sound.volume = vol;
            }
            return true;
        });
    }

    // 改变effect音量
    export function changeEffectVol(vol: number) {
        if (effectSounds) {
            effectSounds.volume = vol;
        }
    }

    export function soundsSet(mute?: boolean) {
        if (mute) {
            changeBgmVol(0.01);
            stopAudio(effectSounds);
        }
        else {
            changeBgmVol(1);
        }
    }

    // 停止音乐播放
    export function stopAudio(sound: InnerAudioContext) {
        if (sound) {
            if (sound["audiocontext"]["state"] == "running") {
                sound.stop();
            }
        }
    }

    // 声音渐变
    export function audioGradient(nextBgm: InnerAudioContext, curBgm?: InnerAudioContext, time = 1000, speed = 10) {
        // getGTimer(100).add(, this);
        let timer = Math.floor(time / speed);
        if (curBgm) {
            curBgm.volume = 1;
            curBgm.play();
            getGTimer(timer).add(_audioFadeOutCallback, this, { curBgm, speed, time });
        }
        if (nextBgm) {
            nextBgm.volume = 0;
            nextBgm.play();
            callLater.later(() => {
                getGTimer(timer).add(_audioEnhanceCallback, this, { nextBgm, speed, time });
            }, this, time);
        }
    }

    export function audioExist(name: string) {
        let url = gameConfig.audio[name].url;
        let audio = bgmSounds[url];
        if (!audio) {
            console.error(debug, `音效表不存在${name}`);
            return;
        }
        console.log("当前音乐信息: ", audio);
    }

    // 音乐淡出回调
    function _audioFadeOutCallback(data: any) {
        let audio = data.curBgm as InnerAudioContext;
        let speed = data.speed as number;
        let time = data.time as number;
        let vol = audio.volume;
        vol -= (1 / speed);
        if (vol <= 0) {
            vol = 0;
            getGTimer(Math.floor(time / speed)).remove(_audioFadeOutCallback, this);
            stopAudio(audio);
        }
        audio.volume = vol;
    }

    // 音乐增强回调
    function _audioEnhanceCallback(data: any) {
        let audio = data.nextBgm as InnerAudioContext;
        let speed = data.speed as number;
        let time = data.time as number;
        let vol = audio.volume;
        vol += (1 / speed);
        audio.volume = vol;
        if (vol >= 1) {
            vol = 1;
            getGTimer(Math.floor(time / speed)).remove(_audioEnhanceCallback, this);
            // changeBgmVol(modelData.setting.bgm);
        }
    }
}