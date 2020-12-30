
module rf {
    export class TProgressBar extends ProgressBar {

        param: Sprite;

        txt_value: TextField;

        progress: number;

        setProgress(c: number, t: number) {
            let { bar, barWidth } = this;

            let jindu = 0;

            if (t) {
                jindu = c / t;
            }

            this.progress = jindu;

            bar.setSize(jindu * barWidth, bar.h);
        }

        setProgressText(value: string) {
            let { txt_value } = this;

            if (!txt_value) {
                return;
            }

            setText(txt_value, value);
        }

        setProgressParam(c: number, t: number) {
            let { param, barWidth } = this;

            if (!param) {
                return;
            }

            let jindu = 0;

            if (t) {
                jindu = c / t;
            }

            param.setSize(jindu * barWidth, param.h);
        }

        setProgressPercent(n: number) {
            this.progress = n;

            super.setProgressPercent(n);
        }
    }
}